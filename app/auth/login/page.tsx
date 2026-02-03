"use client";

import LoginForm from "@/app/auth/login/_components/LoginForm";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-white ">
      <div className="mx-auto w-full max-w-md px-5 pb-10">
        {/* 뒤로가기 bar */}
        <div className="h-12 flex items-center">
          <Link href="/" className="p-2 -ml-2">
            {/* 뒤로가기 icon */}
            <Image
              src="/icons/arrow_back.svg"
              alt="뒤로가기"
              width={24}
              height={24}
              priority
            />
          </Link>
        </div>

        {/* 제목 */}
        <section className="mt-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome!</h1>
        </section>

        {/* 서브 title */}
        <p className="mt-4 text-sm leading-6 font-medium text-subTitle whitespace-pre-line">
          기록으로 완성되는 나만의 러닝{"\n"}
          분석된 데이터로 더 똑똑하게 달려요
        </p>

        <div className="mt-12">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
