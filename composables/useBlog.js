/**
 * Composable for blog operations
 * Replaces the content module for blog posts
 */

export const useBlog = () => {
  const supabase = useSupabaseClient()

  /**
   * Get all published blog posts
   */
  const getPublishedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
      
      if (error) throw error
      
      return data || []
    } catch (error) {
      console.error('Failed to fetch blog posts:', error)
      return []
    }
  }

  /**
   * Get all blog posts (including unpublished - for admin)
   */
  const getAllPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      return data || []
    } catch (error) {
      console.error('Failed to fetch all blog posts:', error)
      return []
    }
  }

  /**
   * Get a single blog post by slug
   */
  const getPostBySlug = async (slug) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('Failed to fetch blog post:', error)
      return null
    }
  }

  /**
   * Get blog posts by tag
   */
  const getPostsByTag = async (tag) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .contains('tags', [tag])
        .order('published_at', { ascending: false })
      
      if (error) throw error
      
      return data || []
    } catch (error) {
      console.error('Failed to fetch blog posts by tag:', error)
      return []
    }
  }

  /**
   * Create a new blog post
   */
  const createPost = async (postData) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single()
      
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('Failed to create blog post:', error)
      throw error
    }
  }

  /**
   * Update a blog post
   */
  const updatePost = async (slug, postData) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('slug', slug)
        .select()
        .single()
      
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('Failed to update blog post:', error)
      throw error
    }
  }

  /**
   * Delete a blog post
   */
  const deletePost = async (slug) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('slug', slug)
      
      if (error) throw error
      
      return true
    } catch (error) {
      console.error('Failed to delete blog post:', error)
      return false
    }
  }

  /**
   * Publish a blog post
   */
  const publishPost = async (slug) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          published: true,
          published_at: new Date().toISOString()
        })
        .eq('slug', slug)
        .select()
        .single()
      
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('Failed to publish blog post:', error)
      throw error
    }
  }

  /**
   * Unpublish a blog post
   */
  const unpublishPost = async (slug) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          published: false
        })
        .eq('slug', slug)
        .select()
        .single()
      
      if (error) throw error
      
      return data
    } catch (error) {
      console.error('Failed to unpublish blog post:', error)
      throw error
    }
  }

  return {
    getPublishedPosts,
    getAllPosts,
    getPostBySlug,
    getPostsByTag,
    createPost,
    updatePost,
    deletePost,
    publishPost,
    unpublishPost
  }
}
