import React, { useState, useCallback, useContext, createContext } from 'react';
import BottomNav from './BottomNav';
import DesktopSidebar from './DesktopSidebar';
import CreateMenuSheet from '../CreateMenuSheet';
import CreatePostSheet from '../../features/home/CreatePostSheet';
import { toast } from 'sonner';

const ShellContext = createContext({ openCreateMenu: () => {} });
export const useShell = () => useContext(ShellContext);

export default function AppShell({ children, topBar, hideBottomNav = false, hideSidebar = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);

  const openCreateMenu = useCallback(() => setMenuOpen(true), []);

  return (
    <ShellContext.Provider value={{ openCreateMenu }}>
      <div className="min-h-screen bg-white">
        {!hideSidebar && <DesktopSidebar onCreate={openCreateMenu} />}
        <div className={hideSidebar ? '' : 'lg:pl-[260px] xl:pl-[280px]'}>
          {topBar}
          <main className="max-w-2xl mx-auto pb-[92px] lg:pb-10">{children}</main>
        </div>
        {!hideBottomNav && <BottomNav />}
        <CreateMenuSheet
          open={menuOpen}
          onOpenChange={setMenuOpen}
          onNewPost={() => setPostOpen(true)}
          onStory={() => toast('Story creation coming soon')}
        />
        <CreatePostSheet open={postOpen} onOpenChange={setPostOpen} />
      </div>
    </ShellContext.Provider>
  );
}
