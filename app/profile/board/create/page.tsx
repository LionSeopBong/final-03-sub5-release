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

      {/* ●●●●● 문의 제출 완료 후 모달창 */}
      <div
        id="post-submit-modal"
        className="fixed inset-0 z-50 flex items-center justify-center hidden"
      >
        {/* ★ dim 추가 */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* 모달 카드 */}
        <div className="post-submit-card px-8 w-full relative z-10">
          <div className="modal-photo-setter flex flex-col items-center justify-center rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
            <Image
              src="/icons/post-submitted.svg"
              alt=""
              width={65}
              height={65}
              className="my-4"
            />

            <div className="submit-alert items-center justify-center flex flex-col mb-4 pb-5">
              <h2 className="font-semibold w-full text-gray-600 text-lg">
                문의 제출이 완료되었습니다.
              </h2>
              <p className="text-gray-400 text-left w-full font-semibold mt-2">
                <span>문의 접수 후 처리는</span>
                <br />
                <span>영업일 기준 1~2일이 소요됩니다.</span>
              </p>
            </div>

            <button className="post-submit-btn font-semibold text-white border border-[#003458] bg-[#003458] rounded-b-[20px] p-3 w-full cursor-pointer">
              확인
            </button>
          </div>
        </div>
      </div>

      <ProfileFooter />
    </>
  );
}
