// Admin user configuration — email must match for admin access
export const ADMIN_EMAIL = "akedezign@gmail.com";

export type Plan = "free" | "starter" | "pro" | "pro_plus" | "team" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  sessionsUsed: number;
  sessionsLimit: number;
}

export const PLAN_FEATURES: Record<Plan, {
  label: string;
  color: string;
  bg: string;
  canUseScriptWriter: boolean;
  canUsePractice: boolean;
  canUseIELTS: boolean;
  canUseInterview: boolean;
  canUsePresentation: boolean;
  canUseAudience: boolean;
  canUseProgress: boolean;
  sessionsLimit: number;
}> = {
  free: {
    label: "Free",
    color: "#636363",
    bg: "#F5F5F5",
    canUseScriptWriter: true,
    canUsePractice: true,
    canUseIELTS: false,
    canUseInterview: false,
    canUsePresentation: false,
    canUseAudience: false,
    canUseProgress: false,
    sessionsLimit: 5,
  },
  starter: {
    label: "Starter",
    color: "#0056D2",
    bg: "#E8F1FF",
    canUseScriptWriter: true,
    canUsePractice: true,
    canUseIELTS: false,
    canUseInterview: true,
    canUsePresentation: true,
    canUseAudience: false,
    canUseProgress: true,
    sessionsLimit: 50,
  },
  pro: {
    label: "Pro",
    color: "#7B61FF",
    bg: "#F0EEFF",
    canUseScriptWriter: true,
    canUsePractice: true,
    canUseIELTS: true,
    canUseInterview: true,
    canUsePresentation: true,
    canUseAudience: false,
    canUseProgress: true,
    sessionsLimit: 999,
  },
  pro_plus: {
    label: "Pro+ Simulation",
    color: "#00B37D",
    bg: "#E6F7F2",
    canUseScriptWriter: true,
    canUsePractice: true,
    canUseIELTS: true,
    canUseInterview: true,
    canUsePresentation: true,
    canUseAudience: true,
    canUseProgress: true,
    sessionsLimit: 999,
  },
  team: {
    label: "Team",
    color: "#F5A623",
    bg: "#FFF8E7",
    canUseScriptWriter: true,
    canUsePractice: true,
    canUseIELTS: true,
    canUseInterview: true,
    canUsePresentation: true,
    canUseAudience: true,
    canUseProgress: true,
    sessionsLimit: 999,
  },
  admin: {
    label: "Admin",
    color: "#E53935",
    bg: "#FFEBEE",
    canUseScriptWriter: true,
    canUsePractice: true,
    canUseIELTS: true,
    canUseInterview: true,
    canUsePresentation: true,
    canUseAudience: true,
    canUseProgress: true,
    sessionsLimit: 999,
  },
};

// Mock users — in production this comes from the database
export const MOCK_USERS: UserProfile[] = [
  {
    id: "admin-001",
    name: "Admin User",
    email: ADMIN_EMAIL,
    plan: "admin",
    sessionsUsed: 0,
    sessionsLimit: 999,
  },
];

export function getUserByEmail(email: string): UserProfile {
  const found = MOCK_USERS.find((u) => u.email === email);
  if (found) return found;
  // Default new user gets free plan
  return {
    id: "guest",
    name: "Alex Johnson",
    email,
    plan: "free",
    sessionsUsed: 3,
    sessionsLimit: 5,
  };
}

export function isAdmin(user: UserProfile): boolean {
  return user.plan === "admin" || user.email === ADMIN_EMAIL;
}

export function canAccess(user: UserProfile, feature: keyof typeof PLAN_FEATURES[Plan]): boolean {
  return PLAN_FEATURES[user.plan][feature] as boolean;
}
