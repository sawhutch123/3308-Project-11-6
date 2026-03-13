import { MapPinned, Filter } from "lucide-react";
import { BRAND } from "../constants/brand";

function MapPlaceholderPage() {
  return (
    <div className="rounded-[36px] border border-dashed border-white/15 bg-white/5 p-8 text-center">
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] text-violet-300"
        style={{ backgroundColor: BRAND.surface }}
      >
        <MapPinned className="h-7 w-7" />
      </div>
      <h1 className="mt-5 text-3xl font-semibold text-white">
        Map page reserved
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/65 md:text-base">
        The navbar includes a dedicated map destination so the product can later
        support neighborhood-based discovery, approximate pins, and
        friend-density overlays without changing the global navigation.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">
        <Filter className="h-4 w-4" />
        Planned: approximate location search, privacy-aware pins, and event
        clustering
      </div>
    </div>
  );
}

export default MapPlaceholderPage;
