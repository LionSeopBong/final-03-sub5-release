"use client";

import Footer from "@/app/components/common/Footer";
import Header from "@/app/components/common/Header";
import Navi from "@/app/components/common/Navi";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useExportCSV } from "@/hooks/useExportCSV";
import { useGetRecords } from "@/hooks/useGetRecords";
import { getMonthlyDistanceChartData, getWeeklyChartData } from "@/app/lib/chart";
import Link from "next/link";
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// 메인페이지
export default function RecordPage() {
  // 유저 데이터
  const { data, weeklyStats, monthlyStats, recentPace, handleDelete } = useGetRecords();
  // 스크롤 위치 이벤트
  const { acticeSection, scrollToSection, dailyRef, weeklyRecordRef, monthRecordRef, recentRef, statsRef, navContainerRef, navButtonRefs } = useAutoScroll();
  // csv data export
  const { exportData } = useExportCSV(data);
  // 페이스 계산
  const formatDuration = (duration: string) => {
    const [hour, minutes, seconds] = duration.split(":");
    return `${parseInt(minutes)}분 ${parseInt(seconds)}초`;
  };

  // 오늘 기록 필터
  const todayRecord = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return data.find((record) => record.extra?.date === today);
  }, [data]);
  // 최근 기록 5개만 요약
  const sortedRecentRecords = useMemo(() => {
    return [...data]
      .filter((r) => r.extra?.date)
      .sort((a, b) => {
        return new Date(b.extra.date).getTime() - new Date(a.extra.date).getTime();
      })
      .slice(0, 5);
  }, [data]);
  // 주간 차트
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
        <nav data-section="daily" ref={navContainerRef} className=" flex px-6 py-4 gap-3 overflow-x-auto scrollbar-hide scroll-smooth">
          <button
            ref={(el) => {
              navButtonRefs.current["home"] = el;
            }}
            onClick={() => scrollToSection("home")}
            className={`${acticeSection === "home" ? "bg-primary text-white" : "border-gray-200"} border text-sm active:border-blue-500  px-9 py-2 rounded-lg whitespace-nowrap`}
          >
            홈
          </button>
          <button
            ref={(el) => {
              navButtonRefs.current["daily"] = el;
            }}
            onClick={() => scrollToSection("daily")}
            className={`text-sm ${acticeSection === "daily" ? "bg-primary text-white" : "border-gray-200"} border px-9 active:border-blue-500 py-2 rounded-lg whitespace-nowrap`}
          >
            오늘의 기록
          </button>
          <button
            ref={(el) => {
              navButtonRefs.current["weeklyRecord"] = el;
            }}
            onClick={() => scrollToSection("weeklyRecord")}
            className={`text-sm ${acticeSection === "weeklyRecord" ? "bg-primary text-white" : "border-gray-200"} border px-9 py-2 rounded-lg active:border-blue-500 whitespace-nowrap`}
          >
            주간 러닝 거리
          </button>
          <button
            ref={(el) => {
              navButtonRefs.current["monthRecord"] = el;
            }}
            onClick={() => scrollToSection("monthRecord")}
            className={`text-sm ${acticeSection === "monthRecord" ? "bg-primary text-white" : "border-gray-200"} border px-9 py-2 rounded-lg active:border-blue-500 whitespace-nowrap`}
          >
            월간 러닝 거리
          </button>
          <button
            ref={(el) => {
              navButtonRefs.current["recent"] = el;
            }}
            onClick={() => scrollToSection("recent")}
            className={`text-sm ${acticeSection === "recent" ? "bg-primary text-white" : "border-gray-200"} border px-9 py-2 rounded-lg active:border-blue-500 whitespace-nowrap`}
          >
            최근 기록
          </button>
          <button
            ref={(el) => {
              navButtonRefs.current["stats"] = el;
            }}
            onClick={() => scrollToSection("stats")}
            className={`text-sm ${acticeSection === "stats" ? "bg-primary text-white" : "border-gray-200"} border px-9 py-2 rounded-lg active:border-blue-500 whitespace-nowrap`}
          >
            통계
          </button>
        </nav>
      </div>
      {/* 데이터 작업 버튼 탭 */}
      <div className="flex gap-3 justify-center py-4">
        <Link href="/records/all" className="bg-primary text-sm text-white px-5 py-2 active:border-blue-500 rounded-lg">
          전체 기록보기
        </Link>
        <button className="text-sm border-gray-200 border px-5 py-2 rounded-lg active:border-blue-500" onClick={exportData}>
          내보내기
        </button>
        <Link href="/records/new" className="text-sm border-gray-200 border px-5 py-2 rounded-lg active:border-blue-500">
          기록추가
        </Link>
      </div>
      {/* 러닝 요약 탭 */}
      {todayRecord && todayRecord.extra ? (
        <div ref={dailyRef} data-section="daily" className="px-4 scroll-mt-34">
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
          <Link href="/records/new" className="inline-block text-sm bg-primary active:border-blue-500 text-white px-5 py-2 rounded-lg">
            기록 추가하기
          </Link>
        </div>
      )}
      ;{/* 주간 러닝 거리 차트 */}
      <div ref={weeklyRecordRef} data-section="weeklyRecord" className="bg-white scroll-mt-34 rounded-lg border border-gray-200 mx-4 my-3 p-5">
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
      <div ref={monthRecordRef} data-section="monthRecord" className="bg-white scroll-mt-34 rounded-lg border border-gray-200 mx-4 my-3 p-5">
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
      <div ref={recentRef} data-section="recent" className="bg-white rounded-lg border border-gray-200 mx-4 my-3 p-5">
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
      <div ref={statsRef} data-section="stats" className="px-4 py-3">
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
