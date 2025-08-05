import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 클라이언트 컴포넌트에서 사용할 Supabase 클라이언트
// 서버 컴포넌트에서는 사용하지 않음
export const createClientSupabaseClient = () => {
  return createClientComponentClient();
};

// 서버 컴포넌트에서 사용할 Supabase 클라이언트
export const createServerSupabaseClient = () => {
  return createServerComponentClient({ cookies });
};

// 미들웨어에서 사용할 Supabase 클라이언트
export const createMiddlewareSupabaseClient = (req: any, res: any) => {
  const { createMiddlewareClient } = require("@supabase/auth-helpers-nextjs");
  return createMiddlewareClient({ req, res });
};
