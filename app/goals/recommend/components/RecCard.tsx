"use client";
import { RecommendGoal } from "@/app/goals/types";
import { goalData } from "@/app/goals/types/recommend";
import useGoalsStore from "@/zustand/goals";

export default function RecCard() {
  const level = useGoalsStore((state) => state.level);
  const filterGoals = goalData.filter((data) => data.level === level);
  const selectedGoals = useGoalsStore((state) => state.selectedGoals);
  const setSelectedGoals = useGoalsStore((state) => state.setSelectedGoals);
  const goals = useGoalsStore((state) => state.goals);

  function toggleSelect(goal: RecommendGoal) {
    let found = false;
    for (let i = 0; i < selectedGoals.length; i++) {
      if (selectedGoals[i].id === goal.id) {
        found = true;
        break;
      }
    }

    if (found) {
      const removed = [];
      for (let i = 0; i < selectedGoals.length; i++) {
        if (selectedGoals[i].id !== goal.id) {
          removed.push(selectedGoals[i]);
        }
      }
      setSelectedGoals(removed);
    } else {
      const added = [...selectedGoals, goal];
      setSelectedGoals(added);
    }
  }

  function isLocked(goal: RecommendGoal): boolean {
    if (!goal.prerequisiteId) {
      return false;
    }

    const prerequisite = goalData.find(function (item) {
      return item.id === goal.prerequisiteId;
    });
    if (!prerequisite) {
      return false;
    }

    let completed = false;
    for (let i = 0; i < goals.length; i++) {
      if (
        goals[i].title === prerequisite.title &&
        goals[i].extra.level === prerequisite.level &&
        goals[i].extra.status === "완료"
      ) {
        completed = true;
        break;
      }
    }

    return !completed;
  }

  return (
    <>
      {filterGoals.map(function (goal) {
        const locked = isLocked(goal);

        if (locked) {
          return (
            <article
              key={goal.id}
              className="rounded-xl max-w-md min-w-93.75 gap-4 p-4 mb-3 border border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed"
            >
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <h2 className="font-bold text-lg text-gray-400">
                  {goal.title}
                </h2>
              </div>
              <p className="text-gray-400 text-sm">
                이전 단계를 완료하면 열립니다
              </p>
            </article>
          );
        }

        return (
          <article
            key={goal.id}
            onClick={() => toggleSelect(goal)}
            className={`rounded-xl max-w-md min-w-93.75 gap-4 p-4 mb-3 cursor-pointer border ${
              selectedGoals.some((item) => item.id === goal.id)
                ? "border-blue-500 bg-blue-50"
                : "border-notselectbtn-border"
            }`}
          >
            <h2 className="font-bold text-lg mb-2">{goal.title}</h2>
            <p className="text-gray-600 text-sm mb-1">{goal.subtitle}</p>
            <p className="text-gray-800">{goal.description}</p>
          </article>
        );
      })}
    </>
  );
}
