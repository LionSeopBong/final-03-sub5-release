export default function Loading() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="rounded-3xl bg-white shadow-sm border border-gray-100 p-8">
          {/* 로고/아이콘 영역 */}
          <div className="flex flex-col items-center">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-xl">M</span>
            </div>

            <h1 className="mt-4 text-base font-semibold text-gray-900">
              로그인 처리 중
            </h1>
            <p className="mt-1 text-sm text-gray-500 text-center">
              잠시만 기다려 주세요. 계정을 확인하고 있어요.
            </p>
          </div>

          {/* 로딩 스피너 */}
          <div className="mt-8 flex items-center justify-center">
            <div
              className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-primary animate-spin"
              aria-label="loading"
            />
          </div>

          {/* 진행바 */}
          <div className="mt-8">
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full w-1/3 bg-primary/60 rounded-full animate-pulse" />
            </div>
            <p className="mt-3 text-center text-xs text-gray-400">
              인증 정보를 처리하는 중입니다...
            </p>
          </div>
        </div>

        {/* 하단 안내 */}
        <p className="mt-6 text-center text-xs text-gray-400">
          문제가 계속되면 다시 로그인해 주세요.
        </p>
      </div>
    </main>
  );
}
