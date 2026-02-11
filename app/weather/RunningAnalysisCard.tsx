"use client";

import Image from "next/image";
import type { KmaObservation } from "@/types/kma";
import { outdoorScore, outdoorGrade } from "@/lib/utils";
import { getRunningTip } from "@/lib/runningTips";
import { getAnalysisFactors } from "@/lib/runningAnalysis";
import { useMemo } from "react";
import RunningAnalysisCardSkeleton from "./RunningAnalysisCardSkeleton";

interface RunningAnalysisCardProps {
  weather: KmaObservation | null;
}

export default function RunningAnalysisCard({
  weather,
}: RunningAnalysisCardProps) {

  // ✅ Hook은 항상 실행
  const analysis = useMemo(() => {
    if (!weather) return null;

    const score = outdoorScore(weather);
    const grade = outdoorGrade(score);
    const factors = getAnalysisFactors(weather);
    const tip = getRunningTip(score, weather);

    return { score, grade, factors, tip };
  }, [weather]);

  // ✅ Hook 아래에서만 조건부 렌더
  if (!analysis) {
    return <RunningAnalysisCardSkeleton />;
  }

  const { score, grade, factors, tip } = analysis;

  return (
    <div className="min-w-[375px] items-stretch p-4">
      <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        {/* 헤더 */}
        <div className="flex items-center gap-2">
          <Image src="/icons/cbi--bulb.svg" width={24} height={24} alt="" />
          <h2>러닝 최적도 분석</h2>
        </div>

        <p className="text-xs text-gray-500">현재 날씨 기준 러닝 가이드</p>

        {/* 점수 요약 */}
        <div className="flex items-center gap-3 p-3">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
            <Image
              src="/icons/picon--rise.svg"
              width={24}
              height={24}
              alt="분석"
            />
          </div>
          <div>
            <div className="font-semibold text-green-700">
              러닝하기 {grade}
            </div>
            <div className="text-xs text-gray-600">
              점수 {score}점 기준 분석
            </div>
          </div>
        </div>

        {/* 분석요인 */}
        <div className="bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl p-3">
          분석요인
          <ul className="mt-1 space-y-0.5 text-gray-500 font-normal">
            {factors.length === 0 ? (
              <li>모든 조건이 양호합니다</li>
            ) : (
              factors.map((f, i) => (
                <li key={i}>
                  • {f.label}
                  <span className="text-gray-400"> (-{f.penalty})</span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* 러닝 팁 */}
        <div className="bg-blue-50 text-blue-700 text-xs rounded-xl p-3">
          러닝 팁
          <br />
          <span className="text-gray-900">{tip}</span>
        </div>
      </div>
    </div>
  );
}
