"use client";

import { getRecords } from "@/app/lib/recordsAPI";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RecordPage() {
  const [data, setData] = useState([]);

  useEffect(() => {});
  return (
    <>
      {/* 헤더 */}
      <header className="flex justify-center items-center px-6 py-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-700 ">러닝 기록 관리</h1>
      </header>
      {/* 네비탭 */}
      <nav className="flex px-6 py-4 gap-3 overflow-x-auto scrollbar-hide">
        <button onClick={() => scrollToSection("home")} className="bg-primary text-sm text-white px-9 py-2 rounded-lg whitespace-nowrap">
          홈
        </button>
        <button onClick={() => scrollToSection("record")} className="text-sm border-gray-200 border px-9 py-2 rounded-lg whitespace-nowrap">
          기록
        </button>
        <button onClick={() => scrollToSection("analysis")} className="text-sm border-gray-200 border px-9 py-2 rounded-lg whitespace-nowrap">
          분석
        </button>
        <button onClick={() => scrollToSection("resnet")} className="text-sm border-gray-200 border px-9 py-2 rounded-lg whitespace-nowrap">
          최근기록
        </button>
      </nav>
      {/* 데이터 작업 버튼 탭 */}
      <div className="flex gap-3 justify-center py-4">
        <button className="bg-primary text-sm text-white px-5 py-2 rounded-lg">필터</button>
        <button className="text-sm border-gray-200 border px-5 py-2 rounded-lg">내보내기</button>
        <button className="text-sm border-gray-200 border px-5 py-2 rounded-lg">기록추가</button>
      </div>
      {/* 러닝 요약 탭 */}
      <div className="px-4">
        <h2 className=" font-semibold text-xl my-3">오늘의 러닝 요약</h2>
        <div className="flex gap-3 text-left overflow-x-auto scrollbar-hide">
          <div className="flex-col border border-gray-200 rounded-lg px-6 py-3 whitespace-nowrap">
            <div className="text-sm text-gray-400 mb-1">거리</div>
            <div>
              <span className="text-lg font-bold">5 km</span>
            </div>
          </div>
          <div className="flex-col border border-gray-200 rounded-lg px-6 py-3 whitespace-nowrap">
            <div className="text-sm text-gray-400 mb-1">시간</div>
            <div>
              <span className="text-lg font-bold">30분 20초</span>
            </div>
          </div>
          <div className="flex-col border border-gray-200 rounded-lg px-6 py-3 whitespace-nowrap">
            <div className="text-sm text-gray-400 mb-1">페이스</div>
            <div>
              <span className="text-lg font-bold">6:01 /km</span>
            </div>
          </div>{" "}
        </div>
      </div>
      {/* 주간 러닝 거리 차트 */}
      <div className="bg-white rounded-lg border border-gray-200 mx-4 my-3 p-5">
        <h2 className="text-lg font-semibold mb-2">주간 러닝 거리</h2>
        <p className="text-sm text-gray-500 mb-4">210 &#40;km&#41;</p>
        {/* 차트 */}
        <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-400">[차트 영역]</p>
        </div>
      </div>
      {/* 월간 러닝 거리 */}
      <div className="bg-white rounded-lg border border-gray-200 mx-4 my-3 p-5">
        <h2 className="text-lg font-semibold mb-2">월간 러닝 거리</h2>
        <p className="text-sm text-gray-500 mb-4">754 km</p>
        {/* 차트 영역 - 나중에 Recharts 들어갈 자리 */}
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
          <p className="text-gray-400 text-sm">[월간 차트]</p>
        </div>
      </div>
      {/* 최근 기록 */}
      <div className="bg-white rounded-lg border border-gray-200 mx-4 my-3 p-5">
        <h2 className="text-lg font-semibold mt-4">최근 기록</h2>
        <p className="text-gray-500 text-sm pb-3">최근 활동 내역을 확인 하세요</p>
        {/* 기록 리스트 */}
        <div className="space-y-3 ">
          {/* 기록 아이템 1 */}
          <div className="border rounded-lg border-gray-200 px-1 py-1">
            <div className="flex items-center  gap-3 mb-2">
              {/* 아이콘 */}
              {/* <div className="w-5 h-10 flex-shrink-0">
                <Image src="/images/management-symbol.png" alt="운동 아이콘" width={40} height={40} className="object-contain" />
              </div> */}

              {/* 날짜 + 뱃지들 */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs px-3">1월 12일</span>
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">맑음</span>
                <span className="bg-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded">수정</span>
              </div>

              {/* 데이터들 */}
              <div className="flex items-center text-xs gap-3 ml-auto">
                <span className="font-semibold text-primary">6.0</span>
                <span className="font-semibold text-red-500">35</span>
                <span className="font-semibold text-gray-700">5:00</span>
                <span className="font-semibold text-gray-500">480</span>
              </div>
            </div>

            {/* 2줄: 장소 + 라벨 */}
            <div className="flex items-center justify-between ml-13">
              {/* 장소 */}
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <span>📍</span>
                <span>광교호수공원</span>
              </div>

              {/* 라벨들 */}
              <div className="flex gap-3 text-xs text-gray-400">
                <span>km</span>
                <span>분</span>
                <span>/km</span>
                <span>kcal</span>
              </div>
            </div>
          </div>
          {/* 기록 아이템 2 */}
          <div className="border rounded-lg border-gray-200 px-1 py-1">
            <div className="flex items-center  gap-3 mb-2">
              {/* 아이콘 */}
              {/* <div className="w-5 h-10 flex-shrink-0">
                <Image src="/images/management-symbol.png" alt="운동 아이콘" width={40} height={40} className="object-contain" />
              </div> */}

              {/* 날짜 + 뱃지들 */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs px-3">1월 17일</span>
                <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded">흐림</span>
                <span className="bg-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded">수정</span>
              </div>

              {/* 데이터들 */}
              <div className="flex items-center text-xs gap-3 ml-auto">
                <span className="font-semibold text-primary">6.0</span>
                <span className="font-semibold text-red-500">35</span>
                <span className="font-semibold text-gray-700">5:00</span>
                <span className="font-semibold text-gray-500">480</span>
              </div>
            </div>

            {/* 2줄: 장소 + 라벨 */}
            <div className="flex items-center justify-between ml-13">
              {/* 장소 */}
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <span>📍</span>
                <span>광교호수공원</span>
              </div>

              {/* 라벨들 */}
              <div className="flex gap-3 text-xs text-gray-400">
                <span>km</span>
                <span>분</span>
                <span>/km</span>
                <span>kcal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 평균 페이스 통계 */}
      <div className="px-4 py-3">
        <h2 className="font-semibold text-xl my-3"> 평균 페이스 통계</h2>
        {/* 2개 컬럼*/}
        <div className="flex justify-center gap-4">
          <div className="text-center p-4 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-xs">주간페이스 평균</p>
            <p className="text-lg font-bold">6:15 /km</p>
          </div>
          <div className="text-center p-4 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-xs">월간페이스 평균</p>
            <p className="text-lg font-bold">6:35 /km</p>
          </div>
        </div>
      </div>
    </>
  );
}
