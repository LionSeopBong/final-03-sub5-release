import { skyToSimpleEmoji } from "@/lib/utils";

type DayForecast = {
  dateLabel: string;
  am: {
    temp: number | null;
    sky: string | null;
    st: number | null;
    pref: number | null;
  };
  pm: {
    temp: number | null;
    sky: string | null;
    st: number | null;
    pref: number | null;
  };
};

export default function ShortTermColumns({
  dayForecasts,
  type,
}: {
  dayForecasts: DayForecast[];
  type: "date" | "time" | "sky" | "temp" | "st";
}) {
  return (
    <>
      {dayForecasts.map((d, i) => {
        const isToday = i === 0;
        const baseClass = `border-r border-l ${
          isToday ? "bg-blue-50 border-blue-200" : "border-gray-100"
        }`;

        switch (type) {
          case "date":
            return (
              <div
                key={i}
                className={`py-1 flex flex-col items-center ${baseClass}`}
              >
                <span>{d.dateLabel}</span>
                <span className="text-[9px] text-blue-500">
                  {i === 0 ? "오늘" : i === 1 ? "내일" : i === 2 ? "모레" : ""}
                </span>
              </div>
            );

          case "time":
            return (
              <div key={i} className={`grid grid-cols-2 ${baseClass}`}>
                <span>오전</span>
                <span>오후</span>
              </div>
            );

          case "sky":
            return (
              <div key={i} className={`grid grid-cols-2 ${baseClass}`}>
                <span>
                  {d.am.sky ? skyToSimpleEmoji(d.am.sky, d.am.pref) : "-"}
                </span>
                <span>
                  {d.pm.sky ? skyToSimpleEmoji(d.pm.sky, d.pm.pref) : "-"}
                </span>
              </div>
            );

          case "temp":
            return (
              <div key={i} className={`grid grid-cols-2 px-1 ${baseClass}`}>
                <span>{d.am.temp !== null ? `${d.am.temp}°` : "-"}</span>
                <span>{d.pm.temp !== null ? `${d.pm.temp}°` : "-"}</span>
              </div>
            );

          case "st":
            return (
              <div key={i} className={`grid grid-cols-2 px-1 ${baseClass}`}>
                <span>{d.am.st !== null ? `${d.am.st}%` : "-"}</span>
                <span>{d.pm.st !== null ? `${d.pm.st}%` : "-"}</span>
              </div>
            );
        }
      })}
    </>
  );
}
