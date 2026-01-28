import Image from "next/image";

export default function Modal() {
  return (
    <>
      {/* 모달 1: 설정 완료 */}
      <dialog hidden className="rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src="/icons/cele.svg"
            alt="목표 추가완료"
            width={60}
            height={60}
          />
          <h2 className="text-xl font-bold">설정 완료!</h2>
          <p>
            <strong className="text-primary">_________완주</strong>
          </p>
          <p className="text-sm text-gray-600">
            목표가 추가되었어요!
            <br />
            시작하기 버튼을 눌러 시작해보세요!
          </p>
          <button className="w-full rounded-lg bg-primary py-3 text-white">
            확인
          </button>
        </div>
      </dialog>

      {/* 모달 2: 축하합니다 완주 성공   */}

      <dialog hidden className="rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src="/icons/cele.svg"
            alt="목표 추가완료"
            width={60}
            height={60}
          />
          <h2 className="text-xl font-bold">축하합니다!</h2>
          <p>
            <strong className="text-primary">_________완주를</strong>
          </p>
          <p className="text-sm text-gray-600">완료했어요!</p>
          <button className="w-full rounded-lg bg-primary py-3 text-white">
            확인
          </button>
        </div>
      </dialog>
    </>
  );
}
