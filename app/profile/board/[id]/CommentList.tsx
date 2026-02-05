import { Reply } from "@/types/post";
import CommentItem from "./CommentItem";

export default function CommentList() {
  const comments: Reply[] = [
    {
      _id: 1,
      content: "안녕하세요. 문의 주신 내용 확인했습니다...",
      user: { _id: 1, name: "관리자", image: "" },
      createdAt: "2026.01.05 14:11",
      updatedAt: "2026.01.05 14:11",
    },
  ];

  return (
    <section className="mt-6 px-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">관리자 답변</h3>

      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </section>
  );
}
