import { useEffect, useRef, useState } from "react";

export function useAutoScroll() {
  const [acticeSection, setActiceSection] = useState<"home" | "daily" | "stats" | "recent" | "monthRecord" | "weeklyRecord">("home");
  const dailyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);
  const monthRecordRef = useRef<HTMLDivElement>(null);
  const weeklyRecordRef = useRef<HTMLDivElement>(null);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const navButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  // 네비 버튼을 중앙으로 스크롤하는 함수
  const scrollNavToCenter = (section: string) => {
    const navContainer = navContainerRef.current;
    const button = navButtonRefs.current[section];

    if (navContainer && button) {
      const containerWidth = navContainer.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;

      // 버튼을 중앙에 배치하기 위한 스크롤 위치 계산
      const scrollPosition = buttonLeft - containerWidth / 2 + buttonWidth / 2;

      navContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };
  const scrollToSection = (sectionName: "home" | "daily" | "stats" | "recent" | "monthRecord" | "weeklyRecord") => {
    setActiceSection(sectionName);
    scrollNavToCenter(sectionName);

    if (sectionName === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const sections = {
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
  // acticeSection이 변경될 때마다 네비 버튼을 중앙으로 스크롤
  useEffect(() => {
    if (acticeSection) {
      scrollNavToCenter(acticeSection);
    }
  }, [acticeSection]);
  return { acticeSection, scrollToSection, dailyRef, weeklyRecordRef, monthRecordRef, recentRef, statsRef, navContainerRef, navButtonRefs };
}
