"use client";

import Navi from "@/app/components/common/Navi";
import fetchAPI from "@/app/lib/api";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import { Notice, Post } from "@/types/post";
import useUserStore from "@/zustand/user";
import { useRouter } from "next/navigation";

import { use, useEffect, useState } from "react";

// 날짜 형식 변경 - 연도/월/일만 표시
const formatDate = (dateString: string) => {
  return dateString.split(" ")[0]; // 공백 기준으로 자르기
};

export default function NoticePost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: noticeId } = use(params);
  const router = useRouter();

  // ■ zustand에서 유저 정보 가져오기
  const user = useUserStore((state) => state.user);
  const token = user?.token?.accessToken;

  // ■ 상태 관리
  const [notice, setNotice] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // 편집 모드
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ■ 권한 체크 - 관리자만 수정/삭제 가능
  const isAdmin = user?.extra?.role === "admin" || false;

  // 삭제 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  //  ■ 공지사항 조회 API
  useEffect(() => {
    const fetchNotice = async () => {
      if (!token) {
        router.push("/auth/login");
        return;
      }
      setIsLoading(true);
      const result = await fetchAPI(`/posts/${noticeId}`, {
        method: "GET",
        token: token,
      });

      if (result.ok === 1) {
        if (result.item.type !== "notice") {
          alert("잘못된 접근입니다.");
          router.back();
          return;
        }
        setNotice(result.item);
        setTitle(result.item.title);
        setContent(result.item.content);
      } else {
        alert("공지사항을 불러올 수 없습니다.");
        router.back();
      }
      setIsLoading(false);
    };
    fetchNotice();
  }, [noticeId, token, router]);

  // ■ 공지사항 수정 API
  const handleEdit = async () => {
    if (isEditing) {
      if (!token) return;

      const result = await fetchAPI(`/posts/${noticeId}`, {
        method: "PATCH",
        token: token,
        body: { title, content },
      });

      if (result.ok === 1) {
        alert("수정되었습니다.");
        setNotice({ ...notice!, title, content });
        setIsEditing(false);
      } else {
        alert("수정 실패 : " + result.message);
      }
    } else {
      setIsEditing(true);
    }
  };

  // ■ 공지사항 삭제
  const handleDelete = async () => {
    if (!token) return;

    const result = await fetchAPI(`/posts/${noticeId}`, {
      method: "DELETE",
      token: token,
    });

    if (result.ok === 1) {
      alert("삭제되었습니다.");
      router.push("/profile/board/inquiry-board");
    }
    closeDeleteModal();
  };

  // ■ 로딩 중 처리
  if (isLoading) {
    return (
      <>
        <ProfileHeader title="공지사항" />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="border border-gray-200 rounded-[20px] px-20 py-10 text-gray-500 font-semibold text-center w-full">
            불러오는 중...
          </p>
        </div>
        <Navi />
      </>
    );
  }

  // ■ 공지사항 없음
  if (!notice) {
    return (
      <>
        <ProfileHeader title="공지사항" />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="border border-gray-200 rounded-[20px] px-12 py-8 text-gray-500 font-semibold">
            공지사항을 찾을 수 없습니다.
          </p>
        </div>
        <Navi />
      </>
    );
  }

  return (
    <>
      <ProfileHeader title="공지사항" />

      {/* ---------------------------- 공지 상세 ---------------------------- */}
      <main className="p-4 flex flex-col gap-4 min-h-[calc(100vh-120px)]">
        <section className="flex flex-col gap-4 px-4">
          {/* 공지 아이콘 + 제목 */}
          <div className="flex items-center gap-2">
            <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-md">
              공지
            </span>
            {isEditing ? (
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="border border-gray-200 text-center rounded-md py-1.5"
              />
            ) : (
              <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
            )}
          </div>
          {/* 관리자 + 날짜 */}
          <p className="text-sm text-gray-500">
            {notice?.user?.name || "관리자"} &nbsp;|&nbsp;{" "}
            {formatDate(notice.createdAt)}
          </p>

          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-200 rounded-md p-3 leading-relaxed min-h-[200px]"
            />
          ) : (
            <p className="border border-gray-200 rounded-md p-3 leading-relaxed">
              {content}
            </p>
          )}
        </section>

        {/* 관리자만 수정, 삭제 버튼 표시 */}
        {isAdmin && (
          <div className="flex gap-4 ml-auto mt-auto mb-16 px-4">
            <button
              type="button"
              className="border border-gray-400 rounded-md py-1 px-2 cursor-pointer"
              onClick={handleEdit}
            >
              {isEditing ? "저장" : "수정"}
            </button>
            <button
              type="button"
              className="border border-[#e85c5c] bg-[#e85c5c] text-white rounded-md py-1 px-2 cursor-pointer"
              onClick={openDeleteModal}
            >
              삭제
            </button>
          </div>
        )}

        {/* ●●●●● 공지 삭제 모달창 */}
        {isDeleteModalOpen && (
          <div
            id="remove-notice-modal"
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* ★ dim 추가 */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* 모달 카드 */}
            <div className="modal-notice-wrap px-8 w-full relative z-10">
              <div className="modal-add-comment rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
                <h2 className="font-semibold border-b border-gray-200 py-2.5 w-full text-center text-gray-400 text-lg">
                  게시글 삭제
                </h2>
                <h3 className="mb-2 font-semibold flex items-center justify-center text-center min-h-[90px] text-gray-500 p-2">
                  해당 게시글을 삭제하시겠습니까?
                </h3>

                <div className="modal-comment-action flex items-center justify-between gap-3 w-full p-5 border-t border-gray-200">
                  <button
                    type="button"
                    className="w-1/2 border border-gray-300 rounded-[5px] py-2 cursor-pointer"
                    onClick={closeDeleteModal}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="w-1/2 border border-[#e85c5c] rounded-[5px] py-2 bg-[#e85c5c] text-white cursor-pointer"
                    onClick={handleDelete}
                  >
                    삭제
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
