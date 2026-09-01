import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../components/ui/sheet';

// Generic responsive bottom sheet — full-height on mobile, centered dialog on lg+.
export default function AppSheet({ open, onOpenChange, title, children, testId = 'app-sheet' }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        data-testid={testId}
        side="bottom"
        className="p-0 rounded-t-[28px] max-h-[90vh] overflow-y-auto lg:max-w-lg lg:mx-auto lg:rounded-2xl lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:inset-x-0 lg:max-h-[80vh]"
      >
        {title && (
          <SheetHeader className="px-5 pt-5 pb-1 space-y-0">
            <SheetTitle className="text-[18px] font-extrabold text-[color:var(--ah-ink)] text-left">
              {title}
            </SheetTitle>
          </SheetHeader>
        )}
        <div className="px-5 pb-6 pt-2">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
