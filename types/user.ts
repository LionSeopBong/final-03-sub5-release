// 사용자 정보 인터페이스
export interface User {
  _id: number;
  email: string;
  password: string;
  name: string;
  image?: string;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
  extra: {
    gender: "male" | "female";
    birthDate: string;
    heightCm: number;
    weightKg: number;
  };
}

// 로그인 폼 타입
export type LoginForm = {
  email: string;
  password: string;
};

// 사용자 상태 관리용
export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}

export interface UserInfoRes {
  ok: 1;
  item: User;
}

export interface ErrorRes {
  ok: 0;
  message: string;
}