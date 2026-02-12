"use client";

import {
  extractHour3,
  getCurrentTime,
  skyToEmoji,
  getNearestBaseTime,
  findNearestGrid,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import { Hours3Forecast, LocationCoords } from "@/types/kma";
import STATIONSXY from "@/data/stn_xy.json";

const CELL_WIDTH = 60;
const SVG_HEIGHT = 48;
const SVG_PADDING = 6;

interface Fetch3HoursProps {
  pos: LocationCoords | null;
}

export default function Fetch3Hours({ pos }: Fetch3HoursProps) {
  const [hours3, setHours3] = useState<Hours3Forecast[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pos) return; // ✅ null 방지
    async function fetchWeather() {
      try {
        setError(null); // 🔹 기존 에러 초기화
        const today = getCurrentTime().slice(0, 8);
        /* TODO base_time 수정 0500 0800 1100 1400 1700 2000 2300
         * 현재 시각과 가장 가까운 시각을 base_time으로 설정함
         * 예를 들어 현재 시각이 15:40 분이라면 base_time은 14:00
         */
        const now = new Date();
        const baseTime = getNearestBaseTime(now);
        // ✅ 가장 가까운 격자 찾기
        const nearest = findNearestGrid(pos!, STATIONSXY);
        if (!nearest) return;
        const res = await fetch(
          `/api/forecast/hours?nx=${nearest?.grid_x}&ny=${nearest?.grid_y}&base_date=${today}&base_time=${baseTime}`,
        );
        if (!res.ok) {
          throw new Error();
        }
        const data = await res.json();

        const items = data.response.body.items.item;
        setHours3(extractHour3(items, new Date()));
      } catch {
        setError(
          "일시적인 오류로 데이터를 불러올 수 없습니다 잠시 후 다시 시도해주세요",
        );
        setHours3([]); // 🔹 데이터 초기화
      }
    }

    fetchWeather();
  }, [pos?.lat, pos?.lon]);

  /* ================== 기온 그래프 계산 ================== */

  const temps = hours3.map((h) => h.temperature ?? 0);

  const minTemp = Math.min(0, ...temps);
  const maxTemp = Math.max(0, ...temps);

  const colCount = temps.length;
  const contentWidth = colCount * CELL_WIDTH;
  const svgWidth = contentWidth;

  const getX = (index: number) => index * CELL_WIDTH + CELL_WIDTH / 2;

  const getY = (temp: number) => {
    if (maxTemp === minTemp) return SVG_HEIGHT / 2;
    return (
      SVG_PADDING +
      ((maxTemp - temp) / (maxTemp - minTemp)) * (SVG_HEIGHT - SVG_PADDING * 2)
    );
  };

  const points = temps.map((temp, i) => `${getX(i)},${getY(temp)}`).join(" ");

  /* ====================================================== */
  return (
    <div className="bg-white rounded-xl p-4 shadow mb-6">
      <p className="text-sm text-gray-400 mb-3">시간별 예보</p>

      <div className="overflow-x-auto pb-2">
        <div
          className="text-[10px] text-center border-collapse"
          style={{ minWidth: contentWidth + 60 }}
        >
          {error ? (
            <div className="py-12 text-sm text-gray-500 text-center">
              {error}
            </div>
          ) : (
            <>
              {/* 시각 */}
              <div
                className="grid border-b border-t border-gray-100 bg-gray-50/50"
                style={{
                  gridTemplateColumns: `60px repeat(${colCount}, ${CELL_WIDTH}px)`,
                }}
              >
                <div className="py-2 font-medium border-r border-gray-100 bg-gray-50">
                  시각
                </div>
                {hours3.map((t, i) => (
                  <div key={i} className="py-2 border-r border-gray-100">
                    {t.datetime.getHours()}시
                  </div>
                ))}
              </div>

              {/* 날씨 */}
              <div
                className="grid border-b border-gray-100"
                style={{
                  gridTemplateColumns: `60px repeat(${colCount}, ${CELL_WIDTH}px)`,
                }}
              >
                <div className="py-3 bg-gray-50 font-medium border-r border-gray-100">
                  날씨
                </div>
                {hours3.map((t, i) => (
                  <div key={i} className="py-3 text-lg">
                    {skyToEmoji(t.sky, t.datetime)}
                  </div>
                ))}
              </div>

              {/* 기온 */}
              <div
                className="grid relative h-24 border-b border-gray-100"
                style={{
                  gridTemplateColumns: `60px ${contentWidth}px`,
                }}
              >
                <div className="bg-gray-50 font-medium border-r border-gray-100 flex items-center justify-center">
                  기온
                </div>

                <div className="relative h-full">
                  <div
                    className="absolute inset-0 pt-2 z-10 grid"
                    style={{
                      gridTemplateColumns: `repeat(${colCount}, ${CELL_WIDTH}px)`,
                    }}
                  >
                    {hours3.map((t, i) => (
                      <span key={i}>{t.temperature}℃</span>
                    ))}
                  </div>

                  <svg
                    className="absolute bottom-4 left-0"
                    width={svgWidth}
                    height={SVG_HEIGHT}
                    viewBox={`0 0 ${svgWidth} ${SVG_HEIGHT}`}
                  >
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="1.5"
                      points={points}
                    />
                    {temps.map((temp, i) => (
                      <circle
                        key={i}
                        cx={getX(i)}
                        cy={getY(temp)}
                        r="3"
                        fill="#3b82f6"
                      />
                    ))}
                  </svg>
                </div>
              </div>

              {/* 강수량 */}
              <div
                className="grid border-b border-gray-100 text-gray-500"
                style={{
                  gridTemplateColumns: `60px repeat(${colCount}, ${CELL_WIDTH}px)`,
                }}
              >
                <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                  강수량
                </div>
                {hours3.map((t, i) => (
                  <div key={i} className="py-2">
                    {Number.isNaN(t.pcp) ? 0 : t.pcp}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
