"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "@/app/components/common/Footer";
import Header from "@/app/components/common/Header";
import Navi from "@/app/components/common/Navi";
import BannerSection from "@/app/home/BannerSection";
import TabButton from "@/app/home/TabButton";

import marathonsData from "@/app/home/_data/marathons.json";
import { Marathon, Tab } from "@/app/home/_data/types";
import MarathonCard from "@/app/home/MarathonCard";
import { getDDay, isStratiOpen } from "@/app/lib/components/getDDay";
import Loading from "@/app/home/loading";

const MARATHONS: Marathon[] = marathonsData as Marathon[];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("KR");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () => MARATHONS.filter((m) => m.region === activeTab),
    [activeTab],
  );

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
        <Footer />
        <Navi />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-[430px] px-5 pt-14 pb-28">
        <BannerSection />

        <section className="mt-10">
          <h2 className="text-center text-2xl font-extrabold text-[#111827]">
            다가오는 마라톤 대회
          </h2>

          <p className="mt-3 text-center text-sm text-gray-500">
            지금 등록하고 목표를 향해 달려보세요
          </p>

          <div className="mt-7 grid grid-cols-2">
            <TabButton
              active={activeTab === "KR"}
              onClick={() => setActiveTab("KR")}
            >
              국내 대회
            </TabButton>

            <TabButton
              active={activeTab === "GLOBAL"}
              onClick={() => setActiveTab("GLOBAL")}
            >
              해외 대회
            </TabButton>
          </div>
        </section>

        {loading ? (
          <div className="mt-6 text-center text-sm text-gray-400">
            불러오는 중...
          </div>
        ) : (
          <section className="mt-6 space-y-5">
            {filtered.map((marathon) => (
              <MarathonCard
                key={marathon.id}
                marathon={marathon}
                dDay={getDDay(marathon.raceDate)}
                isOpen={isStratiOpen(
                  marathon.registrationStart,
                  marathon.registrationEnd,
                )}
              />
            ))}
          </section>
        )}
      </main>

      <Footer />
      <Navi />
    </>
  );
}
