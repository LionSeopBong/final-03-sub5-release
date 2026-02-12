// @/lib/runningAnalysis.ts
import type { KmaObservation, AnalysisFactor } from "@/types/kma";


export function getAnalysisFactors(
  obs: KmaObservation,
): AnalysisFactor[] {
  const factors: AnalysisFactor[] = [];

  // 1. 기상현상
  if (obs.WW >= 50)
    factors.push({ label: "악천후", penalty: 30 });
  else if (obs.WW >= 40)
    factors.push({ label: "안개 미세먼지", penalty: 20 });
  else if (obs.WW >= 20)
    factors.push({ label: "박무/연무", penalty: 10 });

  // 2. 기온
  if (obs.TA < -5)
    factors.push({ label: "기온 매우 낮음", penalty: 20 });
  else if (obs.TA < 0)
    factors.push({ label: "기온 낮음", penalty: 15 });
  else if (obs.TA < 10)
    factors.push({ label: "다소 쌀쌀함", penalty: 5 });
  else if (obs.TA > 35)
    factors.push({ label: "폭염", penalty: 20 });
  else if (obs.TA > 30)
    factors.push({ label: "더운 날씨", penalty: 10 });
  else if (obs.TA > 25)
    factors.push({ label: "약간 더움", penalty: 5 });

  // 3. 풍속
  if (obs.WS >= 10)
    factors.push({ label: "강풍", penalty: 15 });
  else if (obs.WS >= 7)
    factors.push({ label: "바람 강함", penalty: 10 });
  else if (obs.WS >= 5)
    factors.push({ label: "바람 있음", penalty: 5 });

  // 4. 가시거리
  if (obs.VS < 1000)
    factors.push({ label: "가시거리 매우 나쁨", penalty: 15 });
  else if (obs.VS < 3000)
    factors.push({ label: "가시거리 나쁨", penalty: 10 });
  else if (obs.VS < 5000)
    factors.push({ label: "가시거리 보통", penalty: 5 });

  // 5. 구름량
  if (obs.CA_TOT >= 9)
    factors.push({ label: "흐린 날씨", penalty: 10 });
  else if (obs.CA_TOT >= 7)
    factors.push({ label: "구름 많음", penalty: 5 });

  // 6. 습도
  if (obs.HM >= 90)
    factors.push({ label: "습도 매우 높음", penalty: 10 });
  else if (obs.HM >= 80)
    factors.push({ label: "습도 높음", penalty: 7 });
  else if (obs.HM >= 70)
    factors.push({ label: "습도 다소 높음", penalty: 3 });

  return factors;
}
