import Footer from "@/app/components/common/Footer";
import Header from "@/app/components/common/Header";
import Navi from "@/app/components/common/Navi";
import Image from "next/image";

export default function ProfileHome() {
  return (
    <>
      <Header />

      {/* 닉네임 + 수정 버튼 : area-profile */}
      <div className="area-profile p-4 m-2 flex items-center relative gap-8 pt-16">
        <Image
          src="/icons/profile-main.svg"
          alt="프로필 이미지"
          width={30}
          height={30}
        />
        <h3 className="font-semibold">닉네임</h3>
        <button className="profile-edit ml-auto border border-gray-200 px-4 py-2 rounded-[30px]">
          수정
        </button>
      </div>

      <main>
        {/* 러닝 요약 카드 영역 */}
        <div className="record-card bg-[#f8f8f8] p-4 mx-8 my-0 rounded-[20px]">
          <a className="cursor-pointer">
            <p className="pb-0.5 mb-4 border-b-2 border-b-gray-400 font-medium inline-block">
              전체 기록 보기
            </p>
          </a>
          <div className="flex items-center gap-0 m-2">
            <div className="record-runner flex-1 text-center min-w-0">
              <div className="runner-icon flex items-center justify-center gap-2">
                <Image
                  src="/icons/record-runner.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <p className="font-semibold">0.00 km</p>
              </div>
              <p>총 거리</p>
            </div>
            <div className="record-frequency flex-1 text-center min-w-0">
              <div className="frequency-icon flex items-center justify-center gap-2 border-l-2 border-gray-400 ml-3">
                <Image
                  src="/icons/record-frequency.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <p className="font-semibold">0 회</p>
              </div>
              <p>러닝 횟수</p>
            </div>
            <div className="record-calendar flex-1 text-center min-w-0">
              <div className="calendar-icon flex items-center justify-center gap-2 border-l-2 border-gray-400 ml-3">
                <Image
                  src="/icons/record-calendar.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <p className="font-semibold">0 일</p>
              </div>
              <p>활동일</p>
            </div>
          </div>
        </div>

        {/* 러닝지표, 내 게시글, 고객센터, 로그아웃 영역 */}
        <ul className="px-8 m-2">
          <li className="py-4 border-b border-gray-200 cursor-pointer">
            <a className="flex items-center justify-between">
              내 러닝 지표
              <Image src="/icons/right-btn.svg" alt="" width={16} height={16} />
            </a>
          </li>
          <li className="py-4 border-b border-gray-200 cursor-pointer">
            <a className="flex items-center justify-between">
              내 게시글
              <Image src="/icons/right-btn.svg" alt="" width={16} height={16} />
            </a>
          </li>
          <li className="py-4 border-b border-gray-200 cursor-pointer">
            <a className="flex items-center justify-between">
              고객센터
              <Image src="/icons/right-btn.svg" alt="" width={16} height={16} />
            </a>
          </li>
          <li className="py-4 border-b border-gray-200 cursor-pointer">
            <a className="flex items-center justify-between">
              로그아웃
              <Image src="/icons/right-btn.svg" alt="" width={16} height={16} />
            </a>
          </li>
        </ul>
      </main>

      <Footer />
      <Navi />
    </>
  );
}
