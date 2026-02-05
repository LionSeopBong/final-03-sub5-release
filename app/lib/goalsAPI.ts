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
import { goalData } from "@/app/goals/types/recommend"; // 2줄
import fetchAPI from "@/app/lib/api";

type GoalItem = (typeof goalData)[number];

export function createGoal(goal: GoalItem, token: string) {
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
      },
    },
    token,
  });
}
export function getMyGoals(token: string) {
  return fetchAPI(`/posts/users?type=goal`, { token });
}
//updateGoal - 목표 상태 변경
// export function updateGoal(_id: number, data: ,token:string ) {
//   return (
//     fetchAPI(`/posts/{_id}`),
//     {
//       method: "PATCH",
//       body: data,
//     }
//   );
// }
// //deleteGoal - 목표 삭제
// export function deleteGoal() {
//   return (
//     fetchAPI(`/posts/{_id}`),
//     {
//       method: "Delete",
//     }
//   );
// }
