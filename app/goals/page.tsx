"use client";
import Footer from "@/app/components/common/Footer";
import Header from "@/app/components/common/Header";
import Navi from "@/app/components/common/Navi";
import GoalsActions from "@/app/goals/components/GoalsActions";
import LevelHeader from "@/app/goals/components/LevelHeader";
import RunningCard from "@/app/goals/components/RunningCard";
import useGoalsStore from "@/zustand/goals";
import useUserStore from "@/zustand/user";
import { useEffect } from "react";
import { getMyRecords } from "@/app/lib/recordsAPI";
import { leveltype } from "@/app/goals/types";

//pace 문자열 -> 숫자
function paceToNumber(pace: string) {
  const [min, sec] = pace.split(":").map(Number);
  return min + sec / 60;
}
//숫자 → 페이스 문자열
function numberToPace(num: number) {
  const min = Math.floor(num);
  const sec = Math.round((num - min) * 60);
  return `${min}:${String(sec).padStart(2, "0")}`;
}
//padStart 이건 문자열 전용 메서드
// 레벨 판별
function getLevel(avgPace: number): { level: leveltype; icon: string } {
  if (avgPace < 4.5) return { level: "고급", icon: "🔥" };
  if (avgPace < 5.5) return { level: "중급", icon: "🏃" };
  return { level: "초급" as const, icon: "🌱" };
}

export default function GoalsPage() {
  const user = useUserStore((state) => state.user);
  const userLevel = useGoalsStore((state) => state.userLevel);
  const setUserLevel = useGoalsStore((state) => state.setUserLevel);

  useEffect(() => {
    const calcLevel = async () => {
      if (!user?.token) {
        return;
      }
      const result = await getMyRecords(user.token.accessToken); //서버에서 내 러닝 기록 가져오기

      const records = result.item.filter((record) => record.type === "record");
      if (records.length === 0) {
        // 신규 레벨
        setUserLevel({
          userId: user._id,
          level: "초급",
          icon: "🌱",
          pace: "0:00",
          totalDistance: 0,
          monthlyRuns: 0,
          userStatus: "신규",
        });
        return;
      }

      const paceRecords = records.filter((record) => record.extra.pace);
      const paces = paceRecords.map((record) =>
        paceToNumber(record.extra.pace),
      );

      const avgPace = paces.reduce((sum, pace) => sum + pace, 0) / paces.length;
      const totalDistRaw = records.reduce(
        (sum, record) => sum + (record.extra.distance || 0),
        0,
      );
      const totalDist = Math.round(totalDistRaw * 100) / 100;
      const { level, icon } = getLevel(avgPace);

      const dates = records.map((record) => record.extra.date);
      dates.sort();
      const lastDate = dates[dates.length - 1];

      const today = new Date();
      const last = new Date(lastDate);
      const diffDays =
        (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

      let userStatus: "신규" | "복귀" | "꾸준";
      if (diffDays > 14) {
        userStatus = "복귀";
      } else {
        userStatus = "꾸준";
      }

      setUserLevel({
        userId: user._id,
        level,
        icon,
        pace: numberToPace(avgPace),
        totalDistance: totalDist,
        monthlyRuns: records.length,
        userStatus: userStatus,
      });
    };
    calcLevel();
  }, [user]);
  return (
    <>
      <Header />
      <main className="flex flex-col items-center px-4 py-6 w-full pt-16">
        {/* 컨테이너 - 모바일 최대 너비 제한 */}
        <div
          className="w-full  min-w-[375px] 
    max-w-[767px]      
    md:max-w-[375px]   flex flex-col gap-4 px-4"
        >
          {userLevel === null ? (
            <p>데이터 달려오는 중...</p>
          ) : (
            <>
              <LevelHeader />
              {/* 메인 중간 : 분석결과 카드 */}
              <RunningCard />
              {/* 버튼들 */}
              <GoalsActions />
              {/* 네비게이션 */}
            </>
          )}
        </div>
      </main>
      <Footer />
      <Navi />
    </>
  );
}
