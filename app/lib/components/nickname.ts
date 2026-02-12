import type { ErrorRes } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

/**
 * 닉네임 형식 검증
 * @returns 에러 메시지 (정상일 경우 빈 문자열)
 */
export function validateNickname(nickname: string) {
  const value = nickname.trim();

  if (!value) return "필수 입력 항목입니다.";
  if (value.length < 2 || value.length > 16)
    return "2~16자로 입력해 주세요.(중복 불가)";

  return "";
}

/**
 * 닉네임 중복 체크
 * @returns 중복이면 { message }, 아니면 null
 */
export async function checkNickname(
  nickname: string,
): Promise<ErrorRes | null> {
  const trimmed = nickname.trim();

  try {
    const res = await fetch(
      `${API_URL}/users/name?name=${encodeURIComponent(trimmed)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Client-Id": CLIENT_ID,
        },
        cache: "no-store",
      },
    );

    // 서버가 { ok: 1 } 또는 { ok:0, message } 같은 형태라고 가정
    const data = (await res.json().catch(() => null)) as
      | { ok: 1 }
      | ErrorRes
      | null;

    if (data?.ok === 1) return null; // 사용 가능
    if (data?.ok === 0) return data; // 중복/에러

    return { ok: 0, message: "닉네임 확인 중 문제가 발생했어요." };
  } catch {
    return { ok: 0, message: "네트워크 문제로 닉네임 확인에 실패했어요." };
  }
}
