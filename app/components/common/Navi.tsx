import Link from "next/link";

export default function Navi() {
  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-0 shadow-sm">
      <ul className="flex justify-around items-center py-2">
        <li className="flex flex-col items-center text-gray-400 text-xs">
          <Link href="/home" className="text-xl">
            <img src="/icons/mynaui--home.svg" />
          </Link>
          홈
        </li>

        <li className="flex flex-col items-center text-gray-400 text-xs">
          <Link href="/records" className="text-xl">
            <img src="/icons/uil--chart.svg" />
          </Link>
          기록
        </li>

        <li className="flex flex-col items-center text-gray-400 text-xs">
          <Link href="/goals" className="text-xl">
            <img src="/icons/mage--goals.svg" />
          </Link>
          목표
        </li>

        <li className="flex flex-col items-center text-gray-400 text-xs">
          <Link href="/profile/home" className="text-xl">
            <img src="/icons/iconamoon--profile-duotone.svg" />
          </Link>
          프로필
        </li>
      </ul>
    </nav>
  );
}
