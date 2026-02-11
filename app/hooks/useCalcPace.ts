import { useEffect, useState } from "react";

export function useCalcPace(keepPaceOnEmpty: boolean = false) {
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
  const [distance, setDistance] = useState("");
  const [pace, setPace] = useState("");

  useEffect(() => {
    const h = parseInt(hour) || 0;
    const m = parseInt(min) || 0;
    const s = parseInt(sec) || 0;
    const d = parseInt(distance) || 0;
    if (d > 0 && (h > 0 || m > 0 || s > 0)) {
      const totalMinutes = h * 60 + m + s / 60;
      const paceInMinutes = totalMinutes / d;
      const paceMin = Math.floor(paceInMinutes);
      const paceSec = Math.round((paceInMinutes - paceMin) * 60);
      if (paceSec >= 60) {
        setPace(`${paceMin + 1}:00`);
      } else {
        setPace(`${paceMin}:${paceSec.toString().padStart(2, "0")}`);
      }
    } else {
      if (!keepPaceOnEmpty) setPace("");
    }
  }, [hour, min, sec, distance]);

  return { hour, setHour, min, setMin, sec, setSec, distance, setDistance, pace, setPace };
}
