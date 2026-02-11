"use client";

import { Reply } from "@/types/post";
import CommentItem from "./CommentItem";
import { useEffect, useState } from "react";
import useUserStore from "@/zustand/user";
import fetchAPI from "@/app/lib/api";

export default function CommentList({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = useUserStore((state) => state.user);
  const token = user?.token?.accessToken;

  const fetchComments = async () => {
    if (!token) return;

    setIsLoading(true);
    const result = await fetchAPI(`/posts/${postId}/replies`, {
      method: "GET",
      token: token,
    });

    if (result.ok === 1) {
      setComments(result.item || []);
    }
    setIsLoading(false);
  };

  // 댓글 목록 조회 API
  useEffect(() => {
    const fetchComments = async () => {
      if (!token) return;

      setIsLoading(true);

      const result = await fetchAPI(`/posts/${postId}/replies`, {
        method: "GET",
        token: token,
      });

      if (result.ok === 1) {
        setComments(result.item || []);
      } else {
        console.error(result.message || "댓글 불러오기 실패");
      }
      setIsLoading(false);
    };

    fetchComments();
  }, [postId, token]);

  // 로딩 중
  if (isLoading) {
    return (
      <section className="mt-6 px-4">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">
          관리자 답변
        </h3>
        <div className="flex items-center justify-center">
          <p className="border border-gray-200 rounded-[20px] px-20 py-10 text-gray-500 font-semibold text-center w-full">
            불러오는 중...
          </p>
        </div>
      </section>
    );
  }

  // 댓글 없음
  if (comments.length === 0) {
    return (
      <section className="mt-6 px-4">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">
          관리자 답변
        </h3>
        <div className="flex items-center justify-center">
          <p className="border border-gray-200 rounded-[20px] px-12 py-8 text-gray-500 font-semibold text-center w-full">
            아직 답변이 없습니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6 px-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">관리자 답변</h3>

      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          postId={postId}
          onDelete={fetchComments}
          onUpdate={fetchComments}
        />
      ))}
    </section>
  );
}
