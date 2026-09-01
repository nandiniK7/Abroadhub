import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BrandLockup } from '../../components/Brand';
import { useAuth } from '../../store/AuthContext';
import { IS_MOCK } from '../../services/api';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      const from = loc.state?.from?.pathname || '/';
      nav(from, { replace: true });
    } catch (err) {
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--ah-bg)] flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl ah-shadow-card border border-[color:var(--ah-line)] p-6">
        <div className="flex flex-col items-center text-center">
          <BrandLockup size={40} showTagline />
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-[color:var(--ah-ink)] tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-[color:var(--ah-ink-3)]">Sign in to your AbroadHub account.</p>

        {IS_MOCK && (
          <div className="mt-4 rounded-xl border border-[color:var(--ah-coral)]/25 bg-[color:var(--ah-coral-50)] px-3 py-2 text-[12px] text-[color:var(--ah-coral-600)] font-medium">
            Auth is live — create an account or sign in with your real email &amp; password.
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <Field icon={Mail} label="Email">
            <input
              data-testid="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="you@abroadhub.app"
            />
          </Field>
          <Field icon={Lock} label="Password">
            <input
              data-testid="login-password"
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              data-testid="login-toggle-password"
              onClick={() => setShow((v) => !v)}
              className="w-8 h-8 grid place-items-center rounded-full hover:bg-[color:var(--ah-bg)]"
              aria-label="Toggle password"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </Field>

          {error && (
            <div data-testid="login-error" className="text-[13px] text-red-600 font-medium">
              {error}
            </div>
          )}

          <button
            data-testid="login-submit"
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-full bg-[color:var(--ah-coral)] hover:bg-[color:var(--ah-coral-600)] text-white text-sm font-semibold flex items-center justify-center gap-2 ah-tap disabled:opacity-70"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Sign in
          </button>
        </form>

        <div className="mt-4 text-center text-[13px] text-[color:var(--ah-ink-3)]">
          Don&apos;t have an account?{' '}
          <Link data-testid="link-signup" to="/signup" className="font-semibold text-[color:var(--ah-coral)]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

const Field = ({ icon: Icon, label, children }) => (
  <label className="block">
    <span className="sr-only">{label}</span>
    <div className="flex items-center gap-2 h-11 px-3 rounded-xl bg-[color:var(--ah-bg)] border border-[color:var(--ah-line)] focus-within:border-[color:var(--ah-coral)] transition">
      <Icon size={16} className="text-[color:var(--ah-ink-3)]" />
      {children}
    </div>
  </label>
);
