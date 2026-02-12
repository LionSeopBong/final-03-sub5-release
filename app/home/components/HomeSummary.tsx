type SummaryCardProps = {
  icon: string;
  title: string;
  value: string;
  description: string;
};

function SummaryCard({ icon, title, value, description }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_10px_22px_rgba(17,24,39,0.08)]">
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <p className="text-xs font-bold text-gray-500">{title}</p>
      </div>

      <p className="mt-2 text-xl font-extrabold text-[#111827]">{value}</p>
      <p className="mt-1 text-xs text-gray-400">{description}</p>
    </div>
  );
}

type HomeSummaryProps = {
  weeklyRuns?: number;
  openCount: number;
  upcomingCount: number;
};

export default function HomeSummary({
  weeklyRuns = 0,
  openCount,
  upcomingCount,
}: HomeSummaryProps) {
  return (
    <section className="mt-4 grid grid-cols-2 gap-3">
      <SummaryCard
        icon="🏃"
        title="이번 주"
        value={`${weeklyRuns}회`}
        description="러닝 기록"
      />
      <SummaryCard
        icon="🏁"
        title="다가오는 대회"
        value={`${openCount + upcomingCount}개`}
        description={`접수중 ${openCount} · 접수예정 ${upcomingCount}`}
      />
    </section>
  );
}
