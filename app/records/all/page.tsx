"use client";

import { deleteRecord, getMyRecords } from "@/app/lib/recordsAPI";
import { calculateMonthlyStats, calculateRecentPace, calculateWeeklyStats } from "@/app/lib/stats";
import { RunningRecord } from "@/app/lib/types";
import useStatsStore from "@/zustand/statsStore";
import useUserStore from "@/zustand/user";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function AllRecordsView() {
  const [data, setData] = useState<RunningRecord[]>([]);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const { weeklyStats, monthlyStats, recentPace, setWeeklyStats, setMonthlyStats, setRecentPace } = useStatsStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("데이터 조회시작");
        const token = user?.token?.accessToken;
        if (!token) {
          console.log("로그인 필요");
          return;
        }
        const result = await getMyRecords(token);

        if (result.ok) {
          const records = result.item.filter((item) => item.extra);

          console.log("기록개수", records.length);
          setWeeklyStats(calculateWeeklyStats(records));
          setMonthlyStats(calculateMonthlyStats(records));
          setRecentPace(calculateRecentPace(records, 2));
          setData(records);
        }
      } catch (error) {
        console.error("에러 발생", error);
      }
    };
    fetchData();
  }, [user, setWeeklyStats, setMonthlyStats, setRecentPace]);
  //데이터 정렬
  const sortedRecentRecords = useMemo(() => {
    return [...data]
      .filter((r) => r.extra?.date)
      .sort((a, b) => {
        return new Date(b.extra.date).getTime() - new Date(a.extra.date).getTime();
      });
  }, [data]);
  // 최근 기록 삭제
  const handleDelete = async (recordId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    try {
      const token = user?.token?.accessToken;
      if (!token) {
        alert("로그인이 필요합니다");
        return;
      }
      const result = await deleteRecord(recordId.toString(), token);
      if (result.ok) {
        // setData((prev) => prev.filter((r) => r._id !== recordId));
        const newData = data.filter((r) => r._id !== recordId);
        setData(newData);
        // 삭제 후 통계 데이타도 적용된 데이터로 랜더링 되도록
        setWeeklyStats(calculateWeeklyStats(newData));
        setMonthlyStats(calculateMonthlyStats(newData));
        setRecentPace(calculateRecentPace(newData, 2));
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("삭제에러", error);
    }
  };
  return (
    <>
      {/* 헤더 */}
      <header className="flex relative justify-center items-center py-6 w-full">
        <button className="absolute left-5" onClick={() => router.back()}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl  font-bold text-primary ">나의 러닝 기록 </h1>
      </header>
      {/* 최근 기록 */}
      <div className="bg-white rounded-lg border border-gray-200 mx-4 my-3 p-5">
        <h2 className="text-lg font-semibold mt-4">최근 기록</h2>
        <p className="text-gray-500 text-sm pb-3">최근 활동 내역을 확인 하세요</p>
        {/* 기록 리스트 */}
        {data.length > 0 ? (
          <div className="space-y-3 ">
            {/* 기록 아이템 *************************************************************** */}
            {sortedRecentRecords.map((record) => (
              <div key={record._id} className="bg-white rounded-xl border border-gray-200 p-4">
                {/* 날짜 */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{record.extra.date}</span>
                  <Link href={`/records/${record._id}/edit`} className="text-xs text-blue-500">
                    수정
                  </Link>
                  <button className="text-xs text-red-500 cursor-pointer" onClick={() => handleDelete(record._id)}>
                    삭제
                  </button>
                  <Link href={`/records/${record._id}/`} className="text-xs text-primary">
                    상세
                  </Link>
                </div>

                {/* 데이터 한 줄 */}
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="font-bold text-primary text-lg">{record.extra.distance}</span>
                    <span className="text-gray-400 text-xs ml-1">km</span>
                  </div>

                  <div className="h-4 w-px bg-gray-200" />

                  <div>
                    <span className="font-bold text-gray-700">{record.extra.duration}</span>
                    <span className="text-gray-400 text-xs ml-1">Time</span>
                  </div>

                  <div className="h-4 w-px bg-gray-200" />

                  <div>
                    <span className="font-bold text-gray-700">{record.extra.pace}</span>
                    <span className="text-gray-400 text-xs ml-1">/km</span>
                  </div>
                </div>

                {/* 장소 */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                  <span>📍</span>
                  <span>{record.extra.location || "장소 없음"}</span>
                </div>
              </div>
            ))}

            {/* 기록 아이템 **************************************************************** */}
          </div>
        ) : (
          <div>기록 없음</div>
        )}
      </div>
    </>
  );
}
