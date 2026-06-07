"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { UserProfile, ADMIN_EMAIL, getUserByEmail } from "./users";

interface UserContextValue {
  user: UserProfile;
  setUserEmail: (email: string) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

// Default to admin for demo purposes
const DEFAULT_EMAIL = ADMIN_EMAIL;

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(() => getUserByEmail(DEFAULT_EMAIL));

  function setUserEmail(email: string) {
    setUser(getUserByEmail(email));
  }

  return (
    <UserContext.Provider value={{ user, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
