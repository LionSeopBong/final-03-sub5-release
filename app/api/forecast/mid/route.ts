import { NextResponse } from "next/server";

// 중기예보 (4~10일)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const reg = searchParams.get("reg") || "11B00000";

  const url = new URL(
    "https://apihub.kma.go.kr/api/typ01/url/fct_afs_wl.php",
  );

  const params = {
    reg,
    disp: "1",
    help: "0",
    authKey: process.env.KMA_API_KEY!, // authKey는 반드시 env로 분리
  };

  Object.entries(params).forEach(([k, v]) =>
    url.searchParams.set(k, v),
  );

  try {
    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `HTTP Error: ${res.status}` },
        { status: res.status },
      );
    }

    const text = await res.text();

    return NextResponse.json({
      raw: text,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 },
    );
  }
}
