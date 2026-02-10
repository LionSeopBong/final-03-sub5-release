import { useEffect, useRef, useState } from "react";

export function useAutoScroll() {
  const [acticeSection, setActiceSection] = useState<"home" | "daily" | "stats" | "recent" | "monthRecord" | "weeklyRecord">("home");
  const dailyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);
  const monthRecordRef = useRef<HTMLDivElement>(null);
  const weeklyRecordRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionName: "home" | "daily" | "stats" | "recent" | "monthRecord" | "weeklyRecord") => {
    setActiceSection(sectionName);
    if (sectionName === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const sections = {
      // home: homeRef, // 홈
      daily: dailyRef, // 오늘 기록
      weeklyRecord: weeklyRecordRef, // 주간기록
      monthRecord: monthRecordRef, // 월간기록
      recent: recentRef, // 최근 기록
      stats: statsRef, // 분석
    };
    sections[sectionName]?.current?.scrollIntoView({ behavior: "smooth" });
  };
  //스크롤 위치 판별
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute("data-section");
            if (sectionName) {
              setActiceSection(sectionName as typeof acticeSection);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-100px 0px -50% 0px",
      },
    );
    const sections = [dailyRef.current, weeklyRecordRef.current, monthRecordRef.current, recentRef.current, statsRef.current];
    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });
    return () => observer.disconnect();
  }, []);
  return { acticeSection, scrollToSection, dailyRef, weeklyRecordRef, monthRecordRef, recentRef, statsRef };
}
