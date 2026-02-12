export function getDDay(dateString: string) {
  const today = new Date();
  const target = new Date(dateString);

  // 시간 차이 제거 (날짜만 비교)
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diff = target.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days > 0) return `D-${days}`;
  if (days === 0) return "D-Day";
  return "종료";
}

export type RegStatus = "OPEN" | "UPCOMING" | "CLOSED";

export function isStratiOpen(start: string, end: string): RegStatus {
  const today = new Date();
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);
  const e = new Date(end);
  e.setHours(23, 59, 59, 999);
  if (today < s) return "UPCOMING";
  if (today > e) return "CLOSED";
  return "OPEN";
}
