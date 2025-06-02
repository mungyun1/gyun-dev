import { Post } from "./posts";

export interface Tag {
  name: string;
  count: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "";

/**
 * 모든 태그 목록을 가져오는 함수
 * @returns {Promise<Tag[]>} 태그 배열을 반환합니다.
 */
export async function getAllTags(): Promise<Tag[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tags`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("태그 조회 중 오류가 발생했습니다.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

/**
 * 특정 태그가 포함된 게시물 수를 가져오는 함수
 * @param {string} tagName 검색할 태그 이름
 * @returns {Promise<number>} 해당 태그가 포함된 게시물 수
 */
export async function getPostCountByTag(tagName: string): Promise<number> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/tags?name=${encodeURIComponent(tagName)}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) throw new Error("게시물 조회 중 오류가 발생했습니다.");
    const posts = await response.json();
    return posts.length;
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
    return 0;
  }
}

/**
 * 특정 태그가 포함된 게시물 목록을 가져오는 함수
 * @param {string} tag 검색할 태그 이름
 * @returns {Promise<Post[]>} 해당 태그가 포함된 게시물 목록
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/tags?name=${encodeURIComponent(tag)}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) throw new Error("게시물 조회 중 오류가 발생했습니다.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/**
 * 상위 5개 태그를 가져오는 함수
 * @returns {Promise<Tag[]>} 상위 5개 태그 목록
 */
export async function getTopTags(): Promise<Tag[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tags?path=top`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("태그 조회 중 오류가 발생했습니다.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching top tags:", error);
    return [];
  }
}
