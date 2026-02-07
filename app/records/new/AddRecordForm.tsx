"use client";
import { addRecord } from "@/app/action/records";
import useUserStore from "@/zustand/user";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useActionState, useEffect, useState } from "react";

export default function AddRecordForm() {
  const [state, formAction, isPending] = useActionState(addRecord, null);
  const router = useRouter();
  const [data, setData] = useState(""); // 버튼 활성화, 비활성화 여부
  const user = useUserStore((state) => state.user);

  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
  const [distance, setDistance] = useState("");
  const [pace, setPace] = useState("");
  const [memo, setMemo] = useState("");

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
      setPace("");
    }
  }, [hour, min, sec, distance]);

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다");
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (state?.success) {
      router.push("/records");
      router.refresh();
    }
  }, [state, router]);
  // 필수 요소 미입력 시 버튼 비활성화
  const isFormValid = data && (hour || min || sec) && distance && parseFloat(distance) > 0 && pace;
  return (
    <>
      {/* 헤더 */}
      <header className="flex justify-between items-center py-6 w-full">
        <button className="" onClick={() => router.back()}>
          <ArrowLeft size={24} className="" />
        </button>
        <h1 className="text-2xl font-bold text-gray-700 ">러닝 기록 추가</h1>
        <button type="button" onClick={() => router.back()} className="text-primary-light">
          취소
        </button>
      </header>
      {/* 입력 폼 */}
      <form action={formAction} className="w-full">
        <input type="hidden" name="token" value={user?.token?.accessToken || ""} />
        <div className="bg-white grid grid-cols-2 p-5 gap-4">
          {/* 날짜 입력 */}
          <div className="flex flex-col gap-2">
            <label className="text-s font-bold" htmlFor="date">
              *날짜
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="text-xs py-2 px-3 border rounded-lg border-gray-200 focus:outline-none focus:border-primary"
            />
          </div>

          {/* 운동시간 입력 */}
          <div className="flex flex-col gap-2">
            <label className="text-s font-bold">*운동시간</label>
            <div className="flex justify-center text-xs py-2 border text-center rounded-lg border-gray-200">
              <input
                type="number"
                name="hour"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                placeholder="00"
                min="0"
                max="23"
                className="w-8 text-center border-0 focus:outline-none"
              />
              <span>:</span>
              <input
                type="number"
                name="min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="22"
                min="0"
                max="59"
                className="w-8 text-center border-0 focus:outline-none"
              />
              <span>:</span>
              <input
                type="number"
                name="sec"
                value={sec}
                onChange={(e) => setSec(e.target.value)}
                placeholder="13"
                min="0"
                max="59"
                className="w-8 text-center border-0 focus:outline-none"
              />
            </div>
          </div>

          {/* 거리 */}
          <div className="flex flex-col gap-2">
            <label className="text-s font-bold" htmlFor="distance">
              *거리 (km)
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              value={distance}
              onChange={(e) => {
                setDistance(e.target.value);
              }}
              placeholder="5.00 km"
              step="0.01"
              className="text-sm  text-center py-2 border rounded-lg border-gray-200 focus:outline-none focus:border-primary"
            />
          </div>

          {/* 평균 페이스 */}
          <div className="flex flex-col gap-2">
            <label className="text-s font-bold" htmlFor="pace">
              평균 페이스
            </label>
            <input
              type="text"
              id="pace"
              name="pace"
              value={pace}
              readOnly
              placeholder="5:30 /km"
              className="text-center text-sm py-2 border rounded-lg border-gray-200 bg-transparent text-gray-500"
            />
          </div>
        </div>

        {/* 운동 타입 선택 */}
        <div className="exercise-type  bg-white">
          <label className="text-xs font-bold">운동유형</label>
          <div className="exercuse-part flex py-5 gap-3">
            {/* 러닝 */}
            <div>
              <input type="radio" id="running" name="exerciseType" value="running" defaultChecked className="hidden " />
              <label htmlFor="running" className=" px-2 py-2 text-xs  rounded-lg border bg-primary text-white border-primary cursor-pointer">
                러닝
              </label>
            </div>
            {/* 러닝머신 */}
            <div>
              <input type="radio" id="treadmill" name="exerciseType" value="treadmill" className="hidden" />
              <label htmlFor="treadmill" className="px-2 py-2 text-xs  rounded-lg border-notselectbtn-border bg-notselectbtn  border-primary cursor-pointer">
                러닝머신
              </label>
            </div>
            {/* 하이킹 */}
            <div>
              <input type="radio" id="hiking" name="exerciseType" value="hiking" className="hidden" />
              <label htmlFor="hiking" className=" px-2 py-2 text-xs  rounded-lg border-notselectbtn-border bg-notselectbtn  border-primary cursor-pointer">
                하이킹
              </label>
            </div>
            {/* 인터벌 */}
            <div>
              <input type="radio" id="interval" name="exerciseType" value="interval" className="hidden" />
              <label htmlFor="interval" className="px-2 py-2 text-xs  rounded-lg border-notselectbtn-border bg-notselectbtn  border-primary cursor-pointer">
                인터벌
              </label>
            </div>
          </div>
        </div>
        {/* 운동장소 */}
        <div className="container-location my-3">
          <label className="text-s font-bold" htmlFor="location">
            운동장소
          </label>
          <input
            className="w-full my-2 text-xs border font-bold border-gray-200 px-2 py-2 rounded-md"
            type="text"
            name="location"
            id="location"
            placeholder="예: 한강공원"
          />
        </div>
        {/* 소모 칼로리 */}
        <div className="my-3 flex justify-between items-center">
          <label className="text-s font-bold" htmlFor="kcal">
            소모 칼로리
            <span className="text-xs text-gray-400">&#40;선택&#41;</span>
          </label>
          <div className="flex items-center gap-1">
            <input className="w-16  text-right my-2 text-s font-semibold  px-2 py-2" type="text" name="kcal" id="kcal" placeholder="0" />
            <span className="text-xs text-gray-400">&#40;kcal&#41;</span>
          </div>
        </div>
        {/* 메모 */}
        <div className="container-memo">
          <label htmlFor="memo" className="text-s font-bold">
            메모 <span className="text-xs text-gray-400">&#40;옵션&#41;</span>
          </label>
          <textarea
            name="memo"
            id="memo"
            rows={3}
            value={memo}
            onChange={(e) => {
              setMemo(e.target.value);
            }}
            placeholder="예:오늘의 컨디션은 어땠나요?"
            className="w-full text-xs border font-bold border-gray-200 px-2 py-2 rounded-md my-1"
          />
        </div>
        <button
          type="submit"
          disabled={isPending || !isFormValid}
          className={`w-full ${!isFormValid ? "bg-gray-400" : "bg-primary"}  text-white rounded-md p-4 font-bold my-3`}
        >
          {isPending ? "저장중" : "기록저장"}
        </button>

        {state?.success && <div className="text-green-500">저장 완료! 이동 중...</div>}
        {state?.error && <div className="text-red-500 text-sm mb-3">{state.error}</div>}
      </form>
    </>
  );
}
