import ProfileFooter from "@/app/profile-main/components/ProfileFooter";
import ProfileHeader from "@/app/profile-main/components/ProfileHeader";
import Image from "next/image";

export default function InquiryListPage() {
  return (
    <>
      <ProfileHeader />

      <main className="pb-16 px-5">
        {/* ●●●●● 공지글 */}
        <ul className="notice-list my-4">
          <li className="border-b border-gray-300 px-2 py-3 bg-gray-100">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2 items-center">
                <span className="py-1 px-1.5 rounded-lg border border-gray-600 bg-gray-600 text-white">
                  공지
                </span>
                <span className="flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
            </a>
          </li>
          <li className="border-b border-gray-300 px-2 py-3 bg-gray-100">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2 items-center">
                <span className="py-1 px-1.5 rounded-lg border border-gray-600 bg-gray-600 text-white">
                  공지
                </span>
                <span className="flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
            </a>
          </li>
        </ul>

        {/* ●●●●● 게시글 리스트 */}
        <ul className="inquiry-list mt-4 mb-8">
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <span className="px-1 text-gray-500">[ 답변상태 ]</span>
                <span className="px-1 flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-1 max-w-[60%] min-w-0 truncate">
                  작성자
                </span>
                <span className="pl-2 border-l-2 border-gray-300 shrink-0">
                  2026-01-29
                </span>
              </div>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <span className="px-1 text-gray-500">[ 답변상태 ]</span>
                <span className="px-1 flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-1">작성자</span>
                <span className="pl-2 border-l-2 border-gray-300">
                  2026-01-29
                </span>
              </div>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <span className="px-1 text-gray-500">[ 답변상태 ]</span>
                <span className="px-1 flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-1">작성자</span>
                <span className="pl-2 border-l-2 border-gray-300">
                  2026-01-29
                </span>
              </div>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <span className="px-1 text-gray-500">[ 답변상태 ]</span>
                <span className="px-1 flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-1">작성자</span>
                <span className="pl-2 border-l-2 border-gray-300">
                  2026-01-29
                </span>
              </div>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <span className="px-1 text-gray-500">[ 답변상태 ]</span>
                <span className="px-1 flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-1">작성자</span>
                <span className="pl-2 border-l-2 border-gray-300">
                  2026-01-29
                </span>
              </div>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <span className="px-1 text-gray-500">[ 답변상태 ]</span>
                <span className="px-1 flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-1">작성자</span>
                <span className="pl-2 border-l-2 border-gray-300">
                  2026-01-29
                </span>
              </div>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <span className="px-1 text-gray-500">[ 답변상태 ]</span>
                <span className="px-1 flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-1">작성자</span>
                <span className="pl-2 border-l-2 border-gray-300">
                  2026-01-29
                </span>
              </div>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <span className="px-1 text-gray-500">[ 답변상태 ]</span>
                <span className="px-1 flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-1">작성자</span>
                <span className="pl-2 border-l-2 border-gray-300">
                  2026-01-29
                </span>
              </div>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <span className="px-1 text-gray-500">[ 답변상태 ]</span>
                <span className="px-1 flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-1">작성자</span>
                <span className="pl-2 border-l-2 border-gray-300">
                  2026-01-29
                </span>
              </div>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <span className="px-1 text-gray-500">[ 답변상태 ]</span>
                <span className="px-1 flex-1 min-w-0 truncate">
                  문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글문의글의글
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-1">작성자</span>
                <span className="pl-2 border-l-2 border-gray-300">
                  2026-01-29
                </span>
              </div>
            </a>
          </li>
        </ul>
        {/* 검색 창 + 문의하기 */}
        <div className="board-search flex flex-col gap-3 items-center text-center mb-4">
          <div className="w-full flex gap-2.5 min-w-0">
            <select className="rounded-sm border border-gray-300 p-1.5 shrink-0 cursor-pointer">
              <option value="name">이름</option>
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>
            <input
              type="text"
              className="flex-1 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none active:border-gray-400 rounded-sm p-1.5 min-w-0"
            />
            <button
              type="button"
              className="rounded-sm border border-[#003458] bg-[#003458] text-white px-2 py-1.5 cursor-pointer"
            >
              검색
            </button>
          </div>
          <a className="w-full border border-gray-300 rounded-sm py-2 cursor-pointer">
            문의하기
          </a>
        </div>

        {/* Pagination */}
        <div className="mb-16 flex items-center justify-center gap-4">
          <button className="p-4 cursor-pointer">
            <Image
              src="/icons/pagination-l.svg"
              alt="이전 페이지 목록 버튼"
              width={16}
              height={16}
            />
          </button>
          <button
            aria-current="page"
            className="font-semibold text-[#003458] cursor-pointer p-1"
          >
            1
          </button>
          <button className="cursor-pointer p-1">2</button>
          <button className="cursor-pointer p-1">3</button>
          <button className="cursor-pointer p-1">4</button>
          <button className="cursor-pointer p-1">5</button>
          <button className="p-4 cursor-pointer">
            <Image
              src="/icons/pagination-r.svg"
              alt="다음 페이지 목록 버튼"
              width={16}
              height={16}
            />
          </button>
        </div>
      </main>

      <ProfileFooter />
    </>
  );
}
