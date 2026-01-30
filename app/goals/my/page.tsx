import Link from "next/link";
import Modal from "../components/Modal";
import GoalStats from "@/app/goals/my/components/GoalStats";
import GoalFilter from "@/app/goals/my/components/GoalFilter";
import GoalCard from "@/app/goals/my/components/GoalCard";
import GoalHeader from "@/app/goals/my/components/GoalHeader";
export default function GoalListPage() {
  return (
    <>
      <main className="flex flex-col items-center w-full py-6">
        <div
          className="w-full 
            min-w-[375px] 
            max-w-[767px]      
            md:max-w-[375px]   
            flex flex-col gap-4 px-4"
        >
          <GoalHeader />
          <section className="">🌱초급 총 3개</section>
          {/* 중급: 🌿중급 총 5개 */}
          {/* 고급: 🌳고급 총 7개 */}
          {/* 통계를 가로로 배치 */}
          <GoalStats />
          <GoalFilter />
          <GoalCard />
        </div>
        <Modal />
      </main>
    </>
  );
}
