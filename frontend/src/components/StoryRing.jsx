import React from 'react';
import { Plus } from 'lucide-react';

// Story tile matching the reference: white card with rounded corners,
// square-ish image and an "Add Story" red-circle + at the bottom-center.
export default function StoryRing({ story, onOpen }) {
  const { user, isMe } = story;
  return (
    <button
      data-testid={`story-${story.id}`}
      onClick={() => onOpen?.(story)}
      className="flex flex-col items-stretch flex-shrink-0 ah-tap w-[112px]"
      aria-label={`${user.name} story`}
    >
      <div className="relative rounded-2xl overflow-hidden bg-[color:var(--ah-line-2)]" style={{ aspectRatio: '9/12' }}>
        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/25 to-transparent" />
        <div className="absolute top-2 left-2 right-2 text-white text-[12px] font-semibold drop-shadow">
          {user.name}
        </div>
        {isMe && (
          <div className="absolute left-0 right-0 -bottom-3 flex justify-center">
            <span className="w-8 h-8 rounded-full bg-[color:var(--ah-coral)] border-[3px] border-white grid place-items-center">
              <Plus size={16} className="text-white" strokeWidth={3} />
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 h-[14px]" />
    </button>
  );
}
