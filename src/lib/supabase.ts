// 클라이언트 컴포넌트에서 사용할 Supabase 클라이언트
export { createClientSupabaseClient } from "./supabase/client";

// 서버 컴포넌트에서 사용할 Supabase 클라이언트
export { createServerSupabaseClient } from "./supabase/server";

// 미들웨어에서 사용할 Supabase 클라이언트
export { createMiddlewareSupabaseClient } from "./supabase/middleware";
