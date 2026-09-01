import React from 'react';
import { Plus } from 'lucide-react';

// Story tile matching the user's reference:
// White rounded card → circle avatar with dashed coral ring → red + at bottom-right → "Add Story" label below.
export default function StoryRing({ story, onOpen }) {
  const { user, isMe } = story;
  return (
    <button
      data-testid={`story-${story.id}`}
      onClick={() => onOpen?.(story)}
      className="flex flex-col items-center flex-shrink-0 ah-tap w-[128px] bg-white border border-[color:var(--ah-line)] rounded-2xl p-3"
      aria-label={`${user.name} story`}
    >
      <div className="relative">
        <div
          className="rounded-full p-[3px]"
          style={{
            border: '2px dashed #F46F5E',
            width: 92, height: 92,
          }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full object-cover bg-[color:var(--ah-line-2)]"
          />
        </div>
        {isMe && (
          <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[color:var(--ah-coral)] border-[3px] border-white grid place-items-center">
            <Plus size={14} className="text-white" strokeWidth={3} />
          </span>
        )}
      </div>
      <span className="mt-3 text-[13px] font-semibold text-[color:var(--ah-ink)]">
        {isMe ? 'Add Story' : user.name}
      </span>
    </button>
  );
}
