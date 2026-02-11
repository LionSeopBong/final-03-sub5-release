// ■■■■■ profile 헤더 컴포넌트 ■■■■■
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  title: string;
}

export default function ProfileHeader({ title }: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className="area-header p-4 my-3">
      <header className="app-header flex items-center gap-8 relative">
        <button
          className="back-btn cursor-pointer"
          aria-label="뒤로가기"
          onClick={() => router.back()}
        >
          <Image
            src="/icons/back-btn.svg"
            alt="뒤로가기 버튼"
            width={24}
            height={24}
          />
        </button>
        <h2 className="font-pretendard profile-title text-xl font-semibold absolute left-1/2 -translate-x-1/2">
          {title}
        </h2>
      </header>
    </div>
  );
}
