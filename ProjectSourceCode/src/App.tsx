import { useMemo, useState } from "react";
import { BRAND } from "./constants/brand";
import { events } from "./constants/data";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";
import MapPlaceholderPage from "./pages/MapPlaceholderPage";

export default function CuffApp() {
  const [activePage, setActivePage] = useState("home");
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesQuery = [
        event.title,
        event.type,
        event.location,
        event.theme,
        event.host,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      let matchesFilter = true;
      if (selectedFilter === "Tonight") matchesFilter = event.isTonight;
      if (selectedFilter === "This Weekend")
        matchesFilter = ["2026-03-14", "2026-03-15", "2026-03-16"].includes(
          event.dateValue
        );
      if (selectedFilter === "Friends Going")
        matchesFilter = event.friendsGoing >= 5;
      if (selectedFilter === "Public")
        matchesFilter = event.visibility === "Public";
      if (selectedFilter === "Free") matchesFilter = event.fee === 0;
      return matchesQuery && matchesFilter;
    });
  }, [query, selectedFilter]);

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: BRAND.bg }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_32%),radial-gradient(circle_at_right,_rgba(52,211,153,0.12),_transparent_18%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main className="mt-6 flex-1">
          {activePage === "home" && (
            <HomePage
              query={query}
              setQuery={setQuery}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              filteredEvents={filteredEvents}
              visibleCount={visibleCount}
              setVisibleCount={setVisibleCount}
            />
          )}
          {activePage === "search" && (
            <SearchPage
              query={query}
              setQuery={setQuery}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              filteredEvents={filteredEvents}
            />
          )}
          {activePage === "account" && <AccountPage />}
          {activePage === "map" && <MapPlaceholderPage />}
        </main>
      </div>
    </div>
  );
}
