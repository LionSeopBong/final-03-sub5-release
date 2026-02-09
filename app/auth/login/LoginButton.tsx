import Link from "next/link";

export default function LoginButton({ isPending }: { isPending: boolean }) {
  return (
    <>
      {/* 로그인 버튼 */}
      <button
        type="submit"
        disabled={isPending}
        className={[
          "h-14 w-full rounded-2xl text-base font-semibold flex items-center justify-center gap-2",
          isPending
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white",
        ].join(" ")}
      >
        {isPending && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
        )}
        {isPending ? "로그인 중..." : "로그인"}
      </button>

      <div className="mt-6 flex justify-center">
        <Link
          href="/onboarding/terms"
          className="text-sm font-semibold text-logText"
        >
          이메일 회원가입
        </Link>
      </div>
    </>
  );
}
