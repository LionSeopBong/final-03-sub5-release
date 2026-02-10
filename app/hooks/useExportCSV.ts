import { RunningRecord } from "@/app/lib/types";

export function useExportCSV(data: RunningRecord[]) {
  const exportData = () => {
    const headers = "Num,날짜,운동시간,거리(km),페이스,운동타입,장소,칼로리";
    const sortedData = [...data].sort((a, b) => new Date(b.extra.date).getTime() - new Date(a.extra.date).getTime());
    const rows = sortedData.map((record, index) => {
      const date = record.extra.date;
      const duration = record.extra.duration;
      const distance = record.extra.distance;
      const pace = record.extra.pace;
      const exerciseType = record.extra?.exerciseType || "미입력";
      const location = record.extra?.location || "미입력";
      const calories = record.extra?.calories || 0;
      return `${index + 1},${date},${duration},${distance},${pace},${exerciseType},${location},${calories}`;
    });
    const csvString = [headers, ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "running-record.csv";
    link.click();

    URL.revokeObjectURL(url);
  };
  return { exportData };
}
