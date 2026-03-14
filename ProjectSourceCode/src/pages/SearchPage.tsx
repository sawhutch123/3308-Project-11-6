import { useMemo, useState } from "react";
import { Filter, Plus } from "lucide-react";
import { events as eventsType, searchLocations, searchVisibility } from "../constants/data";
import SectionHeader from "../components/ui/SectionHeader";
import SkeletonButton from "../components/ui/SkeletonButton";
import CompactSearchBar from "../components/CompactSearchBar";
import EventCard from "../components/EventCard";

function SearchPage({
  query,
  setQuery,
  selectedFilter,
  setSelectedFilter,
  filteredEvents,
  onOpenEvent,
}: {
  query: string;
  setQuery: (q: string) => void;
  selectedFilter: string;
  setSelectedFilter: (f: string) => void;
  filteredEvents: typeof eventsType;
  onOpenEvent: (event: (typeof eventsType)[number]) => void;
}) {
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [dateFilter, setDateFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("Any Access");

  const advancedResults = useMemo(() => {
    return filteredEvents.filter((event) => {
      const matchesLocation =
        locationFilter === "All Locations" ||
        event.location === locationFilter ||
        event.area === locationFilter;

      const matchesVisibility =
        visibilityFilter === "Any Access" ||
        event.visibility === visibilityFilter;

      const matchesDate = !dateFilter || event.dateValue === dateFilter;

      return matchesLocation && matchesVisibility && matchesDate;
    });
  }, [filteredEvents, locationFilter, visibilityFilter, dateFilter]);

  const FilterSelect = ({ label, value, onChange, options }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: string[];
  }) => (
    <label className="space-y-2">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">
        {label}
      </span>
      <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none"
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[#11162A] text-white"
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </label>
  );

  const FilterDate = ({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
  }) => (
    <label className="space-y-2">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">
        {label}
      </span>
      <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
        />
      </div>
    </label>
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Search"
        title="Find the right scene"
        description="Filter by location, date, and access type to narrow down what fits your night."
      />

      <CompactSearchBar
        query={query}
        setQuery={setQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <section className="rounded-[28px] border border-white/10 bg-white/5 p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
          <Filter className="h-4 w-4 text-violet-300" />
          Advanced filters
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <FilterSelect
            label="Location"
            value={locationFilter}
            onChange={setLocationFilter}
            options={searchLocations}
          />
          <FilterDate
            label="Date"
            value={dateFilter}
            onChange={setDateFilter}
          />
          <FilterSelect
            label="Access"
            value={visibilityFilter}
            onChange={setVisibilityFilter}
            options={searchVisibility}
          />
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-white/65">
          {advancedResults.length} matching events
        </div>
        <SkeletonButton
          onClick={() => {
            setLocationFilter("All Locations");
            setDateFilter("");
            setVisibilityFilter("Any Access");
            setSelectedFilter("All");
            setQuery("");
          }}
          className="px-4 py-2.5"
        >
          Clear Filters
        </SkeletonButton>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {advancedResults.map((event) => (
          <EventCard key={event.id} event={event} onOpen={onOpenEvent} />
        ))}
      </div>

      {advancedResults.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-white/15 bg-white/5 p-8 text-center text-white/60">
          No events matched those filters. Try widening the date, access, or
          location filters.
        </div>
      ) : null}

      <div className="flex justify-center pt-2">
        <SkeletonButton>
          <Plus className="h-4 w-4" />
          Host Event
        </SkeletonButton>
      </div>
    </div>
  );
}

export default SearchPage;
