"use client";
import Link from "next/link";
import { LevelInfo } from "../types";
import { useRouter } from "next/navigation";
export default function GoalsActions({
  userLevel,
}: {
  userLevel: LevelInfo | undefined;
}) {
  const router = useRouter();
  const navigiation = () => {
    router.push(`/goals/recommend?level=${userLevel?.level}`);
  };
  return (
    <>
      {/* 버튼들 */}
      <div className="flex flex-col gap-3">
        <button
          onClick={navigiation}
          className="bg-primary py-2 w-full rounded-lg text-center text-notselectbtn"
        >
          {userLevel?.level} 목표 추천 받기
        </button>
        <Link
          href="/goals/my"
          className="bg-primary py-2 w-full rounded-lg text-center text-notselectbtn"
        >
          내 목표
        </Link>
      </div>
    </>
  );
}
