import React from 'react';
import BottomNav from './BottomNav';

export default function AppShell({ children, topBar }) {
  return (
    <div className="min-h-screen bg-[color:var(--ah-bg)]">
      {/* Sub-pixel coral hint line — informative but visually calm. */}
      <div className="h-[2px] bg-[color:var(--ah-coral)]/80" />
      {topBar}
      <main className="max-w-2xl mx-auto pb-[92px]">{children}</main>
      <BottomNav />
    </div>
  );
}
