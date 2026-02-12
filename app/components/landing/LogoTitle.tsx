"use client";
import StartButton from "@/app/components/landing/StartButton";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LogoTitle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          mounted
            ? "opacity-100 scale-100 blur-0"
            : "opacity-0 scale-110 blur-sm"
        }`}
      >
        <Image
          src="/images/landing-bg.png"
          alt="러닝 이미지"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/45" />

      {/* 콘텐츠 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-white text-center">
        <div
          className={`flex flex-col items-center transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* 로고 */}
          <Image
            src="/images/landing-logo.svg"
            alt="로고"
            priority
            width={140}
            height={100}
          />

          {/* 문구 */}
          <p
            className={`mt-6 max-w-xs text-xl leading-relaxed mx-auto transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            5분대 페이스로 완주하는 그날까지,
            <br />
            함께 달립니다
          </p>
        </div>
      </div>

      <StartButton mounted={mounted} />
    </section>
  );
}
