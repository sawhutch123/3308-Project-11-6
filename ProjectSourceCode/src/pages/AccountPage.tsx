import {
  CalendarDays,
  Users,
  Star,
  ChevronRight,
  Settings,
  BadgeCheck,
} from "lucide-react";
import { BRAND } from "../constants/brand";
import { currentUser } from "../constants/data";
import SectionHeader from "../components/ui/SectionHeader";
import MetricCard from "../components/ui/MetricCard";

function AccountPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-5 lg:grid-cols-[340px_1fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-white/70">Account</div>
            <button className="rounded-2xl bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white">
              <Settings className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 flex flex-col items-center text-center">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-[28px] text-2xl font-semibold text-white"
              style={{ backgroundColor: BRAND.surface }}
            >
              DA
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-white">
              {currentUser.name}
            </h1>
            <p className="mt-1 text-sm text-white/60">{currentUser.username}</p>
            <div
              className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-emerald-200"
              style={{ backgroundColor: "rgba(52,211,153,0.12)" }}
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified CU Boulder student
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-white/75">
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-white">{currentUser.year}</div>
              <div className="text-white/50">{currentUser.major}</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-white">{currentUser.homeBase}</div>
              <div className="text-white/50">Home base</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 leading-6">
              {currentUser.bio}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Host rating"
              value={currentUser.hostRating}
              helper="Strong host reputation"
              icon={Star}
            />
            <MetricCard
              label="Guest rating"
              value={currentUser.guestRating}
              helper="Reliable attendee"
              icon={BadgeCheck}
            />
            <MetricCard
              label="Friends"
              value={currentUser.friends}
              helper="Connected on platform"
              icon={Users}
            />
            <MetricCard
              label="Events hosted"
              value={currentUser.eventsHosted}
              helper="Public + private functions"
              icon={CalendarDays}
            />
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
            <div
              className="rounded-[32px] border border-white/10 p-6"
              style={{ backgroundColor: BRAND.surfaceAlt }}
            >
              <div className="text-lg font-semibold text-white">
                Profile details
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  ["Display name", currentUser.name],
                  ["Username", currentUser.username],
                  ["Academic year", currentUser.year],
                  ["Major", currentUser.major],
                  ["Home base", currentUser.homeBase],
                  ["Events attended", String(currentUser.eventsAttended)],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="text-xs uppercase tracking-[0.16em] text-white/45">
                      {label}
                    </div>
                    <div className="mt-2 text-sm font-medium text-white">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-white/45">
                  Interests
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {currentUser.interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full px-3 py-2 text-sm text-white/75"
                      style={{ backgroundColor: BRAND.surface }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-medium text-white">
                  Account actions
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    "Edit profile",
                    "Manage privacy",
                    "Notification preferences",
                    "Connected calendars",
                  ].map((item) => (
                    <button
                      key={item}
                      className="flex w-full items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/75 hover:bg-white/10 hover:text-white"
                    >
                      {item}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="rounded-[28px] border border-white/10 p-5"
                style={{ backgroundColor: BRAND.surfaceAlt }}
              >
                <div className="text-sm font-medium text-white">
                  Reputation summary
                </div>
                <div className="mt-4 space-y-3 text-sm text-white/70">
                  <div className="rounded-2xl bg-white/5 p-4">
                    No recent no-shows
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    11 successful hosted events
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    Trusted by friends-of-friends network
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountPage;
