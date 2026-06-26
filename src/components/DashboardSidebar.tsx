"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Mic, BarChart2, BookOpen,
  Briefcase, Monitor, Users, Settings, CreditCard, Save,
  Mic2, ShieldCheck, Bot, AudioLines, BookMarked, Zap,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { useUser as useClerkUser } from "@clerk/nextjs";
import { ADMIN_EMAIL, PLAN_FEATURES } from "@/lib/users";
import { useSidebar } from "@/context/SidebarContext";

const navSections = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, feature: null },
      { label: "Script Writer", href: "/dashboard/script-writer", icon: FileText, feature: "canUseScriptWriter" },
      { label: "Practice", href: "/dashboard/practice", icon: Mic, feature: "canUsePractice" },
      { label: "Saved Scripts", href: "/dashboard/saved-scripts", icon: Save, feature: null },
      { label: "Recordings", href: "/dashboard/records", icon: AudioLines, feature: null },
      { label: "AI Coach", href: "/dashboard/ai-coach", icon: Bot, feature: null },
      { label: "Challenges", href: "/dashboard/challenges", icon: Zap, feature: "canUseChallenges" },
      { label: "Progress", href: "/dashboard/progress", icon: BarChart2, feature: "canUseProgress" },
    ],
  },
  {
    label: "Learn",
    items: [
      { label: "Phonetics", href: "/dashboard/phonetics", icon: BookMarked, feature: null },
    ],
  },
  {
    label: "Practice Modes",
    items: [
      { label: "IELTS Speaking", href: "/dashboard/ielts", icon: BookOpen, feature: "canUseIELTS" },
      { label: "PTE Academic", href: "/dashboard/pte", icon: BookMarked, feature: "canUsePTE" },
      { label: "Interview", href: "/dashboard/interview", icon: Briefcase, feature: "canUseInterview" },
      { label: "Presentation", href: "/dashboard/presentation", icon: Monitor, feature: "canUsePresentation" },
      { label: "Virtual Audience", href: "/dashboard/audience", icon: Users, feature: "canUseAudience" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Settings", href: "/dashboard/settings", icon: Settings, feature: null },
      { label: "Billing", href: "/dashboard/billing", icon: CreditCard, feature: null },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useClerkUser();
  const { collapsed, toggle } = useSidebar();
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const isAdmin = email === ADMIN_EMAIL;
  const planInfo = PLAN_FEATURES[isAdmin ? "admin" : "free"];

  return (
    <aside
      className="shrink-0 hidden lg:flex flex-col min-h-screen relative transition-all duration-200"
      style={{
        width: collapsed ? "64px" : "224px",
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center gap-2.5 border-b overflow-hidden shrink-0"
        style={{ borderColor: "var(--border)", padding: collapsed ? "0 18px" : "0 16px" }}
      >
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--accent)" }}>
            <Mic2 size={15} className="text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-sm whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
              SpeakFlow AI
            </span>
          )}
        </Link>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full flex items-center justify-center z-20 border transition-colors"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border)",
          color: "var(--text-secondary)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
        }}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden" style={{ padding: collapsed ? "12px 8px" : "12px 10px" }}>
        {navSections.map((section) => (
          <div key={section.label} className="mb-5">
            {!collapsed && (
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-1.5 px-2"
                style={{ color: "var(--text-muted)" }}
              >
                {section.label}
              </p>
            )}
            {collapsed && <div className="w-full h-px mb-3" style={{ background: "var(--border)" }} />}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                const hasAccess = isAdmin || !item.feature || (planInfo as unknown as Record<string, boolean>)[item.feature];

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className="flex items-center gap-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative"
                      style={{
                        padding: collapsed ? "8px 10px" : "7px 10px",
                        color: !hasAccess
                          ? "var(--text-muted)"
                          : active
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                        background: active ? "var(--bg-active)" : "transparent",
                        fontWeight: active ? 600 : 500,
                      }}
                      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
                      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <Icon size={16} className="shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {!collapsed && !hasAccess && (
                        <span
                          className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                          style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
                        >
                          Pro
                        </span>
                      )}
                      {/* Tooltip on collapse */}
                      {collapsed && (
                        <span
                          className="pointer-events-none absolute left-full ml-2 px-2 py-1 text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50"
                          style={{ background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                        >
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Plan badge */}
      {!collapsed && (
        <div className="p-3 shrink-0 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="rounded-lg p-3" style={{ background: "var(--accent-bg)" }}>
            <div className="flex items-center gap-1.5 mb-0.5">
              {isAdmin && <ShieldCheck size={12} style={{ color: "var(--accent)" }} />}
              <p className="text-xs font-bold" style={{ color: "var(--accent)" }}>{planInfo.label} Plan</p>
            </div>
            {isAdmin ? (
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Full access · All features</p>
            ) : (
              <>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>5 sessions used</p>
                <Link
                  href="/pricing"
                  className="mt-2 block text-center text-xs font-semibold py-1.5 rounded-lg text-white transition-colors"
                  style={{ background: "var(--accent)" }}
                >
                  Upgrade
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Collapsed plan dot */}
      {collapsed && (
        <div className="p-3 shrink-0 border-t flex justify-center" style={{ borderColor: "var(--border)" }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "var(--accent-bg)" }}>
            {isAdmin
              ? <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
              : <CreditCard size={14} style={{ color: "var(--accent)" }} />
            }
          </div>
        </div>
      )}
    </aside>
  );
}
