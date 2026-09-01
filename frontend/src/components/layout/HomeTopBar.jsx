import React from 'react';
import { Plus, Bell, MessageSquareText } from 'lucide-react';
import { BrandWordmark } from '../Brand';

// Home top bar per the mobile design:
// [ Abroadhub. ]                                 (+)  (bell)  (messages·badge)
export default function HomeTopBar({ unread = 2 }) {
  return (
    <header
      data-testid="app-topbar"
      className="sticky top-0 z-30 bg-white border-b border-[color:var(--ah-line)]"
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-16">
        <BrandWordmark size={30} />
        <div className="flex items-center gap-2.5">
          <IconCircle testId="topbar-create-btn" ariaLabel="Create">
            <Plus size={18} className="text-[color:var(--ah-ink)]" />
          </IconCircle>
          <IconCircle testId="topbar-notifications-btn" ariaLabel="Notifications">
            <Bell size={18} className="text-[color:var(--ah-ink)]" />
          </IconCircle>
          <div className="relative">
            <IconCircle testId="topbar-messages-btn" ariaLabel="Messages">
              <MessageSquareText size={18} className="text-[color:var(--ah-ink)]" />
            </IconCircle>
            {unread > 0 && (
              <span
                data-testid="messages-badge"
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[color:var(--ah-live)] text-white text-[10px] font-bold grid place-items-center"
              >
                {unread}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

const IconCircle = ({ children, testId, ariaLabel, onClick }) => (
  <button
    data-testid={testId}
    aria-label={ariaLabel}
    onClick={onClick}
    className="w-10 h-10 rounded-full border border-[color:var(--ah-line)] bg-white grid place-items-center ah-tap hover:bg-[color:var(--ah-line-2)]"
  >
    {children}
  </button>
);
