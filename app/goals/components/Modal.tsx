import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  showIcon?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({
  isOpen,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  showIcon = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-2xl bg-white p-6 shadow-xl w-[300px]">
        <div className="flex flex-col items-center gap-3 text-center">
          {showIcon && (
            <Image
              src="/icons/cele.svg"
              alt="모달 아이콘"
              width={60}
              height={60}
            />
          )}

          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-600">{message}</p>
          <div className="flex w-full gap-3">
            <button
              onClick={onCancel}
              className="flex-1 rounded-lg bg-gray-200 py-3 text-gray-700 font-semibold"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-lg bg-primary py-3 text-white font-semibold"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
