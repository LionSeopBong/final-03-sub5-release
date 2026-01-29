export default function GoalCard() {
  return (
    <>
      <ul className="w-full flex flex-col gap-3 ">
        <li
          data-lavel="초급"
          className="w-full border border-gray-300 rounded-2xl   p-4"
        >
          <h3 className="font-bold text-lg mb-1">5KM 완주</h3>
          <p className="text-gray-500 text-sm mb-4"> 목표 거리 5KM </p>
          <div className="flex flex-row justify-between w-full mb-2">
            <p className="text-sm text-gray-600">진행률</p>
            <p className="text-[#2C7FB8] font-bold">50%</p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
            <div
              className="bg-[#004bd6]  h-2.5 rounded-full transition-all duration-300"
              style={{ width: "50%" }}
            />
          </div>
          <div className="flex flex-row gap-4 ">
            <button className="flex-1 bg-primary py-2 w-full rounded-lg text-center  font-semibold text-notselectbtn">
              완료
            </button>
            <button className="flex-1 bg-primary py-2 w-full rounded-lg text-center font-semibold  text-notselectbtn">
              취소
            </button>
          </div>
        </li>
        <li
          data-lavel="초급"
          className="w-full border border-gray-300 p-4  rounded-2xl "
        >
          <h3 className="font-bold text-lg mb-1">10KM 완주</h3>
          <p className="text-gray-600 text-sm mb-4"> 목표 거리 10KM </p>
          <div className="flex flex-row justify-between w-full ">
            <p className="text-sm text-gray-600">진행률</p>
            <p className="text-[#2C7FB8] font-bold">50%</p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
            <div
              className="bg-[#004bd6]  h-2.5 rounded-full transition-all duration-300"
              style={{ width: "50%" }}
            />
          </div>

          <div className="flex flex-row gap-4  ">
            <button className="flex-1 bg-primary py-2 w-full  font-semibold rounded-lg text-center text-notselectbtn">
              완료
            </button>
            <button className="flex-1 bg-primary py-2 w-full rounded-lg font-semibold text-center text-notselectbtn">
              취소
            </button>
          </div>
        </li>
        <li
          data-lavel="초급"
          className="w-full  gap-2 border border-gray-300 rounded-2xl p-4"
        >
          <h3 className="font-bold text-lg mb-1">21KM 완주</h3>
          <p className="text-gray-600 text-sm mb-4"> 목표 거리 21KM </p>
          <div className="flex flex-row justify-between w-full ">
            <p className="text-sm text-gray-600">진행률</p>
            <p className="text-[#2C7FB8] font-bold">50%</p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
            <div
              className="bg-[#004bd6]  h-2.5 rounded-full transition-all duration-300"
              style={{ width: "50%" }}
            />
          </div>
          <div className="flex flex-row gap-4 ">
            <button className="flex-1 bg-primary py-2 w-full  font-semibold rounded-lg text-center text-notselectbtn">
              완료
            </button>
            <button className="flex-1 bg-primary py-2 w-full rounded-lg font-semibold  text-center text-notselectbtn">
              취소
            </button>
          </div>
        </li>

        {/* 미진행 - hidden */}
        <li
          data-lavel="미진행"
          className="w-full border border-gray-300 p-4  rounded-2xl hidden"
        >
          <h3 className="font-bold text-lg mb-1">5KM 완주</h3>
          <p className="text-gray-600 text-sm mb-4"> 목표 거리 10KM </p>

          <div className="text-center mb-4 ">
            <p>현재 진행 없음 </p>
          </div>
          <div>
            <button className="flex-1 bg-primary py-2 w-full rounded-lg text-center text-notselectbtn">
              러닝 시작
            </button>
          </div>
        </li>

        {/* 완료 - hidden */}
        <li
          data-lavel="완료"
          className="w-full border border-gray-300 p-4  rounded-2xl hidden  "
        >
          <h3 className="font-bold text-lg mb-1">5KM 완주</h3>
          <p className="text-gray-600 text-sm mb-4"> 목표 거리 5KM </p>
          <div className="flex flex-row justify-between w-full ">
            <p>진행률</p>
            <p className="text-[#2C7FB8] font-bold">100%</p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
            <div
              className="bg-[#004bd6]  h-2.5 rounded-full transition-all duration-300"
              style={{ width: "50%" }}
            />
          </div>
          <div className="flex flex-row gap-4  ">
            <button className="flex-1 bg-primary py-2 w-full rounded-lg  font-semibold text-center text-notselectbtn">
              삭제
            </button>
            <button className="flex-1 bg-gray-custom py-2 w-full rounded-lg text-center  font-semibold text-primary-dark">
              재도전
            </button>
          </div>
        </li>
      </ul>
    </>
  );
}
