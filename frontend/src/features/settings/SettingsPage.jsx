import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import {
  UserPlus, LayoutGrid, Bookmark, UserX, Lock, Trash2,
  Sun, HelpCircle, ShieldCheck, Star, LogOut, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { logout } = useAuth();
  const nav = useNavigate();
  const [priv, setPriv] = useState(true);

  const doLogout = async () => { await logout(); nav('/login', { replace: true }); };
  const doDelete = () => { if (window.confirm('Delete your account permanently?')) toast.success('Account deletion queued'); };

  return (
    <AppShell hideBottomNav topBar={<PageHeader testId="settings-header" title="Settings" />}>
      <section className="bg-white px-4 pt-4 pb-2">
        <SectionTitle>Account</SectionTitle>
        <Item icon={UserPlus} title="Follow Requests" desc="Manage pending follow requests" onClick={() => toast('No pending requests')} testId="s-follow-requests" />
        <Item icon={LayoutGrid} title="My Listings" desc="Manage your posted jobs, properties & events" onClick={() => toast('Opening My Listings…')} testId="s-my-listings" />
        <Item icon={Bookmark} title="Collections" desc="View saved listings and events" onClick={() => toast('Opening Collections…')} testId="s-collections" />
        <Item icon={UserX} title="Blocked" desc="Manage users you've restricted" onClick={() => toast('No blocked users')} testId="s-blocked" />
        <Item icon={Lock} title="Private Account" toggle value={priv} onToggle={(v) => { setPriv(v); toast(v ? 'Account is private' : 'Account is public'); }} testId="s-private" />
        <button data-testid="s-delete" onClick={doDelete} className="w-full flex items-center gap-3 px-2 h-14 hover:bg-[color:var(--ah-line-2)] ah-tap">
          <div className="w-10 h-10 rounded-xl bg-[color:var(--ah-coral-50)] grid place-items-center"><Trash2 size={18} className="text-red-600" /></div>
          <span className="flex-1 text-left text-[15px] font-semibold text-red-600">Delete Account</span>
        </button>
      </section>

      <section className="bg-white px-4 pt-4 pb-2 mt-2">
        <SectionTitle>App Settings</SectionTitle>
        <Item icon={Sun} title="Theme" desc="System" onClick={() => toast('Light mode')} testId="s-theme" />
      </section>

      <section className="bg-white px-4 pt-4 pb-4 mt-2">
        <SectionTitle>Support</SectionTitle>
        <Item icon={HelpCircle} title="Help & Support" onClick={() => toast('Opening support…')} testId="s-help" />
        <Item icon={ShieldCheck} title="Privacy Policy" onClick={() => toast('Opening privacy policy…')} testId="s-privacy" />
        <Item icon={Star} title="Rate Us" desc="Let us know what you think" onClick={() => toast('Thanks!')} testId="s-rate" />
        <button data-testid="s-logout" onClick={doLogout} className="w-full flex items-center gap-3 px-2 h-14 hover:bg-[color:var(--ah-line-2)] ah-tap">
          <div className="w-10 h-10 rounded-xl bg-[color:var(--ah-coral-50)] grid place-items-center"><LogOut size={18} className="text-[color:var(--ah-coral)]" /></div>
          <span className="flex-1 text-left text-[15px] font-semibold text-[color:var(--ah-coral)]">Log out</span>
        </button>
      </section>
    </AppShell>
  );
}

const SectionTitle = ({ children }) => <div className="text-[13px] font-extrabold text-[color:var(--ah-ink)] px-2 py-1">{children}</div>;

function Item({ icon: Icon, title, desc, onClick, toggle, value, onToggle, testId }) {
  return (
    <div data-testid={testId} onClick={!toggle ? onClick : undefined} className={`flex items-center gap-3 px-2 h-14 ${!toggle ? 'hover:bg-[color:var(--ah-line-2)] cursor-pointer' : ''}`}>
      <div className="w-10 h-10 rounded-xl bg-[color:var(--ah-line-2)] grid place-items-center"><Icon size={18} className="text-[color:var(--ah-ink-2)]" strokeWidth={1.8} /></div>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-semibold text-[color:var(--ah-ink)]">{title}</div>
        {desc && <div className="text-[12px] text-[color:var(--ah-ink-3)] truncate">{desc}</div>}
      </div>
      {toggle ? (
        <button data-testid={`${testId}-toggle`} onClick={() => onToggle(!value)} className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-[color:var(--ah-ink)]' : 'bg-[color:var(--ah-line)]'}`}>
          <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} style={{ marginTop: 2 }} />
        </button>
      ) : (
        <ChevronRight size={16} className="text-[color:var(--ah-ink-3)]" />
      )}
    </div>
  );
}
