import {
  Clock3,
  Sparkles,
  Globe,
  Lock,
  BadgeCheck,
  Star,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { BRAND } from "../constants/brand";
import Badge from "./ui/Badge";
import CapacityBar from "./ui/CapacityBar";

function EventCard({ event, onOpen }) {
  return (
    <article
      onClick={() => onOpen(event)}
      className="cursor-pointer overflow-hidden rounded-[28px] border border-white/10 shadow-xl shadow-black/10 transition hover:border-white/20"
      style={{ backgroundColor: BRAND.surfaceAlt }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.images[0]}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {event.isTonight ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/30 bg-violet-500/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg">
              Tonight
            </span>
          ) : null}
          <Badge
            text={event.visibility}
            icon={event.visibility === "Public" ? Globe : Lock}
          />
          <Badge text={event.theme} icon={Sparkles} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            {event.type}
          </div>
          <h3 className="mt-1 text-2xl font-semibold leading-tight text-white">
            {event.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-violet-300" />
              {event.dateLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80">
          <span>{event.location}</span>
        </div>

        <CapacityBar
          current={event.capacityCurrent}
          total={event.capacityTotal}
          friendsGoing={event.friendsGoing}
        />

        <div className="text-sm font-medium text-emerald-300">
          {event.friendsGoing} friends going
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <BadgeCheck className="h-4 w-4 text-emerald-300" />
              {event.host}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/65">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-violet-300" />{" "}
                {event.hostRating}
              </span>
              <span>Mutuals: {event.mutuals.slice(0, 2).join(", ")}</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 pl-2">
            <div className="text-sm font-semibold text-white/90">
              {event.fee === 0 ? "Free" : `$${event.fee}`}
            </div>
            <button
              onClick={(e) => e.stopPropagation()}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white hover:brightness-110"
              style={{ backgroundColor: BRAND.accent }}
            >
              {event.status}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
