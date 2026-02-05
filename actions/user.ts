"use server";

import { ErrorRes, UserInfoRes } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

type UserActionState = UserInfoRes | ErrorRes | null;

export async function createUser(
  state: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  let res: Response;
  let data: UserInfoRes | ErrorRes;

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  try {
    const tempName = email.includes("@") ? email.split("@")[0] : "user";

    const body = {
      type: formData.get("type") || "user",
      email: email,
      password: password,
      name: tempName,
    };

    // 회원가입 API 호출
    res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제가 발생했습니다." };
  }

  return data;
}

export async function login(
  state: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const body = Object.fromEntries(formData.entries());

  let res: Response;
  let data: UserInfoRes | ErrorRes;

  try {
    // 로그인 API 호출
    res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제가 발생했습니다." };
  }

  return data;
}
