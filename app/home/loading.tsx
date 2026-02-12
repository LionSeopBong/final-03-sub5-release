export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-[430px] px-5 pt-14 pb-28">
      {/* 상단 로그인 처리 안내 */}
      <section className="mt-2 text-center">
        <div className="mx-auto h-6 w-44 animate-pulse rounded bg-gray-200" />
        <div className="mx-auto mt-3 h-4 w-64 animate-pulse rounded bg-gray-200" />

        <p className="mt-4 text-sm text-gray-500">로그인 처리 중입니다...</p>
      </section>

      {/* 배너 영역 자리 */}
      <section className="mt-8">
        <div className="h-16 w-full animate-pulse rounded-2xl bg-gray-200" />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="h-12 w-full animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-12 w-full animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </section>

      {/* 카드 리스트 자리 */}
      <section className="mt-6 space-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <article
            key={i}
            className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-gray-200" />

            <div className="flex-1 space-y-3">
              <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />

              <div className="mt-4 flex items-center gap-2">
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                <div className="ml-auto h-6 w-12 animate-pulse rounded-full bg-gray-200" />
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
