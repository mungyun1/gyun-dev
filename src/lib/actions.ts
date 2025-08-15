"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type SessionData = {
  access_token: string;
  refresh_token: string;
  user: any;
};

// 쿠키 만료 시간을 확인하는 함수
function isCookieExpired(expires: Date): boolean {
  return new Date() > expires;
}

// 쿠키 만료 시간을 문자열로 변환하는 함수
function formatCookieExpires(days: number): string {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return expires.toUTCString();
}

// 쿠키 값에서 만료 시간을 추출하는 함수
function extractExpiryFromCookie(cookieValue: string): Date | null {
  try {
    const data = JSON.parse(cookieValue);
    return data.expires ? new Date(data.expires) : null;
  } catch {
    return null;
  }
}

export async function setServerSession(session: SessionData) {
  const cookieStore = await cookies();

  // 쿠키 만료 시간 설정 (3시간)
  const expires = new Date(Date.now() + 3 * 60 * 60 * 1000);

  // 쿠키 값에 만료 시간을 포함
  const accessTokenData = {
    token: session.access_token,
    expires: expires.toISOString(),
  };

  const refreshTokenData = {
    token: session.refresh_token,
    expires: expires.toISOString(),
  };

  const userData = {
    user: session.user,
    expires: expires.toISOString(),
  };

  // HTTP Only 쿠키로 설정하여 보안 강화
  cookieStore.set("sb-access-token", JSON.stringify(accessTokenData), {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("sb-refresh-token", JSON.stringify(refreshTokenData), {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("sb-user", JSON.stringify(userData), {
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

  // 쿠키 값에서 만료 시간 확인
  const accessTokenExpiry = extractExpiryFromCookie(accessToken.value);
  if (accessTokenExpiry && isCookieExpired(accessTokenExpiry)) {
    // 만료된 쿠키 자동 삭제
    await clearServerSession();
    return null;
  }

  // 쿠키 값에서 실제 데이터 추출
  const accessTokenData = JSON.parse(accessToken.value);
  const userData = JSON.parse(user.value);

  return {
    accessToken: accessTokenData.token,
    user: userData.user,
  };
}

// 쿠키 만료 시간을 연장하는 함수
export async function extendServerSession() {
  const cookieStore = await cookies();
  const currentSession = await getServerSession();

  if (!currentSession) {
    return false;
  }

  // 새로운 만료 시간 설정 (3시간)
  const expires = new Date(Date.now() + 3 * 60 * 60 * 1000);

  // 쿠키 값에 만료 시간을 포함하여 설정
  const accessTokenData = {
    token: currentSession.accessToken,
    expires: expires.toISOString(),
  };

  const userData = {
    user: currentSession.user,
    expires: expires.toISOString(),
  };

  // 기존 쿠키들의 만료 시간만 연장
  cookieStore.set("sb-access-token", JSON.stringify(accessTokenData), {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("sb-user", JSON.stringify(userData), {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return true;
}

// 특정 쿠키의 만료 시간을 확인하는 함수
export async function checkCookieExpiration(
  cookieName: string
): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);

  if (!cookie) {
    return true; // 쿠키가 없으면 만료된 것으로 간주
  }

  const expiry = extractExpiryFromCookie(cookie.value);
  if (!expiry) {
    return true; // 만료 시간이 없으면 만료된 것으로 간주
  }

  return isCookieExpired(expiry);
}

// 모든 인증 쿠키의 만료 상태를 확인하는 함수
export async function checkAllAuthCookies(): Promise<{
  accessToken: boolean;
  refreshToken: boolean;
  user: boolean;
}> {
  const [accessTokenExpired, refreshTokenExpired, userExpired] =
    await Promise.all([
      checkCookieExpiration("sb-access-token"),
      checkCookieExpiration("sb-refresh-token"),
      checkCookieExpiration("sb-user"),
    ]);

  return {
    accessToken: accessTokenExpired,
    refreshToken: refreshTokenExpired,
    user: userExpired,
  };
}

// 만료된 쿠키를 자동으로 정리하는 함수
export async function cleanupExpiredCookies(): Promise<void> {
  const cookieStore = await cookies();
  const cookieStatus = await checkAllAuthCookies();

  // 만료된 쿠키가 있으면 삭제
  if (
    cookieStatus.accessToken ||
    cookieStatus.refreshToken ||
    cookieStatus.user
  ) {
    await clearServerSession();
  }
}

// 쿠키 만료 시간을 확인하고 필요시 연장하는 함수
export async function validateAndExtendSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const currentSession = await getServerSession();

  if (!currentSession) {
    return false;
  }

  // 쿠키 만료 시간이 30분 이내로 남았으면 연장
  const accessToken = cookieStore.get("sb-access-token");
  if (accessToken) {
    const expiry = extractExpiryFromCookie(accessToken.value);
    if (expiry) {
      const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60 * 1000);

      if (expiry < thirtyMinutesFromNow) {
        // 만료 시간이 30분 이내로 남았으면 연장
        return await extendServerSession();
      }
    }
  }

  return true;
}
