import Navi from "@/app/components/common/Navi";
import ListItem from "@/app/profile/board/inquiry-board/ListItem";
import NoticeItem from "@/app/profile/board/inquiry-board/NoticeItem";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import { NoticeListItem, PostListItem } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

export default function InquiryListPage() {
  const notices: NoticeListItem[] = [
    {
      _id: 1,
      title: "사이트 이용 관련 공지",
      createdAt: "2026-01-21",
    },
    {
      _id: 2,
      title: "영업 시간 관련 공지",
      createdAt: "2026-01-20",
    },
  ];

  const posts: PostListItem[] = [
    {
      _id: 1,
      type: "inquiry",
      title: "크기가 얼만만한가요?",
      user: { _id: 4, name: "제이지", image: "user-jayg.webp" },
      views: 15,
      repliesCount: 2,
      createdAt: "2026-02-02",
    },
    {
      _id: 2,
      type: "inquiry",
      title: "배송은 언제 되나요?",
      user: { _id: 5, name: "런데이러너", image: "user1.webp" },
      views: 8,
      repliesCount: 0,
      createdAt: "2026-02-01",
    },
    {
      _id: 3,
      type: "inquiry",
      title: "색상 문의드립니다",
      user: { _id: 6, name: "달리기좋아", image: "user2.webp" },
      views: 12,
      repliesCount: 1,
      createdAt: "2026-01-31",
    },
    {
      _id: 4,
      type: "inquiry",
      title: "교환 가능한가요?",
      user: { _id: 7, name: "러닝맨", image: "user3.webp" },
      views: 20,
      repliesCount: 3,
      createdAt: "2026-01-30",
    },
    {
      _id: 5,
      type: "inquiry",
      title: "재입고 언제 되나요?",
      user: { _id: 8, name: "조깅왕", image: "user4.webp" },
      views: 5,
      repliesCount: 1,
      createdAt: "2026-01-29",
    },
    {
      _id: 6,
      type: "inquiry",
      title: "사이즈 문의",
      user: { _id: 9, name: "마라톤러", image: "user5.webp" },
      views: 18,
      repliesCount: 0,
      createdAt: "2026-01-28",
    },
    {
      _id: 7,
      type: "inquiry",
      title: "할인 적용 문의",
      user: { _id: 10, name: "스프린터", image: "user6.webp" },
      views: 10,
      repliesCount: 2,
      createdAt: "2026-01-27",
    },
    {
      _id: 8,
      type: "inquiry",
      title: "배송지 변경 가능한가요?",
      user: { _id: 11, name: "트랙스타", image: "user7.webp" },
      views: 7,
      repliesCount: 1,
      createdAt: "2026-01-26",
    },
    {
      _id: 9,
      type: "inquiry",
      title: "상품 하자 문의",
      user: { _id: 12, name: "육상선수", image: "user8.webp" },
      views: 22,
      repliesCount: 4,
      createdAt: "2026-01-25",
    },
    {
      _id: 10,
      type: "inquiry",
      title: "반품 절차 문의",
      user: { _id: 13, name: "달리기왕", image: "user9.webp" },
      views: 14,
      repliesCount: 0,
      createdAt: "2026-01-24",
    },
  ];

  return (
    <>
      <ProfileHeader />

      <main className="pb-16 px-5">
        {/* ●●●●● 공지글 */}
        <ul className="notice-list">
          {notices.map((notice) => (
            <NoticeItem key={notice._id} notice={notice} />
          ))}
        </ul>

        {/* ●●●●● 게시글 리스트 */}
        <ul className="inquiry-list mt-4 mb-8">
          {posts.map((post) => (
            <ListItem key={post._id} post={post} />
          ))}
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
          <Link
            href="/profile/board/create"
            className="w-full border border-gray-300 rounded-sm py-2 cursor-pointer"
          >
            문의하기
          </Link>
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

      <Navi />
    </>
  );
}
