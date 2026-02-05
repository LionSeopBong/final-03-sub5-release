type SignupValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

type SignupError =
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
