// lib/localWeather.ts
import type { KmaObservation } from "@/types/kma";

const STORAGE_KEY = "kma:current-weather";

export interface StoredCurrentWeather {
  data: KmaObservation;
  savedAt: number; // epoch ms
}

export function saveCurrentWeather(weather: KmaObservation) {
  if (typeof window === "undefined") return;

  const payload: StoredCurrentWeather = {
    data: weather,
    savedAt: Date.now(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadCurrentWeather(): StoredCurrentWeather | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredCurrentWeather;
  } catch {
    return null;
  }
}

export type HalfDayForecast = {
  temp: number | null;
  sky: string | null;
  st: number | null;
  pref: number | null;
};

export type TodayHalfDayCache = {
  date: string; // YYYYMMDD
  am: HalfDayForecast;
};


export function isValidTemp(temp: number | null) {
  return temp !== null && temp !== -99;
}



// 로컬스토리지 키
const TODAY_CACHE_KEY = "todayHalfDayCache";

export function saveTodayHalfDayCache(cache: TodayHalfDayCache) {
  try {
    localStorage.setItem(TODAY_CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.error("로컬스토리지 저장 실패:", e);
  }
}

export function loadTodayHalfDayCache(): TodayHalfDayCache | null {
  try {
    const str = localStorage.getItem(TODAY_CACHE_KEY);
    if (!str) return null;
    return JSON.parse(str) as TodayHalfDayCache;
  } catch (e) {
    console.error("로컬스토리지 불러오기 실패:", e);
    return null;
  }
}

