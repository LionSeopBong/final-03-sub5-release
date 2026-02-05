"use client";

import Footer from "@/app/components/common/Footer";
import Header from "@/app/components/common/Header";
import Navi from "@/app/components/common/Navi";
import { getMonthlyDistanceChartData, getWeeklyChartData } from "@/app/lib/chart";
import { deleteRecord, getMyRecords } from "@/app/lib/recordsAPI";
import { calculateMonthlyStats, calculateRecentPace, calculateWeeklyStats } from "@/app/lib/stats";
import { RunningRecord } from "@/app/lib/types";
import useStatsStore from "@/zustand/statsStore";
import useUserStore from "@/zustand/user";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// 메인페이지
export default function RecordPage() {
  const [data, setData] = useState<RunningRecord[]>([]);

  // 페이지 위치 autoScrolling
  // const homeRef = useRef<HTMLDivElement>(null);
  const dailyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);
  const monthRecordRef = useRef<HTMLDivElement>(null);
  const weeklyRecordRef = useRef<HTMLDivElement>(null);

  const { weeklyStats, monthlyStats, recentPace, setWeeklyStats, setMonthlyStats, setRecentPace } = useStatsStore();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("데이터 조회시작");
        const token = user?.token?.accessToken;
        if (!token) {
          console.log("로그인 필요");
          return;
        }
        const result = await getMyRecords(token);

        if (result.ok) {
          const records = result.item.filter((item) => item.extra);

          console.log("기록개수", records.length);
          setWeeklyStats(calculateWeeklyStats(records));
          setMonthlyStats(calculateMonthlyStats(records));
          setRecentPace(calculateRecentPace(records, 2));
          setData(records);
        }
      } catch (error) {
        console.error("에러 발생", error);
      }
    };
    fetchData();
  }, [user, setWeeklyStats, setMonthlyStats, setRecentPace]);

  const scrollToSection = (sectionName: "home" | "daily" | "stats" | "recent" | "monthRecord" | "weeklyRecord") => {
    if (sectionName === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const sections = {
      // home: homeRef, // 홈
      daily: dailyRef, // 오늘 기록
      weeklyRecord: weeklyRecordRef, // 주간기록
      monthRecord: monthRecordRef, // 월간기록
      recent: recentRef, // 최근 기록
      stats: statsRef, // 분석
    };
    sections[sectionName]?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const formatDuration = (duration: string) => {
    const [hour, minutes, seconds] = duration.split(":");
    return `${parseInt(minutes)}분 ${parseInt(seconds)}초`;
  };
  // 최근 기록 삭제
  const handleDelete = async (recordId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    try {
      const token = user?.token?.accessToken;
      if (!token) {
        alert("로그인이 필요합니다");
        return;
      }
      const result = await deleteRecord(recordId.toString(), token);
      if (result.ok) {
        // setData((prev) => prev.filter((r) => r._id !== recordId));
        const newData = data.filter((r) => r._id !== recordId);
        setData(newData);
        // 삭제 후 통계 데이타도 적용된 데이터로 랜더링 되도록
        setWeeklyStats(calculateWeeklyStats(newData));
        setMonthlyStats(calculateMonthlyStats(newData));
        setRecentPace(calculateRecentPace(newData, 2));
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("삭제에러", error);
    }
  };
  // 오늘 기록 필터
  const todayRecord = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return data.find((record) => record.extra?.date === today);
  }, [data]);

  // 주간 차트 영역

  const sortedRecentRecords = useMemo(() => {
    return [...data]
      .filter((r) => r.extra?.date)
      .sort((a, b) => {
        return new Date(b.extra.date).getTime() - new Date(a.extra.date).getTime();
      })
      .slice(0, 5);
  }, [data]);

  const weeklyChartData = useMemo(() => getWeeklyChartData(data), [data]);

  // 월간 차트
  const monthlyChartData = useMemo(() => getMonthlyDistanceChartData(data), [data]);
  return (
    <>
      <Header />
      <div className="sticky top-0 z-20 bg-white">
        {/* 본문제목 */}
        <div className="flex justify-center items-center px-6 py-4 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-700 ">러닝 기록 관리</h1>
        </div>

        {/* 네비탭 */}
        <nav className=" flex px-6 py-4 gap-3 overflow-x-auto scrollbar-hide">
          <button onClick={() => scrollToSection("home")} className="bg-primary text-sm text-white px-9 py-2 rounded-lg whitespace-nowrap">
            홈
          </button>
          <button onClick={() => scrollToSection("daily")} className="text-sm border-gray-200 border px-9 py-2 rounded-lg whitespace-nowrap">
            오늘의 기록
          </button>
          <button onClick={() => scrollToSection("weeklyRecord")} className="text-sm border-gray-200 border px-9 py-2 rounded-lg whitespace-nowrap">
            주간 러닝 거리
          </button>
          <button onClick={() => scrollToSection("monthRecord")} className="text-sm border-gray-200 border px-9 py-2 rounded-lg whitespace-nowrap">
            월간 러닝 거리
          </button>
          <button onClick={() => scrollToSection("recent")} className="text-sm border-gray-200 border px-9 py-2 rounded-lg whitespace-nowrap">
            최근 기록
          </button>
          <button onClick={() => scrollToSection("stats")} className="text-sm border-gray-200 border px-9 py-2 rounded-lg whitespace-nowrap">
            통계
          </button>
        </nav>
      </div>
      {/* 데이터 작업 버튼 탭 */}
      <div className="flex gap-3 justify-center py-4">
        <button className="bg-primary text-sm text-white px-5 py-2 rounded-lg">전체 기록보기</button>
        <button className="text-sm border-gray-200 border px-5 py-2 rounded-lg">내보내기</button>
        <Link href="/records/new" className="text-sm border-gray-200 border px-5 py-2 rounded-lg">
          기록추가
        </Link>
      </div>
      {/* 러닝 요약 탭 */}
      {todayRecord && todayRecord.extra ? (
        <div ref={dailyRef} className="px-4 scroll-mt-34">
          <h2 className=" font-semibold text-xl my-3">오늘의 러닝 요약</h2>
          {}
          <div className="flex gap-3 text-left overflow-x-auto scrollbar-hide">
            <div className="flex-col border border-gray-200 rounded-lg px-6 py-3 whitespace-nowrap">
              <div className="text-sm text-gray-400 mb-1">거리</div>
              <div>
                <span className="text-lg font-bold">{todayRecord.extra.distance}km</span>
              </div>
            </div>
            <div className="flex-col border border-gray-200 rounded-lg px-6 py-3 whitespace-nowrap">
              <div className="text-sm text-gray-400 mb-1">시간</div>
              <div>
                <span className="text-lg font-bold">{todayRecord.extra.duration}</span>
              </div>
            </div>
            <div className="flex-col border border-gray-200 rounded-lg px-6 py-3 whitespace-nowrap">
              <div className="text-sm text-gray-400 mb-1">페이스</div>
              <div>
                <span className="text-lg font-bold">{todayRecord.extra.pace} /km</span>
              </div>
            </div>
          </div>
          {/* <div className="text-center py-8 text-gray-400">기록이 없습니다</div> */}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-2">📝</div>
          <p className="text-gray-500 mb-3">오늘 기록이 없습니다</p>
          <Link href="/records/new" className="inline-block text-sm bg-primary text-white px-5 py-2 rounded-lg">
            기록 추가하기
          </Link>
        </div>
      )}
      ;{/* 주간 러닝 거리 차트 */}
      <div ref={weeklyRecordRef} className="bg-white scroll-mt-34 rounded-lg border border-gray-200 mx-4 my-3 p-5">
        <h2 className="text-lg font-semibold mb-2">주간 러닝 거리</h2>
        <p className="text-sm text-gray-500 mb-4">
          {weeklyStats?.totalDistance} &#40;km&#41; {weeklyStats?.weeklyRuns} 회
        </p>
        {/* 차트 */}
        <div className="h-48 rounded flex items-center justify-center">
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={weeklyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis width={20} />
              <Tooltip />
              <Bar dataKey="distance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* 월간 러닝 거리 */}
      <div ref={monthRecordRef} className="bg-white scroll-mt-34 rounded-lg border border-gray-200 mx-4 my-3 p-5">
        <h2 className="text-lg font-semibold mb-2">월간 러닝 거리</h2>
        <p className="text-sm text-gray-500 mb-4">
          {monthlyStats?.totalDistance} &#40;km&#41; {monthlyStats?.monthlyRuns} 회
        </p>
        {/* 차트 영역 - 나중에 Recharts 들어갈 자리 */}
        <div className="h-48 rounded flex items-center justify-center">
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis width={20} />
              <Tooltip />
              <Bar dataKey="distance" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* 최근 기록 */}
      <div ref={recentRef} className="bg-white rounded-lg border border-gray-200 mx-4 my-3 p-5">
        <h2 className="text-lg font-semibold mt-4">최근 기록</h2>
        <p className="text-gray-500 text-sm pb-3">최근 활동 내역을 확인 하세요</p>
        {/* 기록 리스트 */}
        {data.length > 0 ? (
          <div className="space-y-3 ">
            {/* 기록 아이템 *************************************************************** */}
            {sortedRecentRecords.map((record) => (
              <div key={record._id} className="bg-white rounded-xl border border-gray-200 p-4">
                {/* 날짜 */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{record.extra.date}</span>
                  <Link href={`/records/${record._id}/edit`} className="text-xs text-blue-500">
                    수정
                  </Link>
                  <button className="text-xs text-red-500" onClick={() => handleDelete(record._id)}>
                    삭제
                  </button>
                  <Link href={`/records/${record._id}/`} className="text-xs text-primary">
                    상세
                  </Link>
                </div>

                {/* 데이터 한 줄 */}
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="font-bold text-primary text-lg">{record.extra.distance}</span>
                    <span className="text-gray-400 text-xs ml-1">km</span>
                  </div>

                  <div className="h-4 w-px bg-gray-200" />

                  <div>
                    <span className="font-bold text-gray-700">{record.extra.duration}</span>
                    <span className="text-gray-400 text-xs ml-1">Time</span>
                  </div>

                  <div className="h-4 w-px bg-gray-200" />

                  <div>
                    <span className="font-bold text-gray-700">{record.extra.pace}</span>
                    <span className="text-gray-400 text-xs ml-1">/km</span>
                  </div>
                </div>

                {/* 장소 */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                  <span>📍</span>
                  <span>{record.extra.location || "장소 없음"}</span>
                </div>
              </div>
            ))}

            {/* 기록 아이템 **************************************************************** */}
          </div>
        ) : (
          <div>기록 없음</div>
        )}
      </div>
      {/* 평균 페이스 통계 */}
      <div ref={statsRef} className="px-4 py-3">
        <h2 className="font-semibold text-xl my-3"> 평균 페이스 통계</h2>
        {/* 2개 컬럼*/}
        <div className="flex justify-center gap-4">
          <div className="text-center p-4 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-xs">주간페이스 평균</p>
            <p className="text-lg font-bold">{weeklyStats?.averagePace} /km</p>
          </div>
          <div className="text-center p-4 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-xs">월간페이스 평균</p>
            <p className="text-lg font-bold">{monthlyStats?.averagePace} /km</p>
          </div>
        </div>
      </div>
      <Footer />
      <Navi />
    </>
  );
}
