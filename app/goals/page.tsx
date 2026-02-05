import Footer from "@/app/components/common/Footer";
import Header from "@/app/components/common/Header";
import Navi from "@/app/components/common/Navi";
import GoalsActions from "@/app/goals/components/GoalsActions";
import LevelHeader from "@/app/goals/components/LevelHeader";
import RunningCard from "@/app/goals/components/RunningCard";
import { LevelDummy } from "@/app/goals/config/levelConfig";

export default function GoalsPage() {
  const currentUserId = 2;

  const leveling = LevelDummy.find((item) => {
    if (item.userId === currentUserId) {
      return true;
    }
  });
  return (
    <>
      <Header />
      <main className="flex flex-col items-center px-4 py-6 w-full pt-16">
        {/* 컨테이너 - 모바일 최대 너비 제한 */}
        <div
          className="w-full  min-w-[375px] 
    max-w-[767px]      
    md:max-w-[375px]   flex flex-col gap-4 px-4"
        >
          {/* 탭 LevelIcon 상단 */}
          <LevelHeader userLevel={leveling} />
          {/* 메인 중간 : 분석결과 카드 */}
          <RunningCard userLevel={leveling} />
          {/* 버튼들 */}
          <GoalsActions userLevel={leveling} />
          {/* 네비게이션 */}
        </div>
      </main>
      <Footer />
      <Navi />
    </>
  );
}
