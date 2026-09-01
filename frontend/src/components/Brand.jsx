import React from 'react';

// The AbroadHub logo — rounded coral triangle with a top-down plane silhouette cut in white,
// plus the "AbroadHub" script wordmark. Modeled to match the official brand asset.

// Coral triangle mark with white plane inside — used on splash / auth.
export const BrandMarkColor = ({ size = 96 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <path
      d="M100 14
         C 112 14 122 20 128 30
         L 184 148
         C 192 162 182 180 166 180
         L 34 180
         C 18 180 8 162 16 148
         L 72 30
         C 78 20 88 14 100 14 Z"
      fill="#F46F5E"
    />
    {/* Plane silhouette in white */}
    <path
      d="M100 58
         C 96 58 93 61 93 65
         L 93 92
         L 60 108
         C 57 109 55 112 55 115
         L 55 121
         C 55 124 57 125 60 124
         L 93 116
         L 93 138
         L 82 145
         C 80 146 79 148 79 150
         L 79 154
         C 79 157 82 158 84 157
         L 100 153
         L 116 157
         C 118 158 121 157 121 154
         L 121 150
         C 121 148 120 146 118 145
         L 107 138
         L 107 116
         L 140 124
         C 143 125 145 124 145 121
         L 145 115
         C 145 112 143 109 140 108
         L 107 92
         L 107 65
         C 107 61 104 58 100 58 Z"
      fill="#FFFFFF"
    />
  </svg>
);

// White mark on transparent — for use on the coral splash bg.
export const BrandMarkWhite = ({ size = 96 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <path
      d="M100 14
         C 112 14 122 20 128 30
         L 184 148
         C 192 162 182 180 166 180
         L 34 180
         C 18 180 8 162 16 148
         L 72 30
         C 78 20 88 14 100 14 Z"
      fill="#FFFFFF"
    />
    <path
      d="M100 58
         C 96 58 93 61 93 65
         L 93 92
         L 60 108
         C 57 109 55 112 55 115
         L 55 121
         C 55 124 57 125 60 124
         L 93 116
         L 93 138
         L 82 145
         C 80 146 79 148 79 150
         L 79 154
         C 79 157 82 158 84 157
         L 100 153
         L 116 157
         C 118 158 121 157 121 154
         L 121 150
         C 121 148 120 146 118 145
         L 107 138
         L 107 116
         L 140 124
         C 143 125 145 124 145 121
         L 145 115
         C 145 112 143 109 140 108
         L 107 92
         L 107 65
         C 107 61 104 58 100 58 Z"
      fill="#F46F5E"
    />
  </svg>
);

// Script wordmark used in the app's top bar (black).
export const BrandWordmark = ({ size = 28, color = '#0B0D10', withDot = true }) => (
  <span
    className="font-script leading-none tracking-tight select-none"
    style={{ color, fontSize: size, letterSpacing: '-0.01em' }}
  >
    Abroadhub{withDot ? '.' : ''}
  </span>
);

// Splash / auth block — coral mark + white script wordmark on a coral background,
// or white mark + white wordmark. Use variant="coral" for the on-coral splash.
export const BrandLockup = ({ size = 34, variant = 'default', showTagline = false }) => {
  if (variant === 'onCoral') {
    return (
      <div className="flex flex-col items-center gap-3">
        <BrandMarkWhite size={size * 2.6} />
        <span
          className="font-script text-white leading-none"
          style={{ fontSize: size * 1.9, letterSpacing: '-0.01em' }}
        >
          AbroadHub
        </span>
        {showTagline && (
          <div className="text-white/95 text-[15px] font-medium">Connecting people abroad.</div>
        )}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <BrandMarkColor size={size} />
      <BrandWordmark size={size * 0.92} />
    </div>
  );
};

export default BrandWordmark;
