# User Activity Tracking - Backend Only

This document explains the user activity tracking system in Linkvoices, which automatically collects browser, OS, and location data when users register or login - stored securely for backend analysis only.

## 🎯 Purpose

Track user authentication events (registration, login, logout) with device and location information for future business analysis. This data is:

- ✅ **Backend Only** - Not visible to regular users
- ✅ **Admin Access Only** - Requires service role key
- ✅ **Privacy-Conscious** - Collects only technical information
- ✅ **Automatic** - No manual intervention needed

## 📊 What Gets Tracked

When a user registers or logs in, the following information is automatically collected:

### User Information
- User ID (from auth.users)
- Activity type (registration, login, logout)
- Timestamp

### Device Information
- Browser name and version (Chrome, Firefox, Safari, etc.)
- Operating system and version (Windows, macOS, Linux, etc.)
- Device type (mobile, tablet, desktop)
- User agent string

### Location Information (Non-Personal)
- Country name and code
- City
- Region/State
- IP address (for backend analysis)

## 🔒 Privacy & Security

### Row Level Security (RLS)

The `user_activity` table has strict RLS policies:

```sql
-- Users can insert their own activity (automatic)
CREATE POLICY "Users can insert their own activity"
    ON user_activity FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Only service role can view (backend/admin only)
CREATE POLICY "Service role can view all activity"
    ON user_activity FOR SELECT
    USING (auth.role() = 'service_role');
```

**This means:**
- ✅ Regular users **cannot** view this data
- ✅ Only administrators with service role key can access
- ✅ Data is inserted automatically during auth events
- ✅ Users cannot query other users' data

### What's NOT Tracked

- ❌ Passwords or authentication tokens
- ❌ Email content or messages
- ❌ Invoice content or amounts
- ❌ Personal conversations
- ❌ Keystrokes or mouse movements
- ❌ Screen recordings

## 🔧 How It Works

### 1. Automatic Tracking

The tracking happens automatically via a client plugin:

**File:** `plugins/auth-tracking.client.ts`

```javascript
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    // Automatically detect if registration or login
    const isNewUser = checkIfNewUser(session.user)
    const activityType = isNewUser ? 'registration' : 'login'
    
    // Track in background (non-blocking)
    await trackUserActivity(activityType)
  }
})
```

### 2. Data Collection

The `useTracking()` composable collects device and location data:

**File:** `composables/useTracking.js`

```javascript
const trackUserActivity = async (activityType) => {
  const userAgentInfo = parseUserAgent()  // Browser & OS
  const geo = await getGeolocation()      // Country & City
  const ipAddress = await getIPAddress()  // IP for backend
  
  await supabase
    .from('user_activity')
    .insert([{
      user_id: user.id,
      activity_type: activityType,
      browser: userAgentInfo.browser,
      os: userAgentInfo.os,
      country: geo.country,
      ip_address: ipAddress
    }])
}
```

### 3. Storage

Data is stored in the `user_activity` table:

```sql
CREATE TABLE user_activity (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    activity_type TEXT, -- 'registration', 'login', 'logout'
    
    -- Device info
    browser TEXT,
    browser_version TEXT,
    os TEXT,
    os_version TEXT,
    device_type TEXT,
    
    -- Location info
    country TEXT,
    city TEXT,
    ip_address TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 📈 Accessing the Data

### Via Supabase Dashboard

1. Go to your Supabase project
2. Navigate to **Table Editor**
3. Select `user_activity` table
4. View all tracked activities

### Via SQL Query

Run queries in the SQL Editor (requires service role):

```sql
-- Total registrations by country
SELECT 
    country,
    COUNT(*) as registrations
FROM user_activity
WHERE activity_type = 'registration'
GROUP BY country
ORDER BY registrations DESC;

-- Active users by device type
SELECT 
    device_type,
    COUNT(DISTINCT user_id) as unique_users
FROM user_activity
WHERE activity_type = 'login'
    AND created_at > NOW() - INTERVAL '30 days'
GROUP BY device_type;

-- Browser usage statistics
SELECT 
    browser,
    COUNT(*) as logins
FROM user_activity
WHERE activity_type = 'login'
GROUP BY browser
ORDER BY logins DESC;

-- Recent user activity
SELECT 
    ua.activity_type,
    ua.browser,
    ua.os,
    ua.country,
    ua.created_at,
    p.email
FROM user_activity ua
JOIN profiles p ON p.id = ua.user_id
ORDER BY ua.created_at DESC
LIMIT 50;
```

### Via API (Service Role Key Required)

```javascript
// Server-side only - requires service role key
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key!
)

