// index.ts
export type leveltype = "초급" | "중급" | "고급";
export type UserStatus = "신규" | "복귀" | "꾸준";
export type GoalStatus = "전체" | "진행중" | "미완료" | "완료";

export interface LevelInfo {
  userId: number;
  level: leveltype;
  icon: string;
  pace: number;
  totalDistance: number;
  monthlyRuns: number;
}

// 사용자 목표 타입
export interface MyGoal {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  level: leveltype;
  status: GoalStatus;
  progress: number; // 진행률 (0-100)
  startDate: string; // 시작일
}
export interface RecommendGoal {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  status?: string;
}
//내 목표
export interface GoalResponse {
  _id: number;
  type: string;
  title: string;
  extra: {
    level: string;
    status: string;
    subtitle: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}
