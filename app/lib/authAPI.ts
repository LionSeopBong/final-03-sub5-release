// app/lib/authAPI.ts
import fetchAPI from "@/app/lib/api";

// 회원가입
export function signup(data: {
  name: string;
  email: string;
  password: string;
  type?: string; // "user" (기본값)
}) {
  return fetchAPI(`/users`, {
    method: "POST",
    body: {
      type: "user",
      ...data,
    },
  });
}

// 로그인
export function login(data: { email: string; password: string }) {
  return fetchAPI(`/users/login`, {
    method: "POST",
    body: data,
  });
}

// 토큰 갱신
export function refreshToken(refreshToken: string) {
  return fetchAPI(`/auth/refresh`, {
    method: "GET",
    token: refreshToken,
  });
}
