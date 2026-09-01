import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Briefcase, MapPin, User } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: Home, testId: 'nav-home' },
  { to: '/explore', label: 'Explore', icon: Compass, testId: 'nav-explore' },
  { to: '/jobs', label: 'Jobs', icon: Briefcase, testId: 'nav-jobs' },
  { to: '/nearby', label: 'Nearby', icon: MapPin, testId: 'nav-nearby' },
  { to: '/profile', label: 'Profile', icon: User, testId: 'nav-profile' },
];

export default function BottomNav() {
  return (
    <nav
      data-testid="bottom-nav"
      className="fixed bottom-0 inset-x-0 z-30 bg-white ah-shadow-nav border-t border-[color:var(--ah-line)] pb-safe"
    >
      <div className="max-w-2xl mx-auto grid grid-cols-5 h-16">
        {items.map(({ to, label, icon: Icon, testId }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            data-testid={testId}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 ah-tap ${
                isActive ? 'text-[color:var(--ah-coral)]' : 'text-[color:var(--ah-ink-3)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.4 : 2} />
                <span className={`text-[11px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
