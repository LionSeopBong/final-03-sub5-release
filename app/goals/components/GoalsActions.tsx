import Link from "next/link";

export default function GoalsActions() {
  return (
    <>
      {/* 버튼들 */}
      <div className="flex flex-col gap-3">
        <Link
          href="/goals/recommend"
          className="bg-primary py-2 w-full rounded-lg text-center text-notselectbtn"
        >
          초급 목표 추천 받기
        </Link>
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
