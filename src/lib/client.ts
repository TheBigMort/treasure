import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://tzxwtjgpjgrlauoebaie.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODExMjMxOCwiZXhwIjoxOTUzNjg4MzE4fQ.5LF3kPBfWuXBNeXwjDPAcz2tzjpEgyMsFiSaloDggG0"
);
