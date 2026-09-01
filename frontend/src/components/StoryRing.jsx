import React from 'react';
import { Plus } from 'lucide-react';

// Story item — white card with rounded corners, avatar with coral ring
// (dashed on "Your story"), optional red "Live" pill, and name below.
export default function StoryRing({ story }) {
  const { user, seen, isMe, live } = story;

  return (
    <button
      data-testid={`story-${story.id}`}
      className="flex flex-col items-center gap-2 flex-shrink-0 ah-tap bg-white rounded-2xl border border-[color:var(--ah-line)] px-3 pt-2.5 pb-2.5 w-[104px]"
      aria-label={`${user.name} story`}
    >
      <div className="relative">
        <div
          className={`p-[2.5px] rounded-full ${
            isMe
              ? 'border-2 border-dashed border-[color:var(--ah-coral)]'
              : seen
                ? 'border-2 border-[color:var(--ah-line)]'
                : 'border-2 border-[color:var(--ah-coral)]'
          }`}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover bg-[color:var(--ah-line-2)]"
          />
        </div>

        {isMe && (
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[color:var(--ah-coral)] border-2 border-white grid place-items-center">
            <Plus size={11} className="text-white" strokeWidth={3.5} />
          </span>
        )}
        {live && !isMe && (
          <span
            data-testid={`story-live-${story.id}`}
            className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[color:var(--ah-live)] text-white text-[9px] font-bold px-1.5 py-[1px] rounded-md tracking-wide"
          >
            Live
          </span>
        )}
      </div>
      <span className="text-[12px] font-semibold text-[color:var(--ah-ink)] max-w-full truncate">
        {isMe ? shortName(user.name) : user.name}
      </span>
    </button>
  );
}

function shortName(fullName) {
  if (!fullName) return 'You';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}
