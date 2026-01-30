export default function RecCard() {
  return (
    <>
      <article className="border border-notselectbtn-border  rounded-xl max-w-md min-w-93.75 gap-4 p-4 mb-3  cursor-pointer">
        <h2 className="font-bold text-lg mb-2">5KM</h2>
        <p className="text-gray-600 text-sm mb-1">처음 시작하는 단계 </p>
        <p className="text-gray-800"> 러닝에 익숙해지는 첫 걸음</p>
      </article>
      <article className="border border-notselectbtn-border  rounded-xl max-w-md  min-w-93.75 p-4 mb-3 cursor-pointer">
        <h2 className=" font-bold not-[]:text-lg mb-2">10KM</h2>
        <p className="text-gray-600 text-sm mb-1">러닝의 기본을 다지는 단계 </p>
        <p className="text-gray-800">편안한 속도로 꾸준히 완주하는 것이 목표</p>
      </article>
      <article className="border border-notselectbtn-border rounded-xl max-w-md min-w-93.75 p-4 mb-3 cursor-pointer">
        <h2 className="font-bold text-lg mb-2">21KM </h2>
        <p className=" text-gray-600 text-sm mb-1">하프 마라톤 도전 </p>
        <p className="text-gray-800">
          10KM 에 익숙해지면 도전하는 중급 러너의 첫 관문
        </p>
      </article>
      <article className="border border-notselectbtn-border rounded-xl max-w-md min-w-93.75 p-4 mb-3 cursor-pointer">
        <h2 className="font-bold text-lg mb-2">42KM </h2>
        <p className="text-gray-600 text-sm mb-1">풀 마라톤 완주 </p>
        <p className="text-gray-800"> 모든 러너의 꿈! </p>
        <p className="text-gray-800">충분한 준비 후 도전하는 최종 목표 </p>
      </article>
      {/* ===== 중급 카드들 ===== */}
      <div className="hidden" data-level="중급">
        <section className="font-bold ">중급</section>
        <article
          className="border border-notselectbtn-border max-w-md  rounded-xl min-w-93.75 gap-4 p-4 mb-3  cursor-pointer "
          data-level="중급"
        >
          <h2 className="font-bold text-lg mb-2">5km 페이스 챌린지</h2>
          <p className="text-gray-600 text-sm mb-1">
            빠른 페이스 스피드 챌린지
          </p>
          <p className="text-gray-800">목표 페이스:{`5'00" /km`} </p>
        </article>
        <article
          className="border border-notselectbtn-border max-w-md  rounded-xl min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
          data-level="중급"
        >
          <h2 className="font-bold text-lg mb-2">거리 챌린지 - 5km</h2>
          <p className="text-gray-600 text-sm mb-1">
            3km ~ 하프까지 누적 거리 챌린지
          </p>
          <p className="text-gray-800">목표 페이스: {`5'00" /km`}</p>
        </article>
        <article
          className="border border-notselectbtn-border max-w-md rounded-xl min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
          data-level="중급"
        >
          <h2 className="font-bold text-lg mb-2 ">고급 레벨 챌린지</h2>
          <p className="text-gray-600 text-sm mb-1">레벨 업을 위한 챌린지</p>
          <p className="text-gray-800">목표 페이스: {`4'30" /km`}</p>
        </article>

        {/* 5km 페이스 챌린지 그룹 */}
        {/* 단계별 챌린지  */}
        <div className="hidden">
          <article
            data-step="1"
            className="border border-notselectbtn-border rounded-xl  max-w-md min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
            data-level="중급"
          >
            <h3>5km 페이스 챌린지</h3>
            <p>빠른 페이스 스피드 챌린지</p>
            <p>목표 페이스: {`5'00"`} /km</p>
          </article>
          <article
            data-step="2"
            className="border border-notselectbtn-border  rounded-xl max-w-md min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
            data-level="중급"
            hidden
          >
            <h3>5km 페이스 챌린지 - 2</h3>
            <p>빠른 페이스 스피드 챌린지</p>
            <p>목표 페이스: {`4'55"`} /km</p>
          </article>
        </div>

        {/* 거리 챌린지 그룹 */}
        <div>
          <article
            data-step="1"
            className="border border-notselectbtn-border   rounded-xl max-w-md min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
            data-level="중급"
            hidden
          >
            <h3>거리 챌린지 - 5km</h3>
            <p>3km ~ 하프까지 누적 거리 챌린지</p>
            <p>목표 페이스: {`5'00"`} /km</p>
          </article>
          <article
            data-step="2"
            className="border border-notselectbtn-border rounded-xl  max-w-md min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
            data-level="중급"
            hidden
          >
            <h3>거리 챌린지 - 10km</h3>
            <p>3km ~ 하프까지 누적 거리 챌린지</p>
            <p>목표 페이스: {`5'00"`} /km</p>
          </article>
        </div>

        {/*중급 -> 고급 챌린지*/}
        <article
          className="border border-notselectbtn-border  rounded-xl max-w-md min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
          data-level="중급"
          hidden
        >
          <h3>고급 레벨 챌린지</h3>
          <p>레벨 업을 위한 챌린지</p>
          <p>목표 페이스: {`4'30"`} /km</p>
        </article>
      </div>
      {/* ===== 고급 카드들 ===== */}
      <div className="hidden" data-level="고급">
        <section className="font-bold inline-block">고급</section>
        <article
          className="border border-notselectbtn-border rounded-xl max-w-md min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
          data-level="고급"
        >
          <h2 className="font-bold text-lg mb-2">5km 페이스 챌린지</h2>
          <p className="text-gray-600 text-sm mb-1">
            빠른 페이스 스피드 챌린지
          </p>
          <p className="text-gray-800">목표 페이스: {`4'20" /km`} </p>
        </article>
        <article
          className="border border-notselectbtn-border rounded-xl max-w-md min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
          data-level="고급"
        >
          <h2 className="font-bold text-lg mb-2">5km 페이스 챌린지</h2>
          <p className="text-gray-600 text-sm mb-1">
            빠른 페이스 스피드 챌린지
          </p>
          <p className="text-gray-800">목표 페이스: {`4'30" /km`} </p>
        </article>
        <article
          className="border border-notselectbtn-border rounded-xl  max-w-md min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
          data-level="고급"
        >
          <h2 className="font-bold text-lg mb-2">5km 페이스 챌린지</h2>
          <p className="text-gray-600 text-sm mb-1">
            빠른 페이스 스피드 챌린지
          </p>
          <p className="text-gray-800">목표 페이스: {`4'10" /km`}</p>
        </article>
        <article
          className="border border-notselectbtn-border max-w-md rounded-xl min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
          data-level="고급"
        >
          <h2 className="font-bold text-lg mb-2">5km 페이스 챌린지</h2>
          <p className="text-gray-600 text-sm mb-1">
            빠른 페이스 스피드 챌린지
          </p>
          <p className="text-gray-800">목표 페이스: {`4'30" /km`} </p>
        </article>

        {/* 단계별 챌린지  */}
        {/* 5km 페이스 챌린지 그룹 */}
        <div>
          <article
            data-step="1"
            className="border border-notselectbtn-border max-w-md rounded-xl min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
            data-level="고급"
          >
            <h3>5km 페이스 챌린지</h3>
            <p>목표 페이스: {`4'20"`} /km</p>
          </article>
          <article
            data-step="2"
            className="border border-notselectbtn-border max-w-md rounded-xl min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
            data-level="고급"
          >
            <h3>5km 페이스 챌린지 - 2</h3>
            <p>목표 페이스: {`4'10"`} /km</p>
          </article>
        </div>
        {/* 거리 챌린지 그룹 */}
        <div>
          <article
            data-step="1"
            className="border border-notselectbtn-border max-w-md rounded-xl min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
            data-level="고급"
          >
            <h3>거리 챌린지 - 5km</h3>
            <p>목표 페이스: {`4'30"`} /km</p>
          </article>
          <article
            data-step="2"
            className="border border-notselectbtn-border max-w-md rounded-xl min-w-93.75 gap-4 p-4 mb-3  cursor-pointer"
            data-level="고급"
          >
            <h3>거리 챌린지 - 10km</h3>
            <p>목표 페이스: {`4'30"`} /km</p>
          </article>
        </div>
      </div>
    </>
  );
}
