import type {
  LocationCoords,
  Station,
  StationXY,
  LocationRow,
  TempForecast,
  ForecastItem,
  ForecastRow,
  WeatherIconKey,
  WeatherInput,
  KmaObservation,
  Hours3Forecast,
} from "@/types/kma";

export function validateLatLon(lat: number, lon: number) {
  if (lat < -50 || lat > 50 || lon < -180 || lon > 180) {
    throw new Error(`잘못된 위경도: lat=${lat}, lon=${lon}`);
  }
}

function fastDistance(a: LocationCoords, b: LocationCoords): number {
  const latRad = ((a.lat + b.lat) * 0.5 * Math.PI) / 180;
  const x = (b.lon - a.lon) * Math.cos(latRad);
  const y = b.lat - a.lat;
  return x * x + y * y;
}

export function findNearestStationFast(
  pos: LocationCoords,
  stations: Station[],
): Station {
  let nearest = stations[0];
  let minDist = Infinity;

  for (const s of stations) {
    const d = fastDistance(pos, { lat: s.lat, lon: s.lon });
    if (d < minDist) {
      minDist = d;
      nearest = s;
    }
  }

  return nearest;
}

export function parseCSV(csvText: string): LocationRow[] {
  const lines = csvText.trim().split("\n");
  const rows: LocationRow[] = [];

  // 첫 줄은 헤더이므로 제외
  for (let i = 1; i < lines.length; i++) {
    const [code, sido, dong, x, y] = lines[i].split(",");

    rows.push({
      code: code.trim(),
      sido: sido.trim(),
      dong: dong.trim(),
      lon: Number(x),
      lat: Number(y),
    });
  }

  return rows;
}

export async function getCoordinates(): Promise<LocationCoords> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      reject,
      { enableHighAccuracy: true },
    );
  });
}

export function findNearestGrid(
  latitude: number,
  longitude: number,
  gridPoints: StationXY[],
): StationXY | null {
  if (gridPoints.length === 0) return null;

  let nearest = gridPoints[0];
  let minDistSq =
    (nearest.lat - latitude) ** 2 + (nearest.lon - longitude) ** 2;

  for (let i = 1; i < gridPoints.length; i++) {
    const p = gridPoints[i];
    const distSq = (p.lat - latitude) ** 2 + (p.lon - longitude) ** 2;

    if (distSq < minDistSq) {
      minDistSq = distSq;
      nearest = p;
    }
  }

  return nearest;
}

/** 가장 최근 발표시각(TM_FC) 계산: 00시 or 12시 */
function getLatestTmFc(): string {
  const kst = nowKST();

  const y = kst.getUTCFullYear();
  const m = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const d = String(kst.getUTCDate()).padStart(2, "0");
  const h = kst.getUTCHours();

  const fcHour = h < 12 ? "00" : "12";
  return `${y}${m}${d}${fcHour}00`;
}

