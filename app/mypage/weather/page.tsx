// app/weather/page.tsx
import {
  KmaWeatherObservation,
  KmaForecastResponse,
  KmaForecastItem,
} from "../../../types/kma"; // 타입 정의 파일 임포트
import WeatherByLocation from "./WeatherByLocation";

const WEATHER_KEY = "0hdDcseqTPqXQ3LHqpz6Rg";

export const formatKmaDate = (tmFc: string, isMobile: boolean) => {
  // 입력: "2013.12.11.17:00"
  const parts = tmFc.split(".");
  if (parts.length < 3) return tmFc;

  const [year, month, day] = parts;

  if (isMobile) {
    return `${month}/${day}`; // 모바일: 12/11
  }
  return `${year}.${month}.${day}`; // 데스크톱: 2013.12.11
};

//JSON으로 응답이 들어올 때
async function getKmaDataJson(): Promise<KmaForecastItem[]> {
  //const disp = 1;
  const tmfc1 = "2026012724";
  const tmfc2 = "2026012806";
  const stn = "";
  const API_URL = `https://apihub.kma.go.kr/api/typ01/url/fct_afs_ds.php?stn=${stn}&tmfc1=${tmfc1}&tmfc2=${tmfc2}&help=1&authKey=njld-D40Rb25Xfg-NAW9hA&authKey=${WEATHER_KEY}&disp=0`;
  //1.3 단기육상예보
  //const API_URL = `https://apihub.kma.go.kr/api/typ01/url/fct_afs_dl.php?reg=&tmfc1=${tmfc1}&tmfc2=${tmfc2}&disp=1&help=1&authKey=${WEATHER_KEY}`;

  const res = await fetch(API_URL);

  // 1. EUC-KR 디코딩 (한글 깨짐 방지)
  const arrayBuffer = await res.arrayBuffer();
  const decoder = new TextDecoder("euc-kr");
  const text = decoder.decode(arrayBuffer);
  console.log(text);
  try {
    // 2. JSON 데이터의 시작과 끝 지점을 정확히 찾습니다.
    const startIndex = text.indexOf("{");
    const endIndex = text.lastIndexOf("}"); // 가장 마지막에 나오는 } 를 찾음

    if (startIndex === -1 || endIndex === -1) {
      throw new Error("유효한 데이터를 찾을 수 없습니다.");
    }

    // 3. { ... } 사이의 내용만 추출하여 쓰레기값(#END 등) 제거
    const pureJsonString = text.substring(startIndex, endIndex + 1);

    // 4. 비표준 JSON 파싱 (Function 생성자 사용)
    // 줄바꿈 문자 등을 안전하게 처리하기 위해 괄호 () 로 감싸줍니다.
    const getRawObject = new Function(`return (${pureJsonString})`);
    const data = getRawObject();

    return data.fct_afs_ds || [];
  } catch (error) {
    console.error("데이터 파싱 중 에러 발생:", error);
    return [];
  }
}

/**
 * 기상청 API 응답이 텍스트일 때 텍스트에서 주석 및 빈 줄을 제거하고 데이터 라인만 반환합니다.
 */
function getCleanDataLines(rawText: string): string[] {
  return rawText
    .split("\n") // 1. 줄바꿈 기준 분리
    .map((line) => line.trim()) // 2. 앞뒤 공백 제거
    .filter(
      (line) =>
        line !== "" && // 3. 빈 줄 제거
        !line.startsWith("#") && // 4. #으로 시작하는 주석 제거
        /^\d/.test(line), // 5. 숫자로 시작하는 줄만 선택 (데이터 라인은 항상 날짜/지점번호로 시작)
    );
}

// 결측치 체크 함수
const isMissing = (val: string) =>
  val === "-9" || val === "-9.0" || val === "-9.00" || val === "-";

async function getKmaData(): Promise<KmaWeatherObservation[]> {
  // 실제 환경에서는 fetch를 통해 데이터를 가져옵니다.
  //const API_URL = `https://apihub.kma.go.kr/api/typ01/url/kma_sfctm2.php?tm=202211300900&stn=0&help=1&authKey=${WEATHER_KEY}`;
  //1.3 단기육상예보
  const API_URL = `https://apihub.kma.go.kr/api/typ01/url/fct_afs_dl.php?reg=&tmfc1=2013121106&tmfc2=2013121118&disp=0&help=1&authKey=njld-D40Rb25Xfg-NAW9hA&authKey=${WEATHER_KEY}`;

  const res = await fetch(API_URL);
  const text = await res.text();
  const lines = getCleanDataLines(text);
  console.log(lines);

  return lines.map((line) => {
    //disp=0 일 때 연속된 공백으로 분리되어 응답
    // 연속된 공백을 기준으로 분리
    //disp=1 일 때 콤마를 기준으로 분리되어 응답
    const cols = line.trim().split(/\s+/);

    return {
      TM: cols[1],
      STN: cols[0],
      WD: cols[2],
      WS: cols[3],
      TA: cols[11], // 데이터 문서 상 12번째 (0-index이므로 11)
      HM: cols[13], // 14번째
      RN: cols[15], // 16번째
      CA_TOT: cols[25], // 26번째
      VS: cols[32], // 33번째
      TS: cols[36], // 37번째
      isMissing: isMissing,
    } as KmaWeatherObservation;
  });
}

export default async function WeatherPage() {
  //const data = await getKmaDataJson();
  const data = await getKmaData();
  //const text = getCleanDataLines(data);

  data.map((item) => {
    //console.log(item);
  });
  // 날짜 포맷팅 함수 (안전한 버전)
  const formatFullDate = (tm: string) => {
    // 1. 데이터가 없을 경우 처리
    if (!tm) return "-";

    // 2. 만약 데이터가 '2013.12.11.17:00' 형식으로 들어온다면
    if (tm.includes(".")) {
      // 이미 포맷이 어느 정도 되어 있으므로 그대로 반환하거나 점을 정리
      return tm;
    }

    // 3. 만약 데이터가 순수 숫자 '202601291100' 형식으로 들어올 경우를 대비한 substring
    try {
      return `${tm.substring(0, 4)}.${tm.substring(4, 6)}.${tm.substring(6, 8)} ${tm.substring(8, 10)}:${tm.substring(10, 12)}`;
    } catch (e) {
      return tm; // 예외 발생 시 원본 반환
    }
  };

  // 날짜 포맷팅 함수 (모바일용)
  const formatShortDate = (tm: string) => {
    return `${tm.substring(4, 6)}/${tm.substring(6, 8)}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">위치를 기반으로 한 기상현황</h1>
      <WeatherByLocation />
      <h1 className="text-xl font-bold mb-6">기상청 지상관측 현황</h1>

      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">관측시각</th>
              <th className="border p-2">예보관</th>
              <th className="border p-2">기온(℃)</th>
              <th className="border p-2">습도(%)</th>
              <th className="border p-2">강수(mm)</th>
              <th className="border p-2">시정(10m)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="text-center hover:bg-gray-50">
                <td className="border p-2">{formatFullDate(item.TM)}</td>
                <td className="border p-2">{item.WD}</td>
                <td className="border p-2 font-semibold text-blue-600"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
