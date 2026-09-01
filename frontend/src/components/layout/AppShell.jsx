import React from 'react';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import { IS_MOCK } from '../../services/api';

export default function AppShell({ children, topbarVariant, topbarTitle, topbarRight }) {
  return (
    <div className="min-h-screen bg-[color:var(--ah-bg)]">
      {IS_MOCK && (
        <div
          data-testid="mock-banner"
          className="text-center text-[11px] font-semibold py-1.5 bg-[color:var(--ah-coral-50)] text-[color:var(--ah-coral-600)] border-b border-[color:var(--ah-coral)]/20"
        >
          DEV MODE · Feed & content are mocked · Auth is live (real accounts)
        </div>
      )}
      <TopBar variant={topbarVariant} title={topbarTitle} right={topbarRight} />
      <main className="max-w-2xl mx-auto pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
