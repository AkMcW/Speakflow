"use client";
import Link from "next/link";
import { Mic2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0/month",
    features: ["5 sessions/month", "3 AI scripts", "Basic scoring"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19/month",
    features: ["Unlimited sessions", "Unlimited scripts", "Full analysis", "IELTS + Interview"],
  },
];

export default function SignupPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 justify-center">
            <div className="w-10 h-10 bg-[#0056D2] rounded-xl flex items-center justify-center">
              <Mic2 size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[#1F1F1F]">SpeakFlow AI</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-[#1F1F1F]">Create your account</h1>
          <p className="mt-1 text-sm text-[#636363]">Start speaking with confidence today — free to begin</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-sm p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">
                Full name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Alex Johnson"
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] placeholder-[#9E9E9E] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] transition-colors"
              />
            </div>

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
              <label htmlFor="password" className="block text-sm font-semibold text-[#1F1F1F] mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] placeholder-[#9E9E9E] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] transition-colors"
              />
            </div>

            {/* Plan Selection */}
            <div>
              <p className="text-sm font-semibold text-[#1F1F1F] mb-2">Choose your plan</p>
              <div className="grid grid-cols-2 gap-3">
                {plans.map((plan) => (
                  <label key={plan.id} className="cursor-pointer" htmlFor={`plan-${plan.id}`}>
                    <input
                      type="radio"
                      id={`plan-${plan.id}`}
                      name="plan"
                      value={plan.id}
                      defaultChecked={plan.id === "free"}
                      className="sr-only peer"
                    />
                    <div className="border-2 border-[#E0E0E0] peer-checked:border-[#0056D2] peer-checked:bg-[#E8F1FF] rounded-lg p-3 transition-all">
                      <p className="font-bold text-[#1F1F1F] text-sm">{plan.name}</p>
                      <p className="text-xs text-[#0056D2] font-semibold mb-2">{plan.price}</p>
                      <ul className="space-y-0.5">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-1 text-xs text-[#636363]">
                            <CheckCircle size={10} className="text-[#00B37D] mt-0.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold py-2.5 rounded transition-colors text-sm"
            >
              Create Account
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#E0E0E0] text-center">
            <p className="text-sm text-[#636363]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#0056D2] font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-[#9E9E9E] mt-6">
          By creating an account, you agree to our{" "}
          <Link href="#" className="text-[#636363] hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href="#" className="text-[#636363] hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
