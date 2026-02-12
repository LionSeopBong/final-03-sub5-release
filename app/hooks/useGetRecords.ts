import { deleteRecord, getMyRecords } from "@/app/lib/recordsAPI";
import { calculateMonthlyStats, calculateRecentPace, calculateWeeklyStats } from "@/app/lib/stats";
import { RunningRecord } from "@/app/lib/types";
import useStatsStore from "@/zustand/statsStore";
import useUserStore from "@/zustand/user";
import { useEffect, useState } from "react";

export function useGetRecords() {
  const [data, setData] = useState<RunningRecord[]>([]);
  const { weeklyStats, monthlyStats, recentPace, setWeeklyStats, setMonthlyStats, setRecentPace } = useStatsStore();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = user?.token?.accessToken;
        if (!token) {
          return;
        }
        const result = await getMyRecords(token);

        if (result.ok) {
          const records = result.item.filter((item) => item.extra);

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
  return { data, weeklyStats, monthlyStats, recentPace, handleDelete };
}
