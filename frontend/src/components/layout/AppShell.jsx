import React, { useState, useCallback, useContext, createContext } from 'react';
import BottomNav from './BottomNav';
import DesktopSidebar from './DesktopSidebar';
import CreatePostSheet from '../../features/home/CreatePostSheet';

const ShellContext = createContext({ openCreatePost: () => {} });
export const useShell = () => useContext(ShellContext);

export default function AppShell({ children, topBar }) {
  const [createOpen, setCreateOpen] = useState(false);
  const openCreatePost = useCallback(() => setCreateOpen(true), []);

  return (
    <ShellContext.Provider value={{ openCreatePost }}>
      <div className="min-h-screen bg-[color:var(--ah-bg)]">
        <div className="h-[2px] bg-[color:var(--ah-coral)]/80" />

        <DesktopSidebar onCreatePost={openCreatePost} />

        <div className="lg:pl-[260px] xl:pl-[280px]">
          {topBar}
          <main className="max-w-2xl mx-auto pb-[92px] lg:pb-10">{children}</main>
        </div>

        <BottomNav />
        <CreatePostSheet open={createOpen} onOpenChange={setCreateOpen} />
      </div>
    </ShellContext.Provider>
  );
}
