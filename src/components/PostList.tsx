"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/date";

interface Post {
  id: number;
  title: string;
  summary: string;
  slug: string;
  created_at: string;
}

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article
          key={post.id}
          className="border dark:border-slate-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
        >
          <Link href={`/posts/${post.slug}`} className="block group">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {post.summary}
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(post.created_at)}
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
