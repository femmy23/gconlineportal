import { createClient } from "@supabase/supabase-js";

const Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cmp4ZG5xeW5seWtleHNrZGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4OTE4MjYsImV4cCI6MjAzNTQ2NzgyNn0.-cKsndI9f5J6PaG5aCGS1qT4PgM56m4t0Lb2873kc9s";

const supabaseUrl = "https://ctrjxdnqynlykexskdgt.supabase.co";
const supabaseKey = Key;

export const supabase = createClient(supabaseUrl, supabaseKey);
