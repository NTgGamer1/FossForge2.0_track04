import React, { createContext, useCallback, useContext, useState } from 'react';
import type { AuthUser } from '../services/auth';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  error: null,
  clearError: () => {},
});

/** Simple local storage without AsyncStorage (no native module needed at this stage).
 *  Stage 8 full: swap in AsyncStorage + expo-crypto hash.
 */
const memStore = { users: [] as { uid: string; email: string; name: string; password: string }[], session: null as AuthUser | null };

function hashSimple(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return String(h);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    setError(null);
    if (memStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setError('An account with this email already exists.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const uid = `local_${Date.now()}`;
    memStore.users.push({ uid, email, name, password: hashSimple(password) });
    const authUser: AuthUser = { uid, email, displayName: name };
    memStore.session = authUser;
    setUser(authUser);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    const found = memStore.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === hashSimple(password),
    );
    if (!found) {
      setError('Invalid email or password.');
      return;
    }
    const authUser: AuthUser = { uid: found.uid, email: found.email, displayName: found.name };
    memStore.session = authUser;
    setUser(authUser);
  }, []);

  const signOut = useCallback(async () => {
    memStore.session = null;
    setUser(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

