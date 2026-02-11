export default function WeatherCardSkeleton() {
  return (
    <div className="bg-sky-50 border border-gray-200 rounded-xl p-5 shadow-sm space-y-6 animate-pulse">
      {/* 위치 + 시간 */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="h-3 w-20 rounded bg-gray-200" />
      </div>

      {/* 아이콘 + 온도 */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="h-8 w-20 rounded bg-gray-200" />
      </div>

      {/* 정보 카드 */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[70px] h-16 rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
