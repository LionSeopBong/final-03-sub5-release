export interface RunningRecord {
  _id: number;
  type: "record";
  title: string;
  content?: string; // 메모
  //기존 field
  user: {
    _id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  //custom field
  date: string; // 운동 날짜 "2024-01-29"
  duration: string; // 운동 시간 "00:30:00"
  distance: number; // 거리 (km)
  pace: string; // 평균 페이스 "6:00"
  exerciseType: string; // 러닝, 러닝머신, 하이킹, 인터벌
  location?: string; // 운동 장소
  calories?: number; // 소모 칼로리
}
// 단일 조회
export interface ApiResponse<T> {
  ok: 1 | 0;
  item: T;
}
// API 응답 타입 (목록 조회)
export interface ApiListResponse<T> {
  ok: 1 | 0;
  items: T[];
}
