export default function RunningCard() {
  return (
    <>
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
    </>
  );
}
