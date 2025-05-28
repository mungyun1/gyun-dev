export const metadata = {
  title: "API Documentation - Gyun Dev",
  description: "API documentation for Gyun Dev",
};

export default function ApiDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css"
      />
      {children}
    </>
  );
}
