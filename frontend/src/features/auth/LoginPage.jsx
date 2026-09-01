import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BrandLockup } from '../../components/Brand';
import { useAuth } from '../../store/AuthContext';
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
    } catch (err) { setError(err?.message || 'Login failed'); }
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:items-center lg:justify-center lg:p-8"
      style={{ background: 'var(--ah-coral)' }}
    >
      {/* Splash */}
      <div className="flex-1 lg:flex-none flex items-center justify-center px-6 pt-14 pb-6 lg:pt-0 lg:pb-8">
        <BrandLockup variant="onCoral" size={28} showTagline />
      </div>

      {/* Sheet / card */}
      <div className="bg-white rounded-t-[28px] px-6 pt-7 pb-8 shadow-2xl lg:rounded-3xl lg:max-w-md lg:w-full lg:px-8">
        <h1 className="text-[26px] font-extrabold tracking-tight text-[color:var(--ah-ink)]">Welcome back</h1>
        <p className="mt-1 text-[14px] text-[color:var(--ah-ink-3)]">Sign in to continue to AbroadHub.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <Field icon={Mail}>
            <input
              data-testid="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent outline-none text-[14px]"
              placeholder="Email"
            />
          </Field>
          <Field icon={Lock}>
            <input
              data-testid="login-password"
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
              className="flex-1 bg-transparent outline-none text-[14px]"
              placeholder="Password"
            />
            <button
              type="button"
              data-testid="login-toggle-password"
              onClick={() => setShow((v) => !v)}
              className="w-8 h-8 grid place-items-center rounded-full hover:bg-[color:var(--ah-line-2)]"
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
            className="w-full h-12 rounded-full bg-[color:var(--ah-coral)] hover:bg-[color:var(--ah-coral-600)] text-white text-[15px] font-bold flex items-center justify-center gap-2 ah-tap disabled:opacity-70"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Sign in
          </button>
        </form>

        <div className="mt-4 text-center text-[13px] text-[color:var(--ah-ink-3)]">
          Don&apos;t have an account?{' '}
          <Link data-testid="link-signup" to="/signup" className="font-bold text-[color:var(--ah-coral)]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

const Field = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2 h-12 px-3 rounded-xl bg-[color:var(--ah-line-2)] border border-[color:var(--ah-line)] focus-within:border-[color:var(--ah-coral)] transition">
    <Icon size={16} className="text-[color:var(--ah-ink-3)]" />
    {children}
  </div>
);
