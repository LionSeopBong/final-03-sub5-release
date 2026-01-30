"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OnboardingProfilePage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh bg-[#F5F6F8]">
      <div className="mx-auto w-full max-w-md flex min-h-dvh flex-col">
        {/* Top bar */}
        <header className="h-12 bg-white flex items-center px-5 border-b border-black/5">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => router.back()}
            className=" -ml-3"
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
            프로필 설정
          </h1>

          {/* right spacer (센터 정렬 유지) */}
          <div className="w-10" />
        </header>

        {/* Content */}
        <div className="flex-1 px-5 pt-10">
          {/* Profile image */}
          <div className="flex justify-center">
            <div className="relative h-24 w-24 rounded-full bg-[#E9EAED] flex items-center justify-center">
              {/* avatar silhouette (없으면 이대로 배경만 써도 OK) */}
              <div className="h-10 w-10 rounded-full bg-black/15" />
              <div className="absolute top-[46px] h-12 w-14 rounded-t-full bg-black/15" />

              {/* camera badge */}
              <button
                type="button"
                aria-label="프로필 사진 변경"
                className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-[#2B2B2B] flex items-center justify-center"
              >
                <Image src="/icons/camera.svg" alt="" width={14} height={14} />
              </button>
            </div>
          </div>

          {/* Nickname */}
          <section className="mt-10">
            <p className="text-sm font-semibold text-[#003458]">닉네임</p>

            <div className="mt-3 rounded-2xl bg-white px-4 py-4">
              <input
                type="text"
                name="nickname"
                placeholder="닉네임을 입력하세요"
                className="w-full border-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>

            {/* 에러 문구 (디자인용으로 항상 노출) */}
            <p className="mt-3 text-xs leading-relaxed text-red-500">
              빈칸 일 경우 : 필수 입력 항목입니다.&nbsp;&nbsp; 이미 등록되어
              있는 닉네임 입니다.
              <br />
              입력 할 경우 : 2~16자로 입력해 주세요.(중복 불가)
            </p>
          </section>

          {/* Gender */}
          <section className="mt-8">
            <p className="text-sm font-semibold text-gray-900">성별</p>

            <div className="mt-3 grid grid-cols-2 gap-4">
              {/* 남성 (선택된 상태로 마크업) */}
              <button
                type="button"
                className="h-12 rounded-xl bg-[#E9EAED] px-4 flex items-center gap-3"
              >
                <span className="h-4 w-4 rounded-full border border-gray-500 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-gray-900" />
                </span>
                <span className="text-sm text-gray-900">남성</span>
              </button>

              {/* 여성 (미선택) */}
              <button
                type="button"
                className="h-12 rounded-xl bg-[#E9EAED] px-4 flex items-center gap-3"
              >
                <span className="h-4 w-4 rounded-full border border-gray-500" />
                <span className="text-sm text-gray-900">여성</span>
              </button>
            </div>
          </section>

          {/* Birth */}
          <section className="mt-8">
            <p className="text-sm font-semibold text-gray-900">생년월일</p>

            <div className="mt-3">
              <button
                type="button"
                className="h-12 w-full rounded-2xl bg-white px-5 flex items-center justify-between"
              >
                <span className="text-sm text-gray-700">1999-09-09</span>
                <Image
                  src="/icons/chevron-down.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="opacity-70"
                />
              </button>
            </div>
          </section>
        </div>

        {/* Bottom button */}
        <div className="px-5 py-8">
          <button
            type="button"
            className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white"
            onClick={() => router.push("/onboarding/body")}
          >
            완료
          </button>
        </div>
      </div>
    </main>
  );
}
