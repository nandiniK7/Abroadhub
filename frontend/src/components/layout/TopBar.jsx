import React from 'react';
import { Bell, MessageCircle, Search } from 'lucide-react';
import { BrandLockup } from '../Brand';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ variant = 'default', title, right = null }) {
  const nav = useNavigate();

  return (
    <header
      data-testid="app-topbar"
      className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[color:var(--ah-line)]"
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
        {variant === 'title' ? (
          <h1 data-testid="topbar-title" className="text-lg font-bold text-[color:var(--ah-ink)]">{title}</h1>
        ) : (
          <BrandLockup size={26} />
        )}

        <div className="flex items-center gap-1">
          {right}
          <button
            data-testid="topbar-search-btn"
            className="w-10 h-10 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-bg)]"
            onClick={() => nav('/explore')}
            aria-label="Search"
          >
            <Search size={20} className="text-[color:var(--ah-ink-2)]" />
          </button>
          <button
            data-testid="topbar-messages-btn"
            className="w-10 h-10 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-bg)]"
            aria-label="Messages"
          >
            <MessageCircle size={20} className="text-[color:var(--ah-ink-2)]" />
          </button>
          <button
            data-testid="topbar-notifications-btn"
            className="w-10 h-10 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-bg)] relative"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-[color:var(--ah-ink-2)]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[color:var(--ah-coral)]" />
          </button>
        </div>
      </div>
    </header>
  );
}
