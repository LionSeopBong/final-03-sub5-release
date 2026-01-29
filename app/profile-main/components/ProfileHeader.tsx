// ■■■■■ profile 헤더 컴포넌트 ■■■■■

import Image from "next/image";

export default function ProfileHeader() {
  return (
    <div className="area-header p-4 my-3">
      <header className="app-header flex items-center gap-8 relative">
        <button className="back-btn" aria-label="뒤로가기">
          <Image
            src="/icons/back-btn.svg"
            alt="뒤로가기 버튼"
            width={24}
            height={24}
          />
        </button>
        <h2 className="font-pretendard profile-title text-xl font-semibold absolute left-1/2 -translate-x-1/2">
          프로필
        </h2>
      </header>
    </div>
  );
}
