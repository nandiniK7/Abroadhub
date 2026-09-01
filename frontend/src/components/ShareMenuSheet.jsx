import React from 'react';
import { Sheet, SheetContent } from './ui/sheet';
import { Link as LinkIcon, Share2, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareMenuSheet({ open, onOpenChange, url }) {
  const doCopy = async () => {
    try { await navigator.clipboard.writeText(url); toast.success('Link copied'); }
    catch { toast.error('Could not copy'); }
    onOpenChange(false);
  };
  const doShare = async () => {
    try {
      if (navigator.share) await navigator.share({ url });
      else await navigator.clipboard.writeText(url);
      toast.success('Shared');
    } catch { /* user cancelled */ }
    onOpenChange(false);
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        data-testid="share-menu-sheet"
        className="p-0 rounded-t-[24px] border-none max-h-[60vh] lg:max-w-sm lg:mx-auto lg:rounded-2xl lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:inset-x-0"
      >
        <div className="pt-3 pb-2 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-[color:var(--ah-line)]" />
        </div>
        <div className="px-2 pb-4">
          <Row testId="share-copy" icon={LinkIcon} label="Copy link" onClick={doCopy} />
          <Row testId="share-to"   icon={Share2}   label="Share to"  onClick={doShare} />
          <Row testId="share-msg"  icon={Send}     label="Send in message" onClick={() => { toast('Opening inbox…'); onOpenChange(false); }} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

const Row = ({ icon: Icon, label, onClick, testId }) => (
  <button data-testid={testId} onClick={onClick} className="w-full flex items-center gap-4 px-4 h-[54px] hover:bg-[color:var(--ah-line-2)] ah-tap">
    <Icon size={20} className="text-[color:var(--ah-ink)]" strokeWidth={1.8} />
    <span className="text-[15px] font-medium text-[color:var(--ah-ink)]">{label}</span>
  </button>
);
