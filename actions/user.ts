"use server";

import type { ErrorRes, UserInfoRes } from "@/types/api";

import {
  CreateUserBody,
  LoginBody,
  SocialSignupBody,
  UpdateUserBody,
} from "@/app/lib/usersApi.types";
import { usersApi } from "@/app/lib/usersApi";

type UserActionState = UserInfoRes | ErrorRes | null;

// 1. 이메일 회원가입 (POST /users)
// - FormData를 받아서 CreateUserBody로 변환
// - 이미지 파일(attach) 있으면 uploadFile 먼저
export async function createUser(
  state: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const name = String(formData.get("name") || "").trim();

  const gender = String(formData.get("gender") || "");
  const birthDate = String(formData.get("birthDate") || "");
  const height = Number(formData.get("height"));
  const weight = Number(formData.get("weight"));

  // hidden input으로 이미 image path가 들어올 수도 있음
  let image = String(formData.get("image") || "");

  try {
    const body: CreateUserBody = {
      type: String(formData.get("type") || "user") as "user" | "seller",
      email,
      password,
      name,
      ...(image ? { image } : {}),
      extra: {
        gender: gender || undefined,
        birthDate: birthDate || undefined,
        height: Number.isFinite(height) ? height : undefined,
        weight: Number.isFinite(weight) ? weight : undefined,
        onboardingDone: true,
      },
    };

    return await usersApi.create(body);
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제가 발생했습니다." };
  }
}

// 2. 로그인 (POST /users/login)
export async function login(
  state: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const body: LoginBody = {
    email: String(formData.get("email") || "").trim(),
    password: String(formData.get("password") || ""),
  };

  try {
    return await usersApi.login(body);
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제가 발생했습니다." };
  }
}

// 3. 소셜 로그인 or 회원가입
export async function socialLoginOrSignup(body: {
  provider: "google" | "kakao";
  providerAccountId: string;
  email?: string;
  name?: string;
  image?: string;
}): Promise<UserActionState> {
  try {
    // 기존 유저 로그인 먼저
    let loginRes = await usersApi.socialLogin({
      providerAccountId: body.providerAccountId,
    });

    // 실패면 회원가입
    if (!loginRes || loginRes.ok !== 1) {
      const signupBody: SocialSignupBody = {
        type: "user",
        loginType: body.provider,
        email: body.email,
        name: body.name,
        image: body.image,
        extra: { providerAccountId: body.providerAccountId },
      };

      const signupRes = await usersApi.socialSignup(signupBody);
      if (!signupRes || signupRes.ok !== 1) return signupRes;

      // 가입했으면 토큰 포함 유저를 받기 위해 다시 로그인
      loginRes = await usersApi.socialLogin({
        providerAccountId: body.providerAccountId,
      });
    }

    return loginRes;
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제가 발생했습니다." };
  }
}

// 4. 유저 정보 업데이트 (PATCH /users/{id})
export async function updateUser(
  id: number,
  accessToken: string,
  body: UpdateUserBody,
): Promise<UserActionState> {
  try {
    return await usersApi.update(id, accessToken, body);
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제가 발생했습니다." };
  }
}
