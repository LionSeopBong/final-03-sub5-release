export default function GoalStats() {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {/* 통계를 가로로 배치 */}
        <div className="flex justify-around text-center">
          <div>
            <dd className="text-2xl font-bold text-gray-700 mb-2">1</dd>
            <dt className="text-sm text-gray-600">완료한 목표</dt>
          </div>
          <div className="h-16 w-px bg-gray-200"></div>
          <div>
            <dd className="text-2xl font-bold text-gray-700 mb-2">1</dd>
            <dt className="text-sm text-gray-600">진행중</dt>
          </div>
          <div className="h-16 w-px bg-gray-200"></div>
          <div>
            <dd className="text-2xl font-bold text-gray-700 mb-2">1</dd>
            <dt className="text-sm text-gray-600">남은 목표</dt>
          </div>
        </div>
      </div>
    </>
  );
}
