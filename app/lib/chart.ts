import { RunningRecord } from "@/app/lib/types";

export function getMonthlyDistanceChartData(records: RunningRecord[], baseDate = new Date()) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();

  // 이번 달 마지막 날짜
  const lastDate = new Date(year, month + 1, 0).getDate();

  const chartData = [];

  for (let day = 1; day <= lastDate; day++) {
    const dateString = new Date(year, month, day).toISOString().split("T")[0];

    const dailyRecords = records.filter((r) => r.extra?.date === dateString);

    const totalDistance = dailyRecords.reduce((sum, r) => sum + (r.extra?.distance || 0), 0);

    chartData.push({
      day, // 1, 2, 3 ...
      distance: totalDistance,
      date: dateString,
    });
  }

  return chartData;
}
export function getWeeklyChartData(records: RunningRecord[], baseDate = new Date()) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const chartData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() - i);

    const dateString = date.toISOString().split("T")[0];
    const dayName = days[date.getDay()];

    const record = records.find((r) => r.extra?.date === dateString);

    chartData.push({
      day: dayName,
      distance: record?.extra?.distance ?? 0,
      date: dateString,
    });
  }

  return chartData;
}
