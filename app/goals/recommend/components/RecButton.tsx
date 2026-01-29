import Link from "next/link";

export default function RecButton() {
  return (
    <Link
      href="/goals/my"
      className="flex flex-col items-center rounded-xl bg-primary text-notselectbtn max-w-md min-w-93.75 p-4 mb-3 cursor-pointer"
    >
      이 목표로 설정하기
    </Link>
  );
}
