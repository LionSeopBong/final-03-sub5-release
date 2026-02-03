"use client";

import Navi from "@/app/components/common/Navi";
import fetchAPI from "@/app/lib/api";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import Image from "next/image";
import { useState } from "react";

export default function CreatePost() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  async function PostSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setErrorMessage("로그인이 필요합니다.");
      return;
    }

    try {
      await fetchAPI("/posts", {
        method: "POST",
        body,
        token,
      });
      setIsSubmitSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("일시적인 네트워크 오류가 발생했습니다.");
      }
    }
  }

  return (
    <>
      <ProfileHeader />
      <main className="pb-16">
        <div className="inquiry-wrapper m-4 px-4 py-6 flex flex-col gap-4 border border-gray-200 rounded-xl">
          <form onSubmit={PostSubmit} className="flex flex-col gap-4">
            {" "}
            <div className="inquiry-title-content flex flex-col gap-2">
              <label htmlFor="title" className="text-gray-500">
                <span className="text-[#e85c5c] px-2">*</span>문의 제목
              </label>

              <input type="hidden" name="type" value="inquiry" />
              <input
                name="title"
                id="title"
                type="text"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:border-gray-500"
                placeholder="문의 제목"
              />
              <p className="text-xs text-[#e85c5c] px-1.5">
                제목은 필수 입력 영역입니다.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="content" className="text-gray-500">
                <span className="text-[#e85c5c] px-2">*</span>문의 내용
              </label>
              <textarea
                name="content"
                id="content"
                placeholder="문의 내용을 작성해 주세요"
                className="w-full h-[180px] rounded-xl border border-gray-200 px-4 py-3 resize-none focus:outline-none focus:border-gray-500"
              />
              <p className="text-xs text-[#e85c5c] px-1.5">
                내용은 필수 입력 영역입니다.
              </p>
              {/* 🔥 에러 메시지 표시 위치 */}
              {errorMessage && (
                <p className="text-sm text-[#e85c5c]">{errorMessage}</p>
              )}
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-[#003458] py-3 text-white font-semibold disabled:bg-gray-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <Image
                src="/icons/chatbubble.svg"
                alt=""
                width={24}
                height={24}
              />
              문의 제출
            </button>
          </form>
        </div>
      </main>

      {/* ●●●●● 문의 제출 성공 시에만 렌더링되는 모달창 */}
      {isSubmitSuccess && (
        <div
          id="post-submit-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* ★ dim 추가 */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          {/* 모달 카드 */}
          <div className="post-submit-card px-8 w-full relative z-10">
            <div className="modal-photo-setter flex flex-col items-center justify-center rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
              <Image
                src="/icons/post-submitted.svg"
                alt=""
                width={65}
                height={65}
                className="my-4"
              />

              <div className="submit-alert items-center justify-center flex flex-col mb-4 pb-5">
                <h2 className="font-semibold w-full text-gray-600 text-lg">
                  문의 제출이 완료되었습니다.
                </h2>
                <p className="text-gray-400 text-left w-full font-semibold mt-2">
                  <span>문의 접수 후 처리는</span>
                  <br />
                  <span>영업일 기준 1~2일이 소요됩니다.</span>
                </p>
              </div>

              <button className="post-submit-btn font-semibold text-white border border-[#003458] bg-[#003458] rounded-b-[20px] p-3 w-full cursor-pointer">
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      <Navi />
    </>
  );
}