export async function fetch3DayForecast(regId: string): Promise<ForecastRow[]> {
  const serviceKey = process.env.KMA_API_KEY;
  const tmfc = getLatestTmFc();

  const url = `http://localhost:3000/api/typ01/url/fct_afs_dl.php?reg=11B10101&tmfc=2026020406&disp=1&help=0&authKey=${serviceKey}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const text = await res.text();
  //console.log(text);

  // 공백 기반 파싱 (DFS 텍스트 응답)
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
      WF: cols.slice(16).join(" "),
    };
  });

  const now = nowKST();
  const end = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  return rows.filter((r) => {
    const ef = parseTm(r.TM_EF);
    return ef >= now && ef <= end;
  });
}

export function skyIconFromCA(caTot: number): WeatherIconKey {
  if (caTot <= 2) return "clear";
  if (caTot <= 5) return "partly_cloudy";
  if (caTot <= 8) return "mostly_cloudy";
  return "cloudy"; // 9~10
}

export function phenomenonIconFromWW(ww: number): WeatherIconKey | null {
  if (ww < 0 || ww === 0) return null; // 결측/현상 없음
  // 뇌우 (최우선)
  if (ww >= 90 && ww <= 99) return "thunder";
  // 눈
  if (ww >= 70 && ww <= 79) return "snow";
  // 비 / 소나기
  if (ww >= 80 && ww <= 82) return "shower";
  if (ww >= 60 && ww <= 69) return "rain";
  // 이슬비
  if (ww >= 50 && ww <= 59) return "drizzle";
  // 안개/연무
  if (ww >= 40 && ww <= 49) return "fog";
  return "unknown";
}

export function skyFromCA(caTot: number): string {
  if (caTot <= 2) return "맑음";
  if (caTot <= 5) return "구름조금";
  if (caTot <= 8) return "구름많음";
  return "흐림"; // 9~10
}

export function weatherFromWW(ww: number): string | null {
  if (ww < 0) return null; // -9 결측
  if (ww === 0) return null; // 현상 없음
  if (ww >= 60 && ww <= 69) return "비";
  if (ww >= 80 && ww <= 82) return "소나기";
  if (ww >= 70 && ww <= 79) return "눈";
  if (ww >= 90 && ww <= 99) return "뇌우";
  if (ww >= 40 && ww <= 49) return "안개";
  if (ww >= 50 && ww <= 59) return "이슬비";

  return "기타현상";
}

export function formatWeather({ caTot, ww }: WeatherInput): string {
  const sky = skyFromCA(caTot);
  const weather = weatherFromWW(ww);

  // 현상이 없으면 하늘 상태만
  if (!weather) return sky;

  // 예: "구름많고 비"
  return `${sky} ${weather}`;
}

export function parseKmaDate(fcstDate: string, fcstTime: string): Date {
  const year = Number(fcstDate.slice(0, 4));
  const month = Number(fcstDate.slice(4, 6)) - 1;
  const day = Number(fcstDate.slice(6, 8));
  const hour = Number(fcstTime.slice(0, 2));
  const minute = Number(fcstTime.slice(2, 4));

  return new Date(year, month, day, hour, minute);
}

export function extract3HourTemps(
  items: ForecastItem[],
  now: Date = new Date(),
): TempForecast[] {
  const end = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return items
    .filter((item) => item.category === "TMP")
    .map((item) => ({
      datetime: parseKmaDate(item.fcstDate, item.fcstTime),
      temperature: Number(item.fcstValue),
    }))
    .filter(
      (f) =>
        f.datetime >= now &&
        f.datetime <= end &&
        f.datetime.getHours() % 3 === 0,
    )
    .sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
}

export function findLatLon(
  dong: string,
  data: LocationRow[],
): LocationCoords | null {
  const row = data.find((r) => r.dong === dong);
  return row ? { lat: row.lat, lon: row.lon } : null;
}

export function getCurrentTime() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");

  return `${yyyy}${mm}${dd}${hh}00`;
}

export function getWeatherIcon({ caTot, ww }: WeatherInput): WeatherIconKey {
  const phenomenon = phenomenonIconFromWW(ww);
  if (phenomenon) return phenomenon;

  return skyIconFromCA(caTot);
}

export function outdoorScore(obs: KmaObservation): number {
  let score = 100;

  // 1. 기상현상 (30)
  // 0~19: 없음, 20~39: 박무/연무, 40~49: 약한 비/눈, 50+: 악천후
  if (obs.WW >= 50) score -= 30;
  else if (obs.WW >= 40) score -= 20;
  else if (obs.WW >= 20) score -= 10;

  // 2. 기온 (20)
  // 쾌적: 10~25
  if (obs.TA < -5) score -= 20;
  else if (obs.TA < 0) score -= 15;
  else if (obs.TA < 10) score -= 5;
  else if (obs.TA > 35) score -= 20;
  else if (obs.TA > 30) score -= 10;
  else if (obs.TA > 25) score -= 5;

  // 3. 풍속 (15)
  if (obs.WS >= 10) score -= 15;
  else if (obs.WS >= 7) score -= 10;
  else if (obs.WS >= 5) score -= 5;

  // 4. 가시거리 (15)
  if (obs.VS < 1000) score -= 15;
  else if (obs.VS < 3000) score -= 10;
  else if (obs.VS < 5000) score -= 5;

  // 5. 구름량 (10)
  if (obs.CA_TOT >= 9) score -= 10;
  else if (obs.CA_TOT >= 7) score -= 5;

  // 6. 습도 (10)
  if (obs.HM >= 90) score -= 10;
  else if (obs.HM >= 80) score -= 7;
  else if (obs.HM >= 70) score -= 3;

  return Math.max(0, Math.min(100, score));
}

export function outdoorGrade(score: number): "좋음" | "보통" | "나쁨" {
  if (score >= 80) return "좋음";
  if (score >= 50) return "보통";
  return "나쁨";
}

export function getCurrentTimeKoreanFormat(): string {
  const now = new Date();

  const month = now.getMonth() + 1; // 0-based
  const day = now.getDate();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const period = hours < 12 ? "오전" : "오후";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${month}월 ${day}일 ${period} ${hours}:${minutes}`;
}

