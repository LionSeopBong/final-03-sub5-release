"use client";

export default function CheckIcon({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "inline-flex h-6 w-6 items-center justify-center text-sm",
        on ? "text-logText" : "text-gray-300",
      ].join(" ")}
    >
      ✓
    </span>
  );
}
