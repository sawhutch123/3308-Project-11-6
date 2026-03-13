import { LucideIcon } from "lucide-react";

function MetricCard({ label, value, helper, icon: Icon }: {
  label: string;
  value: string | number;
  helper: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/65">{label}</div>
        <Icon className="h-4 w-4 text-violet-300" />
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-white/55">{helper}</div>
    </div>
  );
}

export default MetricCard;
