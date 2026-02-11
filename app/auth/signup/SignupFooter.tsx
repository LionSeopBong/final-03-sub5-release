import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupFooter({ isPending }: { isPending: boolean }) {
  const router = useRouter();

  return (
    <div className="mt-auto pb-8 pt-10">
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
        {isPending ? "계정 생성 중..." : "계정 생성"}
      </button>

      <div className="mt-4 text-center text-xs text-logText">
        이미 회원이신가요?
        <span className="mx-1" />
        <Link href="/auth/login" className="font-semibold text-logText">
          로그인
        </Link>
      </div>
    </div>
  );
}
