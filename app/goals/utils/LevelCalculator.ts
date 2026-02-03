import { LevelInfo } from "../types/index";

export function calculateLevel({ pace, totalDistance }: LevelInfo) {
  console.log("totalDistance", totalDistance);
  console.log("pace", pace);

  if (totalDistance === 0 || pace >= 5.5) {
    return "초급";
  } else if (pace >= 4.5 && pace < 5.5) {
    return "중급";
  } else {
    return "고급";
  }
}
