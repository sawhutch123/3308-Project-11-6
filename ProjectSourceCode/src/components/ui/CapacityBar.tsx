import { BRAND } from "../../constants/brand";

function CapacityBar({ current, total, friendsGoing }: {
  current: number;
  total: number;
  friendsGoing: number;
}) {
  const totalPercent = Math.max(0, Math.min(100, (current / total) * 100));
  const friendsPercent = Math.max(
    0,
    Math.min(100, (friendsGoing / total) * 100)
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-white/50">
        <span>Capacity</span>
        <span>
          {current}/{total}
        </span>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${totalPercent}%`,
            backgroundColor: "rgba(255,255,255,0.18)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${friendsPercent}%`,
            backgroundColor: BRAND.success,
          }}
        />
      </div>
    </div>
  );
}

export default CapacityBar;
