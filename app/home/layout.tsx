"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/zustand/user";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useUserStore((s) => s.user);

  // 첫 렌더에서 바로 판단하지 않고 "스토리지 확인" 후 판단
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // persist 저장 키가 name:"user" 라서 sessionStorage에 "user"로 들어감
    const user = sessionStorage.getItem("user");

    // 저장된 게 있으면: zustand가 곧 복원할 거라서 잠깐 기다림
    if (user) {
      setChecked(true);
      return;
    }

    // 저장된 게 없으면: 진짜 비로그인
    router.replace("/auth/login");
  }, [router]);

  // 스토리지 체크 전에는 아무것도 렌더링 안 함(깜빡임 방지)
  if (!checked && !user) return null;

  // 체크가 끝났는데도 user가 없으면 로그인으로
  if (checked && !user) {
    // 짧게 한 번 더 기다려도 되지만, 간단하게 처리
    router.replace("/auth/login");
    return null;
  }

  return <>{children}</>;
}
