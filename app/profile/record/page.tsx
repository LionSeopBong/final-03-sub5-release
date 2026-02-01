import ProfileFooter from "@/app/profile/components/ProfileFooter";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import Image from "next/image";

export default function ProfileRecord() {
  return (
    <>
      <ProfileHeader />

      {/* 헤더 56px + 탭바 64px = 120px */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] pb-[64px]">
        <ul className="m-0 w-full">
          <li className="py-5 border-b border-gray-200 cursor-pointer">
            <button className="flex items-center justify-between px-7 gap-2 w-full cursor-pointer">
              <p className="basis-1/2 text-left shrink-0">신장</p>
              <p className="basis-1/2 text-left">183cm</p>
              <Image src="/icons/right-btn.svg" alt="" width={16} height={16} />
            </button>
          </li>
          <li className="py-5 border-b border-gray-200 cursor-pointer">
            <button className="flex items-center justify-between px-7 gap-2 w-full cursor-pointer">
              <p className="basis-1/2 text-left shrink-0">체중</p>
              <p className="basis-1/2 text-left">80kg</p>
              <Image src="/icons/right-btn.svg" alt="" width={16} height={16} />
            </button>
          </li>
        </ul>

        <ul className="m-0 w-full">
          <li className="py-5 border-b border-gray-200 cursor-default bg-gray-100">
            <button
              disabled
              className="flex items-center justify-between px-7 gap-2 w-full"
            >
              <p className="basis-1/2 text-left shrink-0">러닝 레벨</p>
              <p className="basis-1/2 text-left">초급</p>
              <Image
                src="/icons/right-btn.svg"
                className="opacity-0"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </li>
          <li className="py-5 border-b border-gray-200 cursor-default bg-gray-100">
            <button
              disabled
              className="flex items-center justify-between px-7 gap-2 w-full"
            >
              <p className="basis-1/2 text-left shrink-0">체질량 지수 (BMI)</p>
              <p className="basis-1/2 text-left">20.8 (정상)</p>
              <Image
                src="/icons/right-btn.svg"
                className="opacity-0"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </li>
        </ul>
      </section>

      <ProfileFooter />

      {/* ●●●●● ① 신장 cm 바텀시트 */}
      <div id="height-modal" className="fixed inset-0 z-50 hidden">
        {/* ★ dim 추가 */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* 모달 카드 */}
        <div className="modal-setter-wrap px-8 w-full z-10 fixed bottom-0 left-0 right-0">
          <div className="modal-photo-setter flex flex-col items-center justify-center rounded-t-[20px] mx-auto max-w-[760px] w-full bg-[#ffffff]">
            <h2 className="font-semibold border-b border-gray-200 p-3 w-full text-center text-[--color-gray-500] bg-[--bg-secondary] rounded-t-[20px]">
              신장 선택
            </h2>
            <ul className="w-full">
              <li>
                <button className="modal-photo-action flex items-center justify-center gap-3 border-b border-gray-200 px-7 py-2 w-full">
                  <span>160cm</span>
                </button>
              </li>
              <li>
                <button className="modal-photo-select flex items-center justify-center gap-3 border-b border-gray-200 px-7 py-2 w-full text-center">
                  <span>161cm</span>
                </button>
              </li>
              <li>
                <button className="modal-photo-remove flex items-center justify-center gap-3 border-b border-gray-200 px-7 py-2 w-full">
                  <span>162cm</span>
                </button>
              </li>
              <li>
                <button className="modal-photo-remove flex items-center justify-center gap-3 border-b border-gray-200 px-7 py-2 w-full">
                  <span>163cm</span>
                </button>
              </li>
            </ul>

            <div className="modal-gallery-actions flex items-center justify-between gap-3 w-full p-3">
              <button
                type="button"
                className="w-1/2 border border-[--border-medium] rounded-[5px] py-1.5"
              >
                취소
              </button>
              <button
                type="button"
                className="w-1/2 border border-[--color-primary] rounded-[5px] py-1.5 bg-[--color-primary] text-[--color-white]"
              >
                선택
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ●●●●● ② 체중 kg 바텀시트 */}
      <div id="weight-modal" className="fixed inset-0 z-50 hidden">
        {/* ★ dim 추가 */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* 모달 카드 */}
        <div className="modal-setter-wrap px-8 w-full z-10 fixed bottom-0 left-0 right-0">
          <div className="modal-photo-setter flex flex-col items-center justify-center rounded-t-[20px] mx-auto max-w-[760px] w-full bg-[#ffffff]">
            <h2 className="font-semibold border-b border-gray-200 p-3 w-full text-center text-[--color-gray-500] bg-[--bg-secondary] rounded-t-[20px]">
              체중 선택
            </h2>
            <ul className="w-full">
              <li>
                <button className="modal-photo-action flex items-center justify-center gap-3 border-b border-gray-200 px-7 py-2 w-full">
                  <span>50kg</span>
                </button>
              </li>
              <li>
                <button className="modal-photo-select flex items-center justify-center gap-3 border-b border-gray-200 px-7 py-2 w-full text-center">
                  <span>51kg</span>
                </button>
              </li>
              <li>
                <button className="modal-photo-remove flex items-center justify-center gap-3 border-b border-gray-200 px-7 py-2 w-full">
                  <span>52kg</span>
                </button>
              </li>
              <li>
                <button className="modal-photo-remove flex items-center justify-center gap-3 border-b border-gray-200 px-7 py-2 w-full">
                  <span>53kg</span>
                </button>
              </li>
            </ul>

            <div className="modal-gallery-actions flex items-center justify-between gap-3 w-full p-3">
              <button
                type="button"
                className="w-1/2 border border-[--border-medium] rounded-[5px] py-1.5"
              >
                취소
              </button>
              <button
                type="button"
                className="w-1/2 border border-[--color-primary] rounded-[5px] py-1.5 bg-[--color-primary] text-[--color-white]"
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
