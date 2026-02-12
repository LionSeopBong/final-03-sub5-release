export type Tab = "KR" | "GLOBAL";

export type Marathon = {
  id: string;

  region: Tab;

  title: string;
  // 대회 날짜
  raceDate: string;
  // 접수 기간
  registrationStart: string;
  registrationEnd: string;

  location: string;

  courses: string[];
  // 신청 링크
  applyUrl: string;

  description: string;
};
