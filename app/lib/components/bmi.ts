export function validateHeight(h: number | null) {
  if (!h) return "키를 입력해 주세요.";
  if (h < 90 || h > 240) return "키는 90cm ~ 240cm 범위로 입력해 주세요.";
  return "";
}

export function validateWeight(w: number | null) {
  if (!w) return "몸무게를 입력해 주세요.";
  if (w < 10 || w > 230) return "몸무게는 10kg ~ 230kg 범위로 입력해 주세요.";
  return "";
}

// bmi 계산 로직
export function calculateBmi(heightCm: number, weightKg: number): number {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function roundBmi(bmi: number): number {
  return Math.round(bmi * 10) / 10;
}

export type BmiCategory =
  | "UNDER"
  | "NORMAL"
  | "OVER"
  | "OBESE"
  | "SEVERE_OBESE";

export function bmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "UNDER";
  if (bmi < 23) return "NORMAL";
  if (bmi < 25) return "OVER";
  if (bmi < 30) return "OBESE";
  return "SEVERE_OBESE";
}

export function bmiLabel(bmi: number) {
  switch (bmiCategory(bmi)) {
    case "UNDER":
      return "현재 저체중입니다.";
    case "NORMAL":
      return "현재 정상체중입니다.";
    case "OVER":
      return "현재 과체중입니다.";
    case "OBESE":
      return "현재 비만입니다.";
    default:
      return "현재 고도비만입니다.";
  }
}
