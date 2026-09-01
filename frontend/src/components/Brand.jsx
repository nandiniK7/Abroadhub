import React from 'react';

// AbroadHub logo — square rounded coral mark with plane-in-triangle glyph,
// plus "Abroad Hub" wordmark. Replace this SVG with the official logo asset
// once provided (see /public/logo/ or FINDINGS.md).

export const BrandMarkColor = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <rect x="0" y="0" width="100" height="100" rx="22" fill="#F46F5E" />
    <path
      d="M50 26
         L74 66
         C 76 69 74 72 71 72
         L 29 72
         C 26 72 24 69 26 66
         L 50 26 Z"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path
      d="M50 38
         C 48 38 47 39 47 41
         L 47 52
         L 36 58
         C 35 58 34 59 34 60
         L 34 62
         C 34 63 35 64 36 63
         L 47 60
         L 47 66
         L 42 69
         L 42 71
         L 50 69
         L 58 71
         L 58 69
         L 53 66
         L 53 60
         L 64 63
         C 65 64 66 63 66 62
         L 66 60
         C 66 59 65 58 64 58
         L 53 52
         L 53 41
         C 53 39 52 38 50 38 Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const BrandMarkWhite = ({ size = 96 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <rect x="0" y="0" width="100" height="100" rx="22" fill="#FFFFFF" />
    <path
      d="M50 26 L74 66 C 76 69 74 72 71 72 L 29 72 C 26 72 24 69 26 66 L 50 26 Z"
      fill="none" stroke="#F46F5E" strokeWidth="4" strokeLinejoin="round"
    />
    <path
      d="M50 38 C 48 38 47 39 47 41 L 47 52 L 36 58 C 35 58 34 59 34 60 L 34 62 C 34 63 35 64 36 63 L 47 60 L 47 66 L 42 69 L 42 71 L 50 69 L 58 71 L 58 69 L 53 66 L 53 60 L 64 63 C 65 64 66 63 66 62 L 66 60 C 66 59 65 58 64 58 L 53 52 L 53 41 C 53 39 52 38 50 38 Z"
      fill="#F46F5E"
    />
  </svg>
);

// Header wordmark — script "Abroad Hub" in coral.
export const BrandWordmark = ({ size = 26 }) => (
  <span
    className="font-script leading-none select-none"
    style={{ color: '#F46F5E', fontSize: size, letterSpacing: '0em' }}
  >
    Abroad Hub
  </span>
);

export const BrandLockup = ({ size = 44, variant = 'default', showTagline = false }) => {
  if (variant === 'onCoral') {
    return (
      <div className="flex flex-col items-center gap-4">
        <BrandMarkWhite size={size * 2} />
        <div className="font-script text-white" style={{ fontSize: size * 1.4 }}>
          Abroad Hub
        </div>
        {showTagline && (
          <div className="text-white/95 text-[14px] font-medium">Connecting people abroad.</div>
        )}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <BrandMarkColor size={size} />
      <span className="font-script leading-none" style={{ color: '#F46F5E', fontSize: size * 0.65 }}>
        Abroad Hub
      </span>
    </div>
  );
};

export default BrandWordmark;
