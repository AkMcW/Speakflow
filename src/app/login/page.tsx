"use client";
import Link from "next/link";
import { Mic2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 justify-center">
            <div className="w-10 h-10 bg-[#0056D2] rounded-xl flex items-center justify-center">
              <Mic2 size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[#1F1F1F]">SpeakFlow AI</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-[#1F1F1F]">Welcome back</h1>
          <p className="mt-1 text-sm text-[#636363]">Log in to continue your practice</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-sm p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] placeholder-[#9E9E9E] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-[#1F1F1F]">
                  Password
                </label>
                <Link href="#" className="text-xs text-[#0056D2] hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] placeholder-[#9E9E9E] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold py-2.5 rounded transition-colors text-sm"
            >
              Log In
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#E0E0E0] text-center">
            <p className="text-sm text-[#636363]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#0056D2] font-semibold hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-[#9E9E9E] mt-6">
          By logging in, you agree to our{" "}
          <Link href="#" className="text-[#636363] hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href="#" className="text-[#636363] hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
