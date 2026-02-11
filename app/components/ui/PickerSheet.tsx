"use client";

import Picker from "react-mobile-picker";
import type { PickerValue } from "react-mobile-picker";

type PickerSheetProps<T extends PickerValue> = {
  open: boolean;
  value: T;
  onClose: () => void;
  onConfirm: (v: T) => void;
  children: React.ReactNode;
};

export function PickerSheet<T extends PickerValue>({
  open,
  value,
  onClose,
  onConfirm,
  children,
}: PickerSheetProps<T>) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5">
        <div className="mb-4 flex justify-between">
          <button className="text-gray-400" onClick={onClose}>
            취소
          </button>
          <button
            className="font-semibold text-primary"
            onClick={() => onConfirm(value)}
          >
            완료
          </button>
        </div>

        <Picker value={value} onChange={onConfirm}>
          {children}
        </Picker>
      </div>
    </div>
  );
}
