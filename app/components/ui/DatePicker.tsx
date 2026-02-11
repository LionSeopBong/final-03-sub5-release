"use client";

import Picker from "react-mobile-picker";

type PickerValue = {
  year: string;
  month: string;
  day: string;
};

type Props = {
  open: boolean;
  value: PickerValue;
  onClose: () => void;
  onChange: (v: PickerValue) => void; // 스크롤용
  onDone: (v: PickerValue) => void; // 완료용
};

export function DatePicker({ open, value, onClose, onChange, onDone }: Props) {
  if (!open) return null;

  const years = Array.from({ length: 50 }, (_, i) => String(1990 + i));
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );
  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* sheet */}
      <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5">
        {/* header */}
        <div className="mb-4 flex justify-between">
          <button onClick={onClose} className="text-gray-400">
            취소
          </button>

          <button
            className="font-semibold text-primary"
            onClick={() => onDone(value)}
          >
            완료
          </button>
        </div>

        <Picker value={value} onChange={onChange}>
          <Picker.Column name="year">
            {years.map((y) => (
              <Picker.Item key={y} value={y}>
                {y}
              </Picker.Item>
            ))}
          </Picker.Column>

          <Picker.Column name="month">
            {months.map((m) => (
              <Picker.Item key={m} value={m}>
                {m}
              </Picker.Item>
            ))}
          </Picker.Column>

          <Picker.Column name="day">
            {days.map((d) => (
              <Picker.Item key={d} value={d}>
                {d}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>
    </div>
  );
}
