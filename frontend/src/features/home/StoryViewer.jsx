import React from 'react';
import { X } from 'lucide-react';

// Full-screen story viewer overlay (tap or ESC to close).
export default function StoryViewer({ story, onClose }) {
  if (!story) return null;
  const { user, live } = story;
  return (
    <div
      data-testid="story-viewer"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center animate-in fade-in duration-200"
    >
      <div className="absolute top-0 inset-x-0 p-4 flex items-center gap-3 z-10" onClick={(e) => e.stopPropagation()}>
        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2 border-white" />
        <div className="text-white">
          <div className="text-sm font-bold flex items-center gap-1.5">
            {user.name}
            {live && <span className="bg-[color:var(--ah-live)] text-[9px] px-1.5 py-[1px] rounded font-bold">Live</span>}
          </div>
          <div className="text-[11px] text-white/70">just now</div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          data-testid="story-viewer-close"
          className="ml-auto w-9 h-9 rounded-full bg-white/15 grid place-items-center text-white ah-tap"
        >
          <X size={18} />
        </button>
      </div>

      <img
        src={user.avatar}
        alt=""
        className="w-full max-w-md aspect-[9/16] object-cover"
        style={{ background: '#111' }}
      />
    </div>
  );
}
