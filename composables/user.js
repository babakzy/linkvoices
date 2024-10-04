const supabase = useSupabaseClient()
export const getProfileData  = async () => {

    let { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
    if (profile) {
        return profile[0];
    }
    else {
        throw error
    }
    
}