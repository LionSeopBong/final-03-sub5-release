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
        onClick={onClose}
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
              if (isConfirm) onConfirm();
              else onClose();
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
