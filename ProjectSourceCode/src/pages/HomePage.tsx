import { CalendarDays, Users, Shield, ChevronRight, Plus } from "lucide-react";
import { BRAND } from "../constants/brand";
import { events as eventsType } from "../constants/data";
import SectionHeader from "../components/ui/SectionHeader";
import StatChip from "../components/ui/StatChip";
import SkeletonButton from "../components/ui/SkeletonButton";
import CompactSearchBar from "../components/CompactSearchBar";
import EventCard from "../components/EventCard";

function HomePage({
  query,
  setQuery,
  selectedFilter,
  setSelectedFilter,
  filteredEvents,
  visibleCount,
  setVisibleCount,
  onOpenEvent,
}: {
  query: string;
  setQuery: (q: string) => void;
  selectedFilter: string;
  setSelectedFilter: (f: string) => void;
  filteredEvents: typeof eventsType;
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  onOpenEvent: (event: (typeof eventsType)[number]) => void;
}) {
  const shown = filteredEvents.slice(0, visibleCount);
  const canShowMore = visibleCount < filteredEvents.length;

  return (
    <div className="space-y-6 sm:space-y-8">
      <CompactSearchBar
        query={query}
        setQuery={setQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <section className="space-y-5">
        <SectionHeader eyebrow="Featured" title={""} />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((event) => (
            <EventCard key={event.id} event={event} onOpen={onOpenEvent} />
          ))}
        </div>
        {filteredEvents.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/15 bg-white/5 p-8 text-center text-white/60">
            No events matched that search. Try another filter or search term.
          </div>
        ) : null}
        <div className="flex flex-col items-center gap-3 pt-2">
          {canShowMore ? (
            <SkeletonButton
              onClick={() => setVisibleCount((count) => count + 3)}
            >
              Show More
              <ChevronRight className="h-4 w-4" />
            </SkeletonButton>
          ) : null}
          <SkeletonButton>
            <Plus className="h-4 w-4" />
            Host Event
          </SkeletonButton>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/65">This week</div>
              <div className="mt-1 text-3xl font-semibold text-white">
                24 events
              </div>
            </div>
            <div
              className="rounded-2xl p-3 text-emerald-300"
              style={{ backgroundColor: "rgba(52,211,153,0.12)" }}
            >
              <CalendarDays className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <StatChip label="Public" value="16" />
            <StatChip label="Invite-only" value="8" />
            <StatChip label="Friends going" value="41" />
            <StatChip label="Hosts rated 4.7+" value="18" />
          </div>
        </div>

        <div
          className="rounded-[28px] p-5"
          style={{
            backgroundColor: BRAND.surfaceAlt,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Users className="h-4 w-4 text-violet-300" />
            Friend activity
          </div>
          <div className="mt-4 space-y-3">
            {[
              "Sofia and 7 others are going to Flatiron Rooftop Kickback",
              "Jordan just hosted a 4.9-rated event near Pearl Street",
              "Nina saved 3 events for this weekend",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Shield className="h-4 w-4 text-emerald-300" />
              Trust & safety
            </div>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              <div className="rounded-2xl bg-white/5 p-4">
                Verified student access only
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                Exact addresses unlock after approval when needed
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                Host and guest ratings shape better events
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
