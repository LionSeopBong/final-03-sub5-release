"use client";

import { useMemo, useState } from "react";

// 약관을 구분하기 위한 타입
type TermKey = "service" | "privacy" | "location" | "marketing";

// 필수 약관 목록
// 버튼 활성화 조건에 사용됨
const REQUIRED: TermKey[] = ["service", "privacy", "location"];

// 전체 약관 목록 (필수 + 선택)
const ALL: TermKey[] = ["service", "privacy", "location", "marketing"];

export function useTerms() {
  // 현재 체크된 약관들의 목록 상태
  const [checked, setChecked] = useState<TermKey[]>([]);

  // 필수 약관이 모두 체크되었는지 확인
  // REQUIRED 배열의 모든 항목이 checked 안에 있으면 true
  // useMemo을 사용하여 checked 상태가 바뀔 때만 계산
  const isRequiredAllChecked = useMemo(
    () => REQUIRED.every((k) => checked.includes(k)),
    [checked],
  );

  // 전체 약관이 모두 체크되었는지 확인
  // 전체 동의 체크 표시 사용
  const isAllChecked = useMemo(
    () => ALL.every((k) => checked.includes(k)),
    [checked],
  );

  // 전체 동의 토글 함수
  // 이미 전부 체크된 상태면 -> 전부 해제
  // 하나라도 빠져 있으면 -> 전부 체크
  const toggleAll = () => {
    setChecked((prev) => (ALL.every((k) => prev.includes(k)) ? [] : ALL));
  };

  // 개별 약관 토글 함수
  // 이미 체크되어 있으면 제거
  // 체크 안 되어 있으면 추가
  const toggleOne = (key: TermKey) => {
    setChecked((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key],
    );
  };

  return { checked, isRequiredAllChecked, isAllChecked, toggleAll, toggleOne };
}
