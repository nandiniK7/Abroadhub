import React from 'react';

// AbroadHub logo — plane-in-triangle mark + script wordmark.
// Rendered inline as SVG so it scales cleanly without an asset request.
export const BrandMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path
      d="M24 4 L44 40 L4 40 Z"
      fill="none"
      stroke="#F46F5E"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path
      d="M14 30 L34 20 L28 32 L24 27 L18 32 Z"
      fill="#F46F5E"
    />
  </svg>
);

export const BrandLockup = ({ size = 28, showTagline = false }) => (
  <div className="flex items-center gap-2">
    <BrandMark size={size} />
    <div className="leading-tight">
      <div
        className="font-extrabold tracking-tight"
        style={{ color: '#F46F5E', fontSize: size * 0.72, letterSpacing: '-0.02em' }}
      >
        AbroadHub
      </div>
      {showTagline && (
        <div className="text-[11px] text-[color:var(--ah-ink-3)]">
          Connecting people abroad.
        </div>
      )}
    </div>
  </div>
);

export default BrandLockup;
