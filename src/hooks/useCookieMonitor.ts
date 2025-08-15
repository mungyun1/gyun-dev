import { useState, useEffect, useCallback } from "react";

interface CookieStatus {
  accessToken: boolean;
  refreshToken: boolean;
  user: boolean;
}

export function useCookieMonitor(intervalMs: number = 60000) {
  // 기본 1분마다 확인
  const [cookieStatus, setCookieStatus] = useState<CookieStatus | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  // 쿠키 상태 확인
  const checkCookieStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/cookies/status");
      if (response.ok) {
        const status = await response.json();
        setCookieStatus(status);
        setLastChecked(new Date());

        // 만료된 쿠키가 있으면 경고
        if (status.accessToken || status.refreshToken || status.user) {
          console.warn("만료된 쿠키가 감지되었습니다:", status);
        }
      }
    } catch (error) {
      console.error("쿠키 상태 확인 실패:", error);
    }
  }, []);

  // 모니터링 시작
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    checkCookieStatus(); // 즉시 한 번 확인
  }, [checkCookieStatus]);

  // 모니터링 중지
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  // 모니터링 상태 토글
  const toggleMonitoring = useCallback(() => {
    if (isMonitoring) {
      stopMonitoring();
    } else {
      startMonitoring();
    }
  }, [isMonitoring, startMonitoring, stopMonitoring]);

  // 주기적으로 쿠키 상태 확인
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(checkCookieStatus, intervalMs);

    return () => clearInterval(interval);
  }, [isMonitoring, intervalMs, checkCookieStatus]);

  // 컴포넌트 마운트 시 자동으로 모니터링 시작
  useEffect(() => {
    startMonitoring();

    return () => {
      stopMonitoring();
    };
  }, [startMonitoring, stopMonitoring]);

  return {
    cookieStatus,
    isMonitoring,
    lastChecked,
    checkCookieStatus,
    startMonitoring,
    stopMonitoring,
    toggleMonitoring,
  };
}
