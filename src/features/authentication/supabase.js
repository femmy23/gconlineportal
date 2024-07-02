import { createClient } from "@supabase/supabase-js";

const Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdXdveXphdWRkb3NtaGdoa2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwNDkzNjIsImV4cCI6MjAzNDYyNTM2Mn0.dAvz9W8Wh8x73sIWlACDw59ciAP7ME6eq41pMSzhK50";

const supabaseUrl = "https://mluwoyzauddosmhghkif.supabase.co";
const supabaseKey = Key;

export const supabase = createClient(supabaseUrl, supabaseKey);
