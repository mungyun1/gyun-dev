"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { supabase } from "@/lib/supabase";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface PostEditorProps {
  postSlug?: string;
}

interface PostFormData {
  title: string;
  content: string;
  tags: string;
  summary: string;
  published: boolean;
  categories_id: number | null;
}

interface Category {
  id: number;
  name: string;
}

export default function PostEditor({ postSlug }: PostEditorProps) {
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    content: "",
    tags: "",
    summary: "",
    published: true,
    categories_id: null,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
    if (postSlug) {
      fetchPost();
    }
  }, [postSlug]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("카테고리 목록 조회 중 오류:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", postSlug)
        .single();

      if (error) throw error;

      setFormData({
        title: post.title,
        content: post.content,
        tags: post.tags?.join(", ") || "",
        summary: post.summary || "",
        published: post.published,
        categories_id: post.categories_id,
      });
    } catch (error) {
      console.error("게시물 조회 중 오류:", error);
      alert("게시물을 불러오는 중 오류가 발생했습니다.");
      router.push("/admin/posts");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        throw new Error("인증되지 않은 사용자입니다.");
      }

      const postData = {
        title: formData.title,
        content: formData.content,
        summary: formData.summary,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        user_id: session.data.session.user.id,
        slug:
          postSlug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        published: formData.published,
        categories_id: formData.categories_id,
        view_count: 0,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (postSlug) {
        const { error: updateError } = await supabase
          .from("posts")
          .update(postData)
          .eq("slug", postSlug);
        error = updateError;
      } else {
        const { error: insertError } = await supabase.from("posts").insert({
          ...postData,
          created_at: new Date().toISOString(),
        });
        error = insertError;
      }

      if (error) throw error;

      router.push("/admin/posts");
    } catch (error) {
      console.error(
        postSlug ? "게시물 수정 중 오류:" : "게시물 생성 중 오류:",
        error
      );
      alert(
        postSlug
          ? "게시물을 수정하는 중 오류가 발생했습니다."
          : "게시물을 생성하는 중 오류가 발생했습니다."
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleEditorChange = (value: string | undefined) => {
    setFormData((prev) => ({
      ...prev,
      content: value || "",
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      categories_id: value ? Number(value) : null,
    }));
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
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="summary"
          className="block text-sm font-medium text-gray-700"
        >
          요약
        </label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
          value={formData.content}
          onChange={handleEditorChange}
          height={400}
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          카테고리
        </label>
        <select
          id="category"
          name="categories_id"
          value={formData.categories_id || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              categories_id: e.target.value ? Number(e.target.value) : null,
            }))
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="">카테고리 선택</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="예: JavaScript, React, Next.js"
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">공개 여부</span>
        </label>
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
          onClick={() => console.log(formData)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {postSlug ? "수정" : "저장"}
        </button>
      </div>
    </form>
  );
}
