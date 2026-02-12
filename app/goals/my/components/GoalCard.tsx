"use client";
import { GoalResponse } from "../../types";
import type { RunningRecord } from "@/app/lib/types";
import useUserStore from "@/zustand/user";
import { deleteGoal, getMyGoals, updateGoal } from "@/app/lib/goalsAPI";
import useGoalsStore from "@/zustand/goals";
import { useEffect, useState } from "react";
import { getMyRecords } from "@/app/lib/recordsAPI";
import Modal from "@/app/goals/components/Modal";

function paceToSecond(pace: string) {
  const parts = pace.split(":");
  const min = Number(parts[0]);
  const sec = Number(parts[1]);
  return min * 60 + sec;
}

function calcProgress(goal: GoalResponse, records: RunningRecord[]) {
  // startedAt(러닝 시작 시간)이 있으면 그걸 기준으로, 없으면 createdAt 기준으로
  const startTime = goal.extra.startedAt || goal.createdAt;

  // 시작 시간 이후의 기록만 가져오기
  const goalRecords = [];
  for (let i = 0; i < records.length; i++) {
    if (records[i].createdAt > startTime) {
      goalRecords.push(records[i]);
    }
  }

  // 거리 목표 진행률 계산
  if (goal.extra.goalType === "distance" && goal.extra.targetDistance) {
    let total = 0;
    for (let i = 0; i < goalRecords.length; i++) {
      total = total + (goalRecords[i].extra.distance || 0);
    }
    return Math.min(100, Math.round((total / goal.extra.targetDistance) * 100));
  }

  // 페이스 목표 진행률 계산
  if (goal.extra.goalType === "pace" && goal.extra.targetPace) {
    const targetSec = paceToSecond(goal.extra.targetPace);

    // pace가 있는 기록만 골라내기
    const paces = [];
    for (let i = 0; i < goalRecords.length; i++) {
      if (goalRecords[i].extra.pace) {
        paces.push(paceToSecond(goalRecords[i].extra.pace));
      }
    }

    if (paces.length === 0) {
      return 0;
    }
    const bestPace = Math.min(...paces);
    if (bestPace <= targetSec) {
      return 100;
    }
    return Math.min(100, Math.round((targetSec / bestPace) * 100));
  }
  return 0;
}

