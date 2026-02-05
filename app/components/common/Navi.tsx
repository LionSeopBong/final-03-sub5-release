"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navi() {
  const pathname = usePathname();

  // 반복되는 메뉴 구조를 배열로 관리하면 유지보수가 훨씬 편합니다.
  const navItems = [
    {
      name: "홈",
      href: "/home",
      icon: "/icons/mynaui--home.svg",
      activeIcon: "/icons/mynaui--home--active.svg",
    },
    {
      name: "기록",
      href: "/records",
      icon: "/icons/uil--chart.svg",
      activeIcon: "/icons/uil--chart--active.svg",
    },
    {
      name: "목표",
      href: "/goals",
      icon: "/icons/mage--goals.svg",
      activeIcon: "/icons/mage--goals--active.svg",
    },
    {
      name: "프로필",
      href: "/profile/home",
      icon: "/icons/iconamoon--profile-duotone.svg",
      activeIcon: "/icons/iconamoon--profile-duotone--active.svg",
    },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-sm z-50">
      <ul className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          // 현재 경로가 해당 아이템의 href와 일치하는지 확인
          const isActive = pathname === item.href;

          return (
            <li key={item.href} className="flex flex-col items-center">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-all ${
                  isActive ? "text-black font-bold" : "text-gray-400"
                }`}
              >
                {/* 1. 이미지 파일 자체가 다른 경우 src를 교체 */}
                {/* 2. 만약 같은 SVG에서 색상만 바꾼다면 CSS filter나 mask를 사용해야 합니다. */}
                <img
                  src={isActive ? item.activeIcon : item.icon}
                  alt={item.name}
                  className={`w-6 h-6 ${isActive ? "" : "opacity-70"}`}
                />
                <span className="text-[10px] md:text-xs">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
