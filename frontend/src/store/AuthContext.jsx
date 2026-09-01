import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi } from '../services/api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('ah_user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(!!localStorage.getItem('ah_token'));

  const persist = (token, u) => {
    localStorage.setItem('ah_token', token);
    localStorage.setItem('ah_user', JSON.stringify(u));
    setUser(u);
  };

  const clear = () => {
    localStorage.removeItem('ah_token');
    localStorage.removeItem('ah_user');
    setUser(null);
  };

  // On mount, if we have a token, verify it against /auth/me and refresh the cached user.
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!localStorage.getItem('ah_token')) return;
      try {
        const fresh = await authApi.me();
        if (alive) {
          localStorage.setItem('ah_user', JSON.stringify(fresh));
          setUser(fresh);
        }
      } catch {
        if (alive) clear();
      } finally {
        if (alive) setBootstrapping(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const { token, user: u } = await authApi.login({ email, password });
      persist(token, u);
      return u;
    } finally { setLoading(false); }
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    try {
      const { token, user: u } = await authApi.register({ name, email, password });
      persist(token, u);
      return u;
    } finally { setLoading(false); }
  }, []);

  const logout = useCallback(async () => {
    try { await authApi.logout(); } catch { /* noop */ }
    clear();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, bootstrapping, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
