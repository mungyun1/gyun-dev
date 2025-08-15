/**
 * 환경 변수에서 앱 URL을 가져와서 정규화합니다.
 * 끝에 슬래시가 있으면 제거하고, 없으면 기본값을 사용합니다.
 */
export function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }
  return "https://www.gyun-dev.co.kr";
}

/**
 * API 엔드포인트 URL을 생성합니다.
 * @param endpoint - API 엔드포인트 (예: 'posts', 'categories')
 * @returns 완전한 API URL
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/api/${endpoint}`;
}

/**
 * 특정 리소스의 API URL을 생성합니다.
 * @param endpoint - API 엔드포인트 (예: 'posts')
 * @param identifier - 리소스 식별자 (예: slug, id)
 * @returns 완전한 API URL
 */
export function getResourceApiUrl(
  endpoint: string,
  identifier: string
): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/api/${endpoint}/${identifier}`;
}
