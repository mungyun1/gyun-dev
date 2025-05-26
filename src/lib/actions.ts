"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type SessionData = {
  access_token: string;
  refresh_token: string;
  user: any;
};

export async function setServerSession(session: SessionData) {
  const cookieStore = await cookies();

  // 쿠키 만료 시간 설정 (7일)
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // HTTP Only 쿠키로 설정하여 보안 강화
  cookieStore.set("sb-access-token", session.access_token, {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("sb-refresh-token", session.refresh_token, {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("sb-user", JSON.stringify(session.user), {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  redirect("/admin/dashboard");
}

export async function clearServerSession() {
  const cookieStore = await cookies();

  // 모든 인증 관련 쿠키 삭제
  cookieStore.delete("sb-access-token");
  cookieStore.delete("sb-refresh-token");
  cookieStore.delete("sb-user");
}

export async function getServerSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sb-access-token");
  const user = cookieStore.get("sb-user");

  if (!accessToken || !user) {
    return null;
  }

  return {
    accessToken: accessToken.value,
    user: JSON.parse(user.value),
  };
}
