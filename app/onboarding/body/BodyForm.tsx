"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { createUser, updateUser } from "@/actions/user";
import { useOnboardingStore } from "@/zustand/onboardingStore";
import useUserStore from "@/zustand/user";

import {
  calculateBmi,
  roundBmi,
  bmiLabel,
  validateHeight,
  validateWeight,
} from "@/app/lib/components/bmi";
import BodyButton from "@/app/onboarding/body/BodyButton";

export default function BodyForm() {
  const router = useRouter();

  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const accessToken = user?.token?.accessToken;

  const {
    mode,
    userId,
    name,
    email,
    password,
    image,
    gender,
    birthDate,
    reset,
  } = useOnboardingStore();

  const isSocial = mode === "oauth";

  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [heightError, setHeightError] = useState("");
  const [weightError, setWeightError] = useState("");

  const heightNum = Number(heightCm);
  const weightNum = Number(weightKg);

  const bmi = useMemo(() => {
    const hErr = validateHeight(heightNum);
    const wErr = validateWeight(weightNum);
    1;
    if (hErr || wErr) return null;

    return roundBmi(calculateBmi(heightNum, weightNum));
  }, [heightNum, weightNum]);

  const bmiText = bmi ? String(bmi) : "";
  const labelText = bmi ? bmiLabel(bmi) : "";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitted(true);

    const hErr = validateHeight(heightNum);
    const wErr = validateWeight(weightNum);

    setHeightError(hErr);
    setWeightError(wErr);

    if (hErr || wErr) return;

    // 소셜이면 PATCH만 (POST 절대 금지)
    if (isSocial) {
      if (!userId) {
        return;
      }
      if (!accessToken) {
        return;
      }

      const extraRes = user?.extra ?? {};

      const patchRes = await updateUser(userId, accessToken, {
        ...(image && { image }),
        name,
        extra: {
          ...extraRes,
          gender,
          birthDate,
          height: heightNum,
          weight: weightNum,
          onboardingDone: true,
        },
      });

      if (!patchRes || patchRes.ok !== 1) {
        alert(patchRes?.message ?? "신체 정보 저장에 실패했어요.");
        return;
      }

      // 서버에서 내려준 최신 user로 zustand 갱신
      if (patchRes && patchRes.item) {
        setUser({
          ...user, // 기존 토큰 유지
          ...patchRes.item, // name/image/extra 최신값 덮어쓰기
          token: user?.token,
        });
      }

      reset();
      router.replace("/home");
      return;
    }

    // // 이메일이면 POST(createUser)만
    const imagePath =
      image && image.startsWith("https") ? new URL(image).pathname : image;

    // blob면 서버에 저장 불가
    if (imagePath?.startsWith("blob:")) {
      return;
    }

    // 이메일이면 POST(createUser)만
    const fd = new FormData();
    fd.set("email", email ?? "");
    fd.set("password", password ?? "");
    fd.set("name", name ?? "");
    if (gender) fd.set("gender", gender);
    if (birthDate) fd.set("birthDate", birthDate);
    if (image) fd.set("image", image);
    fd.set("height", String(heightNum));
    fd.set("weight", String(weightNum));

    const signupRes = await createUser(null, fd);

    if (!signupRes || signupRes.ok !== 1) {
      alert(signupRes?.message ?? "회원가입에 실패했어요.");
      return;
    }

    reset();
    router.replace("/auth/login");
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Height */}
      <section className="mt-12">
        <p className="text-base font-semibold text-logText">키 (cm)</p>
        <div className="mt-3 rounded-full bg-white px-6 py-4 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
          <input
            name="height"
            value={heightCm}
            onChange={(e) => {
              setHeightCm(e.target.value.replace(/[^\d]/g, ""));
              if (submitted && heightError) setHeightError("");
            }}
            className="w-full bg-transparent focus:outline-none"
            inputMode="numeric"
            placeholder="예: 170"
          />
        </div>
        {submitted && heightError && (
          <p className="m-3 text-xs text-red-500">{heightError}</p>
        )}
      </section>

      {/* Weight */}
      <section className="mt-10">
        <p className="text-base font-semibold text-logText">몸무게 (kg)</p>
        <div className="mt-3 rounded-full bg-white px-6 py-4 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
          <input
            name="weight"
            value={weightKg}
            onChange={(e) => {
              setWeightKg(e.target.value.replace(/[^\d]/g, ""));
              if (submitted && weightError) setWeightError("");
            }}
            className="w-full bg-transparent focus:outline-none"
            inputMode="numeric"
            placeholder="예: 60"
          />
        </div>
        {submitted && weightError && (
          <p className="m-3 text-xs text-red-500">{weightError}</p>
        )}
      </section>

      {/* BMI */}
      <section className="mt-12">
        <p className="text-base font-semibold text-logText">
          나의 체질량 지수(BMI)
        </p>

        <p className="mt-4 text-sm font-medium text-gray-500">
          {bmiText}
          {labelText && <span className="ml-1">{labelText}</span>}
        </p>

        <div className="mt-5 h-px w-full bg-gray-300" />

        {/* BMI Card */}
        <div className="mt-8 rounded-2xl bg-[#EEF1F6] px-5 py-5">
          <div className="mb-3 flex items-center justify-between text-[10px] font-semibold text-primary">
            <span>저체중</span>
            <span>정상</span>
            <span>과체중</span>
            <span>비만</span>
            <span>고도비만</span>
          </div>

          <div className="mt-2">
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/70">
              <div className="absolute inset-y-0 left-0 w-[20%] bg-[#4DA3FF]" />
              <div className="absolute inset-y-0 left-[20%] w-[20%] bg-[#B9D857]" />
              <div className="absolute inset-y-0 left-[40%] w-[20%] bg-[#FFD54A]" />
              <div className="absolute inset-y-0 left-[60%] w-[20%] bg-[#FFB14A]" />
              <div className="absolute inset-y-0 left-[80%] w-[20%] bg-[#FF8B3D]" />
            </div>

            <div className="mt-4 flex justify-around text-[10px] font-medium text-gray-500 px-[10%]">
              <span>18.5</span>
              <span>23</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-right text-[12px] text-gray-500">
          <p>*출처 : 한국 비만학회</p>
          <Link
            href="https://www.kosso.or.kr"
            target="_blank"
            className="font-semibold text-[#2F63FF] underline underline-offset-2"
          >
            www.kosso.or.kr
          </Link>
        </div>
      </section>

      <BodyButton />
    </form>
  );
}
