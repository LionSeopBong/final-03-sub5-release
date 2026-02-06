"use client";

import { extract3HourTemps } from "@/lib/utils";
import { useEffect, useState } from "react";

import { TempItem } from "@/types/kma";

export default function Fetch3hTemp() {
  const [temps, setTemps] = useState<TempItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `/api/forecast/hours?nx=63&ny=124&base_date=20260206&base_time=0500`,
        );
        const data = await res.json();

        if (data.error) {
          setError(data.error);
          return;
        }

        const items = data.response.body.items.item;
        const now = new Date();
        const temps = extract3HourTemps(items, now);
        setTemps(temps);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchWeather();
  }, []);
  return (
    <div className="bg-white rounded-xl p-4 shadow mb-6">
      <p className="text-sm text-gray-400 mb-3">시간별 예보</p>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[700px] text-[10px] text-center border-collapse">
          <div className="grid grid-cols-[60px_repeat(11,1fr)] border-b border-t border-gray-100 bg-gray-50/50">
            <div className="py-2 font-medium border-r border-gray-100 bg-gray-50">
              시각
            </div>
            <div className="py-2 border-r border-gray-100">12시</div>
            <div className="py-2 border-r border-gray-100">15시</div>
            <div className="py-2 border-r border-gray-100">18시</div>
            <div className="py-2 border-r border-gray-100 font-bold text-blue-600 bg-blue-50/50">
              21시
            </div>
            <div className="py-2 border-r border-gray-100">0시</div>
            <div className="py-2 border-r border-gray-100">03시</div>
            <div className="py-2 border-r border-gray-100">06시</div>
            <div className="py-2 border-r border-gray-100">09시</div>
            <div className="py-2 border-r border-gray-100">12시</div>
            <div className="py-2 border-r border-gray-100">15시</div>
            <div className="py-2">18시</div>
          </div>

          <div className="grid grid-cols-[60px_repeat(11,1fr)] border-b border-gray-100">
            <div className="py-3 bg-gray-50 font-medium border-r border-gray-100 flex items-center justify-center">
              날씨
            </div>
            <div className="py-3 text-lg">☀️</div>
            <div className="py-3 text-lg">☀️</div>
            <div className="py-3 text-lg">☀️</div>
            <div className="py-3 text-lg bg-blue-50/30">🌙</div>
            <div className="py-3 text-lg">🌙</div>
            <div className="py-3 text-lg">🌙</div>
            <div className="py-3 text-lg">🌙</div>
            <div className="py-3 text-lg">☀️</div>
            <div className="py-3 text-lg">☀️</div>
            <div className="py-3 text-lg">☀️</div>
            <div className="py-3 text-lg">☀️</div>
          </div>

          <div className="grid grid-cols-[60px_1fr] relative h-24 border-b border-gray-100">
            <div className="bg-gray-50 font-medium border-r border-gray-100 flex items-center justify-center">
              기온
            </div>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 grid grid-cols-11 items-start pt-2 z-10">
                {temps.map((t, i) => (
                  <span key={i}>
                    {t.datetime.getHours()}시 → {t.temperature}℃
                  </span>
                ))}
              </div>
              <svg
                className="absolute bottom-4 left-0 w-full h-12 overflow-visible"
                preserveAspectRatio="none"
              >
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  points="30,30 90,10 150,30 210,50 270,70 330,80 390,80 450,80 510,30 570,10 630,30"
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx="210" cy="50" r="3" fill="#3b82f6" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-[60px_repeat(11,1fr)] border-b border-gray-100 text-gray-500">
            <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
              강수확률
            </div>
            <div className="py-2">10%</div>
            <div className="py-2">10%</div>
            <div className="py-2">0%</div>
            <div className="py-2 bg-blue-50/30">0%</div>
            <div className="py-2">0%</div>
            <div className="py-2">0%</div>
            <div className="py-2">0%</div>
            <div className="py-2">0%</div>
            <div className="py-2">0%</div>
            <div className="py-2">0%</div>
            <div className="py-2">10%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
