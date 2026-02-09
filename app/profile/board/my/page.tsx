"use client";

import Navi from "@/app/components/common/Navi";
import Pagination from "@/app/profile/components/Pagination";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import useUserStore from "@/zustand/user";
import Link from "next/link";
import { useState } from "react";

export default function MyBoard() {
  const user = useUserStore((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);

  const posts = [
    { id: 1, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 2, title: "문의글입니다.", date: "2026-01-30", commentCount: 0 },
    { id: 3, title: "문의글입니다.", date: "2026-01-31", commentCount: 0 },
    { id: 4, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 5, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 6, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 7, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 8, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 9, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 10, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 11, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 12, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 13, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 14, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 15, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 16, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 17, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 18, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 19, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 20, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 21, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 22, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 23, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 24, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 25, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 26, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 27, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 28, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 29, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 30, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
  ];

  // 현재 페이지 게시글 페이지네이션
  const postsPerPage = 5;
  const start = (currentPage - 1) * 5; // 시작 인덱스 (0~4  |  5~9  | 10~14)
  const end = start + postsPerPage;
  const currentPosts = posts.slice(start, end);

  return (
    <>
      <ProfileHeader title="나의 게시글" />

      <div className="flex justify-end mx-5 my-6">
        <Link
          href="/profile/board/inquiry-board"
          className="border border-[#003458] bg-[#003458] px-3 py-1.5 rounded-lg text-white cursor-pointer"
        >
          문의 게시판
        </Link>
      </div>

      <section className="rounded-lg bg-gray-100 border border-gray-100 px-3 py-6 mx-5 my-9 text-center">
        <span className="border-b border-gray-400 px-3 py-0.5 mx-0.5">
          {user?.name || "닉네임"}
        </span>
        님의 작성 게시글 내역입니다.
      </section>
      <main className="pb-16">
        <ul className="mx-5 my-8 text-center">
          {currentPosts.map((post) => (
            <li key={post.id} className="border-b border-gray-200 px-2 py-3">
              <Link
                href={`/profile/board/${post.id}`}
                className="cursor-pointer flex gap-3 w-full"
              >
                {post.title}
                <span>[{post.commentCount}]</span>
                <span className="ml-auto">{post.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={6}
        onPageChange={setCurrentPage}
      />
      <Navi />
    </>
  );
}
