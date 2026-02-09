import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ documents: [] });
  }

  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
      query,
    )}&size=3`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Kakao API error" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
