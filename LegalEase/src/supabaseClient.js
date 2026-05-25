import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single, shared instance of the Supabase connection client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);