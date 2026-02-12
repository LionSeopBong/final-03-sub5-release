"use client";

import Link from "next/link";

export default function StartButton({ mounted }: { mounted: boolean }) {
  return (
    <div className="fixed left-0 right-0 bottom-16 px-6 z-20">
      <Link
        href="/auth/login"
        className={`
          block w-full text-center
          py-4 rounded-2xl
          bg-primary text-white
          text-lg font-semibold
          shadow-xl
          transition-all duration-500 ease-out
          active:scale-95
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        러닝 시작하기
      </Link>

      <Link
        href="/auth/login"
        className="block text-center mt-4 text-sm text-white/70"
      >
        이미 회원이신가요? 로그인
      </Link>
    </div>
  );
}
