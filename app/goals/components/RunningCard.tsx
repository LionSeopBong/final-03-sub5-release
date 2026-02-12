"use client";
import useStatsStore from "@/zustand/statsStore";
// import { LevelcalculateLevel, getUserStatusummy } from "../config/levelConfig";
import { calculateLevel, getUserStatus } from "../utils/LevelCalculator";
import { LevelInfo } from "../types";
import { useEffect } from "react";
import useGoalsStore from "@/zustand/goals";
export default function RunningCard() {
  const { setMonthlyStats } = useStatsStore();
  const userLevel = useGoalsStore((state) => state.userLevel);

  useEffect(() => {
    if (userLevel) {
      setMonthlyStats({
        totalDistance: userLevel.totalDistance,
        averagePace: String(userLevel.pace),
        monthlyRuns: userLevel.monthlyRuns,
      });
    }
  }, [userLevel, setMonthlyStats]);
  const level = calculateLevel({
    pace: userLevel?.pace ?? 0, // 널 병합 연산자
    totalDistance: userLevel?.totalDistance ?? 0,
  } as LevelInfo);

  const status = getUserStatus(userLevel?.monthlyRuns ?? 0);

  return (
    <>
      {/* 메인 중간 : 분석결과 카드 */}
      <section className="flex flex-col rounded-xl border border-gray-200 shadow-sm py-5 bg-white overflow-hidden">
        <h2 className="text-lg font-bold text-gray-900 mb-4 px-5">
          🏆 분석된 러닝 기록
        </h2>
        <dl className="w-full divide-y divide-gray-100">
          <div className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-all cursor-pointer">
            <dt className="text-sm font-medium text-gray-700">평균 페이스</dt>
            <dd className="text-lg font-bold text-gray-900">
              {userLevel?.pace === 0 ? "기록 없음" : userLevel?.pace + "/KM"}
            </dd>
          </div>
          <div className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-all cursor-pointer">
            <dt className="text-sm font-medium text-gray-700">
              완주 거리 (누적 거리)
            </dt>
            <dd className="text-lg font-bold text-gray-900">
              {userLevel?.totalDistance === 0
                ? "기록 없음"
                : userLevel?.totalDistance + "KM"}
            </dd>
          </div>
          <div className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-all cursor-pointer">
            <dt className="text-sm font-medium text-gray-700">
              월간 러닝 횟수
            </dt>
            <dd className="text-lg font-bold text-gray-900">
              {userLevel?.monthlyRuns === 0
                ? "기록 없음"
                : userLevel?.monthlyRuns + "회"}
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
