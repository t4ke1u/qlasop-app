import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string

const options = {
  auth: {
    persistSession: false,
  },
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options)
