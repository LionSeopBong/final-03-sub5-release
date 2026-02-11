import fetchAPI from "@/app/lib/api";
import { Reply } from "@/types/post";
import useUserStore from "@/zustand/user";
import { useState } from "react";

interface CommentItemProps {
  comment: Reply;
  postId: string;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function CommentItem({
  comment,
  postId,
  onDelete,
  onUpdate,
}: CommentItemProps) {
  const user = useUserStore((state) => state.user);
  const token = user?.token?.accessToken;
  const isAdmin = user?.extra?.role === "admin";

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 수정
  const handleEdit = async () => {
    if (isEditing) {
      const result = await fetchAPI(`/posts/${postId}/replies/${comment._id}`, {
        method: "PATCH",
        token: token!,
        body: { content },
      });

      if (result.ok === 1) {
        alert("수정되었습니다.");
        onUpdate();
        setIsEditing(false);
      } else {
        alert("수정 실패: " + result.message);
      }
    } else {
      setIsEditing(true);
    }
  };

  // 댓글 삭제
  const handleDelete = async () => {
    console.log("postId:", postId, "replyId:", comment._id);
    const result = await fetchAPI(`/posts/${postId}/replies/${comment._id}`, {
      method: "DELETE",
      token: token!,
    });

    if (result.ok === 1) {
      alert("삭제되었습니다.");
      onDelete();
    } else {
      alert("삭제 실패: " + result.message);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
        {/* 작성 정보 */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            {comment.user.name}
          </span>
          <time
            className="text-xs text-gray-400"
            dateTime="2026-01-05T14:11:22"
          >
            {comment.createdAt}
          </time>
        </div>

        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-200 rounded-md p-2 text-sm"
          />
        ) : (
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        )}

        {isAdmin && (
          <div className="flex gap-2 mt-2 justify-end">
            <button
              onClick={handleEdit}
              className="border border-gray-400 rounded-md py-1 px-2 text-sm cursor-pointer"
            >
              {isEditing ? "저장" : "수정"}
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="border border-[#e85c5c] bg-[#e85c5c] text-white rounded-md py-1 px-2 text-sm cursor-pointer"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>
          <div className="relative z-10 bg-white rounded-[20px] p-5 max-w-[420px] w-full mx-8">
            <h2 className="font-semibold text-center text-gray-500 mb-4">
              댓글 삭제
            </h2>
            <p className="text-center text-gray-500 mb-4">
              해당 댓글을 삭제하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-1/2 border border-gray-300 rounded-md py-2"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="w-1/2 border border-[#e85c5c] bg-[#e85c5c] text-white rounded-md py-2"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
