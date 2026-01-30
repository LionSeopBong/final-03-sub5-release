"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OnboardingBodyPage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh bg-white">
      <div className="mx-auto w-full max-w-md flex min-h-dvh flex-col">
        {/* Top bar */}
        <header className="h-12 bg-white flex items-center px-5 border-b border-black/5">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => router.back()}
            className="p-2 -ml-2"
          >
            <Image
              src="/icons/arrow_back.svg"
              alt=""
              width={24}
              height={24}
              priority
            />
          </button>

          <h1 className="flex-1 text-center text-sm font-semibold text-gray-900">
            신체 정보 입력
          </h1>

          <div className="w-10" />
        </header>

        {/* Content */}
        <div className="flex-1 px-5 pt-8">
          {/* 키 */}
          <section>
            <p className="text-sm font-semibold text-[#003458]">키 (cm)</p>
            <div className="mt-3 rounded-2xl bg-white px-4 py-4">
              <input
                // type="number"
                // inputMode="numeric"
                placeholder="170"
                className="w-full border-0 bg-transparent text-sm text-gray-900 focus:outline-none"
              />
            </div>
          </section>

          {/* 몸무게 */}
          <section className="mt-6">
            <p className="text-sm font-semibold text-[#003458]">몸무게 (kg)</p>
            <div className="mt-3 rounded-2xl bg-white px-4 py-4">
              <input
                type="number"
                inputMode="numeric"
                placeholder="60"
                className="w-full border-0 bg-transparent text-sm text-gray-900 focus:outline-none"
              />
            </div>
          </section>

          {/* BMI */}
          <section className="mt-8">
            <p className="text-sm font-semibold text-[#003458]">
              나의 체질량 지수(BMI)
            </p>

            <p className="mt-2 text-sm text-gray-600">
              20.8{" "}
              <span className="text-xs text-gray-500">
                (현재 정상 체중입니다.)
              </span>
            </p>

            {/* BMI bar */}
            <div className="mt-4 rounded-2xl bg-[#EEF1F6] px-10 py-5">
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
                <span>저체중</span>
                <span>정상</span>
                <span>과체중</span>
                <span>비만</span>
                <span>고도비만</span>
              </div>

              <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="absolute inset-y-0 left-0 w-[20%] bg-[#4DA3FF]" />
                <div className="absolute inset-y-0 left-[20%] w-[20%] bg-[#35D07F]" />
                <div className="absolute inset-y-0 left-[40%] w-[20%] bg-[#FFD54A]" />
                <div className="absolute inset-y-0 left-[60%] w-[20%] bg-[#FF9A4A]" />
                <div className="absolute inset-y-0 left-[80%] w-[20%] bg-[#FF5A5A]" />
              </div>

              <div className="mt-2 flex justify-between text-[11px] text-gray-500">
                <span>18.5</span>
                <span>23</span>
                <span>25</span>
                <span>30</span>
              </div>
            </div>

            {/* 출처 */}
            <p className="mt-4 text-right text-[11px] text-gray-500">
              *출처 : 한국비만학회
              <br />
              <a
                href="https://www.kosso.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#003458] underline"
              >
                www.kosso.or.kr
              </a>
            </p>
          </section>
        </div>

        {/* 버튼 */}
        <div className="px-5 py-8">
          <button
            type="button"
            className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white"
            onClick={() => router.push("/auth/login")}
          >
            완료
          </button>
        </div>
      </div>
    </main>
  );
}