export default function GoalCard() {
  const goals = useGoalsStore((state) => state.goals);
  const setGoals = useGoalsStore((state) => state.setGoals);
  const filter = useGoalsStore((state) => state.filter);
  const user = useUserStore((state) => state.user);

  // 필터에 따라 목표 목록 걸러내기
  let filteredGoals = [];
  if (filter === "전체") {
    filteredGoals = goals;
  } else {
    for (let i = 0; i < goals.length; i++) {
      if (goals[i].extra.status === filter) {
        filteredGoals.push(goals[i]);
      }
    }
  }

  // 상태 변경 함수
  const handleStatusChange = async function (
    goal: GoalResponse,
    newStatus: string,
  ) {
    if (!user?.token) {
      return;
    }

    const extra = { ...goal.extra };

    // "러닝 시작" 누를 때 현재 시간 저장 (이후 기록만 진행률에 반영)
    if (newStatus === "진행중") {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hour = String(now.getHours()).padStart(2, "0");
      const minute = String(now.getMinutes()).padStart(2, "0");
      const second = String(now.getSeconds()).padStart(2, "0");
      extra.startedAt = `${year}.${month}.${day} ${hour}:${minute}:${second}`;
    }

    // 서버에 상태 변경 요청
    await updateGoal(goal._id, extra, newStatus, user.token.accessToken);

    // 목록 다시 불러오기
    const result = await getMyGoals(user.token.accessToken);
    setGoals(result.item);
  };

  // 취소 버튼 → 모달 열기
  const handleCancel = function (goalId: number) {
    setCancelGoalId(goalId);
  };
  const handleComplete = function (goalId: number) {
    setCompleteGoalId(goalId);
  };
  // 모달에서 "제거" 눌렀을 때 실제 삭제
  const confirmCancel = async function () {
    if (!cancelGoalId || !user?.token) {
      setCancelGoalId(null);
      return;
    }
    try {
      await deleteGoal(cancelGoalId, user.token.accessToken);
      const updatedGoals = await getMyGoals(user.token.accessToken);
      setGoals(updatedGoals.item);
    } catch (error) {
      console.error("취소 중 오류 발생:", error);
      window.alert("취소에 실패했습니다.");
    }
    setCancelGoalId(null);
  };

  // 완료 상태에서 삭제
  const handleDelete = async function (goalId: number) {
    const deleteOk = window.confirm("정말 삭제하시겠습니까?");
    if (!user?.token) {
      return;
    }
    if (deleteOk) {
      window.alert("삭제되었습니다.");
      try {
        await deleteGoal(goalId, user.token.accessToken);
        const updatedGoals = await getMyGoals(user.token.accessToken);
        setGoals(updatedGoals.item);
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        window.alert("삭제에 실패했습니다.");
      }
    }
  };

  const confirmComplete = async function () {
    if (!completeGoalId || !user?.token) {
      setCompleteGoalId(null);
      return;
    }

    let goal = null;
    for (let i = 0; i < goals.length; i++) {
      if (goals[i]._id === completeGoalId) {
        goal = goals[i];
        break;
      }
    }

    if (goal) {
      await handleStatusChange(goal, "완료");
    }
    setCompleteGoalId(null);
  };
  const confirmDelete = async function () {
    if (!deleteGoalId || !user?.token) {
      setDeleteGoalId(null);
      return;
    }
    try {
      await deleteGoal(deleteGoalId, user.token.accessToken);
      const updatedGoals = await getMyGoals(user.token.accessToken);
      setGoals(updatedGoals.item);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
    setDeleteGoalId(null);
  };
  const [cancelGoalId, setCancelGoalId] = useState<number | null>(null);
  const [completeGoalId, setCompleteGoalId] = useState<number | null>(null);
  const [deleteGoalId, setDeleteGoalId] = useState<number | null>(null);

  const [records, setRecords] = useState<RunningRecord[]>([]);
  useEffect(
    function () {
      const fetchRecords = async function () {
        if (user?.token) {
          const result = await getMyRecords(user.token.accessToken);
          const recordList = [];
          for (let i = 0; i < result.item.length; i++) {
            if (result.item[i].type === "record") {
              recordList.push(result.item[i]);
            }
          }
          setRecords(recordList);
        }
      };
      fetchRecords();
    },
    [user],
  );

  return (
    <>
      <Modal
        isOpen={completeGoalId !== null}
        showIcon={true}
        title="목표 완료"
        message="축하합니다! 목표를 완료하시겠습니까?"
        onConfirm={confirmComplete}
        onCancel={function () {
          setCompleteGoalId(null);
        }}
      />
      <Modal
        isOpen={deleteGoalId !== null}
        title="목표 삭제"
        message="정말 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="돌아가기"
        onConfirm={confirmDelete}
        onCancel={function () {
          setDeleteGoalId(null);
        }}
      />
      <Modal
        isOpen={cancelGoalId !== null}
        title="목표 취소"
        message="취소 시 목표가 제거됩니다. 정말 취소하시겠습니까?"
        confirmText="제거"
        cancelText="돌아가기"
        onConfirm={confirmCancel}
        onCancel={function () {
          setCancelGoalId(null);
        }}
      />
      <ul className="w-full flex flex-col gap-3">
        {filteredGoals.map(function (goal) {
          const status = goal.extra.status;

          {
            /* 진행중 */
          }
          if (status === "진행중") {
            const progress = calcProgress(goal, records);
            console.log(progress);
            return (
              <li
                key={goal._id}
                data-level={goal.extra.level}
                className="w-full border border-gray-300 rounded-2xl p-4"
              >
                <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
                <p className="text-gray-500 text-sm mb-1">
                  {goal.extra.subtitle}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {goal.extra.goalType === "distance"
                    ? `목표 거리: ${goal.extra.targetDistance}km`
                    : `목표 페이스: ${goal.extra.targetPace} /KM`}
                </p>
                <div className="flex flex-row justify-between w-full mb-2">
                  <p className="text-sm text-gray-600">진행률</p>
                  <p className="text-[#2C7FB8] font-bold">{progress}%</p>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                  <div
                    className="bg-[#004bd6] h-2.5 rounded-full transition-all duration-300"
                    style={{ width: progress + "%" }}
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <button
                    onClick={function () {
                      handleComplete(goal._id);
                    }}
                    disabled={progress < 100}
                    className={
                      progress < 100
                        ? "flex-1 py-2 w-full rounded-lg text-center font-semibold bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "flex-1 py-2 w-full rounded-lg text-center font-semibold bg-primary text-notselectbtn"
                    }
                  >
                    완료
                  </button>
                  <button
                    onClick={function () {
                      handleCancel(goal._id);
                    }}
                    className="flex-1 bg-primary py-2 w-full rounded-lg text-center font-semibold text-notselectbtn"
                  >
                    취소
                  </button>
                </div>
              </li>
            );
          }

          {
            /* 미완료 */
          }
          if (status === "미완료") {
            return (
              <li
                key={goal._id}
                data-level={goal.extra.level}
                className="w-full border border-gray-300 p-4 rounded-2xl"
              >
                <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
                <p className="text-gray-600 text-sm mb-1">
                  {goal.extra.subtitle}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {goal.extra.goalType === "distance"
                    ? `목표 거리: ${goal.extra.targetDistance}km`
                    : `목표 페이스: ${goal.extra.targetPace} /KM`}
                </p>
                <div className="text-center mb-4">
                  <p>현재 진행 없음</p>
                </div>
                <div>
                  <button
                    onClick={function () {
                      handleStatusChange(goal, "진행중");
                    }}
                    className="flex-1 bg-primary py-2 w-full rounded-lg text-center text-notselectbtn"
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
                data-level={goal.extra.level}
                className="w-full border border-gray-300 p-4 rounded-2xl"
              >
                <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
                <p className="text-gray-600 text-sm mb-1">
                  {goal.extra.subtitle}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {goal.extra.goalType === "distance"
                    ? `목표 거리: ${goal.extra.targetDistance}km`
                    : `목표 페이스: ${goal.extra.targetPace} /KM`}
                </p>
                <div className="flex flex-row justify-between w-full">
                  <p>진행률</p>
                  <p className="text-[#2C7FB8] font-bold">100%</p>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                  <div
                    className="bg-[#004bd6] h-2.5 rounded-full transition-all duration-300"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <button
                    onClick={function () {
                      setDeleteGoalId(goal._id);
                    }}
                    className="flex-1 bg-primary py-2 w-full rounded-lg font-semibold text-center text-notselectbtn"
                  >
                    삭제
                  </button>
                  <button
                    onClick={function () {
                      handleStatusChange(goal, "미완료");
                    }}
                    className="flex-1 bg-gray-custom py-2 w-full rounded-lg text-center font-semibold text-primary-dark"
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
