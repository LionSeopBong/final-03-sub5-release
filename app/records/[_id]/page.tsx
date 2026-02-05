"use client";

import { deleteRecord, getRecord } from "@/app/lib/recordsAPI";
import { RunningRecord } from "@/app/lib/types";
import useUserStore from "@/zustand/user";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// 상세페이지
export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const recordId = params._id as string;
  const [record, setRecord] = useState<RunningRecord | null>(null);
  const [loading, setLoading] = useState(true);

  const user = useUserStore((state) => state.user);
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const result = await getRecord(recordId);

        if (result.ok) {
          setRecord(result.item);
        }

        setLoading(false);
      } catch (error) {
        console.error("에러:", error);
        setLoading(false);
      }
    };

    fetchRecord();
  }, [recordId]);

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    try {
      const token = user?.token?.accessToken;

      if (!token) {
        alert("로그인이 필요합니다");
        return;
      }
      const result = await deleteRecord(id, token);
      if (result.ok) {
        // 삭제 후 통계 데이타도 적용된 데이터로 랜더링 되도록
        alert("삭제 완료!");
        router.push("/records");
        router.refresh();
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("삭제 에러:", error);
      alert("에러 발생");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!record) return <div>기록을 찾을 수 없습니다</div>;
  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 ">
        <button className="" onClick={() => router.back()}>
          <ArrowLeft size={24} className="" />
        </button>
        <h1 className="text-2xl font-bold text-gray-700 ">기록상세</h1>
        <div className="w-6"></div>
      </header>
      {/* 메인카드 */}
      <div className="bg-white border rounded-lg px-3 py-3 mx-3 border-gray-200">
        {/* 러닝 뱃지 */}
        <div className="flex justify-center mb-1.5">
          <div className="bg-primary text-white text-lg font-semibold px-8 py-2 rounded-lg">{record.extra.exerciseType}</div>
        </div>
        {/* 날짜 */}
        <p className="text-center text-sm mb-1 font-semibold py-1.5 border-b border-gray-200">{record.extra.date}</p>
        {/* 거리 */}
        <div className="flex justify-between items-center text-lg font-semibold py-3 px-3 border-b border-gray-200">
          <div className="flex">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="white" />
              <path
                d="M12 22C12 22 19 14.8 19 10C19 9.08075 18.8189 8.1705 18.4672 7.32122C18.1154 6.47194 17.5998 5.70026 16.9497 5.05025C16.2997 4.40024 15.5281 3.88463 14.6788 3.53284C13.8295 3.18106 12.9193 3 12 3C11.0807 3 10.1705 3.18106 9.32122 3.53284C8.47194 3.88463 7.70026 4.40024 7.05025 5.05025C6.40024 5.70026 5.88463 6.47194 5.53284 7.32122C5.18106 8.1705 5 9.08075 5 10C5 14.8 12 22 12 22Z"
                stroke="#FFCA3A"
                strokeWidth="2"
              />
              <path
                d="M12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5Z"
                stroke="#FFCA3A"
                strokeWidth="2"
              />
            </svg>
            <span className="mx-1">거리</span>
          </div>
          <p>{record.extra.distance} km</p>
        </div>
        {/* 시간 */}
        <div className="flex justify-between items-center text-lg font-semibold py-3 px-3 border-b border-gray-200">
          <div className="flex">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="#684BE9"
                strokeWidth="2"
              />
              <path d="M12 7V12L15 14" stroke="#684BE9" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="mx-1">시간</span>
          </div>
          <p>{record.extra.duration}</p>
        </div>
        {/* 페이스 */}
        <div className="flex justify-between items-center text-lg font-semibold py-3 px-3 border-b border-gray-200">
          <div className="flex">
            <svg width="20" height="26" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 0L0 12H6L5 20L14 8H8L9 0Z" fill="#1EEF1E" />
            </svg>
            <span className="mx-1">페이스</span>
          </div>
          <p>{record.extra.pace} /km</p>
        </div>
      </div>
      {/* 러닝뱃지 선택사항 */}
      <div className="bg-white border rounded-lg px-3 py-3 mx-3 my-3 border-gray-200">
        {/* 장소 */}
        <div className="flex justify-between items-center text-lg font-semibold py-3 px-3 border-b border-gray-200">
          <div className="flex">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C12 22 19 14.8 19 10C19 9.08075 18.8189 8.1705 18.4672 7.32122C18.1154 6.47194 17.5998 5.70026 16.9497 5.05025C16.2997 4.40024 15.5281 3.88463 14.6788 3.53284C13.8295 3.18106 12.9193 3 12 3C11.0807 3 10.1705 3.18106 9.32122 3.53284C8.47194 3.88463 7.70026 4.40024 7.05025 5.05025C6.40024 5.70026 5.88463 6.47194 5.53284 7.32122C5.18106 8.1705 5 9.08075 5 10C5 14.8 12 22 12 22Z"
                fill="#D9D9D9"
              />
              <path
                d="M12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5Z"
                fill="white"
              />
            </svg>
            <span className="mx-1">장소</span>
          </div>
          <p>
            <p className={`${record.extra.location ? "" : "text-gray-400"}`}>{record.extra.location || "미입력"} </p>
          </p>
        </div>
        {/* 칼로리 */}
        <div className="flex justify-between items-center text-lg font-semibold py-3 px-3 border-b border-gray-200">
          <div className="flex">
            <svg width="22" height="28" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-1">
              <path d="M7 14C11 14 14 11 14 7C14 4 12 2 10 0C10 3 8 4 7 6C6 4 4 3 4 0C2 2 0 4 0 7C0 11 3 14 7 14Z" fill="#FF0000" />
            </svg>
            <span className="mx-1">칼로리</span>
          </div>
          <p className="flex p-1">
            <p className={`${record.extra.calories ? "px-1" : "text-gray-400 px-1"}`}>{record.extra.calories || "미입력"}</p>kcal
          </p>
        </div>
      </div>
      {/* 메모 */}
      <div className="bg-white border rounded-lg px-3 py-3 mx-3 my-3 border-gray-200">
        <div>
          <div className="flex px-4 py-1">
            <svg width="28" height="30" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 12C18 13.0609 17.5786 14.0783 16.8284 14.8284C16.0783 15.5786 15.0609 16 14 16H5L0 20V4C0 2.93913 0.421427 1.92172 1.17157 1.17157C1.92172 0.421427 2.93913 0 4 0H14C15.0609 0 16.0783 0.421427 16.8284 1.17157C17.5786 1.92172 18 2.93913 18 4V12Z"
                fill="#8C8C8C"
              />
            </svg>
            <span className="mx-1 font-semibold text-lg">메모</span>
          </div>
          <div className={`${record.content ? "" : "text-gray-400"} w-full text-xs border font-bold border-gray-200 px-2 py-2 rounded-md my-1`}>
            {record.content || "미입력"}
          </div>
        </div>
        <div className="flex gap-3 mx-4 my-6">
          <Link href={`/records/${recordId}/edit`} className="flex-1 bg-primary text-center text-white py-4 rounded-xl font-semibold">
            수정
          </Link>
          <button className="flex-1 bg-primary text-white py-4 rounded-xl font-semibold" onClick={() => handleDelete(recordId)}>
            삭제
          </button>
        </div>
      </div>
    </>
  );
}
