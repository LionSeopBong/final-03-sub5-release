"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useActionState, useEffect, useState } from "react";

import { login } from "@/actions/user";
import Alert from "@/app/components/ui/Alert";
import { validateLogin } from "@/app/lib/validation";
import useAlert from "@/hooks/useAlert";
import useUserStore from "@/zustand/user";
import SocialLoginButtons from "@/app/auth/login/_components/SocialLoginButtons";

export default function LoginForm() {
  const [userState, formAction] = useActionState(login, null);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  // password 숨김
  const [showPassword, setShowPassword] = useState(false);

  // 입력값 상태 (검증용)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Alert 로직 (분리 가능)
  const { open, message, openAlert, closeAlert } = useAlert();

  useEffect(() => {
    if (!userState) return;

    if (userState.ok === 1) {
      setUser(userState.item);
      alert(`${userState.item.name}님 로그인이 완료되었습니다.`);
      router.replace("/home");
      return;
    }

    if (userState.ok === 0) {
      openAlert(
        "이메일 또는 비밀번호가 올바르지 않습니다.\n다시 확인해주세요.",
      );
    }
  }, [userState, router, setUser, openAlert]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const emailTrim = email.trim();
    const passwordValue = password;

    const error = validateLogin(emailTrim, passwordValue);
    if (error) {
      openAlert(error);
      return;
    }
  };

  return (
    <>
      <Alert open={open} message={message} onClose={closeAlert} />

      <form
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        {/* 이메일 */}
        <div className="space-y-1">
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={[
              "w-full border-b-2 border-gray-300 px-1 py-3 text-base",
              "caret-primary focus:border-b-primary focus:outline-none focus:ring-0",
            ].join(" ")}
          />
        </div>

        {/* 비밀번호 */}
        <div className="relative space-y-1">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className={[
              "w-full border-b-2 border-gray-300 px-1 py-3 text-base",
              "caret-primary focus:border-b-primary focus:outline-none focus:ring-0",
            ].join(" ")}
          />

          {/* 비밀번호 보임/숨김 버튼 */}
          <button
            type="button"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <Image
                src="/icons/eye_off.svg"
                alt="숨김"
                width={20}
                height={20}
              />
            ) : (
              <Image src="/icons/eye.svg" alt="보임" width={20} height={20} />
            )}
          </button>
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="w-full rounded-2xl bg-primary px-3 py-2.5 text-lg font-semibold text-white"
        >
          로그인
        </button>

        <div className="mt-6 flex justify-center">
          <Link
            href="/auth/terms"
            className="text-sm font-semibold text-logText"
          >
            이메일 회원가입
          </Link>
        </div>

        <SocialLoginButtons />
      </form>
    </>
  );
}
