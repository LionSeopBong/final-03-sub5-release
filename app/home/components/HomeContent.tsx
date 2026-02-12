"use client";

import { useEffect, useMemo, useState } from "react";

import Loading from "@/app/home/loading";

import marathonsData from "@/app/home/_data/marathons.json";
import { Marathon, Tab } from "@/app/home/_data/types";
import { getDDay, isStratiOpen } from "@/app/lib/components/getDDay";
import useWeeklyRuns from "@/app/lib/useWeeklyRuns";
import BannerSection from "@/app/home/components/BannerSection";
import TabButton from "@/app/home/components/TabButton";
import MarathonCard from "@/app/home/components/MarathonCard";
import HomeSummary from "@/app/home/components/HomeSummary";

const MARATHONS: Marathon[] = marathonsData as Marathon[];

const OPEN_UPCOMING = (() => {
  let openCount = 0;
  let upcomingCount = 0;
  for (const m of MARATHONS) {
    const s = isStratiOpen(m.registrationStart, m.registrationEnd);
    if (s === "OPEN") openCount += 1;
    if (s === "UPCOMING") upcomingCount += 1;
  }
  return { openCount, upcomingCount };
})();

export default function HomeContent() {
  const [tab, setTab] = useState<Tab>("KR");
  const [loading, setLoading] = useState(true);
  const weeklyRuns = useWeeklyRuns();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () => MARATHONS.filter((m) => m.region === tab),
    [tab],
  );

  const { openCount, upcomingCount } = useMemo(() => {
    let open = 0;
    let upcoming = 0;

    for (const m of MARATHONS) {
      if (m.region !== tab) continue;
      const s = isStratiOpen(m.registrationStart, m.registrationEnd);
      if (s === "OPEN") open += 1;
      if (s === "UPCOMING") upcoming += 1;
    }

    return { openCount: open, upcomingCount: upcoming };
  }, [tab]);

  if (loading) return <Loading />;

  return (
    <main className="mx-auto w-full max-w-[430px] px-5 pt-14 pb-28 bg-gradient-to-b from-white to-blue-50/40">
      <section className="mt-2">
        <h2 className="text-xl font-extrabold text-[#111827]">
          오늘도 달려볼까요? 🏃‍♀️
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          이번 주 목표를 설정하고, 대회 일정도 확인해보세요.
        </p>
      </section>

      <BannerSection />

      <HomeSummary
        weeklyRuns={weeklyRuns}
        openCount={openCount}
        upcomingCount={upcomingCount}
      />

      <section className="mt-20">
        <h2 className="text-center text-2xl font-extrabold text-[#111827]">
          다음 레이스를 준비해보세요 🏁
        </h2>
        <p className="mt-3 text-center text-sm text-gray-500">
          참가할 대회를 선택하고, 목표를 향해 달려보세요.
        </p>

        <div className="mt-7 grid grid-cols-2">
          <TabButton active={tab === "KR"} onClick={() => setTab("KR")}>
            국내 대회
          </TabButton>
          <TabButton active={tab === "GLOBAL"} onClick={() => setTab("GLOBAL")}>
            해외 대회
          </TabButton>
        </div>
      </section>

      <section
        key={tab}
        className="mt-6 space-y-5 transition-all duration-300 ease-in-out animate-fade"
      >
        {filtered.map((m) => (
          <MarathonCard
            key={m.id}
            marathon={m}
            dDay={getDDay(m.raceDate)}
            isOpen={isStratiOpen(m.registrationStart, m.registrationEnd)}
          />
        ))}
      </section>
    </main>
  );
}
