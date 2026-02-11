"use client";

import { useMemo, useState } from "react";
import Footer from "@/app/components/common/Footer";
import Header from "@/app/components/common/Header";
import Navi from "@/app/components/common/Navi";
import Link from "next/link";

import Banner from "@/app/home/BannerSection";
import Image from "next/image";

type Tab = "KR" | "GLOBAL";

type Marathon = {
  id: string;
  region: Tab;
  title: string;
  dDay: string;
  location: string;
  date: string;
  courses: string[];
  description: string;
};

const MARATHONS: Marathon[] = [
  {
    id: "kr-1",
    region: "KR",
    title: "서울 국제 마라톤",
    dDay: "KR D-15",
    location: "서울 광화문광장",
    date: "2026년 2월 4일 (일) 오전 8:00",
    courses: ["풀코스", "하프", "10km"],
    description:
      "서울의 대표 명소를 달리며 개인 최고 기록에 도전하세요.\n국내 최대 규모 마라톤 대회 입니다.",
  },
  {
    id: "kr-2",
    region: "KR",
    title: "부산 바다 마라톤",
    dDay: "KR D-32",
    location: "부산 해운대",
    date: "2026년 3월 10일 (일) 오전 7:30",
    courses: ["하프", "10km"],
    description:
      "바다를 따라 달리는 코스로 초보 러너에게도 추천되는 대회입니다.",
  },
  {
    id: "gl-1",
    region: "GLOBAL",
    title: "도쿄 마라톤",
    dDay: "GLOBAL D-45",
    location: "일본 도쿄",
    date: "2026년 3월 1일 (일) 오전 9:00",
    courses: ["풀코스"],
    description: "월드 메이저 마라톤 중 하나로 전 세계 러너들이 참가합니다.",
  },
  {
    id: "gl-2",
    region: "GLOBAL",
    title: "시드니 하버 런",
    dDay: "GLOBAL D-60",
    location: "호주 시드니",
    date: "2026년 3월 22일 (일) 오전 8:00",
    courses: ["하프", "10km"],
    description: "하버 브릿지를 배경으로 달리는 시티 러닝 코스입니다.",
  },
];

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative pb-3 text-center text-base font-extrabold ${
        active ? "text-[#2C7FB8]" : "text-gray-300"
      }`}
    >
      {children}
      <span
        className={`absolute inset-x-6 bottom-0 rounded-full ${
          active ? "h-[3px] bg-[#2C7FB8]" : "h-[2px] bg-gray-100"
        }`}
      />
    </button>
  );
}

function MarathonCard({ marathon }: { marathon: Marathon }) {
  return (
    <div className="rounded-[22px] bg-white px-5 py-5 shadow-[0_8px_20px_rgba(17,24,39,0.08)]">
      <p className="text-xs font-extrabold text-[#2C7FB8]">{marathon.dDay}</p>

      <h3 className="mt-2 text-xl font-extrabold text-[#111827]">
        {marathon.title}
      </h3>

      <div className="mt-3 space-y-2 text-sm text-gray-500">
        <p className="flex items-center gap-2">
          <Image
            src="/icons/ep--location.svg"
            alt="location"
            width={16}
            height={16}
          />
          {marathon.location}
        </p>
        <p className="flex items-center gap-2">
          <Image
            src="/icons/ep--calendar.svg"
            alt="location"
            width={16}
            height={16}
          />
          {marathon.date}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {marathon.courses.map((course) => (
          <span
            key={course}
            className="rounded-full border border-[#AEE8FF] bg-[#EAF6FF] px-4 py-2 text-xs font-bold text-[#2C7FB8]"
          >
            {course}
          </span>
        ))}
      </div>

      <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-500">
        {marathon.description}
      </p>

      <button
        type="button"
        className="mt-6 w-full rounded-[28px] bg-primary py-4 text-center text-lg font-extrabold text-white"
      >
        대회 신청하기
      </button>
    </div>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("KR");

  const filtered = useMemo(
    () => MARATHONS.filter((m) => m.region === activeTab),
    [activeTab],
  );

  return (
    <>
      {/* 헤더 */}
      <Header />

      <main className="mx-auto w-full max-w-[430px] px-5 pt-14 pb-28">
        {/* 메인배너 */}
        <Banner />

        {/* 다가오는 마라톤 대회 */}
        <section className="mt-10">
          <h2 className="text-center text-2xl font-extrabold text-[#111827]">
            다가오는 마라톤 대회
          </h2>
          <p className="mt-3 text-center text-sm text-gray-500">
            지금 등록하고 목표를 향해 달려보세요
          </p>

          {/* 탭 */}
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

        {/* 대회 카드 리스트 */}
        <section className="mt-6 space-y-5">
          {filtered.map((marathon) => (
            <MarathonCard key={marathon.id} marathon={marathon} />
          ))}
        </section>
      </main>

      {/* 푸터 */}
      <Footer />
      {/* 네비바 */}
      <Navi />
    </>
  );
}
