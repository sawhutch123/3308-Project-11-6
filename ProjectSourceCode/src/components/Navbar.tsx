import {
  Bell,
  User,
  PartyPopper,
  X,
  Menu,
} from "lucide-react";
import { BRAND } from "../constants/brand";
import { navItems } from "../constants/data";
import { cn } from "../utils/cn";

function Navbar({
  activePage,
  setActivePage,
  mobileOpen,
  setMobileOpen,
}: {
  activePage: string;
  setActivePage: (page: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const NavButtons = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActivePage(item.id);
              setMobileOpen(false);
            }}
            className={cn(
              "inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "text-white shadow-lg"
                : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
            )}
            style={
              isActive
                ? {
                    backgroundColor: BRAND.accent,
                    boxShadow: "0 10px 24px rgba(124,58,237,0.24)",
                  }
                : undefined
            }
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
        );
      })}
    </>
  );

  const IconButton = ({ children, onClick, active = false }: {
    children: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-2xl transition-all",
        active
          ? "text-white shadow-lg"
          : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
      )}
      style={
        active
          ? {
              backgroundColor: BRAND.accent,
              boxShadow: "0 10px 24px rgba(124,58,237,0.24)",
            }
          : undefined
      }
    >
      {children}
    </button>
  );

  return (
    <header className="sticky top-3 z-40 rounded-[24px] border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-xl sm:top-4 sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-lg sm:h-11 sm:w-11"
            style={{
              backgroundColor: BRAND.accent,
              boxShadow: "0 12px 30px rgba(124,58,237,0.3)",
            }}
          >
            <PartyPopper className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-semibold tracking-tight sm:text-lg">
              CUFF
            </div>
            <div className="text-xs text-white/60">CU Function Finder</div>
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-between gap-3 lg:ml-6 lg:flex">
          <nav className="flex flex-wrap items-center gap-2">
            <NavButtons />
          </nav>
          <div className="flex items-center gap-3">
            <IconButton
              active={activePage === "notifications"}
              onClick={() => setActivePage("notifications")}
            >
              <Bell className="h-5 w-5" />
            </IconButton>
            <IconButton
              active={activePage === "account"}
              onClick={() => setActivePage("account")}
            >
              <User className="h-5 w-5" />
            </IconButton>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <IconButton
            active={activePage === "account"}
            onClick={() => setActivePage("account")}
          >
            <User className="h-5 w-5" />
          </IconButton>
          <IconButton
            active={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </IconButton>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mt-3 border-t border-white/10 pt-3 lg:hidden">
          <nav className="grid gap-2">
            <NavButtons />
            <button
              className={cn(
                "inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all",
                activePage === "notifications"
                  ? "text-white shadow-lg"
                  : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              )}
              style={
                activePage === "notifications"
                  ? {
                      backgroundColor: BRAND.accent,
                      boxShadow: "0 10px 24px rgba(124,58,237,0.24)",
                    }
                  : undefined
              }
              onClick={() => {
                setActivePage("notifications");
                setMobileOpen(false);
              }}
            >
              <Bell className="h-4 w-4" />
              Notifications
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
