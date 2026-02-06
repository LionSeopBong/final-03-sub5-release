import useGoalsStore from "@/zustand/goals";
import { GoalResponse } from "../../types";

export default function GoalCard() {
  const goals = useGoalsStore((state) => state.goals);
  const filter = useGoalsStore((state) => state.filter);
  const filteredGoals =
    filter === "전체" ? goals : goals.filter((g) => g.extra.status === filter);

  return (
    <>
      <ul className="w-full flex flex-col gap-3 ">
        {filteredGoals.map((goal) => {
          const status = goal.extra.status;

          {
            /* 진행중 */
          }
          if (status === "진행중") {
            return (
              <li
                key={goal._id}
                data-lavel={goal.extra.level}
                className="w-full border border-gray-300 rounded-2xl   p-4"
              >
                <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  {" "}
                  {goal.extra.subtitle}{" "}
                </p>
                <div className="flex flex-row justify-between w-full mb-2">
                  <p className="text-sm text-gray-600">진행률</p>
                  <p className="text-[#2C7FB8] font-bold">50%</p>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                  <div
                    className="bg-[#004bd6]  h-2.5 rounded-full transition-all duration-300"
                    style={{ width: "50%" }}
                  />
                </div>
                <div className="flex flex-row gap-4 ">
                  <button className="flex-1 bg-primary py-2 w-full rounded-lg text-center  font-semibold text-notselectbtn">
                    완료
                  </button>
                  <button className="flex-1 bg-primary py-2 w-full rounded-lg text-center font-semibold  text-notselectbtn">
                    취소
                  </button>
                </div>
              </li>
            );
          }

          {
            /* 미진행 */
          }
          if (status === "미완료") {
            return (
              <li
                key={goal._id}
                data-lavel={goal.extra.level}
                className="w-full border border-gray-300 p-4  rounded-2xl"
              >
                <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {" "}
                  {goal.extra.subtitle}{" "}
                </p>

                <div className="text-center mb-4 ">
                  <p>현재 진행 없음 </p>
                </div>
                <div>
                  <button className="flex-1 bg-primary py-2 w-full rounded-lg text-center text-notselectbtn">
                    러닝 시작
                  </button>
                </div>
              </li>
            );
          }

          {
            /* 완료 */
          }
          if (status === "완료") {
            return (
              <li
                key={goal._id}
                data-lavel={goal.extra.level}
                className="w-full border border-gray-300 p-4  rounded-2xl"
              >
                <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {" "}
                  {goal.extra.subtitle}{" "}
                </p>
                <div className="flex flex-row justify-between w-full ">
                  <p>진행률</p>
                  <p className="text-[#2C7FB8] font-bold">100%</p>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                  <div
                    className="bg-[#004bd6]  h-2.5 rounded-full transition-all duration-300"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="flex flex-row gap-4  ">
                  <button className="flex-1 bg-primary py-2 w-full rounded-lg  font-semibold text-center text-notselectbtn">
                    삭제
                  </button>
                  <button className="flex-1 bg-gray-custom py-2 w-full rounded-lg text-center  font-semibold text-primary-dark">
                    재도전
                  </button>
                </div>
              </li>
            );
          }

          return null;
        })}
      </ul>
    </>
  );
}
