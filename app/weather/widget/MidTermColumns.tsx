import { MidDayForecast } from "@/types/kma";
import { skyToSimpleEmoji } from "@/lib/utils";


export default function MidTermColumns({
  dayForecasts,
  type,
}: {
  dayForecasts: MidDayForecast[];
  type: "date" | "sky" | "st";
}) {
  return (
    <>
      {dayForecasts.map((d, i) => {
        const baseClass = "border-r border-l border-gray-100";

        switch (type) {
          case "date":
            return (
              <div
                key={i}
                className={`py-1 flex flex-col items-center ${baseClass}`}
              >
                <span>{d.dateLabel}</span>
                <span className="text-[9px] text-gray-400">
                  {`${i + 4}일 후`}
                </span>
              </div>
            );

          case "sky":
            return (
              <div
                key={i}
                className={`flex justify-center items-center ${baseClass}`}
              >
                {d.sky ? skyToSimpleEmoji(d.sky) : "-"}
              </div>
            );

          case "st":
            return (
              <div
                key={i}
                className={`flex justify-center items-center ${baseClass}`}
              >
                {d.st !== null ? `${d.st}%` : "-"}
              </div>
            );
        }
      })}
    </>
  );
}
