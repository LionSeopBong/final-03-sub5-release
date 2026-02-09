// app/auth/social/page.tsx (또는 네가 쓰는 경로)
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import useUserStore from "@/zustand/user";
import { useOnboardingStore } from "@/zustand/onboardingStore";
import { socialLoginOrSignup } from "@/actions/user";

export default function SocialCallbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (status !== "authenticated") return;

    const run = async () => {
      const user = session?.user;
      if (!user) return router.replace("/auth/login");

      const provider = user.provider as "google" | "kakao" | undefined;
      const providerAccountId = user.providerAccountId;

      if (!provider || !providerAccountId) {
        return router.replace("/auth/login");
      }

      // actions만 사용
      const res = await socialLoginOrSignup({
        provider,
        providerAccountId,
        email: user.email ?? undefined,
        name: user.name ?? undefined,
        image: user.image ?? undefined,
      });

      if (!res || res.ok !== 1) {
        return router.replace("/auth/login");
      }

      // 유저 저장 (token 포함)
      setUser(res.item);

      // 온보딩 상태 저장 (oauth + userId)
      const onboarding = useOnboardingStore.getState();
      onboarding.setMode("oauth");
      onboarding.setUserId(res.item._id);

      // 온보딩 완료 여부로 분기
      const done = Boolean(res.item.extra?.onboardingDone);
      router.replace(done ? "/home" : "/onboarding/terms?from=oauth");
    };

    void run();
  }, [status, session, router, setUser]);
}
