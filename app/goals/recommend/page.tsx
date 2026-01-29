import RecButton from "@/app/goals/recommend/components/RecButton";
import RecCard from "@/app/goals/recommend/components/RecCard";
import RecHeader from "@/app/goals/recommend/components/RecHeader";
import Link from "next/link";

export default function MyGoalsPage() {
  return (
    <div
      className="flex flex-col items-center  mx-auto px-4 py-6 gap-4  min-w-[375px] 
    max-w-[767px]      
    md:max-w-[375px]"
    >
      <RecHeader />
      <RecCard />
      <RecButton />
    </div>
  );
}
