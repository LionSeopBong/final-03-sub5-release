// @/lib/runningTips.ts
import type { KmaObservation } from "@/types/kma";

export function getRunningTip(
  score: number,
  obs: KmaObservation,
): string {
  // 위험
  if (score < 20) {
    return "기상 조건이 매우 좋지 않습니다. 오늘은 실내 운동이나 휴식을 권장합니다.";
  }

  // 나쁨
  if (score < 40) {
    if (obs.WW >= 40) {
      return "비나 눈이 동반되고 있습니다. 미끄럼에 주의하고 러닝은 짧게 하세요.";
    }
    if (obs.WS >= 7) {
      return "강한 바람이 불고 있습니다. 심박 기준으로 페이스를 조절하세요.";
    }
    return "컨디션 유지 위주의 가벼운 조깅이 적합합니다.";
  }

  // 보통
  if (score < 60) {
    if (obs.HM >= 80) {
      return "습도가 높습니다. 페이스를 낮추고 수분 보충에 신경 쓰세요.";
    }
    if (obs.CA_TOT >= 7) {
      return "흐린 날씨입니다. 체감온도는 낮지만 노면 상태를 확인하세요.";
    }
    return "무리하지 않는 이지런이나 회복 러닝이 좋습니다.";
  }

  // 양호
  if (score < 80) {
    if (obs.WS >= 5) {
      return "가벼운 바람이 불고 있습니다. 호흡을 안정시키며 페이스를 유지하세요.";
    }
    return "컨디션이 양호합니다. 평소 루틴 러닝에 적합한 날씨입니다.";
  }

  // 최적
  return "러닝하기에 매우 좋은 날씨입니다. 템포런이나 인터벌 훈련도 좋습니다!";
}
