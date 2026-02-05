import { NextResponse } from "next/server";
import type { KmaObservation } from "@/types/kma";
import { getCurrentTime } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const stn = searchParams.get("stn");
    const tm = searchParams.get("tm");

    if (!stn || !tm) {
      return NextResponse.json(
        { error: "stn, tm 파라미터가 필요합니다" },
        { status: 400 },
      );
    }

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
      WW: Number(c[24].slice(0, 2)),
      TA: Math.floor(Number(c[11])),
      HM: Number(c[13]),
      WS: Number(c[3]),
      VS: Number(c[32]),
    };

    return NextResponse.json(weather);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
