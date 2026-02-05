import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const stn = searchParams.get("stn");
  const tm = searchParams.get("tm");

  if (!stn || !tm) {
    return NextResponse.json({ error: "stn, tm 필요" }, { status: 400 });
  }

  const controller = new AbortController();

  // ⏱️ 40초 타임아웃
  const timeout = setTimeout(() => controller.abort(), 40_000);

  try {
    const res = await fetch(
      `https://apihub.kma.go.kr/api/typ01/url/kma_sfctm_uv.php?tm=${tm}&stn=${stn}&authKey=${process.env.KMA_API_KEY}`,
      {
        cache: "no-store",
        signal: controller.signal,
      },
    );

    const data = await res.text();
    const lines = data.split(/\r?\n/);
    // 4번째 줄 (0부터 시작 → index 3)
    const fourthLine = lines[3];
    const columns = fourthLine.replace(/^#/, "").trim().split(/\s+/);

    if (!res.ok) {
      return NextResponse.json(
        { error: "KMA API 오류", raw: data },
        { status: 502 },
      );
    }

    return NextResponse.json({ uv: columns[5] });
  } catch (e: any) {
    if (e.name === "AbortError") {
      return NextResponse.json({ error: "KMA API 타임아웃" }, { status: 504 });
    }

    console.error(e);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
