import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type User = { name: string; email: string };

type AuthState = {
  user: User | null;
  /** True once the person has signed in or chosen to browse as a guest. */
  onboarded: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInWithProvider: (provider: 'google' | 'apple') => Promise<void>;
  continueAsGuest: () => void;
  signOut: () => void;
};

/**
 * Demo auth service. Accounts live in memory for this session; swap these
 * functions for a real backend (Supabase, Firebase, your API) without
 * touching the screens.
 */
const accounts = new Map<string, { name: string; password: string }>();
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const nameFromEmail = (email: string) => {
  const base = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
  return base ? base.replace(/\b\w/g, (c) => c.toUpperCase()) : 'Runner';
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [guest, setGuest] = useState(false);

  const value = useMemo<AuthState>(
    () => ({
      user,
      onboarded: !!user || guest,
      signIn: async (email, password) => {
        await delay(700);
        const key = email.trim().toLowerCase();
        const account = accounts.get(key);
        if (account && account.password !== password) throw new Error('Incorrect email or password.');
        setUser({ name: account?.name ?? nameFromEmail(key), email: key });
      },
      signUp: async (name, email, password) => {
        await delay(800);
        const key = email.trim().toLowerCase();
        if (accounts.has(key)) throw new Error('An account with this email already exists.');
        accounts.set(key, { name: name.trim(), password });
        setUser({ name: name.trim(), email: key });
      },
      signInWithProvider: async (provider) => {
        await delay(600);
        setUser({ name: 'Fitsx Runner', email: `runner@${provider === 'google' ? 'gmail.com' : 'icloud.com'}` });
      },
      continueAsGuest: () => setGuest(true),
      signOut: () => {
        setUser(null);
        setGuest(false);
      },
    }),
    [user, guest],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
