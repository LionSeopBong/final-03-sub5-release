"use client";

import Navi from "@/app/components/common/Navi";
import fetchAPI from "@/app/lib/api";
import CommentList from "@/app/profile/board/[id]/CommentList";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import { Post } from "@/types/post";
import useUserStore from "@/zustand/user";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = use(params);
  const router = useRouter();

  // zustand 에서 유저 정보 가져오기
  const user = useUserStore((state) => state.user);
  const token = user?.token?.accessToken;

  // 상태 관리
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // 편집 모드
  const [title, setTitle] = useState(""); // 편집할 제목
  const [content, setContent] = useState(""); // 편집할 내용

  // 댓글 관리
  const [replyContent, setReplyContent] = useState(""); // 댓글 내용
  const [replyRefresh, setReplyRefresh] = useState(0); // 댓글 목록 새로 고침

  // 권한 체크
  const isAdmin = user?.extra?.role === "admin" || false;
  const isAuthor = post?.user._id === user?._id || false;

  // 모달
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false); // 답변 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달

  const openReplyModal = () => {
    setIsReplyModalOpen(true);
  };
  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
    setReplyContent("");
  };
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // 게시글 조회 API
  useEffect(() => {
    const fetchPost = async () => {
      if (!token) {
        router.push("/login");
        return;
      }
      setIsLoading(true);
      const result = await fetchAPI(`/posts/${postId}`, {
        method: "GET",
        token: token,
      });

      if (result.ok === 1) {
        if (result.item.type !== "qna") {
          alert("잘못된 접근입니다.");
          router.back();
          return;
        }
        setPost(result.item);
        setTitle(result.item.title);
        setContent(result.item.content);
      } else {
        alert("게시글을 불러올 수 없습니다.");
        router.back();
      }
      setIsLoading(false);
    };
    fetchPost();
  }, [postId, token, router]);

  // 게시글 수정 API
  const handleEdit = async () => {
    if (isEditing) {
      if (!token) return;

      const result = await fetchAPI(`/posts/${postId}`, {
        method: "PATCH",
        token: token,
        body: { title, content },
      });

      if (result.ok === 1) {
        alert("수정되었습니다.");
        setPost({ ...post!, title, content });
        setIsEditing(false);
      } else {
        alert("수정 실패 : " + result.message);
      }
    } else {
      setIsEditing(true);
    }
  };

  // 게시글 삭제
  const handleDelete = async () => {
    if (!token) return;

    const result = await fetchAPI(`/posts/${postId}`, {
      method: "DELETE",
      token: token,
    });

    if (result.ok === 1) {
      alert("삭제되었습니다.");
      router.back();
    } else {
      alert("삭제 실패: " + result.message);
    }
    closeDeleteModal();
  };

  // 댓글 작성
  const handleReplySubmit = async () => {
    if (!token || !replyContent.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    const result = await fetchAPI(`/posts/${postId}/replies`, {
      method: "POST",
      token: token,
      body: { content: replyContent },
    });

    if (result.ok === 1) {
      alert("답변이 등록되었습니다.");
      setReplyContent("");
      closeReplyModal();
      setReplyRefresh((prev) => prev + 1); // ← 댓글 목록 새로고침
    } else {
      alert("답변 등록 실패: " + result.message);
    }
  };

  // 로딩 중 처리
  if (isLoading) {
    return (
      <>
        <ProfileHeader title="게시글 상세" />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="border border-gray-200 rounded-[20px] px-20 py-10 text-gray-500 font-semibold text-center w-full">
            불러오는 중...
          </p>
        </div>
        <Navi />
      </>
    );
  }

  // 게시글 없음
  if (!post) {
    return (
      <>
        <ProfileHeader title="게시글 상세" />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="border border-gray-200 rounded-[20px] px-12 py-8 text-gray-500 font-semibold">
            게시글을 찾을 수 없습니다.
          </p>
        </div>
        <Navi />
      </>
    );
  }

  return (
    <>
      <ProfileHeader title="게시글 상세" />
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
            <p className="border border-gray-200 rounded-md p-3 leading-relaxed whitespace-pre-wrap">
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
              onClick={handleEdit}
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
        <CommentList postId={postId} key={replyRefresh} />

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
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full h-[100px] border border-gray-200 rounded-sm p-2 resize-none leading-relaxed"
                  ></textarea>
                  <span className="absolute bottom-2 right-4 text-sm text-gray-400">
                    {replyContent.length}/500
                  </span>
                </div>

                <div className="modal-comment-action flex items-center justify-between gap-3 w-full p-5">
                  <button
                    type="button"
                    className="w-1/2 border border-[#003458] rounded-[5px] py-2 bg-[#003458] text-white cursor-pointer"
                    onClick={handleReplySubmit}
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
