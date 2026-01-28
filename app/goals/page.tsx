import Link from "next/link";

export default function GoalsPage() {
  return (
    <main className="flex flex-col items-center px-4 py-6 w-full ">
      {/* 컨테이너 - 모바일 최대 너비 제한 */}
      <div
        className="w-full min-w-[320px]  min-w-[375px] 
    max-w-[767px]      
    md:max-w-[375px]   flex flex-col gap-4 px-4"
      >
        {/* 탭 LevelIcon 상단 */}
        <section className="flex flex-col items-center">
          <span className="text-5xl">🌱</span>
          <span className="mb-6 text-2xl">당신의 러닝 레벨</span>
          <span className="inline-block px-4 py-1 mb-2 bg-[#1FC0CC] rounded-full text-xs text-notselectbtn">
            초급
          </span>
        </section>

        {/* 메인 중간 : 분석결과 카드 */}
        <section className="flex flex-col rounded-xl border border-gray-400 gap-3 px-5 py-5">
          <h2 className="text-3xl  text-center font-semibold mb-4 ">
            🏆 분석된 러닝 기록
          </h2>
          <dl className="w-full">
            <div className="flex justify-between w-full gap-3 px-2 pb-5 py-2">
              <dt>평균 페이스</dt>
              <dd className="font-semibold">기록없음</dd>
            </div>
            <div className="flex justify-between w-full gap-3 px-2 pb-5 py-2">
              <dt>완주 거리 (누적 거리)</dt>
              <dd className="font-semibold">기록없음</dd>
            </div>
            <div className="flex justify-between w-full gap-3 px-2 pb-5 py-2">
              <dt>월간 러닝 횟수</dt>
              <dd className="font-semibold">기록없음</dd>
            </div>
          </dl>
        </section>

        {/* 버튼들 */}
        <div className="flex flex-col gap-3">
          <Link
            href="/goals/recommend"
            className="bg-primary py-2 w-full rounded-lg text-center text-notselectbtn"
          >
            초급 목표 추천 받기
          </Link>
          <Link
            href="/goals/my"
            className="bg-primary py-2 w-full rounded-lg text-center text-notselectbtn"
          >
            내 목표
          </Link>
        </div>

        {/* 네비게이션 */}
      </div>
    </main>
  );
}
