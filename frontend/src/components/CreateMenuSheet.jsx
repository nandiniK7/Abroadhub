import React from 'react';
import { Sheet, SheetContent } from './ui/sheet';
import { FileText, Camera, Home as HomeIcon, CalendarDays, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const items = [
  { key: 'post',    label: 'New Post', icon: FileText,     to: null, testId: 'create-new-post' },
  { key: 'story',   label: 'Story',    icon: Camera,       to: null, testId: 'create-story' },
  { key: 'housing', label: 'Housing',  icon: HomeIcon,     to: null, testId: 'create-housing' },
  { key: 'event',   label: 'Event',    icon: CalendarDays, to: '/events/new', testId: 'create-event' },
  { key: 'job',     label: 'Job',      icon: Briefcase,    to: '/jobs/new', testId: 'create-job' },
];

export default function CreateMenuSheet({ open, onOpenChange, onNewPost, onStory }) {
  const nav = useNavigate();
  const pick = (it) => {
    onOpenChange(false);
    if (it.key === 'post') onNewPost?.();
    else if (it.key === 'story') onStory?.();
    else if (it.to) nav(it.to);
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        data-testid="create-menu-sheet"
        className="p-0 rounded-t-[24px] border-none max-h-[80vh] lg:max-w-md lg:mx-auto lg:rounded-2xl lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:inset-x-0"
      >
        <div className="pt-3 pb-2 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-[color:var(--ah-line)]" />
        </div>
        <div className="px-2 pb-2">
          {items.map((it) => (
            <button
              key={it.key}
              data-testid={it.testId}
              onClick={() => pick(it)}
              className="w-full flex items-center gap-4 px-4 h-[60px] hover:bg-[color:var(--ah-line-2)] ah-tap"
            >
              <it.icon size={22} className="text-[color:var(--ah-ink)]" strokeWidth={1.8} />
              <span className="text-[16px] font-medium text-[color:var(--ah-ink)]">{it.label}</span>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
