"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    language: "English (US)",
  });
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Settings</h1>
        <p className="text-sm text-[#636363] mt-1">Manage your profile and plan.</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
        <h2 className="font-bold text-[#1F1F1F] mb-5">Profile</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Full name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Email address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">Interface language</label>
            <select
              value={profile.language}
              onChange={(e) => setProfile({ ...profile, language: e.target.value })}
              className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
            >
              {["English (US)", "English (UK)", "Spanish", "French", "German", "Portuguese", "Hindi", "Chinese (Simplified)"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-6 py-2.5 rounded text-sm transition-colors"
            >
              Save Changes
            </button>
            {saved && (
              <div className="flex items-center gap-1 text-[#00B37D] text-sm font-medium">
                <CheckCircle size={15} />
                Saved!
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Plan Section */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
        <h2 className="font-bold text-[#1F1F1F] mb-4">Plan & Billing</h2>

        <div className="flex items-center gap-3 mb-5">
          <span className="bg-[#E8F1FF] text-[#0056D2] font-bold text-sm px-3 py-1 rounded-full">Free Plan</span>
          <span className="text-sm text-[#636363]">Active since Jan 2026</span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between py-2 border-b border-[#E0E0E0]">
            <span className="text-sm text-[#636363]">Sessions used this month</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-[#E0E0E0] rounded-full h-1.5">
                <div className="bg-[#0056D2] h-1.5 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <span className="text-sm font-semibold text-[#1F1F1F]">3 / 5</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#E0E0E0]">
            <span className="text-sm text-[#636363]">Scripts generated this month</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-[#E0E0E0] rounded-full h-1.5">
                <div className="bg-[#0056D2] h-1.5 rounded-full" style={{ width: "33%" }}></div>
              </div>
              <span className="text-sm font-semibold text-[#1F1F1F]">1 / 3</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-[#636363]">Renewal date</span>
            <span className="text-sm font-semibold text-[#1F1F1F]">Jul 1, 2026</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors"
          >
            Upgrade Plan
          </Link>
          <button
            className="inline-flex items-center justify-center border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] font-semibold px-5 py-2.5 rounded text-sm transition-colors"
          >
            Manage Billing
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white border border-red-200 rounded-lg p-5">
        <h2 className="font-bold text-[#1F1F1F] mb-2">Danger Zone</h2>
        <p className="text-xs text-[#636363] mb-3">Permanently delete your account and all associated data.</p>
        <button className="text-xs border border-red-300 text-red-500 hover:bg-red-50 font-semibold px-4 py-2 rounded transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
