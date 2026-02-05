"use client";

import Image from "next/image";

import { useActionState, useEffect, useRef, useState } from "react";

import SignupFooter from "./SignupFooter";
import { validateSignup } from "@/app/lib/validation/signup";
import { createUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/ui/Alert";
import useAlert from "@/hooks/useAlert";

export default function SignupForm() {
  const router = useRouter();

  // 서버 액션 연결
  const [state, formAction] = useActionState(createUser, null);

  // 입력값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 에러 문구
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  // 포커스용 ref
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  // password 숨김
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    open,
    message,
    onConfirm,
    showCancel,
    openAlert,
    openConfirm,
    closeAlert,
  } = useAlert();

  // 서버 응답 처리
  useEffect(() => {
    if (!state) return;

    if (state.ok === 1) {
      // 성공 → 프로필 설정 페이지로
      router.replace("/onboarding/profile");
      return;
    }

    if (state.ok === 0) {
      openAlert(state.message);
    }
  }, [state, router, openAlert]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setPasswordConfirmError("");

    const error = validateSignup({
      email,
      password,
      passwordConfirm,
    });

    if (error) {
      if (error.field === "email") {
        setEmailError(error.message);
        emailRef.current?.focus();
      } else if (error.field === "password") {
        setPasswordError(error.message);
        passwordRef.current?.focus();
      } else if (error.field === "passwordConfirm") {
        setPasswordConfirmError(error.message);
        passwordConfirmRef.current?.focus();
      }

      return;
    }
    openConfirm(
      `입력하신 계정으로\nSub.5 회원가입을 하시겠습니까?\n${email.trim()}`,
      () => {
        // 확인 눌렀을 때만 서버 저장
        const fd = new FormData();
        fd.set("email", email.trim());
        fd.set("password", password);

        formAction(fd);
      },
    );
  };

  return (
    <>
      <Alert
        open={open}
        message={message}
        onClose={closeAlert}
        onConfirm={onConfirm}
        showCancel={showCancel}
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-12 flex flex-1 flex-col"
      >
        <section className="space-y-8">
          {/* 이메일 */}
          <div className="space-y-2">
            <div className="relative">
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                w-full border-0 border-b-2 border-gray-300 px-1 py-3 pr-10 text-base
                focus:border-primary focus:outline-none"
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
                  className=""
                />
              </button>
            </div>
            {emailError && <p className="text-xs text-error">{emailError}</p>}
          </div>

          {/* 비밀번호 */}
          <div className=" space-y-2">
            <div className="relative">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
              w-full border-0 border-b-2 border-gray-300 px-1 py-3 text-base
            focus:border-primary focus:outline-none"
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
                  <Image
                    src="/icons/eye.svg"
                    alt="보임"
                    width={20}
                    height={20}
                  />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-xs text-error">{passwordError}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-2">
            <div className="relative">
              <input
                ref={passwordConfirmRef}
                type={showPasswordConfirm ? "text" : "password"}
                name="passwordConfirm"
                placeholder="비밀번호 재입력"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="
              w-full border-0 border-b-2 border-gray-300 px-1 py-3 text-base
            focus:border-primary focus:outline-none"
              />

              {/* 비밀번호 보임/숨김 버튼 */}
              <button
                type="button"
                aria-label={
                  showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 보기"
                }
                onClick={() => setShowPasswordConfirm((prev) => !prev)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPasswordConfirm ? (
                  <Image
                    src="/icons/eye_off.svg"
                    alt="숨김"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/icons/eye.svg"
                    alt="보임"
                    width={20}
                    height={20}
                  />
                )}
              </button>
            </div>
            {passwordConfirmError && (
              <p className="text-xs text-error">{passwordConfirmError}</p>
            )}
          </div>
        </section>

        <SignupFooter />
      </form>
    </>
  );
}
