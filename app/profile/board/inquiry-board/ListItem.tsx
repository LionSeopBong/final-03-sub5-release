import { PostListItem } from "@/types/post";
import Link from "next/link";

export default function ListItem({ post }: { post: PostListItem }) {
  return (
    <li className="border-b border-gray-200 px-2 py-3">
      <Link
        href={`/profile/board/${post._id}`}
        className="cursor-pointer flex flex-col gap-2 w-full"
      >
        <div className="flex gap-2">
          <span className="px-1 text-gray-500">
            [ {post.repliesCount > 0 ? "답변완료" : "답변대기"} ]
          </span>
          <span className="px-1 flex-1 min-w-0 truncate">{post.title}</span>
        </div>
        <div className="flex gap-2">
          <span className="px-1 max-w-[60%] min-w-0 truncate">
            {post.user.name}
          </span>
          <span className="pl-2 border-l-2 border-gray-300 shrink-0">
            {post.createdAt}
          </span>
        </div>
      </Link>
    </li>
  );
}
