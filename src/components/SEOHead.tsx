import Head from "next/head";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  publishedAt,
  modifiedAt,
  author,
  tags = [],
  noindex = false,
  nofollow = false,
}: SEOHeadProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image
    ? image.startsWith("http")
      ? image
      : `${baseUrl}${image}`
    : `${baseUrl}/Profile.png`;

  return (
    <Head>
      {/* 기본 메타 태그 */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      {author && <meta name="author" content={author} />}

      {/* Robots */}
      {(noindex || nofollow) && (
        <meta
          name="robots"
          content={`${noindex ? "noindex" : "index"}, ${
            nofollow ? "nofollow" : "follow"
          }`}
        />
      )}

      {/* Canonical URL */}
      {url && <link rel="canonical" href={fullUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="gyun-dev" />
      <meta property="og:locale" content="ko_KR" />

      {/* Article specific Open Graph */}
      {type === "article" && (
        <>
          {publishedAt && (
            <meta property="article:published_time" content={publishedAt} />
          )}
          {modifiedAt && (
            <meta property="article:modified_time" content={modifiedAt} />
          )}
          {author && <meta property="article:author" content={author} />}
          {tags.length > 0 && (
            <meta property="article:tag" content={tags.join(", ")} />
          )}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@gyun_dev" />
      <meta name="twitter:creator" content="@gyun_dev" />

      {/* 추가 메타 태그 */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="color-scheme" content="light dark" />

      {/* 아이콘 */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* RSS 피드 */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="gyun-dev RSS Feed"
        href="/feed.xml"
      />
    </Head>
  );
}
