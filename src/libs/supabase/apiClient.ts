import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

const options = {
  auth: {
    persistSession: false,
  },
}

export const supabase = createClient(supabaseUrl, supabaseKey, options)
