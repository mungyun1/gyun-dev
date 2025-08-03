"use client";

import { useEffect } from "react";

export default function SEOOptimizer() {
  useEffect(() => {
    // 페이지 로드 시 SEO 관련 데이터 수집
    const collectSEOData = () => {
      const seoData = {
        url: window.location.href,
        title: document.title,
        description: document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content"),
        canonical: document
          .querySelector('link[rel="canonical"]')
          ?.getAttribute("href"),
        ogTitle: document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute("content"),
        ogDescription: document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute("content"),
        ogImage: document
          .querySelector('meta[property="og:image"]')
          ?.getAttribute("content"),
        twitterCard: document
          .querySelector('meta[name="twitter:card"]')
          ?.getAttribute("content"),
        h1Count: document.querySelectorAll("h1").length,
        h2Count: document.querySelectorAll("h2").length,
        h3Count: document.querySelectorAll("h3").length,
        imageCount: document.querySelectorAll("img").length,
        imageWithAltCount: document.querySelectorAll("img[alt]").length,
        internalLinks: document.querySelectorAll('a[href^="/"]').length,
        externalLinks: document.querySelectorAll('a[href^="http"]').length,
        loadTime: performance.now(),
      };

      // 개발 환경에서만 경고 메시지 출력
      if (process.env.NODE_ENV === "development") {
        // 경고 메시지 출력
        if (!seoData.title) console.warn("❌ 페이지 제목이 없습니다");
        if (!seoData.description) console.warn("❌ 메타 설명이 없습니다");
        if (!seoData.canonical) console.warn("❌ Canonical URL이 없습니다");
        if (seoData.h1Count === 0) console.warn("❌ H1 태그가 없습니다");
        if (seoData.h1Count > 1) console.warn("⚠️ H1 태그가 여러 개 있습니다");
        if (
          seoData.imageCount > 0 &&
          seoData.imageCount !== seoData.imageWithAltCount
        ) {
          console.warn("❌ 일부 이미지에 alt 속성이 없습니다");
        }
        if (seoData.loadTime > 3000)
          console.warn("⚠️ 페이지 로드 시간이 3초를 초과합니다");
      }
    };

    // 페이지 로드 완료 후 실행
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", collectSEOData);
    } else {
      collectSEOData();
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", collectSEOData);
    };
  }, []);

  return null;
}
