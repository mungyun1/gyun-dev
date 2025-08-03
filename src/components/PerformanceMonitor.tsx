"use client";

import { useEffect } from "react";

// Performance API 타입 정의
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals 모니터링
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // LCP (Largest Contentful Paint) 모니터링
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];

        // LCP가 2.5초를 초과하면 경고
        if (lastEntry.startTime > 2500) {
          console.warn("LCP가 2.5초를 초과했습니다:", lastEntry.startTime);
        }
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // FID (First Input Delay) 모니터링
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming;
          const fid = fidEntry.processingStart - fidEntry.startTime;

          // FID가 100ms를 초과하면 경고
          if (fid > 100) {
            console.warn("FID가 100ms를 초과했습니다:", fid);
          }
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });

      // CLS (Cumulative Layout Shift) 모니터링
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const layoutShiftEntry = entry as LayoutShift;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        });

        // CLS가 0.1을 초과하면 경고
        if (clsValue > 0.1) {
          console.warn("CLS가 0.1을 초과했습니다:", clsValue);
        }
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return null;
}
