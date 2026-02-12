"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getUVTime, findNearestStationFast } from "@/lib/utils";
import type { LocationCoords } from "@/types/kma";
import STATIONS from "@/data/stn.json";

interface UVCardProps {
  pos: LocationCoords | null;
  onLoaded?: () => void;
}

export default function UVCard({ pos, onLoaded }: UVCardProps) {
  const [uv, setUV] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  /** pos → stn */
  const stn = useMemo(() => {
    if (!pos) return null;
    return findNearestStationFast(pos, STATIONS)?.stn ?? null;
  }, [pos]);

  useEffect(() => {
    if (!stn) return;

    setLoading(true);

    (async () => {
      try {
        const tm = getUVTime();
        const res = await fetch(`/api/ultraviolet?stn=${stn}&tm=${tm}`);
        if (!res.ok) return;

        const data = (await res.json()) as { uv: number };
        setUV(data.uv);
      } finally {
        setLoading(false);
        onLoaded?.();
      }
    })();
  }, [stn, onLoaded]);

  /** ✅ 항상 렌더링 */
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-3 text-xs shadow min-w-[70px] animate-pulse">
        <div className="h-4 w-10 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-6 bg-gray-200 rounded" />
      </div>
    );
  }

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
        <div className="text-gray-500 text-xs">{uv ?? "-"}</div>
      </div>
    </div>
  );
}
