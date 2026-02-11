"use client";

import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // 1. 현재 페이지가 속한  그룹 계산 (1~5 페이지 = 그룹1, 6~10 페이지 = 그룹2)
  const pageGroup = Math.ceil(currentPage / 5);

  // 2. 그룹의 첫 | 마지막 페이지 번호
  const lastPageOfGroup = pageGroup * 5;
  const firstPageOfGroup = lastPageOfGroup - 4;

  // 3. 실제 보여줄 페이지 번호들 배열 생성
  const pagesToShow = [];
  for (
    let i = firstPageOfGroup;
    i <= Math.min(lastPageOfGroup, totalPages);
    i++
  ) {
    pagesToShow.push(i);
  }

  // 4. 이전 | 다음 그룹 존재 여부
  const hasPrevGroup = firstPageOfGroup > 1;
  const hasNextGroup = lastPageOfGroup < totalPages;

  return (
    <>
      <div className="mb-16 flex items-center justify-center gap-4">
        {/* < 버튼 - 이전 그룹 마지막 페이지로 */}
        <button
          className="p-4 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => onPageChange(firstPageOfGroup - 1)}
          disabled={!hasPrevGroup}
        >
          <Image
            src="/icons/pagination-l.svg"
            alt="이전 페이지 목록 버튼"
            width={16}
            height={16}
          />
        </button>
        {/* 페이지 번호 동적 렌더링 */}
        {pagesToShow.map((page) => (
          <button
            key={page}
            aria-current={currentPage === page ? "page" : undefined}
            className={`cursor-pointer p-1 ${currentPage === page ? "font-semibold text-[#003458]" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        {/* > 버튼 - 다음 그룹 첫 페이지로 */}
        <button
          className="p-4 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => onPageChange(lastPageOfGroup + 1)}
          disabled={!hasNextGroup}
        >
          <Image
            src="/icons/pagination-r.svg"
            alt="다음 페이지 목록 버튼"
            width={16}
            height={16}
          />
        </button>
      </div>
    </>
  );
}
