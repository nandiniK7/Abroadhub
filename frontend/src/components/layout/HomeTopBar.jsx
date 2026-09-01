import React from 'react';
import { Plus, Bell, MessageSquareText } from 'lucide-react';
import { BrandWordmark } from '../Brand';
import { useNavigate } from 'react-router-dom';
import { useShell } from './AppShell';

export default function HomeTopBar({ unread = 0, notifCount = 0 }) {
  const nav = useNavigate();
  const { openCreateMenu } = useShell();
  return (
    <header data-testid="app-topbar" className="sticky top-0 z-30 bg-white border-b border-[color:var(--ah-line)]">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-16">
        <BrandWordmark size={30} />
        <div className="flex items-center gap-1">
          <IconBtn testId="topbar-create-btn" ariaLabel="Create" onClick={openCreateMenu}>
            <Plus size={22} className="text-[color:var(--ah-ink)]" strokeWidth={2} />
          </IconBtn>
          <IconBtn testId="topbar-notifications-btn" ariaLabel="Notifications" onClick={() => nav('/notifications')} badge={notifCount}>
            <Bell size={22} className="text-[color:var(--ah-ink)]" strokeWidth={1.8} />
          </IconBtn>
          <IconBtn testId="topbar-messages-btn" ariaLabel="Messages" onClick={() => nav('/inbox')} badge={unread}>
            <MessageSquareText size={22} className="text-[color:var(--ah-ink)]" strokeWidth={1.8} />
          </IconBtn>
        </div>
      </div>
    </header>
  );
}

const IconBtn = ({ children, testId, ariaLabel, onClick, badge }) => (
  <button data-testid={testId} aria-label={ariaLabel} onClick={onClick} className="relative w-11 h-11 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-line-2)]">
    {children}
    {badge > 0 && (
      <span className="absolute top-1.5 right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[color:var(--ah-coral)] text-white text-[10px] font-bold grid place-items-center">
        {badge}
      </span>
    )}
  </button>
);
