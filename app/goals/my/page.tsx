import Link from "next/link";
import Modal from "../components/Modal";
export default function GoalListPage() {
  return (
    <>
      <main className="flex flex-col items-center w-full py-6">
        <div
          className="w-full 
    min-w-[375px] 
    max-w-[767px]      
    md:max-w-[375px]   
    flex flex-col gap-4 px-4"
        >
          <h1 className="font-semibold text-center flex flex-row justify-center items-center text-2xl ">
            <Link href="/goals" className="inline-flex items-center mt-0.2">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_709_118"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_709_118)">
                  <path
                    d="M10 22L0 12L10 2L11.775 3.775L3.55 12L11.775 20.225L10 22Z"
                    fill="#1C1B1F"
                  />
                </g>
              </svg>
            </Link>
            내 목표
          </h1>
          <section className="">🌱초급 총 3개</section>
          {/* 중급: 🌿중급 총 5개 */}
          {/* 고급: 🌳고급 총 7개 */}
          <div className="">
            <dl className="flex flex-row justify-between bg-gray-200 gap-4 px-4 py-4 rounded-t-xl font-bold">
              <dt> 완료한 목표 </dt>
              {/* <dd> 1 </dd> */}
              <dt> 진행중 </dt>
              {/* <dd> 1 </dd> */}
              <dt> 남은 목표 </dt>

              {/* <dd> 1 </dd> */}
            </dl>
            <dl className="flex flex-row justify-between bg-gray-200 gap-4 px-10 py-6 rounded-b-xl font-bold">
              <dd>1</dd>
              <dd>1</dd>
              <dd>1</dd>
            </dl>
          </div>
          <div className="flex justify-start w-full">
            <select
              name="goal"
              id=""
              className="w-auto border rounded-sm  px-3 py-1 border-gray-400"
            >
              <option value="select">전체</option>
              <option value="select">진행중</option>
              <option value="select">미진행</option>
              <option value="select">완료</option>
            </select>
          </div>

          <ul className="w-full flex flex-col gap-3 ">
            <li
              data-lavel="초급"
              className="w-full border-2 border-gray-400 rounded-2xl   p-4"
            >
              <h3 className="font-bold">5KM 완주</h3>
              <p className="text-gray-600 text-sm mb-1"> 목표 거리 5KM </p>
              <div className="flex flex-row justify-between w-full ">
                <p>진행률</p>
                <p className="text-[#2C7FB8] font-bold">50%</p>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                <div
                  className="bg-[#004bd6] h-2 rounded-full  "
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
              className="w-full border-2  border-gray-400 p-4  rounded-2xl "
            >
              <h3 className="font-bold">10KM 완주</h3>
              <p className="text-gray-600 text-sm mb-1"> 목표 거리 10KM </p>
              <div className="flex flex-row justify-between w-full ">
                <p>진행률</p>
                <p className="text-[#2C7FB8] font-bold">50%</p>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                <div
                  className="bg-[#004bd6] h-2 rounded-full"
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
              className="w-full border-2 gap-2 border-gray-400 rounded-2xl p-4"
            >
              <h3 className="font-bold">21KM 완주</h3>
              <p className="text-gray-600 text-sm mb-1"> 목표 거리 21KM </p>
              <div className="flex flex-row justify-between w-full ">
                <p>진행률</p>
                <p className="text-[#2C7FB8] font-bold">50%</p>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                <div
                  className="bg-[#004bd6] h-2 rounded-full  "
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
              className="w-full border-2  border-gray-400 p-4  rounded-2xl hidden"
            >
              <h3 className="font-bold">5KM 완주</h3>
              <p className="text-gray-600 text-sm mb-1"> 목표 거리 10KM </p>

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
              className="w-full border-2  border-gray-400 p-4  rounded-2xl hidden  "
            >
              <h3 className="font-bold">5KM 완주</h3>
              <p className="text-gray-600 text-sm mb-1"> 목표 거리 5KM </p>
              <div className="flex flex-row justify-between w-full ">
                <p>진행률</p>
                <p className="text-[#2C7FB8] font-bold">100%</p>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                <div
                  className="bg-[#065DFF] h-2 rounded-full"
                  style={{ width: "100%" }}
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
        </div>
        <Modal />
      </main>
    </>
  );
}
