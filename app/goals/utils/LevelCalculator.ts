import { LevelInfo, leveltype, UserStatus } from "../types/index";

export function calculateLevel({ pace, totalDistance }: LevelInfo) {
  const paceNum = Number(pace);
  if (totalDistance === 0 || paceNum >= 5.5) {
    return "초급";
  } else if (paceNum >= 4.5 && paceNum < 5.5) {
    return "중급";
  } else {
    return "고급";
  }
}
export function getUserStatus(monthlyRuns: number): UserStatus {
  if (monthlyRuns < 3) {
    return "신규";
  }
  return "꾸준";
}
