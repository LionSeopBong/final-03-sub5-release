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
  RegIdRow,
} from "@/types/kma";

export function validateLatLon(lat: number, lon: number) {
  if (lat < -50 || lat > 50 || lon < -180 || lon > 180) {
    throw new Error(`잘못된 위경도: lat=${lat}, lon=${lon}`);
  }
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

/**
 * SKY 코드 반환
 * 1: 맑음
 * 2: 구름조금
 * 3: 구름많음
 * 4: 흐림
 */
export function getSKY({ caTot, ww, wc }: WeatherInput): number {
  // wc -> 5(안개),6(미세먼지),7(약한황사),8(강한황사),9(돌풍)
  if (wc >= 5 && wc <= 9) return 4;
  // 강수·현상 우선 처리 (비/눈/소나기 등 → 흐림)
  // wc -> 13(번개) 14(약한비) 15(중간비) 16(강한비)
  if (wc >=13 && wc <= 16) return 8;
  if (ww !== undefined) {    
    if (
      ww >= 20 &&
      ww <= 99 // 관측 가능한 기상현상 전반
    ) {
      return 3;
    }
  }

  // 전운량 기준 처리
  if (caTot === undefined) return 1;

  if (caTot <= 2) return 1; // 맑음
  if (caTot <= 5) return 2; // 구름조금
  if (caTot <= 8) return 3; // 구름많음
  return 4; // 흐림
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

export function outdoorGrade(
  score: number,
): "최적" | "양호" | "주의" | "부적합" {
  if (score >= 85) return "최적";
  if (score >= 60) return "양호";
  if (score >= 45) return "주의";
  return "부적합";
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

export function skyToEmoji(sky?: number, datetime?: Date): string {
  const hour = datetime?.getHours();
  const isNight = hour !== undefined && (hour >= 18 || hour < 6);

  if (isNight) {
    switch (sky) {
      case 1:
        return "🌕"; // 맑은 밤
      case 2:
        return "🌙"; // 구름조금 밤
      case 3:
        return "🌒"; // 구름많음 밤
      case 4:
        return "☁️"; // 흐린 밤
      case 5:
        return "🌫️"; // 안개
      case 6:
        return "😷"; // 황사
      case 7:
        return "❄"; // 눈
      case 8:
        return "⛈"; // 소나기
      case 9:
        return "⚡"; // 뇌전
      default:
        return "❓";
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
    case 5:
      return "🌫️"; // 안개
    case 6:
      return "😷"; // 황사
    case 7:
      return "❄"; // 눈
    case 8:
      return "⛈"; // 소나기
    case 9:
      return "⚡"; // 뇌전
    default:
      return "❓";
  }
}

export function skyToSimpleEmoji(
  sky: string | null | undefined,
  pref: number | null,
): string {
  /* ✅ pref 우선 처리 */
  if (pref !== null) {
    switch (pref) {
      case 1:
        return "☔"; // 비
      case 2:
        return "☔/❄"; // 비/눈
      case 3:
        return "❄"; // 눈
      case 4:
        return "❄/☔"; // 눈/비
      default:
        break; // pref 값이 있지만 의미 없으면 sky로 fallback
    }
  }

  /* ✅ sky 처리 */
  switch (sky) {
    case "DB01":
    case "WB01": // 맑음
      return "☀️";
    case "DB02":
    case "WB02": // 구름조금
      return "🌤️";
    case "DB03":
    case "WB03": // 구름많음
      return "⛅";
    case "DB04":
    case "WB04": // 흐림
      return "☁️";
    default:
      return "-";
  }
}

export function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`; //20260210 형식으로 반환
}

export function formatLabel(date: Date) {
  const day = date.getDate();
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  return `${day}일(${weekday})`;
}

function fastDistance(a: LocationCoords, b: LocationCoords): number {
  const latRad = ((a.lat + b.lat) * 0.5 * Math.PI) / 180;
  const x = (b.lon - a.lon) * Math.cos(latRad);
  const y = b.lat - a.lat;
  return x * x + y * y;
}

export function findNearestGrid(pos: LocationCoords, STATIONSXY: StationXY[]) {
  let minDist = Infinity;
  let nearest = null;

  for (const item of STATIONSXY) {
    const dLat = pos.lat - item.latitude;
    const dLon = pos.lon - item.longitude;
    const dist = dLat * dLat + dLon * dLon; // 거리 제곱

    if (dist < minDist) {
      minDist = dist;
      nearest = item;
    }
  }

  return nearest;
}

export function findNearestStationFast(
  pos: LocationCoords | null,
  stations: Station[],
): Station | null {
  if (!pos || stations.length === 0) return null;

  let nearest: Station = stations[0];
  let minDist = Infinity;

  for (const s of stations) {
    const d = fastDistance(pos, {
      lat: s.lat,
      lon: s.lon,
    });

    if (d < minDist) {
      minDist = d;
      nearest = s;
    }
  }

  return nearest;
}

export function findNearestRegionFast(
  pos: LocationCoords,
  stations: RegIdRow[],
): RegIdRow {
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

export function getNearestBaseTime(now: Date): string {
  const BASE_TIMES = [5, 8, 11, 14, 17, 20, 23];

  const currentHour = now.getHours();

  // 현재 시각 이하 중 가장 큰 발표 시각 선택
  const targetHour =
    [...BASE_TIMES].reverse().find((h) => h <= currentHour) ?? 23;

  return `${String(targetHour).padStart(2, "0")}00`;
}
