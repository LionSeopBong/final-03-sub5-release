export interface User {
  _id: number;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  type: string;
  image?: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RunningRecord {
  _id: number;
  type: string;
  title: string;
  content?: string;
  user: {
    _id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  //custom field
  extra: {
    date: string; // 운동 날짜 "2024-01-29"
    duration: string; // 운동 시간 "00:30:00"
    distance: number; // 거리 (km)
    pace: string; // 평균 페이스 "6:00"
    exerciseType: string; // 러닝, 러닝머신, 하이킹, 인터벌
    location?: string; // 운동 장소
    calories?: number; // 소모 칼로리
    memo?: string;
  };
}
// 단일 조회
export interface ApiResponse<T> {
  ok: 1 | 0;
  item: T;
}
// API 응답 타입 (목록 조회)
export interface ApiListResponse<T> {
  ok: 1 | 0;
  item: T[];
}
// 통계는 별도 인터페이스
// 주간 통계
export interface WeeklyStats {
  totalDistance: number;
  averagePace: string;
  weeklyRuns: number;
}
// 월간 통계
export interface MonthlyStats {
  totalDistance: number;
  averagePace: string;
  monthlyRuns: number;
}
