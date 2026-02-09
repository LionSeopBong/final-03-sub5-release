"use client";

import Navi from "@/app/components/common/Navi";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import { Notice } from "@/types/post";
import { use, useState } from "react";

export default function NoticePost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // const notice = await fetchNotice(id)
  const notices: Notice[] = [
    {
      _id: 1,
      type: "notice",
      title: "사이트 이용 관련 공지",
      content:
        "문의 접수 후 처리는 영업일 기준 1~2일이 소요됩니다. 고객센터 운영시간 내에는 02-000-0000으로 전화 상담도 가능합니다.",
      createdAt: "2026-01-21",
    },
    {
      _id: 2,
      type: "notice",
      title: "영업 시간 관련 공지",
      content:
        "런데이 서비스를 이용해주셔서 감사합니다. 원활한 서비스 이용을 위해 앱을 최신 버전으로 업데이트해주시기 바랍니다.",
      createdAt: "2026-01-18",
    },
  ];
  const notice = notices.find((n) => n._id === Number(id)) || notices[0];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달
  const [isEditing, setIsEditing] = useState(false); // 편집 모드
  const [title, setTitle] = useState(notice.title); // 편집할 제목
  const [content, setContent] = useState(notice.content); // 편집할 내용

  const isAdmin = true; // ★★★★★★★★ 임시 관리자 변수

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

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
            관리자 &nbsp;|&nbsp; {notice.createdAt}
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
        <div className="flex gap-4 ml-auto mt-auto mb-16 px-4">
          {isAdmin && (
            <button
              type="button"
              className="border border-gray-400 rounded-md py-1 px-2 cursor-pointer"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? "저장" : "수정"}
            </button>
          )}

          {isAdmin && (
            <button
              type="button"
              className="border border-[#e85c5c] bg-[#e85c5c] text-white rounded-md py-1 px-2 cursor-pointer"
              onClick={openDeleteModal}
            >
              삭제
            </button>
          )}
        </div>

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
