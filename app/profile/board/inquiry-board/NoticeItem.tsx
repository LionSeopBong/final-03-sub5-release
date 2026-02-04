import { NoticeListItem } from "@/types/post";
import Link from "next/link";

export default function NoticeItem({ notice }: { notice: NoticeListItem }) {
  return (
    <li className="border-b border-gray-300 px-2 py-3 bg-gray-100">
      <Link
        href={`/profile/board/notice/${notice._id}`}
        className="cursor-pointer flex flex-col gap-2 w-full"
      >
        <div className="flex gap-2 items-center">
          <span className="py-1 px-1.5 rounded-lg border border-gray-600 bg-gray-600 text-white">
            공지
          </span>
          <span className="flex-1 min-w-0 truncate">{notice.title}</span>
        </div>
      </Link>
    </li>
  );
}
