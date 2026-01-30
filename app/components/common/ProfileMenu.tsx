"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={ref} className="relative">
      {/* 프로필 버튼 */}
      <button
        aria-label="profile"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center"
      >
        <Image
          src="/icons/healthicons--ui-user-profile-outline.svg"
          width={24}
          height={24}
          priority
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
          {/* 말풍선 꼬리 */}
          <div
            className="absolute -top-2 right-3 w-3 h-3
                       bg-white border-l border-t border-gray-200
                       rotate-45"
          />

          <ul className="py-1 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/profile-main/profile-home">내 프로필</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/records">내 기록</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="#">로그아웃</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
