export type LoginType = "google" | "kakao";

// 이메일 회원가입
export interface CreateUserBody {
  type: "user" | "seller";
  email: string;
  password: string;
  name: string;
  image?: string;
  extra?: {
    gender?: string;
    birthDate?: string;
    height?: number;
    weight?: number;
    onboardingDone?: boolean;
  };
}

// 이메일 로그인
export type LoginBody = Pick<CreateUserBody, "email" | "password">;

export type nameCheck = Pick<CreateUserBody, "email">;

// 소셜 로그인
export interface SocialLoginBody {
  providerAccountId: string;
}

// 소셜 회원가입
export interface SocialSignupBody {
  type: "user" | "seller";
  loginType: LoginType;
  email?: string;
  name?: string;
  image?: string;
  extra: {
    providerAccountId: string;
  };
}

// 유저 업데이트(PATCH)
export interface UpdateUserBody {
  image?: string;
  name?: string;
  extra: {
    gender?: string;
    birthDate?: string;
    height?: number;
    weight?: number;
    onboardingDone?: boolean;
  };
}
