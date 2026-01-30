import LandingContainer from "@/app/components/landing/LandingContainer";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <LandingContainer />
      <Link href="/records/new">기록추가 페이지</Link>
      <div>
        <Link href="/records/detail">기록상세 페이지</Link>
      </div>
      <Link href="/records">기록 페이지</Link>
      <div>
        <Link href="/records/123/edit">기록 수정 페이지</Link>
      </div>

      <div>
        <Link href="/home">메인</Link>
      </div>
      <div>
        <Link href="/goals/">목표 페이지</Link>
      </div>
    </>
  );
}
