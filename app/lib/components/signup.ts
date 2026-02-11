import { ErrorRes } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

/*
  회원가입 입력값 검증
*/
type SignupValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export type SignupError =
  | { field: "email"; message: string }
  | { field: "password"; message: string }
  | { field: "passwordConfirm"; message: string }
  | null;

export function validateSignup(values: SignupValues): SignupError {
  const email = values.email.trim();
  const password = values.password;
  const passwordConfirm = values.passwordConfirm;

  // 1) 빈 값
  if (!email) return { field: "email", message: "필수 입력 항목입니다." };
  if (!password) return { field: "password", message: "필수 입력 항목입니다." };
  if (!passwordConfirm)
    return { field: "passwordConfirm", message: "필수 입력 항목입니다." };

  // 2) 이메일 형식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { field: "email", message: "이메일 형식에 맞지 않는 ID 입니다." };
  }

  // 3) 비밀번호 규칙
  // 영문/숫자/특수 포함 8~16 예시 (원하면 규칙 조정 가능)
  const pwRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;

  if (!pwRegex.test(password)) {
    return {
      field: "password",
      message: "영문 숫자 특수기호 포함 8~16자로 입력해주세요.",
    };
  }

  // 4) 비밀번호 일치
  if (password !== passwordConfirm) {
    return {
      field: "passwordConfirm",
      message: "비밀번호가 일치하지 않습니다.",
    };
  }

  return null;
}

/* 
  이메일 중복 체크
  - 중복 없음 → null
  - 중복/에러 → ErrorRes
*/
export async function checkEmail(email: string): Promise<ErrorRes | null> {
  const trimmed = email.trim();

  try {
    const res = await fetch(
      `${API_URL}/users/email?email=${encodeURIComponent(trimmed)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Client-Id": CLIENT_ID,
        },
      },
    );

    const data = (await res.json().catch(() => null)) as
      | { ok: 1 }
      | ErrorRes
      | null;

    if (data?.ok === 1) return null;
    if (data?.ok === 0) return data; // 중복/에러

    return { ok: 0, message: "이메일 확인 중 문제가 발생했어요." };
  } catch {
    return { ok: 0, message: "네트워크 문제로 이메일 확인에 실패했어요." };
  }
}
