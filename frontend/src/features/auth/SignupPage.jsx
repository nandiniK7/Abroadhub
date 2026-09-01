import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLockup } from '../../components/Brand';
import { useAuth } from '../../store/AuthContext';
import { User, Mail, Lock, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const { signup, loading } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup({ name, email, password });
      nav('/', { replace: true });
    } catch (err) { setError(err?.message || 'Signup failed'); }
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:items-center lg:justify-center lg:p-8"
      style={{ background: 'var(--ah-coral)' }}
    >
      <div className="flex-1 lg:flex-none flex items-center justify-center px-6 pt-14 pb-6 lg:pt-0 lg:pb-8">
        <BrandLockup variant="onCoral" size={26} showTagline />
      </div>

      <div className="bg-white rounded-t-[28px] px-6 pt-7 pb-8 shadow-2xl lg:rounded-3xl lg:max-w-md lg:w-full lg:px-8">
        <h1 className="text-[26px] font-extrabold tracking-tight text-[color:var(--ah-ink)]">Create your account</h1>
        <p className="mt-1 text-[14px] text-[color:var(--ah-ink-3)]">Join the community connecting people abroad.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <Field icon={User}>
            <input data-testid="signup-name" required minLength={2}
              className="flex-1 bg-transparent outline-none text-[14px]"
              placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field icon={Mail}>
            <input data-testid="signup-email" type="email" required
              className="flex-1 bg-transparent outline-none text-[14px]"
              placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field icon={Lock}>
            <input data-testid="signup-password" type="password" required minLength={4}
              className="flex-1 bg-transparent outline-none text-[14px]"
              placeholder="Password (min 4 chars)" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>

          {error && <div data-testid="signup-error" className="text-[13px] text-red-600 font-medium">{error}</div>}

          <button
            data-testid="signup-submit"
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full bg-[color:var(--ah-coral)] hover:bg-[color:var(--ah-coral-600)] text-white text-[15px] font-bold flex items-center justify-center gap-2 ah-tap disabled:opacity-70"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Create account
          </button>
        </form>

        <div className="mt-4 text-center text-[13px] text-[color:var(--ah-ink-3)]">
          Already have an account?{' '}
          <Link data-testid="link-login" to="/login" className="font-bold text-[color:var(--ah-coral)]">
            Sign in
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
