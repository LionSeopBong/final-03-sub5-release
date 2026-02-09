"use client";
import { GoalResponse } from "../../types";
import type { RunningRecord } from "@/app/lib/types";
import useUserStore from "@/zustand/user";
import { deleteGoal, getMyGoals, updateGoal } from "@/app/lib/goalsAPI";
import useGoalsStore from "@/zustand/goals";
import { useEffect, useState } from "react";
import { getMyRecords } from "@/app/lib/recordsAPI";
export default function GoalCard() {
  const goals = useGoalsStore((state) => state.goals);
  const setGoals = useGoalsStore((state) => state.setGoals);
  const filter = useGoalsStore((state) => state.filter);
  const user = useUserStore((state) => state.user);

  const filteredGoals =
    filter === "전체"
      ? goals
      : goals.filter((goals) => goals.extra.status === filter);

  const handleStatusChange = async (goal: GoalResponse, newStatus: string) => {
    if (!user?.token) {
      return;
    }
    // 1. 서버에 상태 변경 요청
    await updateGoal(goal._id, goal.extra, newStatus, user.token.accessToken);

    // 2. 목록 다시 불러오기
    const result = await getMyGoals(user.token.accessToken);
    setGoals(result.item);
  };

  const handleDelete = async (goalId: number) => {
    const deleteOk = window.confirm("정말 삭제하시겠습니까?");
    if (!user?.token) {
      return;
    }
    if (deleteOk) {
      window.alert("삭제되었습니다.");
      try {
        // 3. deleteGoal 실행 (인자: goalId, accessToken)
        await deleteGoal(goalId, user.token.accessToken);
        // 4. 삭제 후 목록 갱신
        const updatedGoals = await getMyGoals(user.token.accessToken);
        setGoals(updatedGoals.item);
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        window.alert("삭제에 실패했습니다.");
      }
    }
  };
  const [records, setRecords] = useState<RunningRecord[]>([]);
  useEffect(() => {
    const fetchRecords = async () => {
      if (user?.token) {
        const result = await getMyRecords(user.token.accessToken);
        setRecords(result.item.filter((item) => item.type === "record"));

        setRecords(result.item.filter((r) => r.type === "record"));
        console.log(result.item.filter((r) => r.type === "record"));
      }
    };

    fetchRecords();
  }, [user]);

  return (
    <>
      <ul className="w-full flex flex-col gap-3 ">
        {filteredGoals.map((goal) => {
          const status = goal.extra.status;

          {
            /* 진행중 */
          }
          if (status === "진행중") {
            return (
              <li
                key={goal._id}
                data-lavel={goal.extra.level}
                className="w-full border border-gray-300 rounded-2xl   p-4"
              >
                <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  {" "}
                  {goal.extra.subtitle}{" "}
                </p>
                <div className="flex flex-row justify-between w-full mb-2">
                  <p className="text-sm text-gray-600">진행률</p>
                  <p className="text-[#2C7FB8] font-bold">50%</p>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                  <div
                    className="bg-[#004bd6]  h-2.5 rounded-full transition-all duration-300"
                    style={{ width: "50%" }}
                  />
                </div>
                <div className="flex flex-row gap-4 ">
                  <button
                    onClick={() => handleStatusChange(goal, "완료")}
                    className="flex-1 bg-primary py-2 w-full
                                rounded-lg text-center  font-semibold
                                      text-notselectbtn"
                  >
                    완료
                  </button>
                  <button
                    onClick={() => handleStatusChange(goal, "미완료")}
                    className="flex-1 bg-primary py-2 w-full
  rounded-lg text-center font-semibold
  text-notselectbtn"
                  >
                    취소
                  </button>
                </div>
              </li>
            );
          }

          {
            /* 미진행 */
          }
          if (status === "미완료") {
            return (
              <li
                key={goal._id}
                data-lavel={goal.extra.level}
                className="w-full border border-gray-300 p-4  rounded-2xl"
              >
                <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {" "}
                  {goal.extra.subtitle}{" "}
                </p>

                <div className="text-center mb-4 ">
                  <p>현재 진행 없음 </p>
                </div>
                <div>
                  <button
                    onClick={() => handleStatusChange(goal, "진행중")}
                    className="flex-1 bg-primary py-2 w-full
  rounded-lg text-center text-notselectbtn"
                  >
                    러닝 시작
                  </button>
                </div>
              </li>
            );
          }

          {
            /* 완료 */
          }
          if (status === "완료") {
            return (
              <li
                key={goal._id}
                data-lavel={goal.extra.level}
                className="w-full border border-gray-300 p-4  rounded-2xl"
              >
                <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {" "}
                  {goal.extra.subtitle}{" "}
                </p>
                <div className="flex flex-row justify-between w-full ">
                  <p>진행률</p>
                  <p className="text-[#2C7FB8] font-bold">100%</p>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                  <div
                    className="bg-[#004bd6]  h-2.5 rounded-full transition-all duration-300"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="flex flex-row gap-4  ">
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="flex-1 bg-primary py-2 w-full rounded-lg  font-semibold text-center text-notselectbtn"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => handleStatusChange(goal, "미완료")}
                    className="flex-1 bg-gray-custom py-2
  w-full rounded-lg text-center
  font-semibold text-primary-dark"
                  >
                    재도전
                  </button>
                </div>
              </li>
            );
          }

          return null;
        })}
      </ul>
    </>
  );
}
