import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Search, Briefcase, Map, User, Plus, Bell, MessageSquareText, LogOut } from 'lucide-react';
import { BrandLockup } from '../Brand';
import { useAuth } from '../../store/AuthContext';

const items = [
  { to: '/', label: 'Home', icon: Home, testId: 'side-nav-home' },
  { to: '/explore', label: 'Explore', icon: Search, testId: 'side-nav-explore' },
  { to: '/jobs', label: 'Jobs', icon: Briefcase, testId: 'side-nav-jobs' },
  { to: '/nearby', label: 'Nearby', icon: Map, testId: 'side-nav-nearby' },
  { to: '/profile', label: 'Profile', icon: User, testId: 'side-nav-profile' },
];

export default function DesktopSidebar({ onCreatePost }) {
  const { user, logout } = useAuth();
  return (
    <aside
      data-testid="desktop-sidebar"
      className="hidden lg:flex fixed inset-y-0 left-0 w-[260px] xl:w-[280px] flex-col border-r border-[color:var(--ah-line)] bg-white z-30"
    >
      <div className="px-6 pt-6 pb-4">
        <Link to="/" aria-label="AbroadHub home">
          <BrandLockup size={30} />
        </Link>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-1">
        {items.map(({ to, label, icon: Icon, testId }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            data-testid={testId}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 h-11 rounded-xl ah-tap text-[15px] font-semibold ${
                isActive
                  ? 'bg-[color:var(--ah-ink)] text-white'
                  : 'text-[color:var(--ah-ink)] hover:bg-[color:var(--ah-line-2)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} fill={isActive ? 'currentColor' : 'none'} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}

        <button
          data-testid="side-nav-create"
          onClick={onCreatePost}
          className="mt-3 w-full h-12 rounded-full bg-[color:var(--ah-coral)] hover:bg-[color:var(--ah-coral-600)] text-white text-[15px] font-bold flex items-center justify-center gap-2 ah-tap"
        >
          <Plus size={18} strokeWidth={2.4} /> New post
        </button>
      </nav>

      <div className="px-3 pb-6 pt-4 border-t border-[color:var(--ah-line)]">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover bg-[color:var(--ah-line-2)]"
          />
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-bold text-[color:var(--ah-ink)] truncate">{user?.name}</div>
            <div className="text-[12px] text-[color:var(--ah-ink-3)] truncate">{user?.handle}</div>
          </div>
          <button
            data-testid="side-nav-logout"
            onClick={logout}
            aria-label="Log out"
            className="w-9 h-9 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-line-2)]"
          >
            <LogOut size={16} className="text-[color:var(--ah-ink-2)]" />
          </button>
        </div>
      </div>
    </aside>
  );
}
