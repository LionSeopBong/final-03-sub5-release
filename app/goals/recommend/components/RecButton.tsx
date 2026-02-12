"use client";
import { createGoal } from "@/app/lib/goalsAPI";
import useGoalsStore from "@/zustand/goals";
import useUserStore from "@/zustand/user";
import { useRouter } from "next/navigation";

export default function RecButton() {
  const selectedGoals = useGoalsStore((state) => state.selectedGoals);
  const setSelectedGoals = useGoalsStore((state) => state.setSelectedGoals);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  async function handleSave() {
    if (!user) {
      alert("로그인이 필요합니다");
      return;
    }

    if (selectedGoals.length === 0) {
      alert("목표를 선택해주세요");
      return;
    }

    // 선택된 목표들 하나씩 서버에 저장
    for (let i = 0; i < selectedGoals.length; i++) {
      await createGoal(selectedGoals[i], user.token!.accessToken);
    }

    // 저장 끝나면 선택 목록 비우기
    setSelectedGoals([]);

    // 내 목표 페이지로 이동
    router.push("/goals/my");
  }
  return (
    <button
      onClick={handleSave}
      className="flex flex-col items-center rounded-xl bg-primary text-notselectbtn max-w-md min-w-93.75 p-4 mb-3 cursor-pointer"
    >
      이 목표로 설정하기
    </button>
  );
}
