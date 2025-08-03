"use client";

import { useEffect } from "react";

export default function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals 모니터링
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // LCP (Largest Contentful Paint) 모니터링
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log("LCP:", lastEntry.startTime);

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
          console.log("FID:", entry.processingStart - entry.startTime);

          // FID가 100ms를 초과하면 경고
          if (entry.processingStart - entry.startTime > 100) {
            console.warn(
              "FID가 100ms를 초과했습니다:",
              entry.processingStart - entry.startTime
            );
          }
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });

      // CLS (Cumulative Layout Shift) 모니터링
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log("CLS:", clsValue);

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
