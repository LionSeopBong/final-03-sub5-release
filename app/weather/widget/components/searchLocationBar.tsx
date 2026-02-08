"use client";

import { useEffect, useState } from "react";
import { KakaoPlace } from "@/types/kakao";

interface Props {
  onSelect: (place: KakaoPlace) => void;
}

export default function SearchLocationBar({ onSelect }: Props) {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<KakaoPlace[]>([]);
  const [open, setOpen] = useState(false);

  // 추천 검색어 조회
  useEffect(() => {
    if (!keyword.trim()) {
      setItems([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/kakao/search?query=${encodeURIComponent(keyword)}`,
        );
        const data = await res.json();
        setItems(data.documents ?? []);
        setOpen(true);
      } catch (err) {
        console.error(err);
        setItems([]);
        setOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  // 검색 실행
  const handleSearch = () => {
    if (!keyword.trim()) return;

    // 1️⃣ 추천 검색어 중 input과 정확히 일치하는 항목 찾기
    const exactMatch = items.find((item) => item.place_name === keyword);

    if (exactMatch) {
      // 정확히 일치하는 추천 검색어가 있으면 그 객체 사용
      setKeyword(exactMatch.place_name);
      setOpen(false);
      onSelect(exactMatch);
    } else {
      // 정확히 일치하는 추천 검색어가 없으면 input 텍스트 기반 임시 객체 사용
      const manualPlace: KakaoPlace = {
        id: "manual",
        place_name: keyword,
        address_name: keyword,
        road_address_name: keyword,
        x: "0",
        y: "0",
      };
      setOpen(false);
      onSelect(manualPlace);
    }
  };

  return (
    <div className="relative mb-4">
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="위치를 검색하세요"
        className="w-full rounded-full px-5 py-3 pr-12 shadow-sm border text-sm focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
      />

      <span
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
        onClick={handleSearch}
      >
        <img src="/icons/search--local.svg" />
      </span>

      {open && items.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full rounded-xl border bg-white shadow-lg overflow-hidden">
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setKeyword(item.place_name);
                setOpen(false);
                onSelect(item);
              }}
              className="px-4 py-3 cursor-pointer hover:bg-gray-100"
            >
              <p className="text-sm font-medium">{item.place_name}</p>
              <p className="text-xs text-gray-400">
                {item.road_address_name || item.address_name}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
