"use client";
import RecButton from "@/app/goals/recommend/components/RecButton";
import RecCard from "@/app/goals/recommend/components/RecCard";
import RecHeader from "@/app/goals/recommend/components/RecHeader";
import { getMyGoals } from "@/app/lib/goalsAPI";
import useGoalsStore from "@/zustand/goals";
import useUserStore from "@/zustand/user";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function RecommendContent() {
  const params = useSearchParams();
  const level = params.get("level");

  const leveling =
    level === "초급" || level === "중급" || level === "고급" ? level : "초급"; // 기본값

  const setLevel = useGoalsStore((state) => state.setLevel);
  const user = useUserStore((state) => state.user);
  const setGoals = useGoalsStore((state) => state.setGoals);

  useEffect(() => {
    setLevel(leveling);
  }, [leveling, setLevel]);

  useEffect(function () {
    async function fetchGoals() {
      if (user?.token) {
        const result = await getMyGoals(user.token.accessToken);
        setGoals(result.item);
      }
    }
    fetchGoals();
  }, [user]);
  return (
    <div
      className="flex flex-col items-center  mx-auto px-4 py-6 gap-4  min-w-[375px]
    max-w-[767px]
    md:max-w-[375px]"
    >
      <RecHeader />
      <RecCard />

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
