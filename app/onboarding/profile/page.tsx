"use client";

import ProfileForm from "@/app/onboarding/profile/ProfileForm";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#F5F6F8]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <header className="sticky top-0 z-10 h-12 backdrop-blur flex items-center px-5 border-b border-black/5">
          <h1 className="flex-1 text-center text-base font-semibold text-gray-900">
            프로필 설정
          </h1>
        </header>

        <ProfileForm />
      </div>
    </main>
  );
}
