import ProfileButton from "@/app/profile-main/components/ProfileButton";
import ProfileFooter from "@/app/profile-main/components/ProfileFooter";
import ProfileHeader from "@/app/profile-main/components/ProfileHeader";
import Image from "next/image";

export default function ProfileEdit() {
  return (
    <>
      <ProfileHeader />

      {/* ----------------- 프로필 수정 : edit-profile ----------------- */}
      <main className="edit-profile mx-4">
        {/* 프로필 사진 + 카메라 아이콘 */}
        <div className="flex items-center justify-center relative w-[70px] h-[70px] mx-auto">
          <Image
            src="/icons/profile-main.svg"
            alt="프로필 사진"
            fill
            className="object-cover"
          />
          <button type="button" aria-label="프로필 사진 설정 버튼">
            <Image
              src="/icons/profile-camera.svg"
              alt="프로필 사진 선택"
              className="absolute bottom-0 right-0"
              width={30}
              height={30}
            />
          </button>
        </div>

        {/* 닉네임  |  성별  |  생년월일  |  완료 버튼 */}
        <div className="flex flex-col my-4">
          {/* 닉네임 + input */}
          <div className="input-name flex flex-col m-4 gap-1.5">
            <label className="font-semibold">닉네임</label>
            <input
              type="text"
              placeholder="닉네임을 입력하세요"
              className="border border-[--border-medium] p-2 rounded-[6px]"
            />
          </div>

          {/* 성별 radio */}
          <div className="input-radio flex flex-col m-4 gap-1.5">
            <h3 className="font-semibold">성별</h3>
            <div className="radio-pair flex items-center justify-center gap-4">
              <label className="flex items-center justify-center bg-[--bg-tertiary] w-full py-3 cursor-pointer gap-4 rounded-lg">
                <input
                  type="radio"
                  name="gender"
                  className="hidden"
                  defaultChecked
                />
                <span className="w-4 h-4 rounded border border-[--border-medium] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                </span>
                <span>남성</span>
              </label>
              <label className="flex items-center justify-center bg-[--bg-tertiary] w-full py-3 cursor-pointer gap-4 rounded-lg">
                <input type="radio" name="gender" className="hidden" />
                <span className="w-4 h-4 rounded border border-[--border-medium] flex items-center justify-center"></span>
                <span>여성</span>
              </label>
            </div>
          </div>

          {/* 생년월일 dropdown */}
          <div className="input-birth flex flex-col m-4 gap-1.5">
            <label className="font-semibold">생년월일</label>
            <input
              type="date"
              className="border border-[--border-medium] p-2 rounded-[6px]"
            />
          </div>

          <ProfileButton />
        </div>
      </main>

      <ProfileFooter />

      {/* ●●●●● ① 프로필 사진 설정 modal 전체 레이어 */}
      <div
        id="photo-modal"
        className="fixed inset-0 z-50 flex items-center justify-center hidden"
      >
        {/* ★ dim 추가 */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* 모달 카드 */}
        <div className="modal-setter-wrap px-8 w-full relative z-10">
          <div className="modal-photo-setter flex flex-col items-center justify-center border border-gray-200 rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
            <h2 className="font-semibold border-b border-gray-300 p-3 w-full text-center text-gray-500">
              프로필 사진 설정
            </h2>
            <button className="modal-photo-action flex items-center gap-3 border-b border-gray-200 px-7 py-3 w-full">
              <Image
                src="/icons/edit-camera.svg"
                alt="사진 촬영"
                width={20}
                height={20}
              />
              <span>사진 촬영</span>
            </button>
            <button className="modal-photo-select flex items-center gap-3 border-b border-gray-200 px-7 py-3 w-full">
              <Image
                src="/icons/edit-photo.svg"
                alt="갤러리에서 선택"
                width={20}
                height={20}
              />
              <span>갤러리에서 선택</span>
            </button>
            <button className="modal-photo-remove flex items-center gap-3 border-b border-gray-200 px-7 py-3 w-full">
              <Image
                src="/icons/edit-remove.svg"
                alt="현재 사진 삭제"
                width={20}
                height={20}
              />
              <span>현재 사진 삭제</span>
            </button>
            <button className="modal-photo-cancel font-semibold text-[--color-primary] border-t border-gray-300 p-3 w-full">
              취소
            </button>
          </div>
        </div>
      </div>

      {/* ●●●●● ② 갤러리 사진 선택 modal 전체 레이어 */}
      <div
        id="gallery-modal"
        className="fixed inset-0 z-50 flex items-center justify-center hidden"
      >
        {/* ★ dim 추가 */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* 모달 카드 */}
        <div className="modal-gallery-wrap px-8 w-full relative z-10">
          <div className="modal-gallery-setter rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
            <h2 className="font-semibold border-b border-gray-200 py-4 w-full text-center text-gray-500 text-lg">
              갤러리에서 사진 선택
            </h2>
            <div className="relative w-full h-[160px] px-4 py-2">
              <Image
                src="/icons/photo-gallery.svg"
                alt="프로필 선택"
                fill
                className="object-contain"
              />
            </div>

            <div className="modal-gallery-actions flex items-center justify-between gap-3 w-full p-3">
              <button
                type="button"
                className="w-1/2 border border-gray-200 rounded-[5px] py-3 cursor-pointer"
              >
                취소
              </button>
              <button
                type="button"
                className="w-1/2 border border-[#003458] rounded-[5px] py-3 bg-[#003458] text-white cursor-pointer"
              >
                선택
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
