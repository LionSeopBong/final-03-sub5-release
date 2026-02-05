import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupFooter() {
  const router = useRouter();

  return (
    <div className="mt-auto pb-8 pt-10">
      <button
        type="submit"
        className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white"
      >
        계정 생성
      </button>

      <div className="mt-4 text-center text-xs text-primary">
        이미 회원이신가요?{" "}
        <Link href="/auth/login" className="font-semibold text-primary">
          로그인
        </Link>
      </div>
    </div>
  );
}
