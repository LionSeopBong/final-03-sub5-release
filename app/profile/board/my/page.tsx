"use client";

import Navi from "@/app/components/common/Navi";
import fetchAPI from "@/app/lib/api";
import Pagination from "@/app/profile/components/Pagination";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import { PostListItem } from "@/types/post";
import useUserStore from "@/zustand/user";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyBoard() {
  // useState
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [totalPages, setTotalPages] = useState(1); // 🔥 추가

  // zustand 상태 가져오기
  const user = useUserStore((state) => state.user);
  const token = user?.token?.accessToken;

  // API 호출
  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!token) {
        return;
      }

      const result = await fetchAPI(
        `/posts/users?type=qna&page=${currentPage}&limit=5`,
        {
          // 🔥 수정
          method: "GET",
          token: token,
        },
      );

      if (result.ok === 1) {
        setPosts(result.item || []);
        setTotalPages(Number(result.pagination?.totalPages) || 1); // 🔥 추가
      } else {
        console.error(result.message || "게시글 불러오기 실패");
      }
    };

    fetchMyPosts();
  }, [token, currentPage]); // 🔥 currentPage 추가

  // 날짜 형식 변경 - 연도/월/일만 표시
  const formatDate = (dateString: string) => {
    return dateString.split(" ")[0]; // 공백 기준으로 자르기
  };

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
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <li key={post._id} className="border-b border-gray-200 px-2 py-3">
                <Link
                  href={`/profile/board/${post._id}`}
                  className="cursor-pointer flex gap-3 w-full"
                >
                  <span className="truncate flex flex-1 text-left ">
                    {post.title}
                  </span>
                  <span className="shrink-0">[{post.repliesCount}]</span>
                  <span className="ml-auto shrink-0">
                    {formatDate(post.createdAt)}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <p className="w-full text-center  border border-gray-200 rounded-[20px] px-12 py-8 text-gray-500 font-semibold">
              불러오는 중...
            </p>
          )}
        </ul>
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <Navi />
    </>
  );
}
