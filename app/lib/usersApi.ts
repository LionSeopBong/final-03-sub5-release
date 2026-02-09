// 서버로 보내는 request body 타입 (API “요청 바디” 타입)

import fetchAPI from "@/app/lib/api";
import {
  CreateUserBody,
  LoginBody,
  SocialLoginBody,
  SocialSignupBody,
  UpdateUserBody,
} from "@/app/lib/usersApi.types";
import { ErrorRes, UserInfoRes } from "@/types/api";

type UserApiResult = UserInfoRes | ErrorRes;

export const usersApi = {
  create(body: CreateUserBody) {
    return fetchAPI("/users", {
      method: "POST",
      body,
    }) as Promise<UserApiResult>;
  },

  login(body: LoginBody) {
    return fetchAPI("/users/login", {
      method: "POST",
      body,
    }) as Promise<UserApiResult>;
  },

  socialLogin(body: SocialLoginBody) {
    return fetchAPI("/users/login/with", {
      method: "POST",
      body,
    }) as Promise<UserApiResult>;
  },

  socialSignup(body: SocialSignupBody) {
    return fetchAPI("/users/signup/oauth", {
      method: "POST",
      body,
    }) as Promise<UserApiResult>;
  },

  update(_id: number, token: string, body: UpdateUserBody) {
    return fetchAPI(`/users/${_id}`, {
      method: "PATCH",
      body,
      token,
    }) as Promise<UserApiResult>;
  },
};
