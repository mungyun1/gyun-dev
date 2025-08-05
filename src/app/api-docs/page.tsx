"use client";

import { useEffect } from "react";

export default function ApiDocs() {
  useEffect(() => {
    const loadSwaggerUI = async () => {
      const { SwaggerUIBundle } = await import("swagger-ui-dist");
      SwaggerUIBundle({
        url: "/api/swagger",
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset,
        ],
        layout: "BaseLayout",
        defaultModelsExpandDepth: 1,
        defaultModelExpandDepth: 1,
        displayRequestDuration: true,
        docExpansion: "list",
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        tryItOutEnabled: true,
        requestInterceptor: (request: any) => {
          // 요청 URL이 올바른지 확인
          if (request.url && request.url.includes("http://https//")) {
            request.url = request.url.replace("http://https//", "https://");
          }

          // CORS 관련 헤더 추가
          if (!request.headers) {
            request.headers = {};
          }
          request.headers["Content-Type"] = "application/json";

          return request;
        },
        responseInterceptor: (response: any) => {
          // 응답 처리
          console.log("API Response:", response);
          return response;
        },
        onComplete: () => {
          console.log("Swagger UI loaded successfully");
        },
        onFailure: (data: any) => {
          console.error("Swagger UI failed to load:", data);
        },
      });
    };

    loadSwaggerUI();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">API 문서</h1>
      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 <strong>팁:</strong> 상단의 서버 선택 드롭다운에서 개발
          환경(localhost:3000) 또는 프로덕션 환경(gyun-dev.co.kr)을 선택할 수
          있습니다.
        </p>
      </div>
      <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          ⚠️ <strong>주의:</strong> API 테스트 시 CORS 오류가 발생할 수
          있습니다. 이는 브라우저의 보안 정책 때문이며, 실제 API는 정상적으로
          작동합니다.
        </p>
      </div>
      <div id="swagger-ui" />
    </div>
  );
}
