"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/zustand/user";
import { getMyRecords } from "@/app/lib/recordsAPI";

const getStartWeek = () => {
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return new Date(d.setHours(0, 0, 0, 0)).toISOString().slice(0, 10);
};

export default function useWeeklyRuns() {
  const token = useUserStore((s) => s.user?.token?.accessToken);
  const [weeklyRuns, setWeeklyRuns] = useState(0);

  useEffect(() => {
    if (!token) return setWeeklyRuns(0);

    getMyRecords(token).then((res) => {
      if (res?.ok !== 1) return setWeeklyRuns(0);
      const monday = getStartWeek();
      setWeeklyRuns(res.item.filter((r) => r.extra?.date >= monday).length);
    });
  }, [token]);

  return weeklyRuns;
}
