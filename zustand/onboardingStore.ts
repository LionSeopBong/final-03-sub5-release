"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type OnboardingMode = "email" | "oauth";

type OnboardingState = {
  mode?: OnboardingMode;
  userId?: number;

  email?: string;
  password?: string;

  name?: string;
  image?: string;
  gender?: "male" | "female";
  birthDate?: string;

  height?: number;
  weight?: number;

  setMode: (mode: OnboardingMode) => void;
  setUserId: (id?: number) => void;

  setEmailCredentials: (email: string, password: string) => void;
  setProfile: (p: {
    name: string;
    image?: string;
    gender?: "male" | "female";
    birthDate?: string;
  }) => void;
  setBody: (b: { height: number; weight: number }) => void;

  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      setMode: (mode) => set({ mode }),
      setUserId: (userId) => set({ userId }),

      setEmailCredentials: (email, password) => set({ email, password }),
      setProfile: ({ name, image, gender, birthDate }) =>
        set({ name, image, gender, birthDate }),
      setBody: ({ height, weight }) => set({ height, weight }),

      reset: () =>
        set({
          mode: undefined,
          userId: undefined,
          email: undefined,
          password: undefined,
          name: undefined,
          image: undefined,
          gender: undefined,
          birthDate: undefined,
          height: undefined,
          weight: undefined,
        }),
    }),
    {
      name: "onboarding",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
