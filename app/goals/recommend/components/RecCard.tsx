import { leveltype } from "@/app/goals/types";
import { goalData } from "@/app/goals/types/recommend";

export default function RecCard({ level }: { level: leveltype }) {
  const filterGoals = goalData.filter((data) => data.level === level);

  return (
    <>
      {filterGoals.map((goal) => (
        <article
          key={goal.id}
          className="border border-notselectbtn-border rounded-xl max-w-md min-w-93.75 gap-4 p-4 mb-3 cursor-pointer"
        >
          <h2 className="font-bold text-lg mb-2">{goal.title}</h2>
          <p className="text-gray-600 text-sm mb-1">{goal.subtitle}</p>
          <p className="text-gray-800">{goal.description}</p>
        </article>
      ))}
    </>
  );
}
