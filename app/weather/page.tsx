"use client";

import Image from "next/image";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Navi from "../components/common/Navi";

import { useEffect, useState } from "react";

import type {
  LocationCoords,
  Station,
  StationXY,
  KakaoCoord2RegionResponse,
  KakaoSearchResponse,
  KmaObservation,
} from "@/types/kma";

// function import
import {
  findNearestStationFast,
  getCoordinates,
  formatWeather,
  extract3HourTemps,
  getCurrentTime,
  getWeatherIcon,
  outdoorScore,
  outdoorGrade,
} from "@/lib/utils";

const KAKAO_REST_API_KEY = "6bfd0836fd0a724e514a804ef6561357";

/*
const KAKAO_REST_API_KEY =
  process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
*/

/* ================= Utils ================= */

function getCurrentTimeKoreanFormat(): string {
  const now = new Date();

  const month = now.getMonth() + 1; // 0-based
  const day = now.getDate();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const period = hours < 12 ? "오전" : "오후";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${month}월 ${day}일 ${period} ${hours}:${minutes}`;
}

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

async function getWeatherData(stn: number): Promise<KmaObservation | null> {
  try {
    const tm = getCurrentTime();

    const res = await fetch(`/api/weather?stn=${stn}&tm=${tm}`);
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
  const [weather, setWeather] = useState<KmaObservation | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const coords = await getCoordinates();
        setPos(coords);

        const dong = await getLegalDongName(coords, KAKAO_REST_API_KEY);
        setDongName(dong);

        //console.log("법정동:", dong);
        const dateTime = getCurrentTimeKoreanFormat();
        setDateTime(dateTime);
        
              const w = await getWeatherData(108);
      setWeather(w);
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
                alt="location"
              />{" "}
              {dongName}
            </div>
            <span className="text-xs text-gray-500">{dateTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10">
              <span className="text-4xl leading-none block">☁️</span>
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
            <div className="bg-white rounded-xl flex items-center p-3 text-xs shadow gap-3 min-w-[70px]">
              <div className="text-lg bg-[#DBEAFE] rounded-md">
                <Image
                  src="/icons/humidity-mid-outline.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <div className="text-left">
                <div className="font-semibold">습도</div>
                <div className="text-gray-500">65%</div>
              </div>
            </div>
            <div className="bg-white rounded-xl flex items-center p-3 text-xs shadow gap-3 min-w-[70px]">
              <div className="text-lg bg-[#DBFCE7] rounded-md">
                <Image
                  src="/icons/wind-line.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <div className="text-left">
                <div className="font-semibold">풍속</div>
                <div className="text-gray-500">3.2 m/s</div>
              </div>
            </div>

            <div className="bg-white rounded-xl flex items-center p-3 text-xs shadow gap-3 min-w-[70px]">
              <div className="text-lg bg-[#F3E8FF] rounded-md">
                <Image
                  src="/icons/view-fill.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <div className="text-left">
                <div className="text-[0.65rem] font-semibold">가시거리</div>
                <div className="text-gray-500 ">10 Km</div>
              </div>
            </div>

            <div className="bg-white rounded-xl flex items-center p-3 text-xs shadow gap-3 min-w-[70px]">
              <div className="text-lg rounded-md bg-[#FFEDD4]">
                <Image
                  src="/icons/ultraviolet-outline.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <div className="text-left">
                <div className="font-semibold">자외선</div>
                <div className="text-gray-500">지수 5</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*-- 러닝 최적도 분석 -->*/}
      <div className="min-w-[375px] items-stretch p-4">
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm ">
          <div className="flex items-center gap-2">
            <Image src="/icons/cbi--bulb.svg" width={24} height={24} alt="" />
            <h2>러닝 최적도 분석</h2>
          </div>

          <p className="text-xs text-gray-500">현재 날씨 기준 러닝 가이드</p>

          <div className="flex items-center gap-3 p-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
              <Image
                src="/icons/picon--rise.svg"
                width={24}
                height={24}
                className="w-6 h-6"
                alt=""
              />
            </div>
            <div>
              <div className="font-semibold text-green-700">러닝하기 최적</div>
              <div className="text-xs text-gray-600">날씨 조건 분석 완료</div>
            </div>
          </div>

          <div className="bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl p-3">
            분석요인
            <br />
            <span className="text-gray-500"> 적정 기온 </span>
          </div>

          <div className="bg-blue-50 text-blue-700 text-xs rounded-xl p-3">
            러닝 팁
            <br />
            <span className="text-gray-900">
              가벼운 바람이 불고 있습니다. 호흡에 유의하며 페이스를 유지하세요!
            </span>
          </div>
        </div>
      </div>
      <Footer />
      <Navi />
    </>
  );
}
