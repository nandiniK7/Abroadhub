import React from 'react';

// Large page title with optional right-side actions.
// Used on Jobs / Nearby / Profile screens.
export default function PageTitleBar({ title, right, testId = 'page-title-bar' }) {
  return (
    <header
      data-testid={testId}
      className="bg-white"
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 pt-5 pb-3">
        <h1 className="text-[28px] font-extrabold tracking-tight text-[color:var(--ah-ink)] leading-none">
          {title}
        </h1>
        {right && <div className="flex items-center gap-2.5">{right}</div>}
      </div>
    </header>
  );
}
