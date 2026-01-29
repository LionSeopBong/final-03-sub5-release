export default function Navi() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
      <ul className="flex justify-around items-center py-2">
        <li className="flex flex-col items-center text-gray-400 text-xs">
          <span className="text-xl">
            <img src="/icons/mynaui--home.svg" />
          </span>
          홈
        </li>

        <li className="flex flex-col items-center text-gray-400 text-xs">
          <span className="text-xl">
            <img src="/icons/uil--chart.svg" />
          </span>
          기록
        </li>

        <li className="flex flex-col items-center text-gray-400 text-xs">
          <span className="text-xl">
            <img src="/icons/mage--goals.svg" />
          </span>
          목표
        </li>

        <li className="flex flex-col items-center text-gray-400 text-xs">
          <span className="text-xl">
            <img src="/icons/iconamoon--profile-duotone.svg" />
          </span>
          프로필
        </li>
      </ul>
    </nav>
  );
}
