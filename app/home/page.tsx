import Footer from "@/app/components/common/Footer";
import Header from "@/app/components/common/Header";
import Navi from "@/app/components/common/Navi";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* 헤더 */}
      <Header />

      {/* 메인배너 */}
      <section className="grid place-items-center py-6 pt-16">
        <div className="bg-gradient-to-br from-[#4DB6E9] to-[#2C7FB8] rounded-xl w-[300px] h-[262px] px-4 py-4">
          <p className="text-white/80 text-xs">TODAY'S MOTIVATION</p>
          <h1 className="text-white text-2xl font-bold my-1">
            모든 위대한 러너도 <br />
            처음엔 초보였다
          </h1>
          <p className="text-white/80 text-xs">
            오늘도 당신의 한 걸음이 기록 될 것입니다.
            <br />
            완벽한 러닝 날씨, 지금 바로 시작하세요!
          </p>
          <div className="space-y-3 my-7">
            {/* 임시 */}
            <Link
              href="/records"
              className="block w-full bg-white rounded-xl text-[#2C7FB8] text-xs text-center py-1.5 font-semibold my-4"
            >
              목표설정
            </Link>
            <Link
              href="/records"
              className="block w-full bg-primary rounded-xl text-white text-xs text-center py-1.5 font-semibold my-4"
            >
              기록보기
            </Link>
          </div>
        </div>
      </section>
      {/* 태회선택 탭 */}
      <section className="grid place-items-center">
        <h1 className="text-xl font-bold">다가오는 마라톤 대회</h1>
        <p className="my-5 text-black/80">
          지금 등록하고 목표를 향해 달려보세요
        </p>
        <div>
          <button className="border-b font-bold mx-1 text-lg px-9">
            국내대회
          </button>
          <button className="border-b font-bold mx-1 text-lg px-9">
            해외대회
          </button>
        </div>
      </section>
      {/* 대회 카드 리스트 */}
      <section className="py-6 px-10 ">
        <div>
          <p className="font-b ld text-xs py-2">KR D-15</p>
          <h2 className="font-bold text-lg">서울 국제 마라톤</h2>
          <p className="text-xs py-1 text-gray-600">서울 광화문광장</p>
          <p className="text-xs py-1 text-gray-600">
            2026년 2월4일 (일) 오전 8:00
          </p>
          <div className="flex my-2">
            <p className=" text-xs mr-2 bg-[#EAF6FF] px-3 py-1.5 rounded-xl text-[#2C7FB8] border border-[#AEE8FF]">
              풀코스
            </p>
            <p className=" text-xs mr-2 bg-[#EAF6FF] px-3 py-1.5 rounded-xl text-[#2C7FB8] border border-[#AEE8FF]">
              하프
            </p>
            <p className=" text-xs mx-2 bg-[#EAF6FF] px-3 py-1.5 rounded-xl text-[#2C7FB8] border border-[#AEE8FF]">
              10km
            </p>
          </div>
          <p className="text-xs py-1 text-gray-600">
            서울의 대표 명소를 달리며 개인 최고 기록에 도전하세요. 국내 최대
            규모 마라톤 대회 입니다.
          </p>
        </div>
        <div className="grid items-center my-2">
          <button className=" bg-primary rounded-lg py-3 text-white font-bold text-lg">
            대회 신청하기
          </button>
        </div>
      </section>
      {/* 푸터 */}
      <Footer />
      {/* 네비바 */}
      <Navi />
    </>
  );
}
