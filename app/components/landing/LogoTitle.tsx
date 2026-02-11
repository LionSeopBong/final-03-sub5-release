import StartButton from "@/app/components/landing/StartButton";
import Image from "next/image";

export default function LogoTitle() {
  return (
    <section className="relative min-h-screen">
      {/* 배경 이미지 */}
      <Image
        src="/images/landing-bg.png"
        alt="러닝 이미지"
        fill // 이미지가 부모 요소를 꽉 채우게 해주기
        priority // 배경이미지 이므로 첫 화면 우선 로딩
        className="object-cover"
      />

      {/* 이미지 어둡게(오버레이) */}
      <div className="absolute inset-0 bg-black/45" />

      {/* 이미지 위 콘텐츠 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-6">
        <div className=" flex flex-col items-center text-center">
          {/* 로고 */}
          <Image
            src="/images/landing-logo.svg"
            alt="로고"
            priority
            width={128}
            height={96}
            className="w-32 h-24"
          />

          {/* 문구 */}
          <p className="mt-3 text-lg leading-relaxed">
            5분대 페이스로 완주하는 그날까지,
            <br />
            함께 달립니다
          </p>
        </div>
      </div>

      <StartButton />
    </section>
  );
}
