import { Reply } from "@/types/post";

// app/profile/board/[id]/CommentItem.tsx
export default function CommentItem({ comment }: { comment: Reply }) {
  return (
    <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
      {/* 작성 정보 */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-600">
          {comment.user.name}
        </span>
        <time className="text-xs text-gray-400" dateTime="2026-01-05T14:11:22">
          {comment.createdAt}
        </time>
      </div>

      {/* 답변 내용 */}
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
        {comment.content}
      </p>
    </div>
  );
}
