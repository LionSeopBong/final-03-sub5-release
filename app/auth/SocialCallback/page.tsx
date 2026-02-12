"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import useUserStore from "@/zustand/user";
import { useOnboardingStore } from "@/zustand/onboardingStore";
import { socialLoginOrSignup } from "@/actions/user";
import Loading from "@/app/auth/SocialCallback/loading";

export default function SocialCallbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    // 인증 전/로딩 중이면 그냥 스켈레톤 보여주고 기다림
    if (status === "loading") return;

    // 인증 실패면 로그인으로
    if (status === "unauthenticated") {
      router.replace("/auth/login");
      return;
    }

    // authenticated면 서버 액션 실행
    const run = async () => {
      const user = session?.user;
      if (!user) return router.replace("/auth/login");

      const provider = user.provider as "google" | "kakao" | undefined;
      const providerAccountId = user.providerAccountId;

      if (!provider || !providerAccountId) {
        return router.replace("/auth/login");
      }

      try {
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
      } catch {
        router.replace("/auth/login");
      }
    };

    void run();
  }, [status, session, router, setUser]);

  // 콜백 페이지가 떠있는 동안 항상 스켈레톤 렌더링
  return <Loading />;
}
