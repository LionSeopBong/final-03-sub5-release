// app/lib/recordsAPI.ts
import fetchAPI from "@/app/lib/api";
import type { RunningRecord, ApiResponse, ApiListResponse } from "@/app/lib/types";

// 내 기록 목록 조회 (로그인 필요)
export function getMyRecords(token: string) {
  return fetchAPI(`/posts/users`, { token }) as Promise<ApiListResponse<RunningRecord>>;
}

// 전체 기록 목록 조회
export function getAllRecords() {
  return fetchAPI(`/posts?type=record`) as Promise<ApiListResponse<RunningRecord>>;
}

// 기록 상세 조회
export function getRecord(_id: string) {
  return fetchAPI(`/posts/${_id}`) as Promise<ApiResponse<RunningRecord>>;
}

// 기록 추가 (로그인 필요)
export function createRecord(
  data: {
    title: string;
    content?: string;
    extra: {
      date: string;
      duration: string;
      distance: number;
      pace: string;
      exerciseType: string;
      location?: string;
      calories?: number;
    };
  },
  token: string,
) {
  return fetchAPI(`/posts`, {
    method: "POST",
    body: {
      type: "record", // 👈 필수!
      ...data,
    },
    token,
  }) as Promise<ApiResponse<RunningRecord>>;
}

// 기록 수정 (로그인 필요)
export function updateRecord(
  _id: string,
  data: Partial<{
    title: string;
    content?: string;
    extra: object;
  }>,
  token: string,
) {
  return fetchAPI(`/posts/${_id}`, {
    method: "PATCH",
    body: data,
    token,
  }) as Promise<ApiResponse<RunningRecord>>;
}

// 기록 삭제 (로그인 필요)
export function deleteRecord(_id: string, token: string) {
  return fetchAPI(`/posts/${_id}`, {
    method: "DELETE",
    token,
  }) as Promise<ApiResponse<{}>>;
}
