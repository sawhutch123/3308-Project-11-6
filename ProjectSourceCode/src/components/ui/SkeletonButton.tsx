import React from "react";
import { cn } from "../../utils/cn";

function SkeletonButton({ children, onClick, className = "" }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/5",
        className
      )}
    >
      {children}
    </button>
  );
}

export default SkeletonButton;
