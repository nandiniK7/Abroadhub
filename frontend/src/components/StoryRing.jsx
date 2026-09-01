import React from 'react';
import { Plus } from 'lucide-react';

export default function StoryRing({ story }) {
  const { user, seen, isMe } = story;
  return (
    <button
      data-testid={`story-${story.id}`}
      className="flex flex-col items-center gap-1.5 flex-shrink-0 ah-tap"
      aria-label={`${user.name} story`}
    >
      <div className={seen ? 'story-ring-seen' : 'story-ring'}>
        <div className="bg-white rounded-full p-[2px]">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover bg-[color:var(--ah-bg)]"
            />
            {isMe && (
              <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[color:var(--ah-coral)] border-2 border-white grid place-items-center">
                <Plus size={12} className="text-white" strokeWidth={3} />
              </span>
            )}
          </div>
        </div>
      </div>
      <span className="text-[11px] text-[color:var(--ah-ink-2)] font-medium max-w-[68px] truncate">
        {isMe ? 'Your story' : user.name}
      </span>
    </button>
  );
}
