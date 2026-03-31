import { LucideIcon } from "lucide-react";

function MetricCard({ label, value, helper, icon: Icon }: {
  label: string;
  value: string | number;
  helper: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white">{value}</div>
        <Icon className="h-4 w-4 text-white/40" />
      </div>
      <div className="text-white/50">{label}</div>
    </div>
  );
}

export default MetricCard;
