"use client";

import Navi from "@/app/components/common/Navi";
import fetchAPI from "@/app/lib/api";
import ListItem from "@/app/profile/board/inquiry-board/ListItem";
import NoticeItem from "@/app/profile/board/inquiry-board/NoticeItem";
import Pagination from "@/app/profile/components/Pagination";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import { NoticeListItem, PostListItem } from "@/types/post";
import useUserStore from "@/zustand/user";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function InquiryListPage() {
  const [notices, setNotices] = useState<NoticeListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  // 검색 키워드 상태 추가
  const [searchKeyword, setSearchKeyword] = useState("");
  // 추가: 실제 적용된 검색어
  const [appliedKeyword, setAppliedKeyword] = useState("");

  const user = useUserStore((state) => state.user);
  const token = user?.token?.accessToken;
  const isAdmin = user?.extra?.role === "admin" || false;

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");

  // 공지사항 등록 핸들러
  const handleNoticeSubmit = async () => {
    if (!noticeTitle.trim() || !noticeContent.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const result = await fetchAPI("/posts", {
      method: "POST",
      token: token,
      body: { type: "notice", title: noticeTitle, content: noticeContent },
    });

    if (result.ok === 1) {
      alert("공지사항이 등록되었습니다.");
      setNoticeTitle("");
      setNoticeContent("");
      setIsNoticeModalOpen(false);
      // 공지사항 목록 새로고침
      fetchNotices();
    } else {
      alert("등록 실패: " + result.message);
    }
  };

  // 공지사항 조회 API (함수로 분리)
  const fetchNotices = async () => {
    const result = await fetchAPI("/posts?type=notice", {
      method: "GET",
    });

    if (result.ok === 1) {
      setNotices(result.item || []);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // fetchPosts 함수를 useEffect 밖으로 분리 + keyword 파라미터 추가
  const fetchPosts = async (page: number, keyword: string = "") => {
    setIsloading(true);

    // keyword가 있으면 쿼리 파라미터에 추가
    const keywordParam = keyword
      ? `&keyword=${encodeURIComponent(keyword)}`
      : "";
    const result = await fetchAPI(
      `/posts?type=qna&page=${page}&limit=10${keywordParam}`,
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

  // 검색 핸들러 추가
  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 1페이지로 리셋
    setAppliedKeyword(searchKeyword); // 수정: appliedKeyword에 검색어 적용
  };

  // useEffect 수정: fetchPosts 호출 시 searchKeyword 전달
  // 수정: appliedKeyword를 의존성으로 변경
  useEffect(() => {
    fetchPosts(currentPage, appliedKeyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, appliedKeyword]);

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
            <input
              type="text"
              placeholder="제목으로 검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none active:border-gray-400 rounded-sm p-1.5 min-w-0"
            />
            <button
              type="button"
              className="rounded-sm border border-[#003458] bg-[#003458] text-white px-2 py-1.5 cursor-pointer"
              onClick={handleSearch}
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
          {/* 관리자만 보이는 공지등록 버튼 */}
          {isAdmin && (
            <button
              onClick={() => setIsNoticeModalOpen(true)}
              className="w-full border border-[#003458] bg-[#003458] text-white rounded-sm py-2 cursor-pointer"
            >
              공지사항 등록
            </button>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        {/* 공지사항 등록 모달 */}
        {isNoticeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 z-0"></div>
            <div className="modal-wrap px-8 w-full relative z-10">
              <div className="modal-content rounded-[20px] mx-auto max-w-[420px] w-full bg-white">
                <h2 className="font-semibold border-b border-gray-200 py-2.5 w-full text-center text-gray-500 text-lg">
                  공지사항 등록
                </h2>
                <div className="p-4 flex flex-col gap-3">
                  <input
                    placeholder="제목"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    className="border border-gray-200 rounded-sm px-3 py-2"
                  />
                  <textarea
                    placeholder="내용"
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    className="border border-gray-200 rounded-sm p-3 min-h-[200px] resize-none"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 w-full p-5 border-t border-gray-200">
                  <button
                    onClick={handleNoticeSubmit}
                    className="w-1/2 border border-[#003458] rounded-[5px] py-2 bg-[#003458] text-white cursor-pointer"
                  >
                    등록
                  </button>
                  <button
                    onClick={() => {
                      setIsNoticeModalOpen(false);
                      setNoticeTitle("");
                      setNoticeContent("");
                    }}
                    className="w-1/2 border border-gray-300 rounded-[5px] py-2 cursor-pointer"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Navi />
    </>
  );
}
