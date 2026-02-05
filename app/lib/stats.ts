import { RunningRecord } from "@/app/lib/types";

// 주간 기록
export function calculateWeeklyStats(records: RunningRecord[]) {
  const today = new Date();
  const day = today.getDay(); // 0 = 일요일

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - day);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const weeklyRecords = records.filter((record) => {
    const recordDate = new Date(record.extra.date);
    return recordDate >= startOfWeek && recordDate <= endOfWeek;
  });

  const totalDistance = weeklyRecords.reduce((sum, record) => sum + (record.extra.distance || 0), 0);

  const weeklyRuns = weeklyRecords.length;
  const averagePace = calculateAveragePace(weeklyRecords);

  return {
    totalDistance: Math.round(totalDistance * 10) / 10,
    averagePace,
    weeklyRuns,
  };
}

//월간 기록
export function calculateMonthlyStats(records: RunningRecord[]) {
  // 이번 달 1일 0시
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  // 이번 달 기록만 필터링
  const monthlyRecords = records.filter((record) => {
    const recordDate = new Date(record.extra.date);
    return recordDate >= startOfMonth;
  });

  // 총 거리
  const totalDistance = monthlyRecords.reduce((sum, record) => sum + (record.extra.distance || 0), 0);

  // 총 횟수
  const monthlyRuns = monthlyRecords.length;

  // 평균 페이스
  const averagePace = calculateAveragePace(monthlyRecords);

  return {
    totalDistance: Math.round(totalDistance * 10) / 10,
    averagePace,
    monthlyRuns,
  };
}
// 페이스 계산
function calculateAveragePace(records: RunningRecord[]): string {
  if (records.length === 0) return "0:00";

  // 모든 페이스를 초 단위로 변환
  const totalSeconds = records.reduce((sum, record) => {
    const pace = record.extra.pace;
    if (!pace) return sum;

    const [min, sec] = pace.split(":").map(Number);
    return sum + (min * 60 + sec);
  }, 0);

  // 평균 계산
  const avgSeconds = totalSeconds / records.length;
  const avgMin = Math.floor(avgSeconds / 60);
  const avgSec = Math.round(avgSeconds % 60);

  return `${avgMin}:${avgSec.toString().padStart(2, "0")}`;
}

export function calculateRecentPace(records: RunningRecord[], count: number = 2): string {
  if (records.length === 0) return "0:00";

  const sortedRecords = [...records].sort((a, b) => {
    return new Date(b.extra.date).getTime() - new Date(a.extra.date).getTime();
  });

  const recentRecords = sortedRecords.slice(0, Math.min(count, sortedRecords.length));
  if (recentRecords.length === 0) return "0:00";
  // 평균 페이스 계산
  const totalSeconds = recentRecords.reduce((sum, record) => {
    const pace = record.extra.pace;
    if (!pace) return sum;

    const [min, sec] = pace.split(":").map(Number);
    return sum + (min * 60 + sec);
  }, 0);
  const avgSeconds = totalSeconds / recentRecords.length;
  const avgMin = Math.floor(avgSeconds / 60);
  const avgSec = Math.round(avgSeconds % 60);
  return `${avgMin}:${avgSec.toString().padStart(2, "0")}`;
}
