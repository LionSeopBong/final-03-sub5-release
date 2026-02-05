"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import useUserStore from "@/zustand/user";

export default function Header() {
  const user = useUserStore((state) => state.user);

  return (
    <header className="top-0 left-0 w-full bg-white z-50">
      <div className="flex items-center justify-between h-[64px] px-4 min-w-[375px]">
        {/* 로고 */}
        <div className="text-lg font-bold">
          <Link href="/home">
            <Image
              src="/icons/logo.svg"
              width={87}
              height={40}
              priority
              alt="logo"
            />
          </Link>
        </div>

        {/* 우측 아이콘 */}
        <div className="flex items-center gap-8">
          <Link aria-label="weather" href="/weather">
            <Image
              src="/icons/arcticons--weather.svg"
              alt="날씨"
              width={24}
              height={24}
              priority
            />
          </Link>

          <ProfileMenu user={user} />
        </div>
      </div>
    </header>
  );
}
