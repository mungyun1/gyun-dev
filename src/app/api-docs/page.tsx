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
      });
    };

    loadSwaggerUI();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">API 문서</h1>
      <div id="swagger-ui" />
    </div>
  );
}
