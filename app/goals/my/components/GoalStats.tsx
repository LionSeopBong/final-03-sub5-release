import useGoalsStore from "@/zustand/goals";

export default function GoalStats() {
  const goals = useGoalsStore((state) => state.goals);

  const 완료 = goals.filter((goal) => goal.extra.status === "완료").length;
  const 진행중 = goals.filter((goal) => goal.extra.status === "진행중").length;
  const 미완료 = goals.filter((goal) => goal.extra.status === "미완료").length;

  return (
    <>
      <div
        className="bg-white border
  border-gray-200 rounded-xl p-6"
      >
        {/* 통계를 가로로 배치 */}
        <div
          className="flex justify-around
   text-center"
        >
          <div>
            <dd
              className="text-2xl
  font-bold text-gray-700 mb-2"
            >
              {완료}
            </dd>
            <dt
              className="text-sm
  text-gray-600"
            >
              완료
            </dt>
          </div>
          <div
            className="h-16 w-px
  bg-gray-200"
          ></div>
          <div>
            <dd
              className="text-2xl
  font-bold text-gray-700 mb-2"
            >
              {진행중}
            </dd>
            <dt
              className="text-sm
  text-gray-600"
            >
              진행중
            </dt>
          </div>
          <div
            className="h-16 w-px
  bg-gray-200"
          ></div>
          <div>
            <dd
              className="text-2xl
  font-bold text-gray-700 mb-2"
            >
              {미완료}
            </dd>
            <dt
              className="text-sm
  text-gray-600"
            >
              미완료
            </dt>
          </div>
        </div>
      </div>
    </>
  );
}
