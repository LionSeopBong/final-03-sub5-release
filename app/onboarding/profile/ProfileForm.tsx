"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import ProfileButton from "@/app/onboarding/profile/ProfileButton";
import { validateNickname, checkNickname } from "@/app/lib/components/nickname";
import { useOnboardingStore } from "@/zustand/onboardingStore";
import { useRouter } from "next/navigation";

const DEFAULT_AVATAR = "/images/avatar-default.png";

export default function ProfileForm() {
  const router = useRouter();
  const setProfile = useOnboardingStore((state) => state.setProfile);

  const [imagePath, setImagePath] = useState<string | undefined>(undefined);

  // 2) 닉네임
  const [nickName, setNickName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [duplicateError, setDuplicateError] = useState("");

  // 3) 성별
  const [gender, setGender] = useState<"male" | "female">("male");

  // 4) 생년월일
  const [birthDate, setBirthDate] = useState<string>("");

  // 5) 프로필 이미지

  // 닉네임 메시지: 제출 후에만 노출 (중복 에러가 최우선)
  const nicknameMessage = useMemo(() => {
    if (!submitted) return "";
    if (duplicateError) setDuplicateError("");

    const value = nickName.trim();
    const err = validateNickname(value); // ""(정상) or "에러 메시지"
    return err || "";
  }, [submitted, nickName, duplicateError]);

  // 제출 가능 조건
  const canSubmit = useMemo(() => {
    const value = nickName.trim();
    const nicknameOk = validateNickname(value) === "";
    const birthOk = /^\d{4}-\d{2}-\d{2}$/.test(birthDate);
    return nicknameOk && birthOk && !duplicateError;
  }, [nickName, birthDate, duplicateError]);

  const handleComplete = async () => {
    setSubmitted(true);
    setDuplicateError("");

    const value = nickName.trim();
    const err = validateNickname(value);
    if (err) return;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) return;

    // 서버 닉네임 중복 체크
    const check = await checkNickname(value);
    if (check) {
      setDuplicateError(check.message || "이미 사용 중인 닉네임입니다.");
      return;
    }

    setProfile({
      name: value, // 서버 필드가 name이면 name
      image: imagePath,
      gender,
      birthDate,
    });

    router.replace("/onboarding/body");

    // onComplete?.();
  };

  return (
    <div className="flex-1 px-5 pt-10">
      {/* hidden file input */}
      <label
        className="block text-gray-700 dark:text-gray-200 mb-2"
        htmlFor="attach"
      >
        프로필 이미지
      </label>

      <input
        type="file"
        id="attach"
        accept="image/*"
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
        name="attach"
      />

      {/* Profile image */}
      {/* <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setImageSheetOpen(true)}
          className="relative h-24 w-24 overflow-hidden rounded-full bg-[#E9EAED] ring-1 ring-black/5 shadow-sm"
          aria-label="프로필 이미지 옵션 열기"
        >
          <Image
            src={profileImageUrl}
            alt="프로필 이미지"
            fill
            className="object-cover"
          />
          <span className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#2B2B2B] shadow-md">
            <Image src="/icons/camera.svg" alt="" width={15} height={15} />
          </span>
        </button>
      </div> */}

      {/* 바텀시트 */}
      {/* {imageSheetOpen && (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="닫기"
            onClick={() => setImageSheetOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 space-y-3 rounded-t-3xl bg-white p-5">
            <button
              type="button"
              onClick={handlePickFromAlbum}
              className="h-12 w-full rounded-2xl bg-gray-100 text-sm font-semibold"
            >
              사진 앨범에서 선택
            </button>
            <button
              type="button"
              onClick={handleSetDefaultImage}
              className="h-12 w-full rounded-2xl bg-gray-100 text-sm font-semibold"
            >
              기본 이미지로 설정
            </button>
            <button
              type="button"
              onClick={() => setImageSheetOpen(false)}
              className="h-12 w-full rounded-2xl bg-white text-sm font-semibold text-gray-500"
            >
              취소
            </button>
          </div>
        </div>
      )} */}

      {/* 닉네임 */}
      <section className="mt-10">
        <p className="text-sm font-semibold text-[#003458]">닉네임</p>

        <div className="mt-3 rounded-2xl bg-white px-4 py-4 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-primary/60">
          <input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
              if (duplicateError) setDuplicateError("");
            }}
            maxLength={16}
            className="w-full border-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        {nicknameMessage ? (
          <p className="mt-2 text-xs text-red-500">{nicknameMessage}</p>
        ) : null}
      </section>

      {/* 성별 */}
      <section className="mt-8">
        <p className="text-sm font-semibold text-gray-900">성별</p>

        <div className="mt-3 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setGender("male")}
            className={[
              "flex h-12 items-center gap-3 rounded-xl px-4 transition active:scale-[0.99]",
              gender === "male"
                ? "bg-white ring-2 ring-primary/40"
                : "bg-[#E9EAED] ring-1 ring-black/5",
            ].join(" ")}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-500">
              {gender === "male" ? (
                <span className="h-2 w-2 rounded-full bg-gray-900" />
              ) : null}
            </span>
            <span className="text-sm text-gray-900">남성</span>
          </button>

          <button
            type="button"
            onClick={() => setGender("female")}
            className={[
              "flex h-12 items-center gap-3 rounded-xl px-4 transition active:scale-[0.99]",
              gender === "female"
                ? "bg-white ring-2 ring-primary/40"
                : "bg-[#E9EAED] ring-1 ring-black/5",
            ].join(" ")}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-500">
              {gender === "female" ? (
                <span className="h-2 w-2 rounded-full bg-gray-900" />
              ) : null}
            </span>
            <span className="text-sm text-gray-900">여성</span>
          </button>
        </div>
      </section>

      {/* 생년월일 */}
      <section className="mt-8">
        <p className="text-sm font-semibold text-gray-900">생년월일</p>

        <div className="mt-3 flex h-12 items-center justify-between rounded-2xl bg-white px-5 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-primary/60">
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"
          />
        </div>

        {submitted && !/^\d{4}-\d{2}-\d{2}$/.test(birthDate) ? (
          <p className="mt-2 text-xs text-red-500">생년월일을 선택해 주세요.</p>
        ) : null}
      </section>

      {/* 버튼은 canSubmit으로 비활성화 가능 */}
      <ProfileButton handleComplete={handleComplete} />
    </div>
  );
}
