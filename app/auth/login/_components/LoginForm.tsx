import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  return (
    <form className="space-y-4">
      {/* 이메일 */}
      <div className="space-y-1">
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          className={[
            "w-full border-0 border-b-2 border-gray-300 px-1 py-3 text-base",
            "caret-primary focus:border-b-primary focus:outline-none",
          ].join(" ")}
        />
        {/* 에러 자리 (디자인 확인용) */}
        {/* <p className="text-xs text-error">이메일 형식이 올바르지 않아요.</p> */}
      </div>

      {/* 비밀번호 */}
      <div className="space-y-1">
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          className={[
            "w-full border-0 border-b-2 border-gray-300 px-1 py-3 text-base",
            "caret-primary focus:border-primary focus:outline-none",
          ].join(" ")}
        />
        {/* 에러 자리 (디자인 확인용) */}
        {/* <p className="text-xs text-error">
          비밀번호는 최소 6자 이상이어야 해요.
        </p> */}
      </div>

      {/* 서버 에러 자리 (디자인 확인용) */}
      {/* 
      <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2">
        <p className="text-sm text-error">로그인에 실패했어요.</p>
      </div>
      */}

      {/* 로그인 버튼 */}
      <button
        type="button"
        className="w-full rounded-2xl bg-primary px-3 py-2.5 text-lg font-semibold text-white"
        onClick={() => router.push("/home")}
      >
        로그인
      </button>

      <div className="mt-6 flex justify-center">
        <Link
          href="/auth/terms"
          className="text-sm font-semibold text-[#003458]"
        >
          이메일 회원가입
        </Link>
      </div>

      {/* 소셜 로그인 영역 */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-400" />
          <span className="text-xs font-normal text-black">
            다른 서비스 계정으로 로그인
          </span>
          <div className="h-px flex-1 bg-gray-400" />
        </div>

        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Google 로그인"
            className="h-9 w-9  flex items-center justify-center"
            onClick={() => alert("구글 로그인 연결 예정")}
          >
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={36}
              height={36}
              priority
            />
          </button>

          <button
            type="button"
            aria-label="Kakao 로그인"
            className="h-9 w-9 rounded-full bg-[#FEE500] flex items-center justify-center"
            onClick={() => alert("카카오 로그인 연결 예정")}
          >
            <Image
              src="/icons/kakao.svg"
              alt="카카오 로그인"
              width={34}
              height={34}
            />
          </button>
        </div>

        {/* 소셜 로그인 안내 문구 */}
        <p className="mt-8 px-4 text-center text-xs text-gray-500 leading-relaxed">
          SNS 계정으로 간편하게 가입하여 서비스를 이용할 수 있습니다.
          <br />
          <span className="text-red-500">
            기존 Sub.5 계정과 연동되지 않으니 이용에 참고하세요.
          </span>
        </p>
      </div>
    </form>
  );
}
