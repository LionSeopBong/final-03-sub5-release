type Props = {
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  loadingText?: string;
};

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-5 w-5 animate-spin ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        fill="currentColor"
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
      />
    </svg>
  );
}

export default function BodyButton({
  loading = false,
  disabled = false,
  text = "완료",
  loadingText = "완료 중...",
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <div className="mt-auto pt-10">
      <button
        type="submit"
        disabled={isDisabled}
        aria-busy={loading}
        className={[
          "h-14 w-full rounded-full text-base font-semibold text-white",
          "bg-primary",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "flex items-center justify-center gap-2",
        ].join(" ")}
      >
        {loading && <Spinner />}
        <span>{loading ? loadingText : text}</span>
      </button>
    </div>
  );
}
