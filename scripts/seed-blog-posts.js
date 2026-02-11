/**
 * Script to seed blog posts from markdown files into Supabase
 * Run this once to migrate existing blog content to the database
 * 
 * Usage: node scripts/seed-blog-posts.js
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://kuqliylwxpaxbsotlakk.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1cWxpeWx3eHBheGJzb3RsYWtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNzgyODMsImV4cCI6MjA3MTg1NDI4M30.pDdju-l3k5mRcxowxyNx2UVkJUqoruN_nl2eUKDmqhE'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Parse frontmatter from markdown
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { frontmatter: {}, content: content }
  }
  
  const [, frontmatterStr, contentStr] = match
  const frontmatter = {}
  
  // Parse YAML-like frontmatter
  const lines = frontmatterStr.split('\n')
  let currentKey = null
  
  for (const line of lines) {
    // Check for array values
    if (line.trim().startsWith('-')) {
      if (currentKey && Array.isArray(frontmatter[currentKey])) {
        const value = line.trim().substring(1).trim().replace(/^['"](.*)['"]$/, '$1')
        frontmatter[currentKey].push(value)
      }
      continue
    }
    
    // Check for key-value pairs
    const match = line.match(/^(\w+):\s*(.*)$/)
    if (match) {
      const [, key, value] = match
      currentKey = key
      
      // Handle array notation
      if (value.trim() === '[' || value.trim().startsWith('[')) {
        const arrayMatch = value.match(/\[(.*)\]/)
        if (arrayMatch) {
          frontmatter[key] = arrayMatch[1].split(',').map(v => v.trim().replace(/^['"](.*)['"]$/, '$1'))
        } else {
          frontmatter[key] = []
        }
      } else {
        frontmatter[key] = value.trim().replace(/^['"](.*)['"]$/, '$1')
      }
    }
  }
  
  return { frontmatter, content: contentStr.trim() }
}

// Create slug from filename
function createSlug(filename) {
  return filename.replace('.md', '')
}

// Seed blog posts
async function seedBlogPosts() {
  console.log('🌱 Starting blog post seeding...\n')
  
  const contentDir = path.join(__dirname, '..', 'content')
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'))
  
  console.log(`Found ${files.length} markdown files\n`)
  
  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { frontmatter, content } = parseFrontmatter(fileContent)
    
    const slug = createSlug(file)
    
    const postData = {
      slug,
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      content,
      image: frontmatter.image ? `/blog/${frontmatter.image}` : null,
      og_image: frontmatter.ogImage ? `/blog/${frontmatter.ogImage}` : null,
      alt: frontmatter.alt || frontmatter.title,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      date: frontmatter.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      published: frontmatter.published === 'true' || frontmatter.published === true,
      published_at: frontmatter.published ? new Date().toISOString() : null,
      meta_title: frontmatter.title,
      meta_description: frontmatter.description
    }
    
    console.log(`📝 Processing: ${slug}`)
    console.log(`   Title: ${postData.title}`)
    console.log(`   Published: ${postData.published}`)
    
    // Check if post already exists
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (existing) {
      console.log(`   ⚠️  Post already exists, updating...`)
      const { error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('slug', slug)
      
      if (error) {
        console.error(`   ❌ Error updating post:`, error.message)
      } else {
        console.log(`   ✅ Updated successfully`)
      }
    } else {
      const { error } = await supabase
        .from('blog_posts')
        .insert([postData])
      
      if (error) {
        console.error(`   ❌ Error inserting post:`, error.message)
      } else {
        console.log(`   ✅ Inserted successfully`)
      }
    }
    
    console.log('')
  }
  
  console.log('✨ Blog post seeding completed!')
}

// Run the seeding
seedBlogPosts().catch(error => {
  console.error('❌ Seeding failed:', error)
  process.exit(1)
})
