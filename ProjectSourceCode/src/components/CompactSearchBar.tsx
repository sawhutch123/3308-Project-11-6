import { Search } from "lucide-react";
import { BRAND } from "../constants/brand";
import { filters } from "../constants/data";
import { cn } from "../utils/cn";

function CompactSearchBar({
  query,
  setQuery,
  selectedFilter,
  setSelectedFilter,
}: {
  query: string;
  setQuery: (q: string) => void;
  selectedFilter: string;
  setSelectedFilter: (f: string) => void;
}) {
  return (
    <section className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-4 sm:p-5">
      <label
        className="flex items-center gap-3 rounded-2xl border border-white/12 px-4 py-3"
        style={{ backgroundColor: BRAND.surfaceAlt }}
      >
        <Search className="h-4 w-4 text-white/60" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by event, theme, host, or location"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/45"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              selectedFilter === filter
                ? "border-violet-400 text-white"
                : "border-white/10 bg-white/5 text-white/75 hover:border-white/20 hover:bg-white/10 hover:text-white"
            )}
            style={
              selectedFilter === filter
                ? { backgroundColor: BRAND.accent }
                : undefined
            }
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CompactSearchBar;
