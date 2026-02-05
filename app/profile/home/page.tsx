"use client";

import Navi from "@/app/components/common/Navi";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
// import useUserStore from "@/zustand/user";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProfileHome() {
  // const { user, setUser } = useUserStore();
  // const isLogin = !!user;

  // ★★★★★★★★★★★★★★★★★ 개발용 로그인 모킹 (토큰을 강제로 하나 넣어줌 나중에 제거)

  const [isLogin, setIsLogin] = useState(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      return !!token;
    }
    return false;
  });

  // 매번 로그인 필요시마다 입력해서 사용
  // localStorage.setItem("accessToken", "mock-token");
  // location.reload();

  const [isLogoutOpen, setIsLogOutOpen] = useState(false);

  // ■■■■■■■■■■■■■■■■■■■■ 로그아웃 모달 오픈 함수
  const openLogoutModal = () => {
    setIsLogOutOpen(true);
  };

  // ■■■■■■■■■■■■■■■■■■■■ 로그아웃 처리 (임시)
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLogin(false);
    setIsLogOutOpen(false);
  };

  return (
    <>
      <ProfileHeader />

      {/* 로그아웃 상태 : 로그인 유도 화면 */}
      {!isLogin && (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] gap-6">
          <div className="mt-24 w-full max-w-[360px] mx-auto bg-[#f8f8f8] rounded-[20px] p-6 flex flex-col items-center gap-4">
            <Image
              src="/icons/profile-main.svg"
              alt="프로필 이미지"
              width={40}
              height={40}
            />

            <h3 className="font-semibold text-gray-700">로그인이 필요해요</h3>

            <p className="text-sm text-gray-500 text-center leading-relaxed">
              로그인 후 러닝 기록 확인과
              <br />
              게시글 작성 서비스를 이용할 수 있어요.
            </p>

            <Link
              href="/auth/login"
              className="mt-2 w-full text-center rounded-[12px] bg-[#003458] text-white py-3 font-semibold"
            >
              로그인하기
            </Link>
          </div>
        </main>
      )}

      {isLogin && (
        <>
          {/* 닉네임 + 수정 버튼 : area-profile */}
          <div className="area-profile p-4 m-2 flex items-center relative gap-8 pt-16">
            <Image
              src="/icons/profile-main.svg"
              alt="프로필 이미지"
              width={30}
              height={30}
            />
            <h3 className="font-semibold">닉네임</h3>
            <Link href="/profile/edit" className="ml-auto inline-flex">
              <button className="profile-edit ml-auto border border-gray-200 px-4 py-2 rounded-[30px] cursor-pointer">
                수정
              </button>
            </Link>
          </div>

          <main className="pb-16">
            {/* 러닝 요약 카드 영역 */}
            <div className="record-card bg-[#f8f8f8] p-4 mx-8 my-0 rounded-[20px]">
              <Link href="/records" className="cursor-pointer">
                <p className="pb-0.5 mb-4 border-b-2 border-b-gray-400 font-medium inline-block">
                  전체 기록 보기
                </p>
              </Link>
              <div className="flex items-center gap-0 m-2">
                <div className="record-runner flex-1 text-center min-w-0">
                  <div className="runner-icon flex items-center justify-center gap-2">
                    <Image
                      src="/icons/record-runner.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                    <p className="font-semibold">0.00 km</p>
                  </div>
                  <p>총 거리</p>
                </div>
                <div className="record-frequency flex-1 text-center min-w-0">
                  <div className="frequency-icon flex items-center justify-center gap-2 border-l-2 border-gray-400 ml-3">
                    <Image
                      src="/icons/record-frequency.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                    <p className="font-semibold">0 회</p>
                  </div>
                  <p>러닝 횟수</p>
                </div>
                <div className="record-calendar flex-1 text-center min-w-0">
                  <div className="calendar-icon flex items-center justify-center gap-2 border-l-2 border-gray-400 ml-3">
                    <Image
                      src="/icons/record-calendar.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                    <p className="font-semibold">0 일</p>
                  </div>
                  <p>활동일</p>
                </div>
              </div>
            </div>

            {/* 러닝지표, 내 게시글, 고객센터, 로그아웃 영역 */}
            <ul className="px-8 m-2">
              <li className="py-4 border-b border-gray-200 cursor-pointer">
                <Link
                  href="/profile/record"
                  className="flex items-center justify-between"
                >
                  내 러닝 지표
                  <Image
                    src="/icons/right-btn.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </Link>
              </li>
              <li className="py-4 border-b border-gray-200 cursor-pointer">
                <Link
                  href="/profile/board/my"
                  className="flex items-center justify-between"
                >
                  내 게시글
                  <Image
                    src="/icons/right-btn.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </Link>
              </li>
              <li className="py-4 border-b border-gray-200 cursor-pointer">
                <Link
                  href="/profile/board/inquiry-board"
                  className="flex items-center justify-between"
                >
                  고객센터
                  <Image
                    src="/icons/right-btn.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </Link>
              </li>
              <li className="py-4 border-b border-gray-200 cursor-pointer">
                <button
                  className="flex items-center justify-between w-full cursor-pointer"
                  onClick={openLogoutModal}
                >
                  로그아웃
                  <Image
                    src="/icons/right-btn.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </button>
              </li>
            </ul>
          </main>
        </>
      )}

      {/* ●●●●● 로그아웃 경고 모달 */}
      {isLogoutOpen && (
        <div
          id="logout-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* ★ dim 추가 */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          {/* 모달 카드 */}
          <div className="modal-logout-wrap px-8 w-full relative z-10">
            <div className="modal-logout-setter rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
              <div className="relative w-full h-[160px] px-4 py-2 flex flex-col items-center justify-center">
                <Image
                  src="/icons/logout.svg"
                  alt="프로필 선택"
                  width={64}
                  height={64}
                  className="object-contain"
                />
                <h2 className="mb-4 text-gray-600 font-bold text-xl">
                  로그아웃하시겠어요?
                </h2>
                <p className="text-gray-400 font-semibold mb-4">
                  로그아웃 시, 현재 세션이 종료됩니다.
                </p>
              </div>

              <div className="modal-gallery-actions flex items-center justify-between gap-3 w-full p-3">
                <button
                  type="button"
                  className="w-1/2 bg-gray-200 border border-gray-200 rounded-[5px] py-3 cursor-pointer"
                  onClick={() => setIsLogOutOpen(false)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="w-1/2 border border-[#003458] rounded-[5px] py-3 bg-[#003458] text-white cursor-pointer"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Navi />
    </>
  );
}
