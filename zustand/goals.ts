import { GoalResponse, LevelInfo, leveltype } from "@/app/goals/types";
import { create } from "zustand";

interface GoalState {
  //1. 목표 정보를 관리하는 상태 -저장할 데이터 (변수)
  userLevel: LevelInfo | null; //메인페이지용
  goals: GoalResponse[]; //내 목표 목록
  filter: string; //필터(전체/진행중/ 미완료 / 완료 )
  level: leveltype; //추천 페이지용

  //2. 목표 정보를 관리하는 액션- 상태를 변경하는 함수
  setUserLevel: (userLevel: LevelInfo) => void;
  setGoals: (goals: GoalResponse[]) => void;
  setFilter: (filter: string) => void;
  setLevel: (level: leveltype) => void;
}
const useGoalsStore = create<GoalState>((set) => ({
  // 초기값
  userLevel: null,
  goals: [],
  filter: "전체",
  level: "초급",

  // 액션
  setUserLevel: (userLevel) => set({ userLevel }),
  setGoals: (goals) => set({ goals }),
  setFilter: (filter) => set({ filter }),
  setLevel: (level) => set({ level }),
}));
export default useGoalsStore;
