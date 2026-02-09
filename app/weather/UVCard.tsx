"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { getUVTime, findNearestStationFast } from "@/lib/utils";
import type { LocationCoords, Station } from "@/types/kma";
import STATIONS from "@/data/stn.json"; // 관측소 목록

interface UVCardProps {
  pos: LocationCoords | null;
}

export default function UVCard({ pos }: UVCardProps) {
  const [uv, setUV] = useState<number | null>(null);

  // pos → stn 계산
  const stn = useMemo(() => {
    if (!pos) return null;
    const station = findNearestStationFast(pos, STATIONS);
    return station?.stn ?? null;
  }, [pos]);

  useEffect(() => {
    if (stn === null) return;

    (async () => {
      try {
        const tm = getUVTime();
        const res = await fetch(`/api/ultraviolet?stn=${stn}&tm=${tm}`);
        if (!res.ok) return;

        const data = (await res.json()) as { uv: number };
        setUV(data.uv);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [stn]);

  if (uv === null) return null;

  return (
    <div className="bg-white rounded-xl flex items-center p-3 text-xs shadow gap-3 min-w-[70px]">
      <div className="text-lg rounded-md bg-[#FFEDD4]">
        <Image
          src="/icons/ultraviolet-outline.svg"
          width={24}
          height={24}
          alt="자외선"
        />
      </div>
      <div className="text-left">
        <div className="font-semibold text-[0.65rem]">자외선</div>
        <div className="text-gray-500 text-xs">{uv}</div>
      </div>
    </div>
  );
}
