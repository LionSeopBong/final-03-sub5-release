import ProfileFooter from "@/app/profile-main/components/ProfileFooter";
import ProfileHeader from "@/app/profile-main/components/ProfileHeader";
import Image from "next/image";

export default function CreatePost() {
  return (
    <>
      <ProfileHeader />
      <main>
        <div className="inquiry-wrapper m-4 px-4 py-6 flex flex-col gap-4 border border-gray-200 rounded-xl">
          <div className="inquiry-title-content flex flex-col gap-2">
            <label htmlFor="title" className="text-gray-500">
              <span className="text-[#e85c5c] px-2">*</span>문의 제목
            </label>
            <input
              id="title"
              type="text"
              className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:border-gray-500"
              placeholder="문의 제목"
            />
            <p className="text-xs text-[#e85c5c] px-1.5">
              제목은 필수 입력 영역입니다.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-gray-500">
              <span className="text-[#e85c5c] px-2">*</span>문의 내용
            </label>
            <textarea
              id="content"
              placeholder="문의 내용을 작성해 주세요"
              className="w-full h-[180px] rounded-xl border border-gray-200 px-4 py-3 resize-none focus:outline-none focus:border-gray-500"
            />
            <p className="text-xs text-[#e85c5c] px-1.5">
              내용은 필수 입력 영역입니다.
            </p>
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-full bg-[#003458] py-3 text-white font-semibold disabled:bg-gray-300 cursor-pointer flex items-center justify-center gap-2"
          >
            <Image src="/icons/chatbubble.svg" alt="" width={24} height={24} />
            문의 제출
          </button>
        </div>
      </main>

      <ProfileFooter />
    </>
  );
}
