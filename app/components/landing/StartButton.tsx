import Link from "next/link";

export default function StartPage() {
  return (
    <div className="fixed left-0 right-0 bottom-16 px-4 z-20">
      <Link
        href="/auth/login"
        className="
          block w-full text-center
          px-3 py-2.5 rounded-2xl
          bg-primary text-white
          text-lg font-semibold
        "
      >
        시작하기
      </Link>
    </div>
  );
}
