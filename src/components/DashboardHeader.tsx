"use client";
import Link from "next/link";
import { Bell, ChevronDown, Mic2 } from "lucide-react";
import { useState } from "react";

export default function DashboardHeader() {
  const [profileOpen, setProfileOpen] = useState(false);

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
            <div className="w-8 h-8 rounded-full bg-[#0056D2] flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-[#1F1F1F]">Alex Johnson</p>
              <p className="text-xs text-[#636363]">Free Plan</p>
            </div>
            <ChevronDown size={14} className="text-[#636363]" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E0E0E0] rounded-lg shadow-lg py-1 z-50">
              <Link href="/dashboard/settings" className="block px-4 py-2.5 text-sm text-[#1F1F1F] hover:bg-[#F5F5F5]">Settings</Link>
              <Link href="/pricing" className="block px-4 py-2.5 text-sm text-[#0056D2] font-semibold hover:bg-[#F5F5F5]">Upgrade Plan</Link>
              <div className="my-1 border-t border-[#E0E0E0]" />
              <Link href="/" className="block px-4 py-2.5 text-sm text-[#636363] hover:bg-[#F5F5F5]">Sign out</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
