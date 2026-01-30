import ProfileFooter from "@/app/profile-main/components/ProfileFooter";
import ProfileHeader from "@/app/profile-main/components/ProfileHeader";

export default function MyBoard() {
  return (
    <>
      <ProfileHeader />

      <div className="flex justify-end mx-5 my-6">
        <a className="border border-[#003458] bg-[#003458] px-3 py-1.5 rounded-lg text-white cursor-pointer">
          문의 게시판
        </a>
      </div>

      <section className="rounded-lg bg-gray-100 border border-gray-100 px-3 py-6 mx-5 my-9 text-center">
        <span className="border-b border-gray-400 px-3 py-0.5 mx-0.5">
          닉네임
        </span>
        님의 작성 게시글 내역입니다.
      </section>
      <main className="pb-16">
        <ul className="mx-5 my-8 text-center">
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex gap-3 w-full">
              문의글입니다.<span>[]</span>
              <span className="ml-auto">2026-01-29</span>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex gap-3 w-full">
              문의글입니다.<span>[]</span>
              <span className="ml-auto">2026-01-29</span>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex gap-3 w-full">
              문의글입니다.<span>[]</span>
              <span className="ml-auto">2026-01-29</span>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex gap-3 w-full">
              문의글입니다.<span>[]</span>
              <span className="ml-auto">2026-01-29</span>
            </a>
          </li>
          <li className="border-b border-gray-200 px-2 py-3">
            <a className="cursor-pointer flex gap-3 w-full">
              문의글입니다.<span>[]</span>
              <span className="ml-auto">2026-01-29</span>
            </a>
          </li>
        </ul>
      </main>

      <ProfileFooter />
    </>
  );
}
