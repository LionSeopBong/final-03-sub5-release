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
  setWeeklyStats: (state: WeeklyStats) => void;
  setMonthlyStats: (state: MonthlyStats) => void;
  resetStats: () => void;
}

// Store 생성
const useStatsStore = create<StatsState>((set) => ({
  weeklyStats: null,
  monthlyStats: null,
  setWeeklyStats: (stats) => set({ weeklyStats: stats }),
  setMonthlyStats: (stats) => set({ monthlyStats: stats }),
  resetStats: () => set({ weeklyStats: null, monthlyStats: null }),
}));

export default useStatsStore;
