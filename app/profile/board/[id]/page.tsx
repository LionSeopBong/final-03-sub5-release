"use client";

import Navi from "@/app/components/common/Navi";
import CommentList from "@/app/profile/board/[id]/CommentList";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import { use, useState } from "react";

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = use(params);

  // const post = await fetchPost(postId)
  const post = {
    _id: 1,
    type: "qna",
    user: {
      _id: 4,
      name: "제이지",
      email: "u1@market.com",
      image: "user-jayg.webp",
    },
    title: "크기가 얼만만한가요?",
    content: "아이가 6살인데 가지고 놀기 적당한 크기인가요?",
    replies: [
      {
        _id: 1,
        user: {
          _id: 2,
          name: "네오",
          email: "s1@market.com",
          image: "user-neo.webp",
        },
        content: "크기는 상품 상세정보에 나와 있습니다.",
        createdAt: "2026.01.31 08:15:14",
        updatedAt: "2026.01.31 11:15:14",
      },
    ],
    createdAt: "2026.02.02 06:15:14",
    updatedAt: "2026.01.31 12:15:14",
  };

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false); // 답변 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달
  const [isEditing, setIsEditing] = useState(false); // 편집 모드
  const [title, setTitle] = useState(post.title); // 편집할 제목
  const [content, setContent] = useState(post.content); // 편집할 내용
  const isAdmin = true; // ★★★★★★★★ 임시 관리자 변수
  const isAuthor = true; // ★★★★★★★★ 임시 작성자 변수

  const openReplyModal = () => {
    setIsReplyModalOpen(true);
  };
  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
  };
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <ProfileHeader />

      {/* ---------------------------- 게시글 상세 ---------------------------- */}
      <main className="p-4 pb-24 flex flex-col gap-4 min-h-[calc(100vh-120px)]">
        <section className="flex flex-col gap-4 px-4">
          {/* -------------- 제목 본문 -------------- */}
          {isEditing ? (
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="border border-gray-200 text-center rounded-md py-1.5"
            />
          ) : (
            <h2 className="border border-gray-200 text-center rounded-md py-1.5">
              {title}
            </h2>
          )}
          {/* -------------- 내용 본문 -------------- */}
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
        <div className="reply-modify-delete-btn flex gap-4 ml-auto mt-auto mb-16 px-4">
          {isAdmin && (
            <button
              type="button"
              className="reply-btn border border-[#003458] bg-[#003458] text-white rounded-md py-1 px-2 cursor-pointer"
              onClick={openReplyModal}
            >
              답변하기
            </button>
          )}
          {isAuthor && (
            <button
              type="button"
              className="edit-post-btn border border-gray-400 rounded-md py-1 px-2 cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "저장" : "수정"}
            </button>
          )}
          {isAuthor && (
            <button
              type="button"
              className="remove-post-btn border border-[#e85c5c] bg-[#e85c5c] text-white rounded-md py-1 px-2 cursor-pointer"
              onClick={openDeleteModal}
            >
              삭제
            </button>
          )}
        </div>
        <CommentList />

        {/* ●●●●● 답변하기 모달창 */}
        {isReplyModalOpen && (
          <div
            id="reply-modal"
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* ★ dim 추가 */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* 모달 카드 */}
            <div className="modal-reply-wrap px-8 w-full relative z-10">
              <div className="modal-add-comment rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
                <h2 className="font-semibold border-b border-gray-200 py-2.5 w-full text-center text-gray-500 text-lg">
                  답변 작성
                </h2>
                <div className="relative w-full h-[180px] px-4 py-2">
                  <h3 className="mb-2 text-gray-500 px-2">
                    문의에 대한 답변을 작성해주세요.
                  </h3>
                  <textarea
                    placeholder="이곳에 답변 내용을 작성해 주세요."
                    maxLength={500}
                    className="w-full h-[100px] border border-gray-200 rounded-sm p-2 resize-none leading-relaxed"
                  ></textarea>
                  <span className="absolute bottom-2 right-4 text-sm text-gray-400">
                    0 / 500
                  </span>
                </div>

                <div className="modal-comment-action flex items-center justify-between gap-3 w-full p-5">
                  <button
                    type="button"
                    className="w-1/2 border border-[#003458] rounded-[5px] py-2 bg-[#003458] text-white cursor-pointer"
                  >
                    등록
                  </button>
                  <button
                    type="button"
                    className="w-1/2 border border-gray-300 rounded-[5px] py-2 cursor-pointer"
                    onClick={closeReplyModal}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ●●●●● 게시글 삭제 모달창 */}
        {isDeleteModalOpen && (
          <div
            id="remove-post-modal"
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* ★ dim 추가 */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* 모달 카드 */}
            <div className="modal-comment-wrap px-8 w-full relative z-10">
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
