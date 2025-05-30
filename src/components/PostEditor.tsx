"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import useStore from "@/store/useStore";
import { createPost, updatePost, Post } from "@/lib/posts";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface PostEditorProps {
  initialData?: Post;
}

export default function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter();
  const { theme } = useStore();
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initialData?.thumbnail_url || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const contentImageInputRef = useRef<HTMLInputElement>(null);

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setSummary(initialData.summary);
      setSlug(initialData.slug);
      setThumbnailUrl(initialData.thumbnail_url || "");
    }
  }, [initialData]);

  const uploadImage = async (file: File, path: string) => {
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("파일 크기는 5MB를 초과할 수 없습니다.");
    }

    if (!file.type.startsWith("image/")) {
      throw new Error("이미지 파일만 업로드할 수 있습니다.");
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("blog")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("blog").getPublicUrl(filePath);

    return publicUrl;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // 기존 이미지가 있다면 삭제
      if (thumbnailUrl) {
        const oldPath = thumbnailUrl.split("/").pop();
        if (oldPath) {
          await supabase.storage.from("blog").remove([`thumbnails/${oldPath}`]);
        }
      }

      const publicUrl = await uploadImage(file, "thumbnails");
      setThumbnailUrl(publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(
        error instanceof Error ? error.message : "이미지 업로드에 실패했습니다."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleContentImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const publicUrl = await uploadImage(file, "content");

      // 현재 커서 위치에 이미지 마크다운 삽입
      const imageMarkdown = `![${file.name}](${publicUrl})`;
      const textArea = document.querySelector(
        ".w-md-editor-text-input"
      ) as HTMLTextAreaElement;

      if (textArea) {
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const newContent =
          content.substring(0, start) + imageMarkdown + content.substring(end);
        setContent(newContent);
      } else {
        setContent(content + "\n" + imageMarkdown);
      }
    } catch (error) {
      console.error("Error uploading content image:", error);
      alert(
        error instanceof Error ? error.message : "이미지 업로드에 실패했습니다."
      );
    } finally {
      setIsUploading(false);
      if (contentImageInputRef.current) {
        contentImageInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const data = {
        title,
        content,
        summary,
        slug,
        thumbnail_url: thumbnailUrl,
      };

      if (initialData) {
        await updatePost(initialData.slug, data);
      } else {
        await createPost(data);
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (error) {
      console.error("Error saving post:", error);
      alert(
        error instanceof Error ? error.message : "게시물 저장에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="thumbnail"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          썸네일 이미지
        </label>
        <div className="mt-1 flex items-center space-x-4">
          {thumbnailUrl && (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden">
              <Image
                src={thumbnailUrl}
                alt="Thumbnail"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="thumbnail"
              className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? "업로드 중..." : "이미지 업로드"}
            </label>
            {thumbnailUrl && (
              <button
                type="button"
                onClick={() => setThumbnailUrl("")}
                className="ml-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                삭제
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          슬러그 (URL)
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="summary"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          요약
        </label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white sm:text-sm"
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            내용
          </label>
          <div>
            <input
              type="file"
              id="content-image"
              accept="image/*"
              onChange={handleContentImageUpload}
              className="hidden"
              ref={contentImageInputRef}
            />
            <label
              htmlFor="content-image"
              className={`inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? "업로드 중..." : "이미지 삽입"}
            </label>
          </div>
        </div>
        <div data-color-mode={theme}>
          <MDEditor
            value={content}
            onChange={(value) => setContent(value || "")}
            height={500}
            preview="edit"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? initialData
              ? "수정 중..."
              : "저장 중..."
            : initialData
            ? "수정"
            : "저장"}
        </button>
      </div>
    </form>
  );
}
