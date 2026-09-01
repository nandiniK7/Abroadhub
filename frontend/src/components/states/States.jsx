import React from 'react';
import { AlertCircle, Inbox, RefreshCcw } from 'lucide-react';

export const Skeleton = ({ className = '', ...rest }) => (
  <div
    {...rest}
    className={`animate-pulse bg-[color:var(--ah-line)] rounded-lg ${className}`}
  />
);

export const EmptyState = ({ icon: Icon = Inbox, title, subtitle, action }) => (
  <div data-testid="empty-state" className="text-center py-16 px-6">
    <div className="w-14 h-14 mx-auto rounded-2xl bg-[color:var(--ah-coral-50)] grid place-items-center">
      <Icon size={26} className="text-[color:var(--ah-coral)]" />
    </div>
    <h3 className="mt-4 text-base font-bold text-[color:var(--ah-ink)]">{title}</h3>
    {subtitle && <p className="mt-1 text-sm text-[color:var(--ah-ink-3)]">{subtitle}</p>}
    {action}
  </div>
);

export const ErrorState = ({ onRetry, message = 'Something went wrong.' }) => (
  <div data-testid="error-state" className="text-center py-16 px-6">
    <div className="w-14 h-14 mx-auto rounded-2xl bg-[color:var(--ah-coral-50)] grid place-items-center">
      <AlertCircle size={26} className="text-[color:var(--ah-coral)]" />
    </div>
    <h3 className="mt-4 text-base font-bold text-[color:var(--ah-ink)]">Couldn&apos;t load</h3>
    <p className="mt-1 text-sm text-[color:var(--ah-ink-3)]">{message}</p>
    {onRetry && (
      <button
        data-testid="error-retry-btn"
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[color:var(--ah-coral)] text-white text-sm font-semibold ah-tap"
      >
        <RefreshCcw size={14} /> Try again
      </button>
    )}
  </div>
);
