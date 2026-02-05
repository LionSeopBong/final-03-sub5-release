"use server";

import { createRecord, deleteRecord, updateRecord } from "@/app/lib/recordsAPI";
import { redirect } from "next/navigation";

export async function addRecord(prevState: any, formData: FormData) {
  try {
    console.log("🔵 Server Action 시작");

    //폼 데이터
    const date = formData.get("date") as string;
    const hour = (formData.get("hour") as string) || "0";
    const min = (formData.get("min") as string) || "0";
    const sec = (formData.get("sec") as string) || "0";
    const distance = formData.get("distance") as string;
    const pace = formData.get("pace") as string;
    const exerciseType = (formData.get("exerciseType") as string) || "running";
    const location = (formData.get("location") as string) || "미입력";
    const calories = (formData.get("kcal") as string) || "미입력";
    const memo = formData.get("memo") as string;
    // duration 포멧

    const duration = `${hour.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    const token = formData.get("token") as string;
    if (!token) {
      return { error: "로그인이 필요합니다" };
    }
    // api 호출

    const result = await createRecord(
      {
        title: `${date} 러닝`,
        content: memo || undefined,
        extra: {
          date,
          duration,
          distance: parseFloat(distance),
          pace,
          exerciseType,
          location: location || undefined,
          calories: calories ? parseInt(calories) : undefined,
        },
      },
      token,
    );
    // 호출 성공
    if (result.ok) {
      return { success: true };
      // redirect("/records");
    } else {
      return { error: "저장 실패" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { error: "에러 발생" };
  }
}
// 기록 수정
export async function editRecord(prevState: any, formData: FormData) {
  try {
    console.log("🔵 Server Action 시작");

    //폼 데이터
    const date = formData.get("date") as string;
    const hour = (formData.get("hour") as string) || "0";
    const min = (formData.get("min") as string) || "0";
    const sec = (formData.get("sec") as string) || "0";
    const distance = formData.get("distance") as string;
    const pace = formData.get("pace") as string;
    const exerciseType = (formData.get("exerciseType") as string) || "running";
    const location = (formData.get("location") as string) || "미입력";
    const calories = (formData.get("kcal") as string) || "미입력";
    const memo = (formData.get("memo") as string) || "미입력";
    // duration 포멧
    const duration = `${hour.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    const recordId = formData.get("recordId") as string;
    const token = formData.get("token") as string;
    if (!token) {
      return { error: "로그인이 필요합니다" };
    }
    // api 호출

    const result = await updateRecord(
      recordId,
      {
        title: `${date} 러닝`,
        content: memo || undefined,
        extra: {
          date,
          duration,
          distance: parseFloat(distance),
          pace,
          exerciseType,
          location: location || undefined,
          calories: calories ? parseInt(calories) : undefined,
        },
      },
      token,
    );
    // 호출 성공
    if (result.ok) {
      return { success: true };
      // redirect("/records");
    } else {
      return { error: "저장 실패" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { error: "에러 발생" };
  }
}

// 삭제
export async function removeRecord(prevState: any, formData: FormData) {
  try {
    console.log("🔵 삭제 Server Action 시작");
    // 토큰과 ID 받기
    const token = formData.get("token") as string;
    const recordId = formData.get("recordId") as string;

    if (!token) {
      return { error: "로그인이 필요합니다" };
    }

    if (!recordId) {
      return { error: "기록 ID가 없습니다" };
    }

    const result = await deleteRecord(recordId, token);
    if (result.ok) {
      return { success: true };
    } else {
      return { error: "삭제 실패" };
    }
  } catch (error: any) {
    console.error("Error:", error);
    return { error: "에러 발생" };
  }
}
