import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://faawcztvbqstqujcawpb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTYzMTQwNSwiZXhwIjoxOTMxMjA3NDA1fQ.Z82XzB7PLT58TYL6wOJjT90qJHmnDXNpt2wP49Dnix0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
