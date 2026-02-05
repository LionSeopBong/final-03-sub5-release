"use client";
import RecButton from "@/app/goals/recommend/components/RecButton";
import RecCard from "@/app/goals/recommend/components/RecCard";
import RecHeader from "@/app/goals/recommend/components/RecHeader";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function RecommendContent() {
  const params = useSearchParams();
  const level = params.get("level");

  const leveling =
    level === "초급" || level === "중급" || level === "고급" ? level : "초급"; // 기본값

  return (
    <div
      className="flex flex-col items-center  mx-auto px-4 py-6 gap-4  min-w-[375px]
    max-w-[767px]
    md:max-w-[375px]"
    >
      <RecHeader level={leveling} />
      <RecCard level={leveling} />

      <RecButton />
    </div>
  );
}

export default function MyGoalsPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <RecommendContent />
    </Suspense>
  );
}
