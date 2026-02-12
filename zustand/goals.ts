import {
  GoalResponse,
  LevelInfo,
  leveltype,
  RecommendGoal,
} from "@/app/goals/types";
import { create } from "zustand";

interface GoalState {
  //1. 목표 정보를 관리하는 상태 -저장할 데이터 (변수)
  userLevel: LevelInfo | null; //메인페이지용
  goals: GoalResponse[]; //내 목표 목록
  filter: string; //필터(전체/진행중/ 미완료 / 완료 )
  level: leveltype; //추천 페이지용
  selectedGoals: RecommendGoal[]; //(카드 정보 통째로 저장)

  //2. 목표 정보를 관리하는 액션- 상태를 변경하는 함수
  setUserLevel: (userLevel: LevelInfo) => void;
  setGoals: (goals: GoalResponse[]) => void;
  setFilter: (filter: string) => void;
  setLevel: (level: leveltype) => void;
  setSelectedGoals: (goals: RecommendGoal[]) => void;
}
const useGoalsStore = create<GoalState>((set) => ({
  // 초기값
  userLevel: null,
  goals: [],
  filter: "전체",
  level: "초급",
  selectedGoals: [],
  // 액션
  setUserLevel: (userLevel) => set({ userLevel }),
  setGoals: (goals) => set({ goals }),
  setFilter: (filter) => set({ filter }),
  setLevel: (level) => set({ level }),
  setSelectedGoals: (goals) => set({ selectedGoals: goals }), // goals 받아서 → selectedGoals에 저장
}));
export default useGoalsStore;
