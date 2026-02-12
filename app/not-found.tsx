// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center">
        {/* 일러스트 느낌 배지 */}
        <div className="relative mt-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-100 shadow-sm">
          <span className="text-4xl">🏃‍♀️</span>
          <span className="absolute -right-2 -top-2 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white">
            404
          </span>
        </div>

        {/* 타이틀/설명 */}
        <h1 className="mt-8 text-center text-2xl font-semibold text-gray-900">
          길을 잠깐 잃었어요
        </h1>
        <p className="mt-3 text-center text-sm leading-6 text-gray-500">
          찾으려는 페이지가 없거나 주소가 변경됐을 수 있어요.
          <br />
          홈으로 돌아가서 다시 달려볼까요?
        </p>

        {/* 버튼 */}
        <div className="mt-8 grid w-full gap-3">
          <Link
            href="/home"
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-gray-900 text-sm font-semibold text-white"
          >
            홈으로 가기
          </Link>

          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-gray-100 text-sm font-semibold text-gray-900"
          >
            랜딩으로 가기
          </Link>
        </div>

        {/* 작은 안내 */}
        <div className="mt-8 w-full rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">
            계속 문제가 생기면, 주소를 다시 확인하거나 앱을 새로고침해 주세요.
          </p>
        </div>
      </div>
    </main>
  );
}
