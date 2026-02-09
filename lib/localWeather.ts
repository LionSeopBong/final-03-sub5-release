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
};

export type TodayHalfDayCache = {
  date: string; // YYYYMMDD
  am: HalfDayForecast | null;
  pm: HalfDayForecast | null;
};

const TODAY_HALF_DAY_KEY = "forecast:today:halfday";


export function saveTodayHalfDayCache(cache: TodayHalfDayCache) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TODAY_HALF_DAY_KEY, JSON.stringify(cache));
}

export function loadTodayHalfDayCache(): TodayHalfDayCache | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(TODAY_HALF_DAY_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TodayHalfDayCache;
  } catch {
    return null;
  }
}

export function isValidTemp(temp: number | null) {
  return temp !== null && temp !== -99;
}
