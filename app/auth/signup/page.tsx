"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-md px-5">
        {/* 뒤로가기 bar */}
        <div className="h-12 flex items-center">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => router.back()}
            className="p-2 -ml-2"
          >
            <Image
              src="/icons/arrow_back.svg"
              alt="뒤로가기"
              width={24}
              height={24}
              priority
            />
          </button>
        </div>

        {/* 제목 */}
        <section className="mt-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Sign up</h1>
        </section>

        {/* Form */}
        <section className="mt-12">
          <form className="space-y-8">
            {/* 이메일 */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="이메일"
                  className="
                    w-full border-0 border-b-2 border-gray-300 px-1 py-3 pr-10 text-base
                    caret-primary focus:border-primary focus:outline-none"
                />
                {/* 오른쪽 아이콘(지우기) - 마크업만 */}
                <button
                  type="button"
                  aria-label="이메일 지우기"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                >
                  <Image
                    src="/icons/close_circle.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              {/* 에러 자리(디자인용) */}
              <p className="text-xs text-error">
                이메일 형식에 맞지 않는 ID 입니다.
              </p>
            </div>

            {/* 비밀번호 */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  className="
                    w-full border-0 border-b-2 border-gray-300 px-1 py-3 pr-10 text-base caret-primary 
                    focus:border-primary focus:outline-none"
                />
                {/* 오른쪽 아이콘(보기) - 마크업만 */}
                <button
                  type="button"
                  aria-label="비밀번호 보기"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                >
                  <Image
                    src="/icons/eye_off.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </button>
              </div>

              {/* 에러 자리(디자인용) */}
              <p className="text-xs text-error">
                영문 숫자 특수기호 포함 8~16자로 입력해주세요.
              </p>
            </div>

            {/* 비밀번호 확인 */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="비밀번호 재입력"
                  className="
                    w-full border-0 border-b-2 border-gray-300 px-1 py-3 pr-10 text-base 
                    caret-primary focus:border-primary focus:outline-none"
                />
                {/* 오른쪽 아이콘(보기) - 마크업만 */}
                <button
                  type="button"
                  aria-label="비밀번호 확인 보기"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                >
                  <Image src="/icons/eye.svg" alt="" width={22} height={22} />
                </button>
              </div>

              {/* 에러 자리(디자인용) */}
              <p className="text-xs text-error">
                비밀번호가 일치하지 않습니다.
              </p>
            </div>
          </form>
        </section>

        {/* Bottom */}
        <div className="mt-auto pb-8 pt-10">
          <button
            type="button"
            className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white"
            onClick={() => router.push("/onboarding/profile")}
          >
            계정 생성
          </button>

          <div className="mt-4 text-center text-xs text-primary">
            이미 회원이신가요?{" "}
            <Link href="/auth/login" className="font-semibold text-primary">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
