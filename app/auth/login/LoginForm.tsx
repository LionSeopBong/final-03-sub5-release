"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useActionState, useEffect, useRef, useState } from "react";

import { login } from "@/actions/user";
import Alert from "@/app/components/ui/Alert";

import useUserStore from "@/zustand/user";
import { validateLogin } from "@/app/lib/components/login";
import SocialLoginButtons from "@/app/auth/login/SocialLoginButtons";
import LoginButton from "@/app/auth/login/LoginButton";
import useAlert from "@/hooks/useAlert";

export default function LoginForm() {
  const [userState, formAction, isPending] = useActionState(login, null);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  // email ref : x 눌렀을 때 커서르 다시 이메일 두기 위해 사용.
  const emailRef = useRef<HTMLInputElement | null>(null);
  // password 숨김
  const [showPassword, setShowPassword] = useState(false);

  // 입력값 상태 (검증용)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Alert 로직 (분리 가능)
  const { open, message, openAlert, closeAlert } = useAlert();

  useEffect(() => {
    if (userState?.ok === 1) {
      closeAlert();
      setUser(userState.item);
      router.replace("/home");
      return;
    }
    if (userState?.ok === 0) {
      openAlert(
        userState.message ??
          "이메일 또는 비밀번호가 올바르지 않습니다.\n다시 확인해주세요.",
      );
    }
  }, [userState, setUser, router, openAlert]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const emailTrim = email.trim();
    const error = validateLogin(emailTrim, password);
    if (error) {
      e.preventDefault();
      openAlert(error);
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
        <div className="relative space-y-1">
          <input
            ref={emailRef}
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

          <button
            type="button"
            aria-label="이메일 지우기"
            className={[
              "absolute right-0 top-1/2 -translate-y-1/2 p-2 transition-opacity",
              email.length > 0
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            ].join(" ")}
            onClick={() => {
              setEmail("");
              emailRef.current?.focus();
            }}
          >
            <Image
              src="/icons/close_circle.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* 비밀번호 */}
        <div className="relative space-y-1">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            autoComplete="current-password"
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

        <LoginButton isPending={isPending} />

        <SocialLoginButtons />
      </form>
    </>
  );
}
