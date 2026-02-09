"use client";

import Navi from "@/app/components/common/Navi";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import useUserStore from "@/zustand/user";
import Image from "next/image";
import { useState } from "react";

export default function ProfileRecord() {
  // zustand에서 사용자 데이터 가져오기
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // 신장, 체중 범위 스크롤
  const heightOptions = [];
  for (let i = 150; i <= 200; i++) {
    heightOptions.push(i);
  }
  const weightOptions = [];
  for (let i = 40; i <= 110; i++) {
    weightOptions.push(i);
  }

  // 신장, 체중 바텀시트
  const [isHeightSheetOpen, setIsHeightSheetOpen] = useState(false);
  const [isWeightSheetOpen, setIsWeightSheetOpen] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState(
    user?.extra?.height || 183,
  );
  const [selectedWeight, setSelectedWeight] = useState(
    user?.extra?.weight || 80,
  );
  const [tempHeight, setTempHeight] = useState(user?.extra?.height || 183); // 바텀시트에서 임시 선택
  const [tempWeight, setTempWeight] = useState(user?.extra?.weight || 80);

  const handleHeightConfirm = () => {
    setSelectedHeight(tempHeight); // 임시값 확정

    if (user) {
      setUser({ ...user, extra: { ...user.extra, height: tempHeight } });
    }
    setIsHeightSheetOpen(false);
  };

  const handleWeightConfirm = () => {
    setSelectedWeight(tempWeight); // 임시값 확정

    if (user) {
      setUser({ ...user, extra: { ...user.extra, weight: tempWeight } });
    }
    setIsWeightSheetOpen(false);
  };

  return (
    <>
      <ProfileHeader title="내 러닝 지표" />

      {/* 헤더 56px + 탭바 64px = 120px */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] pb-[64px]">
        <ul className="m-0 w-full">
          <li className="py-5 border-b border-gray-200 cursor-pointer">
            {/* --------------- 신장 버튼 --------------- */}
            <button
              className="flex items-center justify-between px-7 gap-2 w-full cursor-pointer"
              onClick={() => setIsHeightSheetOpen(true)}
            >
              <p className="basis-1/2 text-left shrink-0">신장</p>
              <p className="basis-1/2 text-left">{selectedHeight}</p>
              <Image src="/icons/right-btn.svg" alt="" width={16} height={16} />
            </button>
          </li>
          <li className="py-5 border-b border-gray-200 cursor-pointer">
            {/* --------------- 체중 버튼 --------------- */}
            <button
              className="flex items-center justify-between px-7 gap-2 w-full cursor-pointer"
              onClick={() => setIsWeightSheetOpen(true)}
            >
              <p className="basis-1/2 text-left shrink-0">체중</p>
              <p className="basis-1/2 text-left">{selectedWeight}</p>
              <Image src="/icons/right-btn.svg" alt="" width={16} height={16} />
            </button>
          </li>
        </ul>

        <ul className="m-0 w-full">
          <li className="py-5 border-b border-gray-200 cursor-default bg-gray-100">
            <button
              disabled
              className="flex items-center justify-between px-7 gap-2 w-full"
            >
              <p className="basis-1/2 text-left shrink-0">러닝 레벨</p>
              <p className="basis-1/2 text-left">초급</p>
              <Image
                src="/icons/right-btn.svg"
                className="opacity-0"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </li>
          <li className="py-5 border-b border-gray-200 cursor-default bg-gray-100">
            <button
              disabled
              className="flex items-center justify-between px-7 gap-2 w-full"
            >
              <p className="basis-1/2 text-left shrink-0">체질량 지수 (BMI)</p>
              <p className="basis-1/2 text-left">20.8 (정상)</p>
              <Image
                src="/icons/right-btn.svg"
                className="opacity-0"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </li>
        </ul>
      </section>

      <Navi />

      {/* ●●●●● ① 신장 cm 바텀시트 */}
      {isHeightSheetOpen && (
        <div id="height-modal" className="fixed inset-0 z-50">
          {/* ★ dim 추가 */}
          <div
            className="absolute inset-0 bg-black/50 z-0"
            onClick={() => setIsHeightSheetOpen(false)}
          ></div>

          {/* 모달 카드 */}
          <div className="modal-setter-wrap px-8 w-full z-10 fixed bottom-0 left-0 right-0">
            <div className="modal-photo-setter flex flex-col items-center justify-center rounded-t-[20px] mx-auto max-w-[760px] w-full bg-[#ffffff]">
              <h2 className="font-semibold border-b border-gray-200 p-3 w-full text-center text-[--color-gray-500] bg-[#f8f8f8] rounded-t-[20px]">
                신장 선택
              </h2>
              <ul className="w-full max-h-[200px] overflow-y-scroll">
                {heightOptions.map((height) => (
                  <li key={height}>
                    <button
                      className={`modal-height-action flex items-center justify-center gap-3 border-b border-gray-200 px-7 py-2 w-full ${tempHeight === height ? "bg-[#f8f8f8]" : ""}`}
                      onClick={() => setTempHeight(height)}
                    >
                      <span>{height}cm</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="modal-gallery-actions flex items-center justify-between gap-3 w-full p-3">
                <button
                  type="button"
                  className="w-1/2 border border-[--border-medium] rounded-[5px] py-1.5"
                  onClick={() => setIsHeightSheetOpen(false)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="w-1/2 border border-[--color-primary] rounded-[5px] py-1.5 bg-[#003458] text-[#ffffff]"
                  onClick={handleHeightConfirm}
                >
                  선택
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ●●●●● ② 체중 kg 바텀시트 */}
      {isWeightSheetOpen && (
        <div id="weight-modal" className="fixed inset-0 z-50">
          {/* ★ dim 추가 */}
          <div
            className="absolute inset-0 bg-black/50 z-0"
            onClick={() => setIsWeightSheetOpen(false)}
          ></div>

          {/* 모달 카드 */}
          <div className="modal-setter-wrap px-8 w-full z-10 fixed bottom-0 left-0 right-0">
            <div className="modal-photo-setter flex flex-col items-center justify-center rounded-t-[20px] mx-auto max-w-[760px] w-full bg-[#ffffff]">
              <h2 className="font-semibold border-b border-gray-200 p-3 w-full text-center text-[--color-gray-500] bg-[#f8f8f8] rounded-t-[20px]">
                체중 선택
              </h2>
              <ul className="w-full max-h-[200px] overflow-y-scroll">
                {weightOptions.map((weight) => (
                  <li key={weight}>
                    <button
                      className={`modal-weight-action flex items-center justify-center gap-3 border-b border-gray-200 px-7 py-2 w-full ${tempWeight === weight ? "bg-[#f8f8f8]" : ""}`}
                      onClick={() => setTempWeight(weight)}
                    >
                      <span>{weight}kg</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="modal-gallery-actions flex items-center justify-between gap-3 w-full p-3">
                <button
                  type="button"
                  className="w-1/2 border border-[--border-medium] rounded-[5px] py-1.5"
                  onClick={() => setIsWeightSheetOpen(false)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="w-1/2 border border-[--color-primary] rounded-[5px] py-1.5 bg-[#003458] text-[#ffffff]"
                  onClick={handleWeightConfirm}
                >
                  선택
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
