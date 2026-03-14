import { useState } from "react";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  Sparkles,
  Globe,
  Lock,
  BadgeCheck,
  Star,
  Users,
  ChevronRight,
  ChevronLeft,
  Tag,
  MessageCircle,
  Send,
} from "lucide-react";
import { BRAND } from "../constants/brand";
import { currentUser } from "../constants/data";
import Badge from "../components/ui/Badge";
import CapacityBar from "../components/ui/CapacityBar";

function EventDetailPage({
  event,
  onBack,
}: {
  event: {
    id: number;
    title: string;
    type: string;
    dateLabel: string;
    isTonight: boolean;
    location: string;
    area: string;
    fee: number;
    visibility: string;
    theme: string;
    friendsGoing: number;
    capacityCurrent: number;
    capacityTotal: number;
    host: string;
    hostRating: number;
    tags: string[];
    images: string[];
    mutuals: string[];
    status: string;
    description: string;
    comments: { author: string; text: string; timestamp: string }[];
  };
  onBack: () => void;
}) {
  const [messages, setMessages] = useState(event.comments);
  const [newMessage, setNewMessage] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleSend = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { author: currentUser.name, text: trimmed, timestamp: "Just now" },
    ]);
    setNewMessage("");
  };

  const prevSlide = () =>
    setCarouselIndex((i) => (i === 0 ? event.images.length - 1 : i - 1));
  const nextSlide = () =>
    setCarouselIndex((i) => (i === event.images.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Hero image carousel */}
      <div className="relative overflow-hidden rounded-[28px]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
        >
          {event.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${event.title} ${i + 1}`}
              className="h-64 w-full shrink-0 object-cover sm:h-80 lg:h-96"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* Carousel controls */}
        {event.images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-2">
              {event.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === carouselIndex
                      ? "w-6 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges on image */}
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {event.isTonight && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/30 bg-violet-500/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg">
              Tonight
            </span>
          )}
          <Badge
            text={event.visibility}
            icon={event.visibility === "Public" ? Globe : Lock}
          />
          <Badge text={event.theme} icon={Sparkles} />
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            {event.type}
          </div>
          <h1 className="mt-1 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main details — left 2 columns */}
        <div className="space-y-6 lg:col-span-2">
          {/* Date, location, fee row */}
          <div
            className="grid gap-4 rounded-[28px] border border-white/10 p-5 sm:grid-cols-3"
            style={{ backgroundColor: BRAND.surfaceAlt }}
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-violet-500/15 p-2.5">
                <Clock3 className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                  Date & Time
                </div>
                <div className="mt-1 text-sm font-medium text-white">
                  {event.dateLabel}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-violet-500/15 p-2.5">
                <MapPin className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                  Location
                </div>
                <div className="mt-1 text-sm font-medium text-white">
                  {event.location}
                </div>
                <div className="text-xs text-white/50">{event.area}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-emerald-500/15 p-2.5">
                <Tag className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                  Entry Fee
                </div>
                <div className="mt-1 text-sm font-medium text-white">
                  {event.fee === 0 ? "Free" : `$${event.fee}`}
                </div>
              </div>
            </div>
          </div>

          {/* Host description */}
          <div
            className="rounded-[28px] border border-white/10 p-5"
            style={{ backgroundColor: BRAND.surfaceAlt }}
          >
            <div className="mb-3 text-sm font-medium text-white">
              About this event
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              {event.description}
            </p>
          </div>

          {/* Message board */}
          <div
            className="rounded-[28px] border border-white/10 p-5"
            style={{ backgroundColor: BRAND.surfaceAlt }}
          >
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
              <MessageCircle className="h-4 w-4 text-violet-300" />
              Message Board
              <span className="ml-auto text-xs text-white/40">
                {messages.length}{" "}
                {messages.length === 1 ? "message" : "messages"}
              </span>
            </div>

            {/* Messages list */}
            <div className="space-y-3">
              {messages.map((msg, i) => {
                const isHost = msg.author === event.host;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/20 text-xs font-semibold text-violet-300">
                        {msg.author.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {msg.author}
                      </span>
                      {isHost && (
                        <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                          Host
                        </span>
                      )}
                      <span className="ml-auto text-xs text-white/35">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {msg.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Compose */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Write a message..."
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-violet-500/50"
              />
              <button
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="inline-flex shrink-0 items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100"
                style={{ backgroundColor: BRAND.accent }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar — right column */}
        <div className="space-y-6">
          {/* Host card */}
          <div
            className="rounded-[28px] border border-white/10 p-5"
            style={{ backgroundColor: BRAND.surfaceAlt }}
          >
            <div className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-white/55">
              Hosted by
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/20 text-lg font-semibold text-violet-300">
                {event.host.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-base font-medium text-white">
                  <BadgeCheck className="h-4 w-4 text-emerald-300" />
                  {event.host}
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-sm text-white/60">
                  <Star className="h-3.5 w-3.5 text-violet-300" />
                  {event.hostRating} host rating
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-white/50">
              Mutuals: {event.mutuals.join(", ")}
            </div>
          </div>

          {/* RSVP action */}
          <div
            className="rounded-[28px] border border-white/10 p-5"
            style={{ backgroundColor: BRAND.surfaceAlt }}
          >
            <div className="mb-2 text-center text-sm text-white/55">
              {event.fee === 0 ? "No entry fee" : `Entry fee: $${event.fee}`}
            </div>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
              style={{ backgroundColor: BRAND.accent }}
            >
              {event.status}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Attendance */}
          <div
            className="rounded-[28px] border border-white/10 p-5"
            style={{ backgroundColor: BRAND.surfaceAlt }}
          >
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
              <Users className="h-4 w-4 text-violet-300" />
              Attendance
            </div>
            <CapacityBar
              current={event.capacityCurrent}
              total={event.capacityTotal}
              friendsGoing={event.friendsGoing}
            />
            <div className="mt-3 text-sm font-medium text-emerald-300">
              {event.friendsGoing} friends going
            </div>
            {event.mutuals.length > 0 && (
              <div className="mt-2 text-sm text-white/60">
                Mutuals attending: {event.mutuals.join(", ")}
              </div>
            )}
          </div>

          {/* Tags */}
          <div
            className="rounded-[28px] border border-white/10 p-5"
            style={{ backgroundColor: BRAND.surfaceAlt }}
          >
            <div className="mb-4 text-sm font-medium text-white">Tags</div>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
