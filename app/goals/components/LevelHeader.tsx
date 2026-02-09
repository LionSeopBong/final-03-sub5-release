"use client";
import useGoalsStore from "@/zustand/goals";

export default function LevelHeader() {
  const userLevel = useGoalsStore((state) => state.userLevel);
  return (
    <>
      {/* 탭 LevelIcon 상단 */}
      <section className="flex flex-col items-center">
        <span className="text-3xl"> {userLevel?.icon || "정보 없음"}</span>
        <span className="mb-6 text-2xl">당신의 러닝 레벨</span>
        <span className="inline-block px-4 py-1 mb-2 bg-[#1FC0CC] rounded-full text-xs text-notselectbtn">
          {userLevel?.level || "정보 없음"}
        </span>
      </section>
    </>
  );
}
