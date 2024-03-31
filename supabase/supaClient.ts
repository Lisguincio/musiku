import { createClient } from "@supabase/supabase-js";

const supaClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const storage = supaClient.storage;

export default supaClient;
