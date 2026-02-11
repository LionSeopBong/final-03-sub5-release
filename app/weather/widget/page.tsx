"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import STATIONS from "@/data/stn.json"; // 관측소 목록

import Fetch3Hours from "@/app/weather/widget/Dongne";

import {
  formatLabel,
  formatDate,
  findNearestStationFast,
  skyToSimpleEmoji,
} from "@/lib/utils";

import {
  saveTodayHalfDayCache,
  loadTodayHalfDayCache,
  isValidTemp,
} from "@/lib/localWeather";

import type { HalfDayForecast, TodayHalfDayCache } from "@/lib/localWeather";
import type { ForecastRow, LocationCoords, MidHalfDay } from "@/types/kma";

import SearchLocationBar from "./components/searchLocationBar";
import ShortTermColumns from "./ShortTermColumns";
import Header from "@/app/components/common/Header";
import Navi from "@/app/components/common/Navi";

export type MidForecastResponse = {
  raw: string;
};

export async function fetch3DayForecastClient(
  reg: string | null,
): Promise<ForecastRow[]> {
  if (!reg) {
    reg = "11B10101"; // 지역코드 불러오기 실패하면 기본값 사용
  }
  const res = await fetch(`/api/forecast/3day?reg=${reg}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchMidForecastClient(
  reg: string | null,
): Promise<MidForecastResponse> {
  if (!reg) {
    reg = "11B00000"; // 지역코드 불러오기 실패하면 기본값 사용
  }
  const res = await fetch(`/api/forecast/mid?reg=${reg}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchMidTempForecast(
  reg: string | null,
): Promise<MidForecastResponse> {
  if (!reg) {
    reg = "11B10101"; // 지역코드 불러오기 실패하면 기본값 사용
  }
  const res = await fetch(`/api/forecast/mid-temp?reg=${reg}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export default function ForecastPage() {
  const [data, setData] = useState<ForecastRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string>("역삼동"); // 기본값
  const [regId, setRegId] = useState<string | null>("11B10101"); // 기본값
  const [pos, setPos] = useState<LocationCoords | null>({
    lat: 37.5,
    lon: 127.03,
  });

  const [midRaw, setMidRaw] = useState<string | null>(null);
  const [midTempRaw, setMidTempRaw] = useState<string | null>(null);

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
            pref: Number(cols[7]),
            st: Number(cols[10]),
          };
        })
    : [];

  const midTempMap: Map<string, { min: number | null; max: number | null }> =
    midTempRaw
      ? new Map(
          Array.from(
            midTempRaw
              .split(/\r?\n/)
              .map((l) => l.trim())
              .filter(
                (l) =>
                  l.length > 0 &&
                  !l.startsWith("#") &&
                  l.includes(",") &&
                  l.split(",").length >= 8,
              )
              .map((line) => {
                const cols = line.split(",");

                // ✅ TM_EF (YYYYMMDDHHMM)
                const date = cols[2].slice(0, 8);

                const min = Number(cols[6]);
                const max = Number(cols[7]);

                return [
                  date,
                  {
                    min: isNaN(min) ? null : min,
                    max: isNaN(max) ? null : max,
                  },
                ] as [string, { min: number | null; max: number | null }];
              }),
          ).slice(0, 4), // ✅ 앞에서부터 4일치만
        )
      : new Map();

  const midDays = midRaw
    ? Array.from(midTempMap.keys()) // ✅ midTempMap 기준으로 날짜 추출
    : [];

  const midDayForecasts = midDays.map((date) => {
    const temp = midTempMap.get(date);

    const am = midItems.find((i) => i.date === date && i.hour === "00");
    const pm = midItems.find((i) => i.date === date && i.hour === "12");

    return {
      date,
      am: {
        sky: am?.sky ?? null,
        pref: am?.pref ?? null,
        st: am?.st ?? null,
        temp: temp?.min ?? null,
      },
      pm: {
        sky: pm?.sky ?? null,
        pref: pm?.pref ?? null,
        st: pm?.st ?? null,
        temp: temp?.max ?? null,
      },
    };
  });

  // 오늘 포함 +0 ~ +3일 (총 4일)
  //const kstNow = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

  const todayString = formatDate(new Date());

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
    setError(null); // regId 변경 시 기존 에러 초기화
    fetch3DayForecastClient(regId)
      .then(setData)
      .catch(() =>
        setError(
          "일시적인 오류로 데이터를 불러올 수 없습니다 잠시 후 다시 시도해주세요",
        ),
      );

    // 중기 날씨
    fetchMidForecastClient(regId)
      .then((res) => setMidRaw(res.raw))
      .catch(() =>
        setError(
          "일시적인 오류로 데이터를 불러올 수 없습니다 잠시 후 다시 시도해주세요",
        ),
      );

    // ✅ 중기 기온
    fetchMidTempForecast(regId)
      .then((res) => setMidTempRaw(res.raw))
      .catch(() =>
        setError(
          "일시적인 오류로 데이터를 불러올 수 없습니다 잠시 후 다시 시도해주세요",
        ),
      );
  }, [regId]);

  const todayStr = formatDate(new Date());

  const dayForecasts = days.map((d) => {
    const todayStr = formatDate(new Date()); // KST 기준 오늘
    const isToday = d.date === todayStr;

    const match = (r: ForecastRow, date: string, hour: "00" | "12") =>
      r.TM_EF.slice(0, 8) === date && r.TM_EF.slice(8, 10) === hour;
    let amRow = data.find((r) => match(r, d.date, "00")) ?? null;
    const pmRow = data.find((r) => match(r, d.date, "12")) ?? null;

    const normalizeTemp = (v: number | null) => (isValidTemp(v) ? v : null);
    const am: HalfDayForecast = {
      temp: amRow ? normalizeTemp(Number(amRow.TA)) : null,
      sky: amRow?.SKY ?? null,
      st: amRow?.ST !== undefined ? Number(amRow.ST) : null,
      pref: amRow?.PREP !== undefined ? Number(amRow.PREP) : null,
    };

    // ✅ 오전 데이터가 없고 오늘이면 로컬스토리지에서 가져오기
    if (!amRow && isToday) {
      const cache = loadTodayHalfDayCache();
      if (cache && cache.date === todayStr && cache.am) {
        amRow = {
          TA: cache.am.temp?.toString() ?? null,
          SKY: cache.am.sky,
          ST: cache.am.st ?? null,
          PREP: cache.am.pref ?? null,
        } as unknown as ForecastRow; // 타입 맞춤
      }
    }

    // ✅ 오늘 오전 데이터가 존재하면 로컬스토리지에 저장
    if (amRow && isToday) {
      const cache: TodayHalfDayCache = {
        date: todayStr,
        am: {
          temp: normalizeTemp(Number(amRow.TA)),
          sky: amRow.SKY ?? null,
          st: amRow.ST !== undefined ? Number(amRow.ST) : null,
          pref: amRow.PREP !== undefined ? Number(amRow.PREP) : null,
        },
      };
      saveTodayHalfDayCache(cache);
    }

    const pm: HalfDayForecast = {
      temp: pmRow ? normalizeTemp(Number(pmRow.TA)) : null,
      sky: pmRow?.SKY ?? null,
      st: pmRow?.ST !== undefined ? Number(pmRow.ST) : null,
      pref: pmRow?.PREP !== undefined ? Number(pmRow.PREP) : null,
    };

    return {
      dateLabel: d.label,
      am,
      pm,
    };
  });

  return (
    <>
    <Header />
    
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
              일기 예보
            </div>

            {/* 검색바 */}
            <SearchLocationBar
              onSelect={async (place) => {
                // ✅ 검색 버튼 클릭 후 위치가 변경되었을 때 위치 이름 출력
                //console.log("선택된 위치 이름:", place.place_name);
                setSelectedPlace(place.place_name);
                try {
                  //console.log(place.x, place.y);
                  setPos({ lat: Number(place.y), lon: Number(place.x) });
                  const nearest = findNearestStationFast(
                    { lat: Number(place.y), lon: Number(place.x) },
                    STATIONS,
                  );

                  setRegId(nearest!.fct_id);
                  //console.log("reg_id:", nearest!.fct_id);
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
                  {error ? (
                    <div className="py-12 text-center text-sm text-gray-500">
                      일시적인 오류로 데이터를 불러올 수 없습니다 잠시 후 다시
                      시도해주세요
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-t border-gray-100">
                        <div className="flex items-center justify-center bg-gray-50 font-medium ">
                          날짜
                        </div>

                        <ShortTermColumns
                          dayForecasts={dayForecasts}
                          type="date"
                        />
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
                        <ShortTermColumns
                          dayForecasts={dayForecasts}
                          type="time"
                        />
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
                        <ShortTermColumns
                          dayForecasts={dayForecasts}
                          type="sky"
                        />
                        {midDayForecasts.map((d, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-2 border-r border-gray-100"
                          >
                            <span>
                              {d.am.sky
                                ? skyToSimpleEmoji(d.am.sky, d.am.pref)
                                : "-"}
                            </span>
                            <span>
                              {d.pm.sky
                                ? skyToSimpleEmoji(d.pm.sky, d.pm.pref)
                                : "-"}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-gray-100">
                        <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                          기온
                        </div>
                        <ShortTermColumns
                          dayForecasts={dayForecasts}
                          type="temp"
                        />
                        {midDayForecasts.map((d, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-2 border-r border-gray-100"
                          >
                            <span className="text-blue-500">
                              {d.am.temp !== null ? `${d.am.temp}°` : "-"}
                            </span>
                            <span className="text-red-500">
                              {d.pm.temp !== null ? `${d.pm.temp}°` : "-"}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-[60px_repeat(8,1fr)]">
                        <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                          강수확률
                        </div>
                        <ShortTermColumns
                          dayForecasts={dayForecasts}
                          type="st"
                        />
                        {midDayForecasts.map((d, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-2 border-r border-gray-100"
                          >
                            <span>
                              {d.am.st !== null ? `${d.am.st}%` : "-"}
                            </span>
                            <span>
                              {d.pm.st !== null ? `${d.pm.st}%` : "-"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* 시간별 예보 */}

            <Fetch3Hours pos={pos} />

            {/*{/* 시간별 예보 끝*/}
          </div>
        </div>
      </div>
    <Navi />
    </>
  );
}
