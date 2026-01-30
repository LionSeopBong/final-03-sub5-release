import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white border-0">
      <div className="flex items-center justify-between h-[64px] px-4 min-w-[375px]">
        <div className="text-lg font-bold">
          <Link href="/home">
            <Image
              src="/icons/logo.svg"
              width={87}
              height={40}
              priority
              alt="data"
            />
          </Link>
        </div>

        <div className="flex bg-white-300 items-center gap-8">
          <Link aria-label="weather" href="/weather">
            <Image
              src="/icons/arcticons--weather.svg"
              alt="날씨"
              width={100}
              height={32}
              priority
              className="w-6 h-6"
            />
          </Link>
          <button aria-label="profile">
            <Image
              src="/icons/healthicons--ui-user-profile-outline.svg"
              width={100}
              height={32}
              priority
              alt="프로필"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
