// app/api/forecast/3day/route.ts
import type { ForecastRow } from "@/types/kma";
import { nowKST, parseTm } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const regId = searchParams.get("regId");

    if (!regId) {
      return NextResponse.json({ error: "regId is required" }, { status: 400 });
    }

    const serviceKey = process.env.KMA_API_KEY;
    if (!serviceKey) {
      return NextResponse.json({ error: "KMA_API_KEY is missing" }, { status: 500 });
    }

    const tmfc = "202602060000"; // 임시 고정, 필요 시 getLatestTmFc()로 대체
    const url =
      `https://apihub.kma.go.kr/api/typ01/url/fct_afs_dl.php` +
      `?tmfc=${tmfc}&reg=${regId}&disp=1&authKey=${serviceKey}`;

    const res = await fetch(url);
    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `KMA API error ${res.status}`, detail: errText }, { status: 500 });
    }

    // text 그대로 가져오기
    const text = await res.text();

    // #START7777 / #7777END 등 헤더/주석 제거
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));

    const rows: ForecastRow[] = lines.map((line) => {
      const cols = line.split(",");
      return {
        REG_ID: cols[0],
        TM_FC: cols[1],
        TM_EF: cols[2],
        MOD: cols[3],
        NE: cols[4],
        STN: cols[5],
        W1: cols[9],
        T: cols[10],
        W2: cols[11],
        TA: cols[12],
        ST: cols[13],
        SKY: cols[14],
        PREP: cols[15],
        WF: cols.slice(16).join(" "), // 나머지 필드 합치기
      };
    });

    // 현재 시각 기준 3일치 필터링
    const now = nowKST();
    const end = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    const filtered = rows.filter((r) => {
      const ef = parseTm(r.TM_EF);
      return ef >= now && ef <= end;
    });

    return NextResponse.json(filtered);
  } catch (err: any) {
    console.error("Forecast API error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
