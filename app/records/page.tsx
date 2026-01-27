"use client";

export default function RecordPage() {
  return (
    <>
      {/* 헤더 */}
      <header className="flex justify-center items-center px-6 py-4 border-b-4 border-gray-100">
        <h1 className="text-2xl font-bold text-gray-700 ">러닝 기록 관리</h1>
      </header>
      {/* 네비탭 */}
      <nav className="flex gap-4 px-6 py-4 border-b">
        <button onClick={() => scrollToSection("home")} className="선택된 스타일">
          홈
        </button>
        <button onClick={() => scrollToSection("record")} className="선택된 스타일">
          기록
        </button>
        <button onClick={() => scrollToSection("analysis")} className="선택된 스타일">
          분석
        </button>
        <button onClick={() => scrollToSection("resnet")} className="선택된 스타일">
          최근기록
        </button>
      </nav>
      {/* 데이터 작업 버튼 탭 */}
      <div className="flex gap-3 justify-center py-4">
        <button>필터</button>
        <button>내보내기</button>
        <button>기록추가</button>
      </div>
      {/* 러닝 요약 탭 */}
      <div className="">
        <h2>오늘의 러닝 요약</h2>
        <div className="flex gap-3">
          <div className="text-center">
            <p className="">거리</p>
            <p className="">5km</p>
          </div>
          <div className="text-center">
            <p className="">시간</p>
            <p className="">30분 20초</p>
          </div>
          <div className="text-center">
            <p className="">페이스</p>
            <p className="">6:01 /km</p>
          </div>
        </div>
      </div>
      {/* 주간 러닝 거리 차트 */}
      <div className="bg-white rounded-lg border-2 border-gray-200 mx-4 my-3 p-5">
        <h2>주가 러닝 거리</h2>
        <p>210 &#40;km&#41;</p>
        {/* 차트 */}
        <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-400">[차트 영역]</p>
        </div>
      </div>
      {/* 월간 러닝 거리 */}
      <div className="bg-white rounded-lg shadow-md mx-4 my-3 p-5">
        <h2 className="text-lg font-semibold mb-2">월간 러닝 거리</h2>
        <p className="text-sm text-gray-500 mb-4">754 km</p>
        {/* 차트 영역 - 나중에 Recharts 들어갈 자리 */}
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
          <p className="text-gray-400 text-sm">[월간 차트]</p>
        </div>
      </div>
      {/* 최근 기록 */}
      <div className="bg-white rounded-lg shadow-md mx-4 my-3 p-5">
        <h2 className="text-lg font-semibold mb-4">최근 기록</h2>

        {/* 기록 리스트 */}
        <div className="space-y-3">
          {/* 기록 아이템 1 */}
          <div className="flex items-center gap-3 p-3 border-b">
            {/* 아이콘 */}
            <div className="text-2xl">🏃</div>

            {/* 날짜 + 뱃지 */}
            <div className="flex items-center gap-2">
              <span className="font-semibold">1월 16일</span>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">금</span>
              <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded">수정</span>
            </div>

            {/* 데이터들 */}
            <div className="flex gap-3 ml-auto text-sm">
              <span>6.0</span>
              <span>9분</span>
              <span>5:00</span>
              <span>4회</span>
            </div>
          </div>

          {/* 기록 아이템 2 */}
          <div className="flex items-center gap-3 p-3 border-b">
            <div className="text-2xl">🏃</div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">1월 17일</span>
              <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">토</span>
              <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded">수정</span>
            </div>
            <div className="flex gap-3 ml-auto text-sm">
              <span>6.0</span>
              <span>35분</span>
              <span>5:00</span>
              <span>4회</span>
            </div>
          </div>
        </div>
      </div>
      {/* 평균 페이스 통계 */}
      <div>
        <h2> 평균 페이스 통계</h2>
        {/* 2개 컬럼*/}
        <div className="flex justify-center gap-4">
          <div className="text-center p-4 rounded-lg border border-gray-200">
            <p className="text-gray-500">주간페이스 평균</p>
            <p className="text-3xl font-bold">6:15 /km</p>
          </div>
          <div className="text-center p-4 rounded-lg border border-gray-200">
            <p className="text-gray-500">월간페이스 평균</p>
            <p className="text-3xl font-bold">6:35 /km</p>
          </div>
        </div>
      </div>
    </>
  );
}
