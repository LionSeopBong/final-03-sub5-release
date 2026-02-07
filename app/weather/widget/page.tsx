"use client";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function ForcastPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-white ">
      <div className="mx-auto w-full max-w-md px-5 pb-10">
        {/* 뒤로가기 bar */}
        <div className="h-12 flex items-center">
          <Link href="/weather" className="p-2 -ml-2">
            {/* 뒤로가기 icon */}
            <Image
              src="/icons/arrow_back.svg"
              alt="뒤로가기"
              width={24}
              height={24}
              priority
            />
          </Link>
        </div>

        <div className="bg-gray-50 flex justify-center py-8">
          <div className="w-full max-w-md px-4">
            {/* 검색바 */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="위치를 검색하세요"
                className="w-full rounded-full px-5 py-3 pr-12 shadow-sm border text-sm focus:outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <img src="/icon/search--local.svg" />
              </span>
            </div>

            {/* 위치 */}
            <p className="text-red-400 font-semibold mb-4">역삼동</p>
            {/* 일별 예보 */}
            <div className="bg-white rounded-xl p-4 shadow mb-6">
              <p className="text-sm text-gray-400 mb-3">일별 예보</p>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[600px] border-collapse text-[10px] text-center">
                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-t border-gray-100 items-stretch">
                    <div className="flex items-center justify-center bg-gray-50 font-medium border-r border-gray-100">
                      날짜
                    </div>
                    <div className="py-2 bg-blue-50 border-x border-blue-200">
                      <p className="font-bold">21일(수)</p>
                      <p className="text-blue-500 text-[9px]">오늘</p>
                    </div>
                    <div className="py-2 border-r border-gray-100">
                      22일(목)
                      <p className="text-gray-400 text-[9px]">내일</p>
                    </div>
                    <div className="py-2 border-r border-gray-100">
                      23일(금)
                      <p className="text-gray-400 text-[9px]">모레</p>
                    </div>
                    <div className="py-2 border-r border-gray-100 text-blue-500">
                      24일(토)
                    </div>
                    <div className="py-2 border-r border-gray-100 text-red-500">
                      25일(일)
                    </div>
                    <div className="py-2 border-r border-gray-100">
                      26일(월)
                    </div>
                    <div className="py-2 border-r border-gray-100">
                      27일(화)
                    </div>
                    <div className="py-2 border-r border-gray-100">
                      28일(수)
                    </div>
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-gray-100">
                    <div className="py-1 bg-gray-50 font-medium border-r border-gray-100">
                      시각
                    </div>
                    <div className="col-span-1 grid grid-cols-2 bg-blue-50 border-x border-blue-200">
                      <span className="border-r border-blue-100">오전</span>
                      <span>오후</span>
                    </div>
                    <div className="col-span-1 grid grid-cols-2 border-r border-gray-100">
                      <span className="border-r border-gray-100">오전</span>
                      <span>오후</span>
                    </div>
                    <div className="col-span-1 grid grid-cols-2 border-r border-gray-100">
                      <span className="border-r border-gray-100">오전</span>
                      <span>오후</span>
                    </div>
                    <div className="col-span-1 grid grid-cols-2 border-r border-gray-100">
                      <span className="border-r border-gray-100">오전</span>
                      <span>오후</span>
                    </div>
                    <div className="col-span-1 grid grid-cols-2 border-r border-gray-100">
                      <span className="border-r border-gray-100">오전</span>
                      <span>오후</span>
                    </div>
                    <div className="col-span-1 grid grid-cols-2 border-r border-gray-100">
                      <span className="border-r border-gray-100">오전</span>
                      <span>오후</span>
                    </div>
                    <div className="col-span-1 grid grid-cols-2 border-r border-gray-100">
                      <span className="border-r border-gray-100">오전</span>
                      <span>오후</span>
                    </div>
                    <div className="col-span-1 grid grid-cols-2 border-r border-gray-100">
                      <span className="border-r border-gray-100">오전</span>
                      <span>오후</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-gray-100">
                    <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                      날씨
                    </div>
                    <div className="grid grid-cols-2 bg-blue-50 border-x border-blue-200">
                      <span>-</span>
                      <span>☀️</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>☀️</span>
                      <span>☀️</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>☀️</span>
                      <span>🌤️</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>☀️</span>
                      <span>☀️</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>☀️</span>
                      <span>☀️</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>🌤️</span>
                      <span>🌤️</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>☀️</span>
                      <span>☀️</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>☀️</span>
                      <span>☀️</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-gray-100">
                    <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                      기온
                    </div>
                    <div className="grid grid-cols-2 bg-blue-50 border-x border-blue-200 px-1">
                      <span className="text-blue-500">-14°</span>
                      <span className="text-red-500">-5°</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100 px-1">
                      <span className="text-blue-500">-14°</span>
                      <span className="text-red-500">-5°</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100 px-1">
                      <span className="text-blue-500">-11°</span>
                      <span className="text-red-500">-2°</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100 px-1">
                      <span className="text-blue-500">-10°</span>
                      <span className="text-red-500">-2°</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100 px-1">
                      <span className="text-blue-500">-10°</span>
                      <span className="text-red-500">-2°</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100 px-1">
                      <span className="text-blue-500">-8°</span>
                      <span className="text-red-500">-1°</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100 px-1">
                      <span className="text-blue-500">-8°</span>
                      <span className="text-red-500">0°</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100 px-1">
                      <span className="text-blue-500">-8°</span>
                      <span className="text-red-500">-1°</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)]">
                    <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                      강수확률
                    </div>
                    <div className="grid grid-cols-2 bg-blue-50 border-x border-blue-200">
                      <span>-</span>
                      <span>0%</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>0%</span>
                      <span>0%</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>10%</span>
                      <span>10%</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>0%</span>
                      <span>0%</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>10%</span>
                      <span>20%</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>30%</span>
                      <span>20%</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>20%</span>
                      <span>10%</span>
                    </div>
                    <div className="grid grid-cols-2 border-r border-gray-100">
                      <span>10%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 시간별 예보 */}
            <div className="bg-white rounded-xl p-4 shadow mb-6">
              <p className="text-sm text-gray-400 mb-3">시간별 예보</p>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[700px] text-[10px] text-center border-collapse">
                  <div className="grid grid-cols-[60px_repeat(11,1fr)] border-b border-t border-gray-100 bg-gray-50/50">
                    <div className="py-2 font-medium border-r border-gray-100 bg-gray-50">
                      시각
                    </div>
                    <div className="py-2 border-r border-gray-100">12시</div>
                    <div className="py-2 border-r border-gray-100">15시</div>
                    <div className="py-2 border-r border-gray-100">18시</div>
                    <div className="py-2 border-r border-gray-100 font-bold text-blue-600 bg-blue-50/50">
                      21시
                    </div>
                    <div className="py-2 border-r border-gray-100">0시</div>
                    <div className="py-2 border-r border-gray-100">03시</div>
                    <div className="py-2 border-r border-gray-100">06시</div>
                    <div className="py-2 border-r border-gray-100">09시</div>
                    <div className="py-2 border-r border-gray-100">12시</div>
                    <div className="py-2 border-r border-gray-100">15시</div>
                    <div className="py-2">18시</div>
                  </div>

                  <div className="grid grid-cols-[60px_repeat(11,1fr)] border-b border-gray-100">
                    <div className="py-3 bg-gray-50 font-medium border-r border-gray-100 flex items-center justify-center">
                      날씨
                    </div>
                    <div className="py-3 text-lg">☀️</div>
                    <div className="py-3 text-lg">☀️</div>
                    <div className="py-3 text-lg">☀️</div>
                    <div className="py-3 text-lg bg-blue-50/30">🌙</div>
                    <div className="py-3 text-lg">🌙</div>
                    <div className="py-3 text-lg">🌙</div>
                    <div className="py-3 text-lg">🌙</div>
                    <div className="py-3 text-lg">☀️</div>
                    <div className="py-3 text-lg">☀️</div>
                    <div className="py-3 text-lg">☀️</div>
                    <div className="py-3 text-lg">☀️</div>
                  </div>

                  <div className="grid grid-cols-[60px_1fr] relative h-24 border-b border-gray-100">
                    <div className="bg-gray-50 font-medium border-r border-gray-100 flex items-center justify-center">
                      기온
                    </div>
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 grid grid-cols-11 items-start pt-2 z-10">
                        <span>-9°</span>
                        <span>-7°</span>
                        <span>-9°</span>
                        <span className="font-bold text-blue-600">-11°</span>
                        <span>-13°</span>
                        <span>-14°</span>
                        <span>-14°</span>
                        <span>-14°</span>
                        <span>-9°</span>
                        <span>-7°</span>
                        <span>-9°</span>
                      </div>
                      <svg
                        className="absolute bottom-4 left-0 w-full h-12 overflow-visible"
                        preserveAspectRatio="none"
                      >
                        <polyline
                          fill="none"
                          stroke="#3b82f6"
                          stroke-width="1.5"
                          points="30,30 90,10 150,30 210,50 270,70 330,80 390,80 450,80 510,30 570,10 630,30"
                          vector-effect="non-scaling-stroke"
                        />
                        <circle cx="210" cy="50" r="3" fill="#3b82f6" />
                      </svg>
                    </div>
                  </div>

                  <div className="grid grid-cols-[60px_repeat(11,1fr)] border-b border-gray-100 text-gray-500">
                    <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                      체감온도
                    </div>
                    <div className="py-2">-13°</div>
                    <div className="py-2">-12°</div>
                    <div className="py-2">-14°</div>
                    <div className="py-2 bg-blue-50/30 font-semibold">-16°</div>
                    <div className="py-2">-19°</div>
                    <div className="py-2">-20°</div>
                    <div className="py-2">-20°</div>
                    <div className="py-2">-20°</div>
                    <div className="py-2">-15°</div>
                    <div className="py-2">-13°</div>
                    <div className="py-2">-14°</div>
                  </div>

                  <div className="grid grid-cols-[60px_repeat(11,1fr)] border-b border-gray-100 text-gray-500">
                    <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                      강수확률
                    </div>
                    <div className="py-2">10%</div>
                    <div className="py-2">10%</div>
                    <div className="py-2">0%</div>
                    <div className="py-2 bg-blue-50/30">0%</div>
                    <div className="py-2">0%</div>
                    <div className="py-2">0%</div>
                    <div className="py-2">0%</div>
                    <div className="py-2">0%</div>
                    <div className="py-2">0%</div>
                    <div className="py-2">0%</div>
                    <div className="py-2">10%</div>
                  </div>
                </div>
              </div>
            </div>
            {/*{/* 시간별 예보 끝*/}
          </div>
        </div>
      </div>
    </main>
  );
}
