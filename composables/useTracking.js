/**
 * Composable for tracking user authentication events (backend only)
 * Tracks browser, OS, country when users register/login for future analysis
 * This data is stored securely and only accessible to admins
 */

export const useTracking = () => {
  const supabase = useSupabaseClient()

  /**
   * Parse user agent to extract browser and OS information
   */
  const parseUserAgent = (userAgent) => {
    const ua = userAgent || navigator.userAgent
    
    // Detect browser
    let browser = 'Unknown'
    let browserVersion = ''
    
    if (ua.includes('Firefox/')) {
      browser = 'Firefox'
      browserVersion = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || ''
    } else if (ua.includes('Edg/')) {
      browser = 'Edge'
      browserVersion = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || ''
    } else if (ua.includes('Chrome/')) {
      browser = 'Chrome'
      browserVersion = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || ''
    } else if (ua.includes('Safari/')) {
      browser = 'Safari'
      browserVersion = ua.match(/Version\/(\d+\.\d+)/)?.[1] || ''
    } else if (ua.includes('Opera/') || ua.includes('OPR/')) {
      browser = 'Opera'
      browserVersion = ua.match(/(Opera|OPR)\/(\d+\.\d+)/)?.[2] || ''
    }
    
    // Detect OS
    let os = 'Unknown'
    let osVersion = ''
    
    if (ua.includes('Windows NT')) {
      os = 'Windows'
      const version = ua.match(/Windows NT (\d+\.\d+)/)?.[1]
      osVersion = version || ''
    } else if (ua.includes('Mac OS X')) {
      os = 'macOS'
      osVersion = ua.match(/Mac OS X (\d+[._]\d+[._]\d+)/)?.[1]?.replace(/_/g, '.') || ''
    } else if (ua.includes('Linux')) {
      os = 'Linux'
    } else if (ua.includes('Android')) {
      os = 'Android'
      osVersion = ua.match(/Android (\d+\.\d+)/)?.[1] || ''
    } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
      os = 'iOS'
      osVersion = ua.match(/OS (\d+[._]\d+)/)?.[1]?.replace(/_/g, '.') || ''
    }
    
    // Detect device type
    let deviceType = 'desktop'
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      deviceType = 'tablet'
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      deviceType = 'mobile'
    }
    
    return {
      browser,
      browserVersion,
      os,
      osVersion,
      deviceType,
      userAgent: ua
    }
  }

  /**
   * Get geolocation data (country, city) from IP
   * Using ipapi.co free API (no API key needed for basic usage)
   */
  const getGeolocation = async () => {
    try {
      // Use a free IP geolocation service
      const response = await fetch('https://ipapi.co/json/')
      if (response.ok) {
        const data = await response.json()
        return {
          country: data.country_name || null,
          country_code: data.country_code || null,
          city: data.city || null,
          region: data.region || null
        }
      }
    } catch (error) {
      console.warn('Failed to fetch geolocation:', error)
    }
    
    return {
      country: null,
      country_code: null,
      city: null,
      region: null
    }
  }

  /**
   * Track user authentication activity (registration or login)
   * This is called automatically and stores data for backend analysis only
   */
  const trackUserActivity = async (activityType = 'login') => {
    if (!process.client) return
    
    try {
      const user = await supabase.auth.getUser()
      if (!user.data.user) return
      
      const userAgentInfo = parseUserAgent()
      const geo = await getGeolocation()
      
      // Get IP address (will be visible in backend only)
      let ipAddress = null
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json')
        if (ipResponse.ok) {
          const ipData = await ipResponse.json()
          ipAddress = ipData.ip
        }
      } catch (e) {
        // IP fetch failed, continue without it
      }
      
      const activityData = {
        user_id: user.data.user.id,
        activity_type: activityType,
        ip_address: ipAddress,
        ...userAgentInfo,
        ...geo
      }
      
      await supabase
        .from('user_activity')
        .insert([activityData])
      
    } catch (error) {
      console.warn('Failed to track user activity:', error)
    }
  }

  return {
    trackUserActivity,
    parseUserAgent
  }
}
