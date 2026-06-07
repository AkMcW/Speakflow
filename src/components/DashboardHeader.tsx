"use client";
import Link from "next/link";
import { Bell, Mic2, ShieldCheck } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ADMIN_EMAIL, PLAN_FEATURES } from "@/lib/users";

export default function DashboardHeader() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const isAdmin = email === ADMIN_EMAIL;
  const planInfo = PLAN_FEATURES[isAdmin ? "admin" : "free"];

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

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-xs font-semibold text-[#1F1F1F]">
                {user?.firstName ?? user?.username ?? "User"}
              </span>
              {isAdmin && (
                <span className="text-[9px] font-bold bg-[#FFEBEE] text-[#E53935] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <ShieldCheck size={9} />
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-xs font-medium" style={{ color: planInfo.color }}>
              {planInfo.label} Plan
            </p>
          </div>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
                userButtonPopoverCard: "shadow-lg border border-[#E0E0E0]",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
