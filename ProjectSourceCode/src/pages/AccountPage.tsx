import {
  House,
  ArrowRight,
  Users,
  Star,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { BRAND } from "../constants/brand";
import { currentUser } from "../constants/data";
import MetricCard from "../components/ui/MetricCard";

function AccountPage() {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Account */}
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-white/70">Account</div>
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
            <div className="rounded-2xl bg-white/5 p-4 leading-6">
              {currentUser.bio}
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex flex-col rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-medium text-white/70">Metrics</div>

          <div className="mt-3 flex flex-1 flex-col justify-between space-y-3 text-sm text-white/75">
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
              icon={House}
            />
            <MetricCard
              label="Events attended"
              value={currentUser.eventsAttended}
              helper="Total attendance"
              icon={ArrowRight}
            />
          </div>
        </div>

        {/* Account actions */}
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 md:col-span-2 lg:col-span-1 ">
          <div className="text-sm font-medium text-white/70  ">
            Account Actions
          </div>
          <div className="mt-5 space-y-3 ">
            {["Edit profile", "Manage privacy", "Notification preferences"].map(
              (item) => (
                <button
                  key={item}
                  className="flex w-full items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/75 hover:bg-white/10 hover:text-white"
                >
                  {item}
                  <ChevronRight className="h-4 w-4" />
                </button>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountPage;
