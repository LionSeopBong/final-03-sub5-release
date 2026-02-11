import useUserStore from "@/zustand/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useLoginCheck() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  // 로그인 여부
  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다");
      router.push("/login");
    }
  }, [user, router]);
  return { user };
}
