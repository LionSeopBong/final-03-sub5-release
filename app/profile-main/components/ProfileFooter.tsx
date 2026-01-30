// ■■■■■ profile 푸터 컴포넌트 ■■■■■

import Image from "next/image";

export default function ProfileFooter() {
  return (
    <div className="profile-footer fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around gap-2 border border-gray-200 my-4 text-center bg-white">
      <div className="profile-footer-home flex flex-col items-center gap-0.5 ">
        <Image
          src="/icons/tab-home.svg"
          alt="탭바 홈 아이콘"
          width={24}
          height={24}
        />
        <p>홈</p>
      </div>
      <div className="profile-footer-record flex flex-col items-center gap-0.5">
        <Image
          src="/icons/tab-record.svg"
          alt="탭바 기록 아이콘"
          width={24}
          height={24}
        />
        <p>기록</p>
      </div>
      <div className="profile-footer-target flex flex-col items-center gap-0.5">
        <Image
          src="/icons/tab-target.svg"
          alt="탭바 목표 아이콘"
          width={24}
          height={24}
        />
        <p>목표</p>
      </div>
      <div className="profile-footer-profile flex flex-col items-center gap-0.5">
        <Image
          src="/icons/tab-profile.svg"
          alt="탭바 프로필 아이콘"
          width={24}
          height={24}
        />
        <p>프로필</p>
      </div>
    </div>
  );
}
