import type { ErrorRes } from "@/types/api";

type NameApiResult = ErrorRes | null;

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

/* 닉네임 */
export function validateNickname(value: string): string {
  if (!value) return "닉네임을 입력해 주세요.";
  if (value.length < 2 || value.length > 16)
    return "닉네임은 2자 이상 16자 이하로 입력해 주세요.";

  return "";
}

/* 생년월일 */
export function getToday() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * 닉네임 중복 체크
 * @returns 중복이면 { message }, 아니면 null
 */
export async function checkNickname(nickname: string): Promise<NameApiResult> {
  const dupNickName = nickname.trim();

  try {
    const res = await fetch(
      `${API_URL}/users/name?name=${encodeURIComponent(dupNickName)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Client-Id": CLIENT_ID,
        },
      },
    );

    if (res.ok) {
      return null;
    }

    const data = await res.json().catch(() => null);

    return {
      ok: 0,
      message: data?.message || "이미 사용 중인 닉네임입니다.",
    };
  } catch {
    return { ok: 0, message: "네트워크 문제로 닉네임 확인에 실패했어요." };
  }
}
