import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nx = searchParams.get('nx');
  const ny = searchParams.get('ny');

  if (!nx || !ny) {
    return NextResponse.json({ error: '좌표 누락' }, { status: 400 });
  }

  const now = new Date();
  const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
  const baseTime = '0600'; // 안정적인 기준 시각

  const url =
    `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst` +
    `?serviceKey=${process.env.KMA_API_KEY}` +
    `&pageNo=1&numOfRows=1000&dataType=JSON` +
    `&base_date=${baseDate}&base_time=${baseTime}` +
    `&nx=${nx}&ny=${ny}`;

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();

  return NextResponse.json(data);
}
