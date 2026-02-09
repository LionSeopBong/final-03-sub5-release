"use client";

export default function ProfileButton({
  handleComplete,
}: {
  handleComplete: () => void;
}) {
  return (
    <div className="pt-6">
      <button
        type="button"
        onClick={handleComplete}
        className="h-14 w-full rounded-2xl bg-primary text-white"
      >
        완료
      </button>
    </div>
  );
}