export function getUVTime(): string {
  const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");

  // ⚠️ 분은 반드시 00
  return `${yyyy}${mm}${dd}${hh}00`;
}

/** KST 기준 현재 시각 */
export function nowKST(): Date {
  const now = new Date();
  return new Date(now.getTime() + 9 * 60 * 60 * 1000);
}

/** YYYYMMDDHHmm → Date */
export function parseTm(tm: string): Date {
  const y = Number(tm.slice(0, 4));
  const m = Number(tm.slice(4, 6)) - 1;
  const d = Number(tm.slice(6, 8));
  const h = Number(tm.slice(8, 10));
  const min = Number(tm.slice(10, 12));
  return new Date(Date.UTC(y, m, d, h, min));
}

export function extractHour3(
  items: ForecastItem[],
  now: Date = new Date(),
): Hours3Forecast[] {
  const end = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const map = new Map<string, Hours3Forecast>();

  for (const item of items) {
    if (
      item.category !== "TMP" &&
      item.category !== "SKY" &&
      item.category !== "PCP"
    )
      continue;

    const datetime = parseKmaDate(item.fcstDate, item.fcstTime);
    const key = `${item.fcstDate}${item.fcstTime}`;

    if (!map.has(key)) {
      map.set(key, {
        datetime,
        pcp: 0, // ✅ 반드시 필요
      });
    }

    const target = map.get(key)!;

    if (item.category === "TMP") {
      target.temperature = Number(item.fcstValue);
    }

    if (item.category === "SKY") {
      target.sky = Number(item.fcstValue);
    }

    if (item.category === "PCP") {
      target.pcp = Number(item.fcstValue); // "1" → 1
    }
  }

  return Array.from(map.values())
    .filter(
      (f) =>
        f.datetime >= now &&
        f.datetime <= end &&
        f.datetime.getHours() % 3 === 0,
    )
    .sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
}

export function skyToEmoji(
  sky?: number,
  datetime?: Date,
): string {
  const hour = datetime?.getHours();
  const isNight = hour !== undefined && (hour >= 18 || hour < 6);

  if (isNight) {
    switch (sky) {
      case 1:
        return "🌙";   // 맑은 밤
      case 2:
        return "🌙☁️"; // 구름조금 밤
      case 3:
        return "☁️🌙"; // 구름많음 밤
      case 4:
        return "☁️";   // 흐린 밤
      default:
        return "🌙";
    }
  }

  // 🌞 주간
  switch (sky) {
    case 1:
      return "☀️"; // 맑음
    case 2:
      return "🌤️"; // 구름조금
    case 3:
      return "⛅"; // 구름많음
    case 4:
      return "☁️"; // 흐림
    default:
      return "❓";
  }
}


export function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

export function formatLabel(date: Date) {
  const day = date.getDate();
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  return `${day}일(${weekday})`;
}
