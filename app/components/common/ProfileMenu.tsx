"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { User } from "@/types/user";
import useUserStore from "@/zustand/user";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  onLogout: () => void;
}

export function resolveImageSrc(image?: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

  if (!image) return "/icons/et--profile-male.svg";
  if (image.startsWith("blob:")) return image;
  if (image.startsWith("http")) return image;
  return `${API_URL}${image}`;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  const resetUser = useUserStore((state) => state.resetUser);

  const handleLogout = () => {
    resetUser();
    onLogout();
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}

interface ProfileMenuProps {
  user: User | null;
}

export default function ProfileMenu({ user }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** 프로필 클릭 핸들러 */
  const handleProfileClick = () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setOpen((v) => !v);
  };

  /** 로그아웃 처리 */
  const handleLogout = () => {
    setOpen(false); // 툴팁 닫기
    alert(`${user?.name ?? "사용자"}님 로그아웃되었습니다`);
  };

  return (
    <div ref={ref} className="relative">
      {/* 프로필 버튼 */}
      <button
        aria-label="profile"
        onClick={handleProfileClick}
        className="w-7 h-7 rounded-full border border-gray-300 overflow-hidden cursor-pointer flex items-center justify-center"
      >
        <Image
          src={user?.image || "/icons/et--profile-male.svg"}
          className="object-cover"
          width={36}
          height={32}
          style={{ width: "auto", height: "32" }}
          alt="프로필"
        />
      </button>

      {/* 툴팁 메뉴 */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-28 rounded-lg
                     border border-gray-200 bg-white shadow-lg
                     origin-top-right animate-scale-in z-50"
        >
          <div
            className="absolute -top-2 right-3 w-3 h-3
                       bg-white border-l border-t border-gray-200
                       rotate-45"
          />

          <ul className="py-1 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link href="/profile/home">내 프로필</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link href="/records">내 기록</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <LogoutButton onLogout={handleLogout} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
