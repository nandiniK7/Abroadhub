import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

// Simple back-button page header used across sub-screens.
// Layout: [back]  Title                    [right]
export default function PageHeader({ title, right = null, testId = 'page-header', onBack }) {
  const nav = useNavigate();
  return (
    <header data-testid={testId} className="sticky top-0 z-30 bg-white border-b border-[color:var(--ah-line)]">
      <div className="max-w-2xl mx-auto flex items-center gap-2 px-2 h-14">
        <button
          onClick={() => onBack ? onBack() : nav(-1)}
          aria-label="Back"
          data-testid={`${testId}-back`}
          className="w-11 h-11 grid place-items-center rounded-full ah-tap hover:bg-[color:var(--ah-line-2)]"
        >
          <ChevronLeft size={22} className="text-[color:var(--ah-ink)]" strokeWidth={2} />
        </button>
        <h1 className="flex-1 text-[18px] font-bold text-[color:var(--ah-ink)]">{title}</h1>
        {right}
      </div>
    </header>
  );
}
