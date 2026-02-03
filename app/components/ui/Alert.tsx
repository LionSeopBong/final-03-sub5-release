"use client";

type Props = {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
};

export default function Alert({
  open,
  title = "알림",
  message,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* 알림 박스 */}
      <div className="relative w-80 rounded-xl bg-white p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">
          {message}
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-primary py-2 text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
}