// Get all registrations this month
const { data, error } = await supabase
  .from('user_activity')
  .select('*')
  .eq('activity_type', 'registration')
  .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
  .order('created_at', { ascending: false })
```

## 🎨 Example Use Cases

### 1. Geographic Analysis

**Question:** "Where are most of our users located?"

```sql
SELECT 
    country,
    COUNT(DISTINCT user_id) as unique_users,
    COUNT(*) as total_logins
FROM user_activity
WHERE activity_type IN ('registration', 'login')
GROUP BY country
ORDER BY unique_users DESC;
```

### 2. Device Insights

**Question:** "What devices do our users use?"

```sql
SELECT 
    device_type,
    browser,
    COUNT(*) as usage_count
FROM user_activity
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY device_type, browser
ORDER BY usage_count DESC;
```

### 3. Growth Tracking

**Question:** "How many new users registered this week?"

```sql
SELECT 
    DATE(created_at) as date,
    COUNT(*) as new_users
FROM user_activity
WHERE activity_type = 'registration'
    AND created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### 4. User Engagement

**Question:** "How often do users log in?"

```sql
SELECT 
    user_id,
    COUNT(*) as login_count,
    MIN(created_at) as first_login,
    MAX(created_at) as last_login
FROM user_activity
WHERE activity_type = 'login'
GROUP BY user_id
ORDER BY login_count DESC;
```

## 🛠️ Configuration

### Disable Tracking

If you need to disable tracking temporarily:

**Option 1:** Comment out the plugin

In `nuxt.config.ts`:
```javascript
// Comment this line to disable the plugin
// plugins: ['~/plugins/auth-tracking.client.ts']
```

**Option 2:** Remove the plugin file

```bash
rm plugins/auth-tracking.client.ts
```

### Customize Tracking

To track additional data, modify `composables/useTracking.js`:

```javascript
const trackUserActivity = async (activityType) => {
  // ... existing code ...
  
  const activityData = {
    user_id: user.id,
    activity_type: activityType,
    // ... existing fields ...
    
    // Add custom fields
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }
  
  // Insert to database
}
```

Don't forget to add the columns to the database:

```sql
ALTER TABLE user_activity 
ADD COLUMN screen_resolution TEXT,
ADD COLUMN language TEXT,
ADD COLUMN timezone TEXT;
```

## 📊 Exporting Data

### CSV Export via Supabase

1. Go to Supabase Dashboard
2. Table Editor → `user_activity`
3. Click "Export CSV" button

### SQL Export

```sql
COPY (
    SELECT * FROM user_activity
    WHERE created_at > NOW() - INTERVAL '30 days'
) TO '/tmp/user_activity.csv' WITH CSV HEADER;
```

### Programmatic Export

```javascript
// Export last 30 days to JSON
const { data } = await supabase
  .from('user_activity')
  .select('*')
  .gte('created_at', thirtyDaysAgo)
  .order('created_at', { ascending: false })

// Save to file
fs.writeFileSync('user_activity.json', JSON.stringify(data, null, 2))
```

## 🔐 Best Practices

1. **Access Control**
   - ✅ Never expose service role key in client-side code
   - ✅ Only query this data server-side or in admin tools
   - ✅ Limit who has access to Supabase dashboard

2. **Data Retention**
   - Consider implementing data retention policies
   - Archive old data after a certain period
   - Example: Keep only last 12 months

```sql
-- Delete activity older than 12 months
DELETE FROM user_activity
WHERE created_at < NOW() - INTERVAL '12 months';
```

3. **Performance**
   - The table has indexes on key fields
   - Use date ranges in queries for better performance
   - Consider partitioning for very large datasets

4. **Privacy Compliance**
   - Inform users in your privacy policy
   - Provide data export on user request
   - Allow users to request data deletion

## 📝 Summary

- ✅ **Automatic** - Tracks on registration/login/logout
- ✅ **Backend Only** - Not visible to regular users
- ✅ **Secure** - RLS policies protect the data
- ✅ **Useful** - Provides insights for business decisions
- ✅ **Privacy-Conscious** - No sensitive data collected
- ✅ **Easy to Query** - Standard SQL queries

For more information, see:
- `supabase/migrations/20240101000000_initial_schema.sql` - Database schema
- `composables/useTracking.js` - Tracking implementation
- `plugins/auth-tracking.client.ts` - Automatic tracking setup
