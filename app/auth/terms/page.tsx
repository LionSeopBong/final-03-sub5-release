"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type TermKey = "service" | "privacy" | "location" | "marketing";

const TERM_META: Record<
  TermKey,
  { title: string; required: boolean; summary: string; body: string }
> = {
  service: {
    title: "서비스 이용약관",
    required: true,
    summary: "서비스 제공 및 이용 조건에 대한 내용입니다.",
    body: `여기에 서비스 이용약관 전문(또는 요약/더미 텍스트)을 넣으면 됩니다.
- 예: 계정, 서비스 이용 제한, 책임 범위 등`,
  },
  privacy: {
    title: "개인정보 수집 및 목적",
    required: true,
    summary: "개인정보를 왜/어떻게 쓰는지에 대한 내용입니다.",
    body: `여기에 개인정보 수집 및 목적 약관 내용을 넣으면 됩니다.
- 예: 수집 항목, 이용 목적, 보관 기간 등`,
  },
  location: {
    title: "위치기반 서비스 이용약관",
    required: true,
    summary: "위치 정보 사용 범위와 동의에 대한 내용입니다.",
    body: `여기에 위치기반 서비스 약관 내용을 넣으면 됩니다.
- 예: 위치정보 수집/이용, 제3자 제공 여부 등`,
  },
  marketing: {
    title: "광고성 정보 수신 동의",
    required: false,
    summary: "마케팅/혜택 안내 수신 동의에 대한 내용입니다.",
    body: `여기에 광고성 정보 수신 동의 약관 내용을 넣으면 됩니다.
- 예: 이메일/푸시 수신, 수신 거부 방법 등`,
  },
};

function TermsModal({
  open,
  title,
  summary,
  body,
  onClose,
}: {
  open: boolean;
  title: string;
  summary?: string;
  body: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center px-5"
      role="dialog"
      aria-modal="true"
    >
      {/* overlay */}
      <button
        type="button"
        aria-label="닫기"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* panel */}
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-xl">
        <div className="flex items-center justify-between px-6 pt-5">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100"
            aria-label="모달 닫기"
          >
            ✕
          </button>
        </div>

        {summary ? (
          <p className="px-6 pt-2 text-sm text-gray-500">{summary}</p>
        ) : null}

        <div className="px-6 py-4">
          <div className="max-h-[55vh] overflow-auto rounded-2xl bg-gray-50 p-4 text-sm text-gray-700 whitespace-pre-line">
            {body}
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-2xl bg-primary text-white font-semibold"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TermsPage() {
  const router = useRouter();

  const [checked, setChecked] = useState<Record<TermKey, boolean>>({
    service: false,
    privacy: false,
    location: false,
    marketing: false,
  });

  // ✅ 모달 상태
  const [openTerm, setOpenTerm] = useState<TermKey | null>(null);

  // ✅ 버튼 활성화: 필수 3개만 기준
  const requiredChecked = useMemo(() => {
    return checked.service && checked.privacy && checked.location;
  }, [checked]);

  // ✅ 전체 동의 체크표시: 4개 모두 true일 때만
  const allChecked = useMemo(() => {
    return (
      checked.service &&
      checked.privacy &&
      checked.location &&
      checked.marketing
    );
  }, [checked]);

  // ✅ 전체 동의 클릭: 4개 전부 체크/해제 토글
  const toggleAll = () => {
    setChecked({
      service: !allChecked,
      privacy: !allChecked,
      location: !allChecked,
      marketing: !allChecked,
    });
  };

  // ✅ 개별 토글
  const toggleOne = (key: TermKey) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 체크 UI
  const Check = ({ on, ariaLabel }: { on: boolean; ariaLabel: string }) => (
    <span
      aria-label={ariaLabel}
      className={[
        "inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm",
        on
          ? "border-primary bg-primary text-white"
          : "border-gray-300 text-gray-300",
      ].join(" ")}
    >
      ✓
    </span>
  );

  // 약관 한 줄 컴포넌트(체크 버튼 + 상세 버튼 분리)
  const TermRow = ({ termKey }: { termKey: TermKey }) => {
    const meta = TERM_META[termKey];
    const label = `${meta.title}${meta.required ? "(필수)" : "(선택)"}`;

    return (
      <li className="flex items-center justify-between">
        {/* ✅ 왼쪽: 체크 토글 */}
        <button
          type="button"
          onClick={() => toggleOne(termKey)}
          className="flex flex-1 items-center gap-3 text-left"
          aria-pressed={checked[termKey]}
        >
          <Check on={checked[termKey]} ariaLabel={`${label} 체크`} />
          <p className="text-sm text-gray-500">{label}</p>
        </button>

        {/* ✅ 오른쪽: 상세 보기(모달) */}
        <button
          type="button"
          onClick={() => setOpenTerm(termKey)}
          aria-label={`${label} 상세 보기`}
          className="ml-3 inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-50"
        >
          <Image
            src="/icons/arrow_forward.svg"
            alt=""
            width={20}
            height={20}
            className="opacity-40"
          />
        </button>
      </li>
    );
  };

  const modalData = openTerm ? TERM_META[openTerm] : null;

  return (
    <main className="min-h-screen bg-[#F5F6F8]">
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
          <h1 className="text-3xl font-extrabold tracking-tight">약관 동의</h1>
        </section>

        {/* 약관 동의 */}
        <section className="mt-8 flex-1">
          <div className="rounded-2xl bg-white px-6 py-8 shadow-sm flex h-full flex-col">
            {/* ✅ 전체 동의 */}
            <button
              type="button"
              onClick={toggleAll}
              className="flex w-full items-center gap-3 text-left"
              aria-pressed={allChecked}
            >
              <Check on={allChecked} ariaLabel="전체 동의 체크" />
              <p className="text-base text-gray-700">
                Sub.5 이용약관 전체 동의
              </p>
            </button>

            <div className="my-6 h-px w-full bg-gray-200" />

            <ul className="space-y-8">
              <TermRow termKey="service" />
              <TermRow termKey="privacy" />
              <TermRow termKey="location" />
              <TermRow termKey="marketing" />
            </ul>

            <p className="mt-auto pt-8 text-xs text-gray-400">
              필수 약관에 동의해야 서비스 이용이 가능합니다.
            </p>
          </div>
        </section>

        {/* ✅ 버튼: 필수 3개만 체크되면 활성화 */}
        <div className="pt-6 pb-8">
          <button
            type="button"
            disabled={!requiredChecked}
            onClick={() => router.push("/auth/signup")}
            className={[
              "h-14 w-full rounded-2xl text-base font-semibold flex items-center justify-center",
              requiredChecked
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed",
            ].join(" ")}
          >
            동의하고 시작하기
          </button>
        </div>
      </div>

      {/* ✅ 약관 상세 모달 */}
      <TermsModal
        open={openTerm !== null}
        title={modalData?.title ?? ""}
        summary={modalData?.summary}
        body={modalData?.body ?? ""}
        onClose={() => setOpenTerm(null)}
      />
    </main>
  );
}
