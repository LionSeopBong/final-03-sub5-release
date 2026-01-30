"use client";

import Image from "next/image";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Navi from "../components/common/Navi";

export default function WeatherPage() {
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
              서울특별시 강남구
            </div>
            <span className="text-xs text-gray-500">1월 15일 오후 03:56</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10">
              <span className="text-4xl leading-none block">☁️</span>
            </div>
            <div className="flex flex-col justify-center leading-none pl-1">
              <div className="flex items-end text-3xl font-semibold">
                18<span className="text-xl text-gray-500 ml-1">°C</span>
              </div>
              <div className="text-xs text-gray-500 -mt-0.5">체감 16°C</div>
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
