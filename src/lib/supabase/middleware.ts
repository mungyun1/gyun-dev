// 미들웨어에서 사용할 Supabase 클라이언트
export const createMiddlewareSupabaseClient = (req: any, res: any) => {
  const { createMiddlewareClient } = require("@supabase/auth-helpers-nextjs");
  return createMiddlewareClient({ req, res });
};
