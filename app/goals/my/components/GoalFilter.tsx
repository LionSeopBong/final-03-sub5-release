"use client";
import { RecFilter } from "@/app/goals/types/my";
// import { useState } from "react";

export default function GoalFilter({ filter, setFilter }: RecFilter) {
  const TapClick = (tab: string) => {
    setFilter(tab);
  };

  const ChangeColor = (tab: string) => {
    const color = filter === tab ? "text-[#003458]" : "text-gray-400";
    return `${color}`;
  };
  return (
    <div className="flex w-full ">
      <button
        onClick={() => TapClick("전체")}
        className={`flex-1 py-4 relative ${ChangeColor("전체")}`}
      >
        전체
        {filter === "전체" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003458]" />
        )}
      </button>
      <button
        onClick={() => TapClick("진행중")}
        className={`flex-1 py-4 relative ${ChangeColor("진행중")}`}
      >
        진행중
        {filter === "진행중" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003458]" />
        )}
      </button>
      <button
        onClick={() => TapClick("미완료")}
        className={`flex-1 py-4 relative ${ChangeColor("미완료")}`}
      >
        미완료
        {filter === "미완료" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003458]" />
        )}
      </button>
      <button
        onClick={() => TapClick("완료")}
        className={`flex-1 py-4  relative ${ChangeColor("완료")}`}
      >
        완료
        {filter === "완료" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003458] " />
        )}
      </button>
    </div>
  );
}
