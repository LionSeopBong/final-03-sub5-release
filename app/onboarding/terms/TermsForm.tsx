"use client";

import TermsDialog, { TermKey } from "@/app/components/ui/TermsDialog";
import CheckIcon from "@/app/onboarding/terms/CheckIcon";
import { useTerms } from "@/hooks/useTerms";
import { useOnboardingStore } from "@/zustand/onboardingStore";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TermsForm() {
  const router = useRouter();
  const social = useSearchParams();
  const from = social.get("from");

  const handleNext = () => {
    const onboarding = useOnboardingStore.getState();

    // 소셜이면 oauth로 고정 + userId는 SocialCallbackPage에서 이미 세팅됨
    if (from === "oauth") {
      onboarding.setMode("oauth"); // 안전장치(있어도 됨)
      router.replace("/onboarding/profile");
      return;
    }

    // 이메일이면 email로 고정 + 소셜 흔적 제거
    onboarding.setMode("email");

    router.replace("/auth/signup");
  };

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailKey, setDetailKey] = useState<TermKey | null>(null);

  const openDetail = (key: TermKey) => {
    setDetailKey(key);
    setDetailOpen(true);
  };

  const { checked, isRequiredAllChecked, isAllChecked, toggleAll, toggleOne } =
    useTerms();

  return (
    <main className="min-h-screen bg-[#F5F6F8]">
      <div className="mx-auto w-full max-w-md px-5">
        {/* 뒤로가기 bar */}
        <div className="flex h-12 items-center">
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
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* 제목 */}
        <section className="mt-2">
          <h1 className="text-3xl font-extrabold tracking-tight">약관 동의</h1>
        </section>

        {/* 약관 동의 */}
        <section className="mt-8 flex-1">
          <div className="flex h-full flex-col rounded-2xl bg-white px-6 py-8 shadow-sm">
            {/* 전체 동의 */}
            <button
              type="button"
              onClick={toggleAll}
              className="flex items-center gap-3 text-left"
            >
              <CheckIcon on={isAllChecked} />
              <p className="text-base text-gray-700">
                Sub.5 이용약관 전체 동의
              </p>
            </button>

            <div className="my-6 h-px w-full bg-gray-200" />

            {/* 리스트 */}
            <ul className="space-y-8">
              <li className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleOne("service")}
                  className="flex items-center gap-3 text-left"
                >
                  <CheckIcon on={checked.includes("service")} />
                  <p className="text-sm text-gray-500">서비스 이용약관(필수)</p>
                </button>

                <button
                  type="button"
                  aria-label="서비스 이용약관 상세보기"
                  onClick={() => openDetail("service")}
                  className="p-2 -mr-2"
                >
                  <Image
                    src="/icons/arrow_forward.svg"
                    alt=""
                    width={20}
                    height={24}
                    className="w-5 h-6"
                  />
                </button>
              </li>

              <li className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleOne("privacy")}
                  className="flex items-center gap-3 text-left"
                >
                  <CheckIcon on={checked.includes("privacy")} />
                  <p className="text-sm text-gray-500">
                    개인정보 수집 및 목적(필수)
                  </p>
                </button>

                <button
                  type="button"
                  aria-label="개인정보 수집 및 목적 상세보기"
                  onClick={() => openDetail("privacy")}
                  className="p-2 -mr-2"
                >
                  <Image
                    src="/icons/arrow_forward.svg"
                    alt=""
                    width={20}
                    height={24}
                    className="w-5 h-6"
                  />
                </button>
              </li>

              <li className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleOne("location")}
                  className="flex items-center gap-3 text-left"
                >
                  <CheckIcon on={checked.includes("location")} />
                  <p className="text-sm text-gray-500">
                    위치기반 서비스 이용약관(필수)
                  </p>
                </button>

                <button
                  type="button"
                  aria-label="위치기반 서비스 이용약관 상세보기"
                  onClick={() => openDetail("location")}
                  className="p-2 -mr-2"
                >
                  <Image
                    src="/icons/arrow_forward.svg"
                    alt=""
                    width={20}
                    height={24}
                    className="w-5 h-6"
                  />
                </button>
              </li>

              <li className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleOne("marketing")}
                  className="flex items-center gap-3 text-left"
                >
                  <CheckIcon on={checked.includes("marketing")} />
                  <p className="text-sm text-gray-500">
                    광고성 정보 수신 동의(선택)
                  </p>
                </button>
              </li>
            </ul>

            <p className="mt-auto pt-8 text-xs text-gray-400">
              필수 약관에 동의해야 서비스 이용이 가능합니다.
            </p>
          </div>
        </section>

        {/* 버튼 */}
        <div className="pt-6 pb-8">
          <button
            type="button"
            disabled={!isRequiredAllChecked}
            onClick={handleNext}
            className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white disabled:opacity-50"
          >
            동의하고 시작하기
          </button>
        </div>
      </div>
      {detailKey && (
        <TermsDialog
          open={detailOpen}
          termKey={detailKey}
          onClose={() => setDetailOpen(false)}
        />
      )}
    </main>
  );
}
