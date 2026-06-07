"use client";
import Link from "next/link";
import { Bell, ChevronDown, Mic2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/lib/UserContext";
import { PLAN_FEATURES } from "@/lib/users";

export default function DashboardHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useUser();
  const planInfo = PLAN_FEATURES[user.plan];
  const isAdmin = user.plan === "admin";
  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <header className="h-16 bg-white border-b border-[#E0E0E0] flex items-center justify-between px-4 sm:px-6">
      {/* Mobile logo */}
      <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
        <div className="w-7 h-7 bg-[#0056D2] rounded-lg flex items-center justify-center">
          <Mic2 size={15} className="text-white" />
        </div>
        <span className="font-bold text-sm text-[#1F1F1F]">SpeakFlow AI</span>
      </Link>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-[#636363] hover:text-[#1F1F1F] hover:bg-[#F5F5F5] rounded transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0056D2] rounded-full"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded hover:bg-[#F5F5F5] transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: isAdmin ? "#E53935" : "#0056D2" }}
            >
              {isAdmin ? <ShieldCheck size={16} /> : initials}
            </div>
            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-semibold text-[#1F1F1F]">{user.name}</p>
                {isAdmin && (
                  <span className="text-[9px] font-bold bg-[#FFEBEE] text-[#E53935] px-1.5 py-0.5 rounded-full">ADMIN</span>
                )}
              </div>
              <p className="text-xs font-medium" style={{ color: planInfo.color }}>{planInfo.label} Plan</p>
            </div>
            <ChevronDown size={14} className="text-[#636363]" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E0E0E0] rounded-lg shadow-lg py-1 z-50">
              <div className="px-4 py-2.5 border-b border-[#E0E0E0]">
                <p className="text-xs font-bold text-[#1F1F1F]">{user.name}</p>
                <p className="text-xs text-[#636363]">{user.email}</p>
                <span
                  className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: planInfo.bg, color: planInfo.color }}
                >
                  {isAdmin && <ShieldCheck size={10} />}
                  {planInfo.label}
                </span>
              </div>
              <Link href="/dashboard/settings" className="block px-4 py-2.5 text-sm text-[#1F1F1F] hover:bg-[#F5F5F5]">
                Settings
              </Link>
              {!isAdmin && (
                <Link href="/pricing" className="block px-4 py-2.5 text-sm text-[#0056D2] font-semibold hover:bg-[#F5F5F5]">
                  Upgrade Plan
                </Link>
              )}
              {isAdmin && (
                <Link href="/dashboard" className="block px-4 py-2.5 text-sm text-[#636363] hover:bg-[#F5F5F5]">
                  Admin Panel
                </Link>
              )}
              <div className="my-1 border-t border-[#E0E0E0]" />
              <Link href="/" className="block px-4 py-2.5 text-sm text-[#636363] hover:bg-[#F5F5F5]">
                Sign out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
