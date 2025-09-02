import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY deben estar definidos en tu archivo .env'
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
