import Image from "next/image";

interface WeatherInfoCardProps {
  iconSrc: string;
  iconBg: string;
  label: string;
  value?: string | number;
  unit?: string;
}

export default function WeatherInfoCard({
  iconSrc,
  iconBg,
  label,
  value,
  unit,
}: WeatherInfoCardProps) {
  if (value === undefined || value === null) return null;

  return (
    <div className="bg-white rounded-xl flex items-center p-3 shadow gap-3 min-w-[70px] text-xs">
      <div className={`text-lg rounded-md ${iconBg}`}>
        <Image src={iconSrc} width={24} height={24} alt={label} />
      </div>
      <div className="text-left">
        <div className="font-semibold text-[0.65rem]">{label}</div>
        <div className="text-gray-500 text-xs">
          {value}
          {unit && ` ${unit}`}
        </div>
      </div>
    </div>
  );
}
