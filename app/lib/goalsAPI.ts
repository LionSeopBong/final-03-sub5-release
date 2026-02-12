// import { fetchAPI } from "@/app/lib/api";
//  Step 1: goalsAPI.ts 만들기

//   app/lib/recordsAPI.ts를 참고해서 goalsAPI.ts 만들기

//   만들어야 할 함수들:
//   - getMyGoals(token) - 내 목표 목록 조회
//   - createGoal(data, token) - 목표 추가
//   - updateGoal(_id, data, token) - 목표 수정 (상태 변경)
//   - deleteGoal(_id, token) - 목표 삭제

// 내 목표 추가
// import fetchAPI from "@/app/lib/api"; // 1줄
import { RecommendGoal } from "@/app/goals/types";
import fetchAPI from "@/app/lib/api";

export function createGoal(goal: RecommendGoal, token: string) {
  return fetchAPI(`/posts`, {
    method: "POST",
    body: {
      type: "goal",
      title: goal.title,
      extra: {
        level: goal.level,
        status: "미완료",
        subtitle: goal.subtitle,
        description: goal.description,
        goalType: goal.goalType,
        targetPace: goal.targetPace,
        targetDistance: goal.targetDistance,
      },
    },
    token,
  });
}
export function getMyGoals(token: string) {
  return fetchAPI(`/posts/users?type=goal`, { token });
}
//updateGoal - 목표 상태 변경
export function updateGoal(
  _id: number,
  currentExtra: Record<string, string | number | boolean>,
  status: string,
  token: string,
) {
  return fetchAPI(`/posts/${_id}`, {
    method: "PATCH",
    body: {
      extra: { ...currentExtra, status },
    },
    token,
  });
}
//deleteGoal - 목표 삭제
export function deleteGoal(_id: number, token: string) {
  return fetchAPI(`/posts/${_id}`, { method: "DELETE", token });
}
