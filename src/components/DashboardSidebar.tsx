"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Mic, BarChart2, BookOpen,
  Briefcase, Monitor, Users, Settings, CreditCard, Save, Mic2
} from "lucide-react";

const navSections = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Script Writer", href: "/dashboard/script-writer", icon: FileText },
      { label: "Practice", href: "/dashboard/practice", icon: Mic },
      { label: "Saved Scripts", href: "/dashboard/saved-scripts", icon: Save },
      { label: "Progress", href: "/dashboard/progress", icon: BarChart2 },
    ],
  },
  {
    label: "Practice Modes",
    items: [
      { label: "IELTS Speaking", href: "/dashboard/ielts", icon: BookOpen },
      { label: "Interview Practice", href: "/dashboard/interview", icon: Briefcase },
      { label: "Presentation", href: "/dashboard/presentation", icon: Monitor },
      { label: "Virtual Audience", href: "/dashboard/audience", icon: Users },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
      { label: "Billing", href: "/dashboard/settings", icon: CreditCard },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 hidden lg:flex flex-col bg-white border-r border-[#E0E0E0] min-h-screen">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-4 border-b border-[#E0E0E0]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#0056D2] rounded-lg flex items-center justify-center">
            <Mic2 size={15} className="text-white" />
          </div>
          <span className="font-bold text-[#1F1F1F] text-sm">SpeakFlow AI</span>
        </Link>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9E9E9E] px-3 mb-2">{section.label}</p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={
                        active
                          ? "flex items-center gap-2.5 px-3 py-2 rounded text-sm font-semibold text-[#0056D2] bg-[#E8F1FF]"
                          : "flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium text-[#636363] hover:bg-[#F5F5F5] hover:text-[#1F1F1F] transition-colors"
                      }
                    >
                      <Icon size={15} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Plan badge */}
      <div className="p-4 border-t border-[#E0E0E0]">
        <div className="bg-[#E8F1FF] rounded-lg p-3">
          <p className="text-xs font-bold text-[#0056D2]">Free Plan</p>
          <p className="text-xs text-[#636363] mt-0.5">5 sessions left</p>
          <Link
            href="/pricing"
            className="mt-2 block text-center text-xs font-semibold bg-[#0056D2] text-white py-1.5 rounded hover:bg-[#003B8E] transition-colors"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    </aside>
  );
}
