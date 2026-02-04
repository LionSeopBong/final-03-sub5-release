"use client";

import Image from "next/image";

type Props = {
  onGoogle?: () => void;
  onKakao?: () => void;
};

export default function SocialLoginButtons({ onGoogle, onKakao }: Props) {
  return (
    <div className="space-y-2 pt-2">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-400" />
        <span className="text-xs font-normal text-logText">
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
  );
}
