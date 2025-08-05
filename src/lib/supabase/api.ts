import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// API 라우트에서 사용할 Supabase 클라이언트
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
