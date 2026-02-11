export interface KmaShortTermForecast {
  REG_ID: string; // 예보구역코드
  TM_ST?: string; // 시작시각 (YYYYMMDDHHmm)
  TM_ED?: string; // 종료시각 (YYYYMMDDHHmm)
  REG_SP?: string; // 특성
  REG_NAME: string; // 예보구역명
  STN_ID?: string; // 발표관서
  TM_FC: string; // 발표시각
  TM_IN?: string; // 입력시각
  CNT?: number; // 참조번호
  MAN_FC?: string; // 예보관명
  TM_EF?: string; // 발효시각
  MOD?: "A01" | "A02"; // 구간 (A01: 24시간, A02: 12시간)
  NE?: string; // 발효번호
  STN?: string; // 발표관서
  C?: string; // 발표코드
  MAN_ID?: string; // 예보관ID
  W1?: string; // 풍향1 (16방위 시작)
  T?: string; // 풍향경향
  W2?: string; // 풍향2 (16방위 종료)
  TA: string; // 기온
  ST?: string; // 강수확률 (%)
  /**
   * 하늘상태코드
   * DB01: 맑음, DB02: 구름조금, DB03: 구름많음, DB04: 흐림
   */
  SKY: "DB01" | "DB02" | "DB03" | "DB04";
  /**
   * 강수유무코드
   * 0: 없음, 1: 비, 2: 비/눈, 3: 눈, 4: 눈/비
   */
  PREP: "0" | "1" | "2" | "3" | "4";
  WF?: string; // 예보 (텍스트 요약)
}

export interface KmaShortTermRequest {
  stn?: number; // 발표관서번호 (없으면 전체)
  reg?: string; // 예보구역코드 (없으면 전체)
  tmfc?: string | 0; // 발표시간 (YYYYMMDDHH, 0이면 최신)
  tmfc1?: string; // 발표시간 시작범위
  tmfc2?: string; // 발표시간 종료범위
  tmef1?: string; // 발효시간 시작범위
  tmef2?: string; // 발효시간 종료범위
  disp: 0 | 1; // 표출형태 (0: 고정길이, 1: 쉼표구분)
  help?: 1; // 도움말 여부
  authKey: string; // API 인증키
}

export interface KmaWeatherObservation {
  TM: string; // 관측시각 (KST:YYYYMMDDHHMI)
  STN: string; // 국내 지점번호
  WD: string; // 풍향
  WS: string; // 풍속
  TA: string; // 기온 (C)
  HM: string; // 상대습도 (%)
  RN: string; // 강수량 (mm)
  CA_TOT: string; // 전운량
  VS: string; // 가시거리(m)
  TS: string; // 지면온도
  // 결측치 처리를 위한 헬퍼 함수용
  isMissing: (value: string) => boolean;
}

// types/weather.ts 또는 page.tsx 상단
export interface KmaForecastItem {
  stn_id: number; // 지점 번호
  tm_fc: string; // 발표 시각
  man_fc: string; // 예보관
  wf_sv1: string; // 오늘 예보 내용
  wf_sv2: string; // 내일 예보 내용
  wn: string; // 주의보
  wr: string; // 예보특보
  // 필요한 필드 위주로 정의하세요
}

export interface KmaForecastResponse {
  fct_afs_ds: KmaForecastItem[];
}

export interface WeatherData {
  timestamp: string;
  stn: string;
  windDir: string;
  windSpeed: string;
  temp: string;
  humidity: string;
}

export interface WeatherDataResponse {
  kma_sfctm2: WeatherData[];
}

export interface LocationCoords {
  lat: number;
  lon: number;
}

export interface Station extends LocationCoords {
  stn: number;
  //name: string;
  name_ko: string;
  address: string;
}

export interface LocationRow extends LocationCoords {
  code: string;
  sido: string;
  dong: string;
}

export interface RawForecastItem {
  tmef: string; // YYYYMMDDHH
  var: "TMP" | "POP";
  value: string;
}

export interface HourlyForecast {
  datetime: string; // YYYY-MM-DD HH:00
  temperature?: number;
  rainProbability?: number;
}

export interface ForecastItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export interface TempForecast {
  datetime: Date;
  temperature: number;
}

export interface StationXY extends LocationCoords {
  grid_x: number;
  grid_y: number;
}

export type ForecastRow = {
  REG_ID: string;
  TM_FC: string; // YYYYMMDDHHmm
  TM_EF: string; // YYYYMMDDHHmm
  MOD: string;
  NE: string;
  STN: string;
  W1: string;
  T: string;
  W2: string;
  TA: string;
  ST: string;
  SKY: string;
  PREP: string;
  WF: string;
};

export type KakaoRegion = {
  region_type: "B" | "H";
  region_1depth_name: string; // 시/도
  region_2depth_name: string; // 시/군/구
  region_3depth_name: string; // 읍/면/동
  region_4depth_name: string; // 리 (있을 경우)
  code: string;
};

export type KakaoCoord2RegionResponse = {
  documents: KakaoRegion[];
};

export type WeatherIconKey =
  | "clear"
  | "partly_cloudy"
  | "mostly_cloudy"
  | "cloudy"
  | "rain"
  | "snow"
  | "sleet"
  | "shower"
  | "thunder"
  | "fog"
  | "drizzle"
  | "unknown";

export type WeatherInput = {
  caTot: number; // CA(TOT)
  ww: number; // WW
};

export interface KakaoAddressResult {
  address_name: string;
  x: string; // 경도 (Longitude)
  y: string; // 위도 (Latitude)
  place_name?: string;
}

export interface KakaoSearchResponse {
  documents: KakaoAddressResult[];
}

export type KmaObservation = {
  CA_TOT: number; // 전운량 (0~10)
  WW: number; // 기상현상 코드
  TA: number; // 기온 (°C)
  HM: number; // 상대습도 (%)
  WS: number; // 풍속 (m/s)
  VS: number; // 가시거리 (m)
};

export type TempItem = {
  datetime: Date;
  temperature: number;
};

export type Hours3Forecast = {
  datetime: Date;
  temperature?: number;
  sky?: number;
  pcp?: number;
};

export interface RegIdRow {
  code: string;
  sido: string;
  dong: string;
  lon: number;
  lat: number;
}

export interface AnalysisFactor {
  label: string;
  penalty: number;
}