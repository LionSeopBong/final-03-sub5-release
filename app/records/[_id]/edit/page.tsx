"use client";
import { editRecord, removeRecord } from "@/app/action/records";
import { useCalcPace } from "@/hooks/useCalcPace";
import { useLoginCheck } from "@/hooks/useLoginCheck";
import { useSuccessRedirect } from "@/hooks/useSuccessRedirect";
import { getRecord } from "@/app/lib/recordsAPI";
import { RunningRecord } from "@/app/lib/types";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
// 수정페이지
export default function EditRecordPage() {
  const router = useRouter();
  const params = useParams();
  const recordId = params._id as string;
  const [record, setRecord] = useState<RunningRecord | null>(null);
  const [loading, setLoading] = useState(true);
  // 수정
  const [state, formAction, isPending] = useActionState(editRecord, null);
  // 삭제
  const [deleteState, deleteAction, isDelete] = useActionState(removeRecord, null);

  //페이스 자동 계산
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const result = await getRecord(recordId);

        if (result.ok) {
          setRecord(result.item);

          // 폼에 데이터 채우기
          const [h, m, s] = result.item.extra.duration.split(":");
          setHour(parseInt(h).toString());
          setMin(parseInt(m).toString());
          setSec(parseInt(s).toString());
          setDistance(result.item.extra.distance.toString());
          setPace(result.item.extra.pace);
        }

        setLoading(false);
      } catch (error) {
        console.error("에러:", error);
        setLoading(false);
      }
    };

    fetchRecord();
  }, [recordId]);

  const exerciseType = record?.extra.exerciseType || "Running";

  // 로그인 확인
  const { user } = useLoginCheck();
  // 삭제
  useSuccessRedirect(deleteState, "/records");
  //수정
  useSuccessRedirect(state, "/records");
  //페이스 계산
  const { hour, setHour, min, setMin, sec, setSec, distance, setDistance, pace, setPace } = useCalcPace(true);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 기록 없음
  if (!record) {
    return <div>기록을 찾을 수 없습니다</div>;
  }
  return (
    <>
      {/* 헤더 */}
      <header className="flex justify-between items-center px-4 py-6 w-full">
        <button className="" onClick={() => router.back()}>
          <ArrowLeft size={24} className="" />
        </button>
        <h1 className="text-2xl font-bold text-gray-700 ">러닝 기록 수정</h1>
        <form action={deleteAction}>
          <input type="hidden" name="token" value={user?.token?.accessToken || ""} />
          <input type="hidden" name="recordId" value={recordId} />
          <button
            disabled={isDelete}
            onClick={(e) => {
              if (!confirm("정말 삭제하시겠습니까?")) {
                e.preventDefault();
              }
            }}
            className="text-white bg-primary p-2 rounded-lg"
          >
            {isDelete ? "삭제중..." : "삭제"}
          </button>
        </form>
      </header>
      {deleteState?.error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">{deleteState.error}</div>}

      {/* 입력 폼 */}
      <form action={formAction} className="w-full">
        <input type="hidden" name="token" value={user?.token?.accessToken || ""} />
        <input type="hidden" name="recordId" value={recordId} />
        <div className="bg-white grid grid-cols-2 p-5 gap-4">
          {/* 날짜 입력 */}
          <div className="flex flex-col gap-2">
            <label className="text-s font-bold" htmlFor="date">
              날짜
            </label>
            <input
              type="date"
              defaultValue={record.extra.date}
              id="date"
              name="date"
              className=" text-xs py-2 px-3 border rounded-lg border-gray-200 focus:outline-none focus:border-primary"
            />
          </div>

          {/* 운동시간 입력 */}
          <div className="flex flex-col gap-2">
            <label className="text-s font-bold">운동시간</label>
            <div className="flex justify-center text-xs py-2 border text-center rounded-lg border-gray-200">
              <input
                type="number"
                name="hour"
                value={hour}
                onChange={(e) => {
                  setHour(e.target.value);
                }}
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
                onChange={(e) => {
                  setMin(e.target.value);
                }}
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
                onChange={(e) => {
                  setSec(e.target.value);
                }}
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
              거리 (km)
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
              placeholder="5:30 /km"
              readOnly
              className="text-center text-sm py-2 border rounded-lg border-gray-200 bg-transparent text-gray-500"
            />
          </div>
        </div>

        {/* 운동 타입 선택 */}
        <div className="exercise-type  bg-white px-5">
          <label className="text-xs font-bold">운동유형</label>
          <div className="exercuse-part flex py-5 gap-3">
            {/* 러닝 */}
            <div>
              <input
                type="radio"
                id="running"
                defaultChecked={record.extra.exerciseType === "running"}
                name="exerciseType"
                value="running"
                className="hidden "
              />
              <label htmlFor="running" className=" px-2 py-2 text-xs  rounded-lg border bg-primary text-white border-primary cursor-pointer">
                러닝
              </label>
            </div>
            {/* 러닝머신 */}
            <div>
              <input
                type="radio"
                id="treadmill"
                defaultChecked={record.extra.exerciseType === "treadmill"}
                name="exerciseType"
                value="treadmill"
                className="hidden"
              />
              <label htmlFor="treadmill" className="px-2 py-2 text-xs  rounded-lg border-notselectbtn-border bg-notselectbtn  border-primary cursor-pointer">
                러닝머신
              </label>
            </div>
            {/* 하이킹 */}
            <div>
              <input type="radio" id="hiking" name="exerciseType" defaultChecked={record.extra.exerciseType === "hiking"} value="hiking" className="hidden" />
              <label htmlFor="hiking" className=" px-2 py-2 text-xs  rounded-lg border-notselectbtn-border bg-notselectbtn  border-primary cursor-pointer">
                하이킹
              </label>
            </div>
            {/* 인터벌 */}
            <div>
              <input
                type="radio"
                id="interval"
                defaultChecked={record.extra.exerciseType === "interval"}
                name="exerciseType"
                value="interval"
                className="hidden"
              />
              <label htmlFor="interval" className="px-2 py-2 text-xs  rounded-lg border-notselectbtn-border bg-notselectbtn  border-primary cursor-pointer">
                인터벌
              </label>
            </div>
          </div>
        </div>
        {/* 운동장소 */}
        <div className="container-location my-3 px-5">
          <label className="text-s font-bold" htmlFor="location">
            운동장소
          </label>
          <input
            className="w-full my-2 text-xs border font-bold border-gray-200 px-2 py-2 rounded-md"
            type="text"
            name="location"
            id="location"
            defaultValue={record.extra.location || "미입력"}
            placeholder="예: 한강공원"
          />
        </div>
        {/* 소모 칼로리 */}
        <div className="my-3 flex justify-between items-center px-5">
          <label className="text-s font-bold" htmlFor="kcal">
            소모 칼로리
            <span className="text-xs text-gray-400">&#40;선택&#41;</span>
          </label>
          <div className="flex items-center gap-1">
            <input
              className="w-16 text-right my-2 text-s font-semibold px-2 py-2"
              defaultValue={record.extra.calories || "미입력"}
              type="text"
              name="kcal"
              id="kcal"
              placeholder="0"
            />
            <span className="text-xs text-gray-400">&#40;kcal&#41;</span>
          </div>
        </div>
        {/* 메모 */}
        <div className="container-memo px-5">
          <label htmlFor="memo" className="text-s font-bold">
            메모 <span className="text-xs text-gray-400">&#40;옵션&#41;</span>
          </label>
          <textarea
            name="memo"
            id="memo"
            rows={3}
            defaultValue={record.content || "미입력"}
            placeholder="예:오늘의 컨디션은 어땠나요?"
            className="w-full text-xs border font-bold border-gray-200 px-2 py-2 rounded-md my-1"
          />
        </div>
        <div className="px-5">
          {state?.error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-1 rounded-lg mb-4">{state.error}</div>}
          <button type="submit" disabled={isPending} className="w-full  bg-primary text-white rounded-md p-5 font-bold my-1">
            {isPending ? "수정 중.." : "수정 완료"}
          </button>
        </div>
      </form>
    </>
  );
}
