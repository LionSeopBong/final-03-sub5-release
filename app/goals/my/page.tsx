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
  const { goals, setGoals, filter, setFilter } = useGoalsStore();
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
          <section className="">🌱초급 총 3개</section>
          {/* 중급: 🌿중급 총 5개 */}
          {/* 고급: 🌳고급 총 7개 */}
          {/* 통계를 가로로 배치 */}
          <GoalStats />
          <GoalFilter />
          <GoalCard />
        </div>
        <Modal />
      </main>
    </>
  );
}
