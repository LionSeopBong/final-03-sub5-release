"use client";

import Image from "next/image";
import { Marathon } from "@/app/home/_data/types";
import { RegStatus } from "@/app/lib/components/getDDay";

function formatDot(iso: string) {
  // "2026-02-04" -> "2026.02.04"
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

export default function MarathonCard({
  marathon,
  dDay,
  isOpen,
}: {
  marathon: Marathon;
  dDay: string;
  isOpen: RegStatus;
}) {
  const isActive = isOpen === "OPEN";
  const isUpcoming = isOpen === "UPCOMING";
  const isClosed = isOpen === "CLOSED";

  const buttonText = isActive
    ? "대회 자세히 보기"
    : isUpcoming
      ? "접수 예정"
      : "접수 마감";

  const buttonStyle = isActive
    ? "bg-primary"
    : isClosed
      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
      : "bg-gray-300 text-gray-600 cursor-not-allowed";

  return (
    <section className="mt-10" id="marathons">
      <div className="rounded-[22px] bg-white px-5 py-5 shadow-[0_8px_20px_rgba(17,24,39,0.08)]">
        <div className="flex items-center justify-between">
          <p className="text-xs font-extrabold text-[#2C7FB8]">
            {marathon.region} {dDay}
          </p>

          {isOpen === "OPEN" && (
            <span className="rounded-full border border-[#AEE8FF] bg-[#EAF6FF] px-3 py-1 text-[11px] font-extrabold text-[#2C7FB8]">
              접수중
            </span>
          )}
          {isOpen === "UPCOMING" && (
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-extrabold text-gray-500">
              접수 예정
            </span>
          )}
          {isOpen === "CLOSED" && (
            <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-extrabold text-rose-600">
              접수 마감
            </span>
          )}
        </div>

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
              alt="date"
              width={16}
              height={16}
            />
            {formatDot(marathon.raceDate)}
          </p>
        </div>

        <div className="mt-3 rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
          <span className="font-extrabold text-gray-800">접수기간</span>
          <span className="ml-3">
            {formatDot(marathon.registrationStart)} ~{" "}
            {formatDot(marathon.registrationEnd)}
          </span>
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
          disabled={!isActive}
          onClick={() => {
            if (isActive) window.open(marathon.applyUrl, "_blank");
          }}
          className={[
            "mt-6 w-full rounded-[28px] py-4 text-center text-lg font-extrabold text-white",
            isActive ? "bg-primary" : "bg-gray-300",
          ].join(" ")}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}
