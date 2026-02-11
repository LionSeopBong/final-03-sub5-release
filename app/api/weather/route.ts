import { NextResponse } from "next/server";
import type { KmaObservation } from "@/types/kma";

// function import
import { findNearestStationFast } from "@/lib/utils";

import STATIONS from "@/data/stn.json"; // 관측소 목록

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const tm = Number(searchParams.get("tm"));
    const lat = Number(searchParams.get("lat"));
    const lon = Number(searchParams.get("lon"));

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return NextResponse.json({ error: "invalid coords" }, { status: 400 });
    }
    const nearest = findNearestStationFast({ lat, lon }, STATIONS);
    const stn = nearest?.stn;
    //console.log("stn: ", stn);
    const res = await fetch(
      `https://apihub.kma.go.kr/api/typ01/url/kma_sfctm2.php?stn=${stn}&tm=${tm}&authKey=${process.env.KMA_API_KEY}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return NextResponse.json({ error: "기상청 API 실패" }, { status: 500 });
    }

    const text = await res.text();
    const lines = text.split(/\r?\n/);

    if (!lines[4]) {
      return NextResponse.json(
        { error: "기상청 데이터 형식 오류" },
        { status: 500 },
      );
    }

    const c = lines[4].trim().split(/\s+/);

    const weather: KmaObservation = {
      CA_TOT: Number(c[25]),
      WC: Number(c[22]?.slice(0, 2) ?? 0),
      WW: Number(c[24]?.slice(0, 2) ?? 0),
      TA: Math.floor(Number(c[11])),
      HM: Number(c[13]),
      WS: Math.round(Number(c[3])),
      VS: Number(c[32]),
    };

    return NextResponse.json(weather);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
