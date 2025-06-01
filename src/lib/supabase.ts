import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 쿠키 기반 Supabase 클라이언트
export const supabase = createPagesBrowserClient();

// 서버 사이드에서 사용할 Supabase 클라이언트
export const createServerSupabaseClient = () => {
  return createPagesBrowserClient();
};
