"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import ProfileButton from "@/app/onboarding/profile/ProfileButton";
import {
  validateNickname,
  checkNickname,
} from "@/app/lib/components/validation";
import { useOnboardingStore } from "@/zustand/onboardingStore";
import { uploadFile } from "@/app/lib/file";

import { ActionSheet } from "@/app/components/ui/Alert";
import { DatePicker } from "@/app/components/ui/DatePicker";

const DEFAULT_AVATAR = "/icons/profile-main.svg";

function toImageUrl(apiUrl: string, pathUrl?: string) {
  if (!pathUrl) return DEFAULT_AVATAR;

  // blob 미리보기
  if (pathUrl.startsWith("blob:")) return pathUrl;

  // "/markethttps://..." 같이 붙어버려서 -> https부터 잘라 복구
  const urlIndex = pathUrl.indexOf("https://");
  if (urlIndex >= 0) return pathUrl.slice(urlIndex);

  // 이미 절대 URL(https)면 그대로
  if (pathUrl.startsWith("https://")) return pathUrl;

  // 상대경로면 API_URL 붙이기
  return `${apiUrl}${pathUrl}`;
}

export default function ProfileForm() {
  const router = useRouter();
  const setProfile = useOnboardingStore((s) => s.setProfile);

  // 화면에서 서버 이미지 보여줄 때만 사용
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  // DatePicker
  const [dateOpen, setDateOpen] = useState(false);
  const [pickerDate, setPickerDate] = useState({
    year: "1995",
    month: "01",
    day: "01",
  });

  // ActionSheet
  const [sheetOpen, setSheetOpen] = useState(false);

  // 이미지
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_AVATAR);
  const [imagePath, setImagePath] = useState<string | undefined>(undefined);
  // 업로드 중 중복 선택 방지
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // 폼
  const [nickName, setNickName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthDateError, setBirthDateError] = useState("");

  const [gender, setGender] = useState<"male" | "female">("male");

  const [submitted, setSubmitted] = useState(false);
  const [duplicateError, setDuplicateError] = useState("");

  const dupNickName = nickName.trim();

  const nicknameError = useMemo(
    () => (submitted ? validateNickname(dupNickName) : ""),
    [submitted, dupNickName],
  );

  // 액션시트 열릴 때 바디 스크롤 잠금
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  /**
   * 파일 선택 시 실행되는 함수
   * 흐름:
   * 1) blob URL로 즉시 미리보기
   * 2) 서버에 파일 업로드
   * 3) 성공 시 서버 path 저장 + 화면 URL 교체
   */

  // 파일 선택 -> blob 미리보기 + 서버 업로드(path 확보)
  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1) blob 미리보기 (서버 기다리지 않음))
    const blobUrl = URL.createObjectURL(file);
    setPreviewUrl(blobUrl);

    // 2) 업로드 시작
    try {
      // 서버 업로드
      setUploading(true);
      const res = await uploadFile(file);

      // ErrorRes 처리
      // 업로드 실패면 path 저장 안함
      if (res.ok !== 1) {
        // 미리보기는 유지

        setImagePath(undefined);
        return;
      }

      // 응답에 path가 없는 경우
      const path = res.item?.[0]?.path;
      if (!path) {
        alert("업로드 응답에 path가 없어요.");
        setImagePath(undefined);
        return;
      }

      /** 업로드 성공 */
      // store에는 path만 저장
      setImagePath(path);

      // 화면에 절대 URL로 변환해서 표시
      // 화면에 보여줄 값: API_URL + path 완전한 "URL"
      setPreviewUrl(toImageUrl(API_URL, path));
    } catch {
      setImagePath(undefined);
      // 미리보기 유지
    } finally {
      // 업로드 종료 처리
      setUploading(false);
      // 같은 파일 다시 선택 가능
      e.target.value = "";
    }
  };

  // 완료 버튼 클릭 시
  const handleComplete = async () => {
    setSubmitted(true);
    setDuplicateError("");

    const nickErr = validateNickname(dupNickName);
    if (nickErr) return;

    const check = await checkNickname(dupNickName);
    if (check) {
      setDuplicateError(check.message || "이미 사용 중인 닉네임입니다.");
      return;
    }

    // 생년월일 필수 검증 추가
    if (!birthDate) {
      setBirthDateError("생년월일을 선택해 주세요.");
    }
    if (!birthDate) return;

    // zustand store에 저장 (다음 페이지에서도 유지)
    setProfile({
      name: dupNickName,
      image: imagePath, // 서버 path 저장
      gender,
      birthDate,
    });

    router.replace("/onboarding/body");
  };

  return (
    <div className="flex-1 px-5">
      {/* 프로필 이미지 */}
      <section className="mt-6 flex justify-center ">
        <button
          type="button"
          onClick={() => {
            if (!uploading) setSheetOpen(true);
          }}
          className="relative w-24 h-24"
          aria-label="프로필 이미지 변경"
        >
          <Image
            src={previewUrl}
            alt="프로필 이미지"
            fill
            sizes="96px"
            className="rounded-full object-cover"
            priority
          />

          <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center">
            <Image
              src="/icons/profile-camera.svg"
              alt="프로필 이미지 변경"
              width={28}
              height={28}
            />
          </span>
        </button>
      </section>

      <input
        ref={fileRef}
        type="file"
        className="hidden"
        onChange={onChangeFile}
      />

      <ActionSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onAlbum={() => {
          setSheetOpen(false);
          requestAnimationFrame(() => fileRef.current?.click());
        }}
        onDefault={() => {
          setPreviewUrl(DEFAULT_AVATAR);
          setImagePath(undefined);
          setSheetOpen(false);
        }}
      />

      {/* 닉네임 */}
      <section className="mt-10">
        <p className="text-sm font-semibold text-logText">닉네임</p>

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
            className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        {duplicateError ? (
          <p className="m-3 text-xs text-red-500">{duplicateError}</p>
        ) : nicknameError ? (
          <p className="m-3 text-xs text-red-500">{nicknameError}</p>
        ) : null}
      </section>

      {/* 성별 */}
      <section className="mt-8">
        <p className="text-sm font-semibold text-logText">성별</p>

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
                <span className="h-2 w-2 rounded-full bg-primary" />
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
                <span className="h-2 w-2 rounded-full bg-primary" />
              ) : null}
            </span>
            <span className="text-sm text-gray-900">여성</span>
          </button>
        </div>
      </section>

      {/* 생년월일 */}
      <section className="mt-8">
        <p className="text-sm font-semibold text-logText">생년월일</p>

        <button
          type="button"
          onClick={() => setDateOpen(true)}
          className="mt-3 flex h-12 w-full items-center justify-between rounded-2xl bg-white px-5 ring-1 ring-black/5"
        >
          <span className={birthDate ? "text-gray-900" : "text-gray-400"}>
            {birthDate || "생년월일을 선택해 주세요"}
          </span>
        </button>
        {submitted && birthDateError ? (
          <p className="m-3 text-xs text-red-500">{birthDateError}</p>
        ) : null}
      </section>

      <DatePicker
        open={dateOpen}
        value={pickerDate}
        onClose={() => setDateOpen(false)}
        onChange={(v) => setPickerDate(v)}
        onDone={(v) => {
          setPickerDate(v);
          setBirthDate(`${v.year}-${v.month}-${v.day}`);
          setBirthDateError("");
          setDateOpen(false);
        }}
      />

      <ProfileButton handleComplete={handleComplete} />
    </div>
  );
}
