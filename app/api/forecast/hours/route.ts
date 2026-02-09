import { NextResponse } from "next/server";

// 3시간 단위 예보
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const nx = searchParams.get("nx") || "63";
  const ny = searchParams.get("ny") || "124";
  const base_date = searchParams.get("base_date") || "20260207";
  const base_time = searchParams.get("base_time") || "0500";

  const url = new URL(
    "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst",
  );

  const params = {
    serviceKey: process.env.DATA_PORTAL_KMA!,    
    dataType: "JSON",
    base_date,
    base_time,
    nx,
    ny,
  };

  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      return NextResponse.json(
        { error: `HTTP Error: ${res.status}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
