/**
 * Plugin to automatically track user authentication events
 * Tracks login and registration for backend analysis
 */

export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient()
  const { trackUserActivity } = useTracking()
  
  // Track when user signs in or signs up
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      // Determine if this is a new registration or just a login
      // Check if user was created recently (within last 10 seconds)
      const userCreatedAt = new Date(session.user.created_at)
      const now = new Date()
      const isNewUser = (now.getTime() - userCreatedAt.getTime()) < 10000 // 10 seconds
      
      const activityType = isNewUser ? 'registration' : 'login'
      
      // Track the activity (non-blocking)
      trackUserActivity(activityType).catch((error) => {
        console.warn('Failed to track user activity:', error)
      })
    }
    
    // Optionally track logout
    if (event === 'SIGNED_OUT') {
      trackUserActivity('logout').catch((error) => {
        console.warn('Failed to track logout:', error)
      })
    }
  })
})
