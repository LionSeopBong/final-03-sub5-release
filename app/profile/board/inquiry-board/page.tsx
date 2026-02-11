"use client";

import Navi from "@/app/components/common/Navi";
import fetchAPI from "@/app/lib/api";
import ListItem from "@/app/profile/board/inquiry-board/ListItem";
import NoticeItem from "@/app/profile/board/inquiry-board/NoticeItem";
import Pagination from "@/app/profile/components/Pagination";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import { NoticeListItem, PostListItem } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function InquiryListPage() {
  // 공지 사항
  const notices: NoticeListItem[] = [
    {
      _id: 1,
      title: "사이트 이용 관련 공지",
      createdAt: "2026-01-21",
    },
    {
      _id: 2,
      title: "영업 시간 관련 공지",
      createdAt: "2026-01-20",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // API 호출
  useEffect(() => {
    const fetchPosts = async () => {
      setIsloading(true);

      const result = await fetchAPI(
        `/posts?type=qna&page=${currentPage}&limit=10`,
        {
          method: "GET",
        },
      );

      if (result.ok === 1) {
        setPosts(result.item || []);
        setTotalPages(Number(result.pagination?.totalPages) || 1);
      } else {
        console.error(result.message || "게시글 불러오기 실패");
      }

      setIsloading(false);
    };
    fetchPosts();
  }, [currentPage]);

  return (
    <>
      <ProfileHeader title="문의 게시판" />

      <main className="pb-16 px-5">
        {/* ●●●●● 공지글 */}
        <ul className="notice-list">
          {notices.map((notice) => (
            <NoticeItem key={notice._id} notice={notice} />
          ))}
        </ul>

        {/* ●●●●● 게시글 리스트 */}
        {isLoading ? (
          <div className="flex items-center justify-center mt-4 mb-8">
            {/* div로 감싸서 중앙 정렬 */}
            <p className="w-full text-center  border border-gray-200 rounded-[20px] px-12 py-8 text-gray-500 font-semibold">
              불러오는 중...
            </p>
          </div>
        ) : posts && posts.length > 0 ? (
          <ul className="inquiry-list mt-4 mb-8">
            {posts.map((post) => (
              <ListItem key={post._id} post={post} />
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center mt-4 mb-8">
            <p className="w-full text-center border border-gray-200 rounded-[20px] px-12 py-8 text-gray-500 font-semibold">
              게시글이 없습니다.
            </p>
          </div>
        )}

        {/* 검색 창 + 문의하기 */}
        <div className="board-search flex flex-col gap-3 items-center text-center mb-4">
          <div className="w-full flex gap-2.5 min-w-0">
            <select className="rounded-sm border border-gray-300 p-1.5 shrink-0 cursor-pointer">
              <option value="name">이름</option>
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>
            <input
              type="text"
              className="flex-1 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none active:border-gray-400 rounded-sm p-1.5 min-w-0"
            />
            <button
              type="button"
              className="rounded-sm border border-[#003458] bg-[#003458] text-white px-2 py-1.5 cursor-pointer"
            >
              검색
            </button>
          </div>
          <Link
            href="/profile/board/create"
            className="w-full border border-gray-300 rounded-sm py-2 cursor-pointer"
          >
            문의하기
          </Link>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

      <Navi />
    </>
  );
}
