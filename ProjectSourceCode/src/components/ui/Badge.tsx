import { LucideIcon } from "lucide-react";

function Badge({ text, icon: Icon }: { text: string; icon: LucideIcon }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
      <Icon className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}

export default Badge;
