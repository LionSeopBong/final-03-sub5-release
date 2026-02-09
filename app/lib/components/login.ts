export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(email: string, password: string): string | null {
  // 이메일 검증
  if (!email) return "이메일을 입력해 주세요.";
  if (!emailRegex.test(email)) {
    return "이메일 형식에 맞지 않는 ID입니다.\n이메일을 확인 후 다시 시도해 주세요.";
  }

  // 비밀번호 검증
  if (!password) return "비밀번호를 입력해 주세요.";
  if (password.length < 8 || password.length > 16) {
    return "비밀번호는 8~16자로 입력해 주세요.";
  }

  const pwRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
  if (!pwRegex.test(password)) {
    return "영문, 숫자, 특수기호를 포함해 주세요.";
  }

  return null;
}
