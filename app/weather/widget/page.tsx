"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import Fetch3Hours from "./dongne";
import { ForecastRow, MidHalfDay, RegIdRow } from "@/types/kma";
import {
  formatLabel,
  formatDate,
  findNearestRegionFast,
  skyToSimpleEmoji,
} from "@/lib/utils";

import {
  saveTodayHalfDayCache,
  loadTodayHalfDayCache,
  isValidTemp,
} from "@/lib/localWeather";
import type { HalfDayForecast, TodayHalfDayCache } from "@/lib/localWeather";

import SearchLocationBar from "./components/searchLocationBar";
import ShortTermColumns from "./ShortTermColumns";

export type MidForecastResponse = {
  raw: string;
};

export async function fetch3DayForecastClient(
  regId: string,
): Promise<ForecastRow[]> {
  const res = await fetch(`/api/forecast/3day?regId=${regId}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchMidForecastClient(
  reg: string,
): Promise<MidForecastResponse> {
  const res = await fetch(`/api/forecast/mid?reg=${reg}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export default function ForecastPage() {
  const [data, setData] = useState<ForecastRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string>("역삼동");
  const [regidRows, setRegidRows] = useState<RegIdRow[]>([]);
  const [midRaw, setMidRaw] = useState<string | null>(null);

  /* ===============================
     ① 중기예보 raw → half-day 파싱
     =============================== */

  const midItems: MidHalfDay[] = midRaw
    ? midRaw
        .split("\n")
        .filter((line) => line && !line.startsWith("#") && line.includes(","))
        .map((line) => {
          const cols = line.split(",");
          const tmEf = cols[2];
          return {
            date: tmEf.slice(0, 8),
            hour: tmEf.slice(8, 10) as "00" | "12",
            sky: cols[6],
            st: Number(cols[10]),
          };
        })
    : [];

  /* ===============================
     ② ⬅️ 여기! 날짜별 구조 변환 코드
     =============================== */

  const midDays = Array.from(new Set(midItems.map((i) => i.date))).slice(0, 4);

  const midDayForecasts = midDays.map((date) => {
    const am = midItems.find((i) => i.date === date && i.hour === "00");
    const pm = midItems.find((i) => i.date === date && i.hour === "12");

    return {
      date,
      am: {
        sky: am?.sky ?? null,
        st: am?.st ?? null,
      },
      pm: {
        sky: pm?.sky ?? null,
        st: pm?.st ?? null,
      },
    };
  });

  useEffect(() => {
    fetch("/api/regid")
      .then((res) => res.json())
      .then((rows: RegIdRow[]) => {
        setRegidRows(rows);
        //console.log("regidRows fetched:", rows); // ✅ fetch 직후
      })
      .catch(console.error);
  }, []);

  // 오늘 포함 +0 ~ +3일 (총 4일)
  // 1️⃣ KST 기준 오늘 날짜
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  const todayString =
    kst.getFullYear().toString() +
    String(kst.getMonth() + 1).padStart(2, "0") +
    String(kst.getDate()).padStart(2, "0");

  // 2️⃣ 날짜(YYYYMMDD) 기준으로만 필터
  const days = Array.from(
    new Set(
      data
        .filter((r) => r.TM_EF.slice(0, 8) >= todayString)
        .map((r) => r.TM_EF.slice(0, 8)),
    ),
  )
    .sort()
    .slice(0, 4)
    .map((date) => {
      const d = new Date(
        `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`,
      );

      return {
        date,
        label: formatLabel(d),
      };
    });

  useEffect(() => {
    // 1. 기본 예보
    // TODO 하드코딩 된 regID 제거
    fetch3DayForecastClient("11B10101")
      .then((rows) => setData(rows))
      .catch((err) => setError(err.message));

    // 2. 중기예보
    fetchMidForecastClient("11B00000")
      .then((res) => setMidRaw(res.raw))
      .catch((err) => setError(err.message));

    // 2. regid.json 로드
    fetch("/api/regid")
      .then((res) => res.json())
      .then((rows: RegIdRow[]) => setRegidRows(rows))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (midRaw) {
      console.log("중기예보 raw:", midRaw);
    }
  }, [midRaw]);

  if (error) return <p>에러 발생: {error}</p>;

  const todayStr = formatDate(new Date());

  const todayCache = loadTodayHalfDayCache();

  const dayForecasts = days.map((d) => {
    const isToday = d.date === todayStr;

    const match = (r: ForecastRow, date: string, hour: "00" | "12") =>
      r.TM_EF.slice(0, 8) === date && r.TM_EF.slice(8, 10) === hour;
    const amRow = data.find((r) => match(r, d.date, "00")) ?? null;

    const pmRow = data.find((r) => match(r, d.date, "12")) ?? null;

    const normalizeTemp = (v: number | null) => (isValidTemp(v) ? v : null);

    let am: HalfDayForecast = {
      temp: normalizeTemp(amRow ? Number(amRow.TA) : null),
      sky: amRow?.SKY ?? null,
      st: amRow?.ST !== undefined ? Number(amRow.ST) : null,
    };

    let pm: HalfDayForecast = {
      temp: normalizeTemp(pmRow ? Number(pmRow.TA) : null),
      sky: pmRow?.SKY ?? null,
      st: pmRow?.ST !== undefined ? Number(pmRow.ST) : null,
    };

    // ✅ 오늘 데이터 fallback 처리
    if (isToday && todayCache?.date === todayStr) {
      if (!isValidTemp(am.temp)) {
        am = todayCache.am ?? am;
      }
      if (!isValidTemp(pm.temp)) {
        pm = todayCache.pm ?? pm;
      }
    }

    // ✅ 오늘 데이터가 정상일 경우 캐시 저장
    if (isToday) {
      const nextCache: TodayHalfDayCache = {
        date: todayStr,
        am: null,
        pm: null,
      };

      // 오전
      if (isValidTemp(am.temp)) {
        nextCache.am = am;
      } else if (todayCache?.am && isValidTemp(todayCache.am.temp)) {
        nextCache.am = todayCache.am;
      }

      // 오후
      if (isValidTemp(pm.temp)) {
        nextCache.pm = pm;
      } else if (todayCache?.pm && isValidTemp(todayCache.pm.temp)) {
        nextCache.pm = todayCache.pm;
      }

      saveTodayHalfDayCache(nextCache);
    }

    return {
      dateLabel: d.label,
      am,
      pm,
    };
  });

  console.log(dayForecasts);

  return (
    <main className="min-h-screen bg-white ">
      <div className="mx-auto w-full max-w-md px-5 pb-10">
        <div className="bg-gray-50 flex justify-center py-4">
          <div className="w-full max-w-md px-4">
            {/* 뒤로가기 bar */}
            <div className="h-12 flex items-center">
              <Link href="/weather" className="p-2 -ml-2">
                {/* 뒤로가기 icon */}
                <Image
                  src="/icons/arrow_back.svg"
                  alt="뒤로가기"
                  width={24}
                  height={24}
                  priority
                />
              </Link>
            </div>

            {/* 검색바 */}
            <SearchLocationBar
              onSelect={async (place) => {
                setSelectedPlace(place.place_name);
                try {
                  //console.log(place.x, place.y);
                  const regId = findNearestRegionFast(
                    { lat: Number(place.y), lon: Number(place.x) },
                    regidRows,
                  );
                  //console.log("regId: ", regId);
                  //const rows = await fetch3DayForecastClient(regId);
                  //setData(rows);
                } catch (err: any) {
                  console.error(err);
                  setError(err.message);
                }
              }}
            />
            {/* 일별 예보 */}
            <div className="bg-white rounded-xl p-4 shadow mb-6">
              <p className="text-sm text-gray-400 mb-3">일별 예보</p>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[600px] border-collapse text-[10px] text-center">
                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-t border-gray-100">
                    <div className="flex items-center justify-center bg-gray-50 font-medium ">
                      날짜
                    </div>

                    <ShortTermColumns dayForecasts={dayForecasts} type="date" />
                    {midDayForecasts.map((d, i) => (
                      <div
                        key={i}
                        className="py-1 border-r border-gray-100 flex flex-col items-center"
                      >
                        <span>
                          {formatLabel(
                            new Date(
                              d.date.slice(0, 4) +
                                "-" +
                                d.date.slice(4, 6) +
                                "-" +
                                d.date.slice(6),
                            ),
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-gray-100">
                    <div className="py-1 bg-gray-50 font-medium border-r border-gray-100">
                      시각
                    </div>
                    <ShortTermColumns dayForecasts={dayForecasts} type="time" />
                    {midDayForecasts.map((_, i) => (
                      <div
                        key={i}
                        className="col-span-1 grid grid-cols-2 border-r border-gray-100"
                      >
                        <span>오전</span>
                        <span>오후</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-gray-100">
                    <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                      날씨
                    </div>
                    <ShortTermColumns dayForecasts={dayForecasts} type="sky" />
                    {midDayForecasts.map((d, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-2 border-r border-gray-100"
                      >
                        <span>
                          {d.am.sky ? skyToSimpleEmoji(d.am.sky) : "-"}
                        </span>
                        <span>
                          {d.pm.sky ? skyToSimpleEmoji(d.pm.sky) : "-"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-gray-100">
                    <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                      기온
                    </div>
                    <ShortTermColumns dayForecasts={dayForecasts} type="temp" />
                    {midDayForecasts.map((d, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-2 border-r border-gray-100"
                      >
                        <span>{d.am.st !== null ? `${d.am.st}%` : "-"}</span>
                        <span>{d.pm.st !== null ? `${d.pm.st}%` : "-"}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)]">
                    <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                      강수확률
                    </div>
                    <ShortTermColumns dayForecasts={dayForecasts} type="st" />
                    {midDayForecasts.map((d, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-2 border-r border-gray-100"
                      >
                        <span>{d.am.st !== null ? `${d.am.st}%` : "-"}</span>
                        <span>{d.pm.st !== null ? `${d.pm.st}%` : "-"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* 시간별 예보 

            <Fetch3Hours />
            */}
            {/*{/* 시간별 예보 끝*/}
          </div>
        </div>
      </div>
    </main>
  );
}
