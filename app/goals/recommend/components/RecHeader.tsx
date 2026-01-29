import Link from "next/link";

export default function RecHeader() {
  return (
    <>
      <div className="flex flex-row items-center ">
        <Link href="/goals">
          <svg
            width="24"
            height="24"
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
        {/* ===== 초급 카드들 ===== */}
        <section className="font-bold inline-block text-2xl">초급</section>
      </div>
    </>
  );
}
