"use client";

import Image from "next/image";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Navi from "../components/common/Navi";

import { useEffect, useState } from "react";

import type {
  LocationCoords,
  KakaoCoord2RegionResponse,
  KmaObservation,
} from "@/types/kma";

// function import
import {
  getCoordinates,
  getCurrentTime,
  getWeatherIcon,
  outdoorScore,
  outdoorGrade,
  getCurrentTimeKoreanFormat,
  getUVTime,
  skyToEmoji,
  getSKY,
} from "@/lib/utils";
import UVCard from "./UVCard";
import { getRunningTip } from "@/lib/runningTips";
import { getAnalysisFactors } from "@/lib/runningAnalysis";
import RunningAnalysisCard from "./RunningAnalysisCard";
import WeatherInfoCard from "./WeatherInfoCard";

export async function getLegalDongName(
  pos: LocationCoords,
  kakaoRestApiKey: string,
): Promise<string | null> {
  const url = new URL(
    "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json",
  );

  url.searchParams.set("x", pos.lon.toString());
  url.searchParams.set("y", pos.lat.toString());
  url.searchParams.set("input_coord", "WGS84");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `KakaoAK ${kakaoRestApiKey}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Kakao API error: ${res.status}`);
  }

  const data = (await res.json()) as KakaoCoord2RegionResponse;

  const legalDong = data.documents.find((d) => d.region_type === "B");
  if (!legalDong) return null;

  return [
    legalDong.region_1depth_name,
    legalDong.region_2depth_name,
    legalDong.region_3depth_name,
    legalDong.region_4depth_name,
  ]
    .filter(Boolean)
    .join(" ");
}

async function getWeatherData(
  coords: LocationCoords,
): Promise<KmaObservation | null> {
  try {
    const tm = getCurrentTime();
    const res = await fetch(
      `/api/weather?stn=&lat=${coords.lat}&lon=${coords.lon}&tm=${tm}`,
    );
    if (!res.ok) return null;
    return (await res.json()) as KmaObservation;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default function WeatherPage() {
  const [pos, setPos] = useState<LocationCoords | null>(null);
  const [dongName, setDongName] = useState<string | null>(null);
  const [dateTime, setDateTime] = useState<string | null>(null);
  const [grade, setGrade] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [weather, setWeather] = useState<KmaObservation | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const [sky, setSky] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const coords = await getCoordinates();
        setPos(coords);
        //console.log(coords.lat, coords.lon);

        const dong = await getLegalDongName(
          coords,
          process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
        );
        setDongName(dong);
        setDateTime(getCurrentTimeKoreanFormat());

        const w = await getWeatherData(coords);
        setWeather(w);
        //TODO 날씨 아이콘 구현
        /*
        const icon = getWeatherIcon({
          caTot: w?.CA_TOT ?? 0,
          ww: w?.WW ?? 0,
        });
        */
        const skyValue = getSKY({
          caTot: w?.CA_TOT ?? 0,
          ww: w?.WW ?? 0,
        });
        setSky(skyValue);

        //TODO 러닝 최적도 분석 함수
        const obs: KmaObservation = {
          CA_TOT: 8,
          WW: 40,
          TA: 5.7,
          HM: 64.0,
          WS: 1.2,
          VS: 6740,
        };

        const score = outdoorScore(obs); // 75
        setScore(score);
        const grade = outdoorGrade(score); // "보통"
        setGrade(grade);
        //console.log(grade);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <>
      <Header />
      {/*<!-- 날씨 페이지-->*/}

      <div className="min-w-[375px] items-stretch space-y-6 pl-4 pr-4 pb-0 pt-16">
        <div className="flex-1 flex flex-col">
          <h1 className="text-xl font-bold">실시간 날씨</h1>
          <p className="text-sm text-gray-500">
            현재 위치의 날씨와 러닝 최적도를 확인하세요
          </p>
        </div>
        {/*<!-- 날씨 카드 -->*/}
        <div className="bg-sky-50 border border-gray-200 rounded-xl p-5 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Image
                src="/icons/ep--location.svg"
                width={24}
                height={24}
                alt="위치"
              />{" "}
              {dongName}
            </div>
            <span className="text-xs text-gray-500">{dateTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10">
              <span className="text-3xl leading-none block">
                {skyToEmoji(sky ?? undefined, new Date())}
              </span>
            </div>
            <div className="flex flex-col justify-center leading-none pl-1">
              {weather && (
                <>
                  <div className="flex items-end text-3xl font-semibold">
                    {weather?.TA}
                    <span className="text-xl text-gray-500 ml-1">°C</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <WeatherInfoCard
              iconSrc="/icons/humidity-mid-outline.svg"
              iconBg="bg-[#DBEAFE]"
              label="습도"
              value={weather?.HM}
              unit="%"
            />

            <WeatherInfoCard
              iconSrc="/icons/wind-line.svg"
              iconBg="bg-[#DBFCE7]"
              label="풍속"
              value={weather?.WS}
              unit="m/s"
            />

            <WeatherInfoCard
              iconSrc="/icons/view-fill.svg"
              iconBg="bg-[#F3E8FF]"
              label="가시거리"
              value={weather?.VS}
              unit="m"
            />
            <UVCard pos={pos} />
          </div>
        </div>
      </div>

      {/*-- 러닝 최적도 분석 -->*/}
      <RunningAnalysisCard weather={weather} />
      <Footer />
      <Navi />
    </>
  );
}
