"use client";

import BodyForm from "@/app/onboarding/body/BodyForm";

export default function BodyPage() {
  return (
    <main className="min-h-dvh bg-[#F4F6FA]">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-10 pt-10">
        <h1 className="text-[34px] font-medium tracking-[-0.02em] text-primary">
          신체 정보 입력
        </h1>
        <BodyForm />
      </div>
    </main>
  );
}
