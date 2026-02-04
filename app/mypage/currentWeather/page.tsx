// app/weather/page.tsx
import {
  WeatherData,
  WeatherDataResponse,
  KmaForecastItem,
} from "../../../types/kma"; // 타입 정의 파일 임포트

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

async function getKmaData(): Promise<WeatherData[]> {
  //const disp = 1;
  const tmfc1 = "2026012724";
  const tmfc2 = "2026012806";
  const tm = "202601291300";
  const location = "0";
  const API_URL = `https://apihub.kma.go.kr/api/typ01/url/kma_sfctm2.php?tm=${tm}&stn=${location}&help=0&authKey=${WEATHER_KEY}&disp=0`;

  const res = await fetch(API_URL);

  // 1. EUC-KR 디코딩 (한글 깨짐 방지)
  const arrayBuffer = await res.arrayBuffer();
  const decoder = new TextDecoder("euc-kr");
  const text = decoder.decode(arrayBuffer);
  //console.log(text);
  const lines = text.split("\n");

  // 실제 데이터가 시작되는 지점 필터링
  const dataLines = lines.filter((line) => {
    const trimmed = line.trim();
    // 주석(#)으로 시작하지 않고, 숫자로 시작하는 라인만 추출 (날짜가 2026... 이므로)
    return trimmed !== "" && !trimmed.startsWith("#") && /^\d/.test(trimmed);
  });

  return dataLines.map((line) => {
    const col = line.trim().split(/\s+/);

    return {
      timestamp: col[0], // 202601291300
      stn: col[1], // 지점번호
      windDir: col[2], // 풍향
      windSpeed: col[3], // 풍속
      temp: col[11], // 기온 (TA)
      humidity: col[13], // 습도 (HM)
      isMissing: (val: string) => val.startsWith("-9"), // 결측치 판별 함수
    };
  });
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

export default async function WeatherPage() {
  //const data = await getKmaDataJson();
  const data = await getKmaData();
  //const text = getCleanDataLines(data);

  data.map((item) => {
    console.log(item);
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
                <td className="border p-2">{formatFullDate(item.timestamp)}</td>
                <td className="border p-2">{item.stn}</td>
                <td className="border p-2 font-semibold text-blue-600">
                  {item.temp}
                </td>
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
