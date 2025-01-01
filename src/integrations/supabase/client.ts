import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://opyckeaqkrnjdhrzcbfp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9weWNrZWFxa3JuamRocnpjYmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3NzMyODgsImV4cCI6MjA1MDM0OTI4OH0.qb309GxsUfYx9dq9Mgg0cSrsI6zt5G6lhrmQYHCzjAQ";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);