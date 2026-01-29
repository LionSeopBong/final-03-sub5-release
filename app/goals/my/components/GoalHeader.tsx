import Link from "next/link";

export default function GoalHeader() {
  return (
    <h1 className="font-semibold text-center flex flex-row justify-center items-center text-2xl">
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
  );
}
