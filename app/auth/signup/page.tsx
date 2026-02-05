"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import SignupFooter from "@/app/auth/signup/SignupFooter";
import SignupForm from "@/app/auth/signup/SignupForm";

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
          <h1 className="text-4xl font-bold tracking-tight">Sign up</h1>
        </section>

        <SignupForm />
      </div>
    </main>
  );
}
