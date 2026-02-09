"use client";

import Modal from "../components/Modal";
import GoalStats from "@/app/goals/my/components/GoalStats";
import GoalFilter from "@/app/goals/my/components/GoalFilter";
import GoalCard from "@/app/goals/my/components/GoalCard";
import GoalHeader from "@/app/goals/my/components/GoalHeader";
import { useEffect } from "react"; // 추가!
import { getMyGoals } from "@/app/lib/goalsAPI"; // 추가!
import useUserStore from "@/zustand/user"; // 추가!

import useGoalsStore from "@/zustand/goals";
export default function GoalListPage() {
  const user = useUserStore((state) => state.user);
  const setGoals = useGoalsStore((state) => state.setGoals);

  const goals = useGoalsStore((state) => state.goals);
  const begLevel = goals.filter((goal) => goal.extra.level === "초급").length;
  const intLevel = goals.filter((goal) => goal.extra.level === "중급").length;
  const advLevel = goals.filter((goal) => goal.extra.level === "고급").length;
  useEffect(() => {
    const fetchGoals = async () => {
      if (user?.token) {
        const result = await getMyGoals(user.token.accessToken);
        setGoals(result.item); // API 응답 구조에 따라 다를 수 있음
      }
    };
    fetchGoals();
  }, [user]);
  return (
    <>
      <main className="flex flex-col items-center w-full py-6">
        <div
          className="w-full 
            min-w-[375px] 
            max-w-[767px]      
            md:max-w-[375px]   
            flex flex-col gap-4 px-4"
        >
          <GoalHeader />
          {begLevel > 0 && <section>🌱초급 총 {begLevel}개</section>}
          {intLevel > 0 && <section>🌿중급 총 {intLevel}개</section>}
          {advLevel > 0 && <section>🌳고급 총 {advLevel}개</section>}
          {/* 통계를 가로로 배치*/}
          <GoalStats />
          <GoalFilter />
          <GoalCard />
        </div>
        <Modal />
      </main>
    </>
  );
}
