import { create } from "zustand";

interface WeeklyStats {
  totalDistance: number;
  averagePace: string;
  weeklyRuns: number;
}
interface MonthlyStats {
  totalDistance: number;
  averagePace: string;
  monthlyRuns: number;
}
//store 상태
interface StatsState {
  weeklyStats: WeeklyStats | null;
  monthlyStats: MonthlyStats | null;
  recentPace: string | null; // 최근 2개의 기록의 평균 페이스

  setWeeklyStats: (state: WeeklyStats) => void;
  setMonthlyStats: (state: MonthlyStats) => void;
  setRecentPace: (pace: string) => void; // 최근 2개의 기록의 평균 페이스
  resetStats: () => void;
}

// Store 생성
const useStatsStore = create<StatsState>((set) => ({
  weeklyStats: null,
  monthlyStats: null,
  recentPace: null,

  setWeeklyStats: (stats) => set({ weeklyStats: stats }),
  setMonthlyStats: (stats) => set({ monthlyStats: stats }),
  setRecentPace: (pace) => set({ recentPace: pace }),
  resetStats: () => set({ weeklyStats: null, monthlyStats: null }),
}));

export default useStatsStore;
