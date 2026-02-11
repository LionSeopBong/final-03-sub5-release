"use client";

type Props = {
  open: boolean; // 열릴지 말지
  title?: string; // 제목 (기본: 알림)
  message: string; // 본문
  onClose: () => void; // 닫기
  confirmText?: string; // 확인 버튼 텍스트
  cancelText?: string; // 취소 버튼 텍스트
  onConfirm?: () => void; // confirm 모드일 때 실행할 함수
  showCancel?: boolean; // 취소 버튼 보여줄지
};

export default function Alert({
  open,
  title = "알림",
  message,
  onClose,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  showCancel = false,
}: Props) {
  if (!open) return null;

  // 이 Alert가 단순 알림인지 아니면 확인 후 행동이 필요한 confirm인지 스스로 판단하는 스위치
  // onConfirm은 optional(?) 이라서 undefined일 수도 있고 함수일 수도 있다.
  // 따라서 typeof로 함수인지 아닌지 체크해서 boolean 값으로 변환
  const isConfirm = typeof onConfirm === "function";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
    >
      <button
        aria-label="닫기"
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          if (!isConfirm) onClose(); // confirm일 땐 바깥 클릭 막기
        }}
        type="button"
      />

      <div className="relative w-full max-w-sm rounded-3xl bg-white px-6 py-5 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">
          {message}
        </p>

        <div className="mt-5 flex gap-2">
          {/* onConfirm도 있고 showCancel도 true일 때만 “취소” 버튼 보여주기 */}
          {isConfirm && showCancel ? (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl bg-gray-200 py-3 text-sm font-semibold text-gray-900"
            >
              {cancelText}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => {
              onClose(); // 먼저 닫고
              if (isConfirm) onConfirm(); // 그 다음 실행
            }}
            className="flex-1 rounded-2xl bg-primary py-3 text-sm font-semibold text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ActionSheet({
  open,
  onClose,
  onDefault,
  onAlbum,
}: {
  open: boolean;
  onClose: () => void;
  onDefault: () => void;
  onAlbum: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/35"
        aria-label="닫기"
        onClick={onClose}
      />

      {/* sheet */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
        <div className="translate-y-0 animate-sheet-up space-y-3">
          {/* 그룹 1: 액션들 */}
          <div className="rounded-3xl bg-[#F2F2F7] p-3 shadow-xl ring-1 ring-black/10">
            <button
              type="button"
              onClick={onDefault}
              className="h-14 w-full rounded-2xl bg-white text-base font-semibold text-gray-900 active:scale-[0.99]"
            >
              기본 이미지 선택
            </button>

            <div className="my-3 h-px bg-black/10" />

            <button
              type="button"
              onClick={onAlbum}
              className="h-14 w-full rounded-2xl bg-white text-base font-semibold text-gray-900 active:scale-[0.99]"
            >
              앨범에서 선택
            </button>
          </div>

          {/* 그룹 2: 취소 (분리) */}
          <button
            type="button"
            onClick={onClose}
            className="h-14 w-full rounded-3xl bg-white text-base font-semibold text-gray-900 shadow-xl ring-1 ring-black/10 active:scale-[0.99]"
          >
            취소
          </button>
        </div>
      </div>

      {/* animation keyframes */}
      <style jsx>{`
        @keyframes sheetUp {
          from {
            transform: translateY(16px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-sheet-up {
          animation: sheetUp 140ms ease-out;
        }
      `}</style>
    </div>
  );
}
