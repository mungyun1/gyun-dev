"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface PostEditorProps {
  postId?: string;
}

export default function PostEditor({ postId }: PostEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      if (response.ok) {
        const post = await response.json();
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags.join(", "));
      } else {
        throw new Error("게시물을 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("게시물 조회 중 오류:", error);
      alert("게시물을 불러오는 중 오류가 발생했습니다.");
      router.push("/admin/posts");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = postId ? `/api/posts/${postId}` : "/api/posts";
      const method = postId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(",").map((tag) => tag.trim()),
          ...(method === "POST" && { createdAt: new Date().toISOString() }),
        }),
      });

      if (response.ok) {
        router.push("/admin/posts");
      } else {
        throw new Error(postId ? "게시물 수정 실패" : "게시물 생성 실패");
      }
    } catch (error) {
      console.error(
        postId ? "게시물 수정 중 오류:" : "게시물 생성 중 오류:",
        error
      );
      alert(
        postId
          ? "게시물을 수정하는 중 오류가 발생했습니다."
          : "게시물을 생성하는 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow rounded-lg p-6"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          내용
        </label>
        <MDEditor
          value={content}
          onChange={(value) => setContent(value || "")}
          height={400}
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          태그 (쉼표로 구분)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="예: JavaScript, React, Next.js"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {postId ? "수정" : "저장"}
        </button>
      </div>
    </form>
  );
}
