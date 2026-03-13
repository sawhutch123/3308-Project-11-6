function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/8 px-3 py-3">
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="text-xs text-white/65">{label}</div>
    </div>
  );
}

export default StatChip;
