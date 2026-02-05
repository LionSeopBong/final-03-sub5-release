"use client";

export type TermKey = "service" | "privacy" | "location";

const TERM_DETAIL: Record<TermKey, { title: string; body: string }> = {
  service: {
    title: "서비스 이용약관(필수)",
    body: `본 약관은 서비스 이용과 관련하여 회사와 이용자 간의 권리·의무 및 책임사항, 기타 필요한 사항을 규정합니다.\n
          이용자는 본 약관에 동의함으로써 서비스가 제공하는 기능을 정상적으로 이용할 수 있으며, 약관에 명시된 이용 규칙을 준수해야 합니다.\n
          본 약관에 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다.`,
  },
  privacy: {
    title: "개인정보 수집 및 목적(필수)",
    body: `회사는 서비스 제공을 위해 최소한의 개인정보를 수집·이용합니다.\n
          수집된 개인정보는 회원 관리, 서비스 제공 및 개선, 고객 문의 대응 등의 목적에 한하여 사용되며, 관련 법령에 따라 안전하게 보호됩니다.\n
          이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으나, 동의하지 않을 경우 회원가입 및 서비스 이용이 제한될 수 있습니다.`,
  },
  location: {
    title: "위치기반 서비스 이용약관(필수)",
    body: `본 서비스는 이용자의 위치 정보를 기반으로 맞춤형 콘텐츠 및 기능을 제공할 수 있습니다.\n
          위치 정보는 서비스 제공 목적에 한하여 이용되며,
          이용자의 사전 동의 없이 제3자에게 제공되지 않습니다.\n
          이용자는 위치 정보 제공에 대한 동의를 거부할 수 있으나,
          동의하지 않을 경우 위치기반 서비스 이용이 제한될 수 있습니다.`,
  },
};

type Props = {
  open: boolean;
  termKey: TermKey;
  onClose: () => void;
};

export default function TermsDialog({ open, termKey, onClose }: Props) {
  if (!open) return null;

  const { title, body } = TERM_DETAIL[termKey];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* overlay */}
      <button
        type="button"
        aria-label="닫기"
        className="absolute inset-0 bg-black/40"
      />

      {/* 모달 */}
      <div
        tabIndex={-1}
        className="
          relative w-full max-w-md
          rounded-3xl bg-white p-6 shadow-xl
          outline-none
        "
      >
        {/* 제목 */}
        <div className="flex items-start justify-between">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        </div>

        {/* 내용 (스크롤 영역) */}
        <div className="mt-4 max-h-[60vh]  rounded-2xl bg-[#F5F6F8] p-4">
          <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
            {body}
          </p>
        </div>

        {/* 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
}
