import GoalsActions from "@/app/goals/components/GoalsActions";
import LevelHeader from "@/app/goals/components/LevelHeader";
import RunningCard from "@/app/goals/components/RunningCard";

export default function GoalsPage() {
  return (
    <main className="flex flex-col items-center px-4 py-6 w-full ">
      {/* 컨테이너 - 모바일 최대 너비 제한 */}
      <div
        className="w-full  min-w-[375px] 
    max-w-[767px]      
    md:max-w-[375px]   flex flex-col gap-4 px-4"
      >
        {/* 탭 LevelIcon 상단 */}
        <LevelHeader />
        {/* 메인 중간 : 분석결과 카드 */}
        <RunningCard />
        {/* 버튼들 */}
        <GoalsActions />
        {/* 네비게이션 */}
      </div>
    </main>
  );
}
