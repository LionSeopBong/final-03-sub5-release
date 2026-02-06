"use client";
import { RecommendGoal } from "@/app/goals/types";
import { goalData } from "@/app/goals/types/recommend";
import { createGoal } from "@/app/lib/goalsAPI";
import useGoalsStore from "@/zustand/goals";
import useUserStore from "@/zustand/user";

import { useRouter } from "next/navigation";

export default function RecCard() {
  const level = useGoalsStore((state) => state.level);
  const filterGoals = goalData.filter((data) => data.level === level);
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const AddGoal = async (goal: RecommendGoal) => {
    if (!user) {
      alert("로그인이 필요합니다");
      return;
    }
    await createGoal(goal, user.token!.accessToken);
    router.push("/goals/my");
  };

  return (
    <>
      {filterGoals.map((goal) => (
        <article
          key={goal.id}
          onClick={() => AddGoal(goal)}
          className="border border-notselectbtn-border rounded-xl max-w-md min-w-93.75 gap-4 p-4 mb-3 cursor-pointer"
        >
          <h2 className="font-bold text-lg mb-2">{goal.title}</h2>
          <p className="text-gray-600 text-sm mb-1">{goal.subtitle}</p>
          <p className="text-gray-800">{goal.description}</p>
        </article>
      ))}
    </>
  );
}
