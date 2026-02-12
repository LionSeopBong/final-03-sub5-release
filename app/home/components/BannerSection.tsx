import Link from "next/link";

export default function BannerSection() {
  return (
    <section className="mt-2">
      <div className="rounded-[28px] bg-gradient-to-br from-[#7CCBF0] to-[#2C7FB8] px-6 py-6 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-white/80">
          TODAY&apos;S MOTIVATION
        </p>

        <h1 className="mt-3 text-[26px] font-extrabold leading-[1.25] text-white">
          모든 위대한 러너도 <br />
          처음엔 초보였다
        </h1>

        <p className="mt-3 text-sm leading-6 text-white/85">
          오늘도 당신의 한 걸음이 기록이 됩니다.
          <br />
          완벽한 러닝 날씨, 지금 바로 시작하세요!
        </p>

        <div className="mt-6 space-y-3">
          <Link
            href="/goals"
            className="block w-full rounded-2xl bg-white py-3 text-center text-sm font-bold text-[#2C7FB8]"
          >
            목표 설정
          </Link>

          <Link
            href="/records"
            className="block w-full rounded-2xl bg-[#1F5B84] py-3 text-center text-sm font-bold text-white"
          >
            기록 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
