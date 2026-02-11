"use client";

export default function ProfileButton({
  handleComplete,
}: {
  handleComplete: () => void;
}) {
  return (
    <div className="mt-12">
      <button
        type="button"
        onClick={handleComplete}
        className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white"
      >
        완료
      </button>
    </div>
  );
}
