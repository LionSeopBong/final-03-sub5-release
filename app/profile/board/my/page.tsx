import ProfileFooter from "@/app/profile/components/ProfileFooter";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import Link from "next/link";

export default function MyBoard() {
  const nickname = "런데이러너";
  const posts = [
    { id: 1, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 2, title: "문의글입니다.", date: "2026-01-30", commentCount: 0 },
    { id: 3, title: "문의글입니다.", date: "2026-01-31", commentCount: 0 },
    { id: 4, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
    { id: 5, title: "문의글입니다.", date: "2026-01-29", commentCount: 0 },
  ];

  return (
    <>
      <ProfileHeader />

      <div className="flex justify-end mx-5 my-6">
        <Link
          href="/profile/board/inquiry-board"
          className="border border-[#003458] bg-[#003458] px-3 py-1.5 rounded-lg text-white cursor-pointer"
        >
          문의 게시판
        </Link>
      </div>

      <section className="rounded-lg bg-gray-100 border border-gray-100 px-3 py-6 mx-5 my-9 text-center">
        <span className="border-b border-gray-400 px-3 py-0.5 mx-0.5">
          {nickname}
        </span>
        님의 작성 게시글 내역입니다.
      </section>
      <main className="pb-16">
        <ul className="mx-5 my-8 text-center">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-gray-200 px-2 py-3">
              <Link
                href={`/profile/board/${post.id}`}
                className="cursor-pointer flex gap-3 w-full"
              >
                {post.title}
                <span>[{post.commentCount}]</span>
                <span className="ml-auto">{post.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <ProfileFooter />
    </>
  );
}
