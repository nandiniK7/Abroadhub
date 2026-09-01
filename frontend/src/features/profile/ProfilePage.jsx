import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageTitleBar from '../../components/layout/PageTitleBar';
import { MoreVertical, Phone, Globe, Star } from 'lucide-react';
import PostCard from '../../components/PostCard';
import AppSheet from '../../components/AppSheet';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { Skeleton } from '../../components/states/States';
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PEOPLE = Array.from({ length: 12 }).map((_, i) => ({
  id: `p${i}`,
  name: ['Priya Sharma','Diego Reyes','Sara Kim','Ali Yassin','Nora Chen','Marco Rossi','Amina Al-Farsi','Kenji Watanabe','Luca Bianchi','Isabela Nunes','Ravi Patel','Tessa Moore'][i],
  handle: '@user'+i,
  avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=person${i}`,
}));

export default function ProfilePage() {
  const { data, loading } = useAsync(() => api.getProfile(), []);
  const [tab, setTab] = useState('posts');
  const { logout, user: authed } = useAuth();
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [peopleTab, setPeopleTab] = useState(null); // 'followers' | 'following' | null

  const onLogout = async () => { await logout(); nav('/login', { replace: true }); };
  const p = data?.user || authed || {};

  const callPhone = p.phone || '+15551234567';
  const website = p.website || 'aaravlens.co';

  return (
    <AppShell
      topBar={
        <PageTitleBar
          testId="profile-title-bar"
          title="My Profile"
          right={
            <div className="relative">
              <button
                data-testid="profile-menu-btn"
                aria-label="More"
                onClick={() => setMenuOpen((v) => !v)}
                className="w-11 h-11 grid place-items-center ah-tap"
              >
                <MoreVertical size={20} className="text-[color:var(--ah-ink)]" />
              </button>
              {menuOpen && (
                <div
                  data-testid="profile-menu"
                  className="absolute right-0 top-11 bg-white rounded-xl border border-[color:var(--ah-line)] ah-shadow-card overflow-hidden min-w-[160px] z-20"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <MenuItem onClick={() => { setMenuOpen(false); toast('Edit profile coming soon'); }}>Edit profile</MenuItem>
                  <MenuItem onClick={() => { setMenuOpen(false); toast('Settings coming soon'); }}>Settings</MenuItem>
                  <MenuItem onClick={() => { setMenuOpen(false); toast('Sharing profile…'); }}>Share profile</MenuItem>
                  <MenuItem danger data-testid="profile-menu-logout" onClick={onLogout}>Log out</MenuItem>
                </div>
              )}
            </div>
          }
        />
      }
    >
      <section data-testid="profile-header" className="bg-white px-4 pt-1 pb-5">
        <div className="flex items-start gap-4">
          {loading ? (
            <Skeleton className="w-[100px] h-[100px] rounded-full flex-shrink-0" />
          ) : (
            <img
              src={p.avatar}
              alt={p.name}
              className="w-[100px] h-[100px] rounded-full object-cover bg-[color:var(--ah-line-2)] flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0 pt-1">
            <h2 data-testid="profile-name" className="text-[24px] font-extrabold text-[color:var(--ah-ink)] leading-none">
              {p.name || '—'}
            </h2>
            <div className="mt-1 text-[14px] text-[color:var(--ah-ink-3)]">{p.handle}</div>

            {p.category && (
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[color:var(--ah-tag-purple)] text-[color:var(--ah-tag-purple-fg)]">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span className="text-[13px] font-semibold">{p.category}</span>
              </div>
            )}

            {p.rating && (
              <div className="mt-2 flex items-center gap-1.5 text-[14px]">
                <span className="font-bold text-[color:var(--ah-ink)]">{p.rating}</span>
                <Star size={14} className="fill-[color:var(--ah-warning)] text-[color:var(--ah-warning)]" strokeWidth={0} />
                <button
                  data-testid="profile-ratings-btn"
                  onClick={() => toast(`${p.ratingsCount} ratings`, { description: 'Full reviews coming soon' })}
                  className="font-semibold text-[color:var(--ah-ink)] underline underline-offset-2"
                >
                  {p.ratingsCount} ratings
                </button>
              </div>
            )}
          </div>
        </div>

        {p.bio && (
          <p className="mt-4 text-[15px] text-[color:var(--ah-ink)] leading-[1.4] whitespace-pre-line">
            {p.bio}
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatButton
            testId="stat-following"
            value={p.following || 0}
            label="Following"
            onClick={() => setPeopleTab('following')}
          />
          <StatButton
            testId="stat-followers"
            value={p.followers || 0}
            label="Followers"
            onClick={() => setPeopleTab('followers')}
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <a
            data-testid="profile-call-btn"
            href={`tel:${callPhone}`}
            className="h-12 rounded-xl border border-[color:var(--ah-line)] bg-white flex items-center justify-center gap-2 ah-tap"
          >
            <Phone size={18} strokeWidth={2} className="text-[color:var(--ah-ink)]" />
            <span className="text-[15px] font-bold text-[color:var(--ah-ink)]">Call Now</span>
          </a>
          <a
            data-testid="profile-website-btn"
            href={`https://${website}`}
            target="_blank"
            rel="noreferrer"
            className="h-12 rounded-xl border border-[color:var(--ah-line)] bg-white flex items-center justify-center gap-2 ah-tap"
          >
            <Globe size={18} strokeWidth={2} className="text-[color:var(--ah-ink)]" />
            <span className="text-[15px] font-bold text-[color:var(--ah-ink)]">Website</span>
          </a>
        </div>
      </section>

      <div className="bg-white border-b border-[color:var(--ah-line)]">
        <div className="max-w-2xl mx-auto grid grid-cols-2">
          {['posts', 'photos'].map((t) => (
            <button
              key={t}
              data-testid={`profile-tab-${t}`}
              onClick={() => setTab(t)}
              className={`h-12 text-[15px] font-bold capitalize ah-tap relative ${
                tab === t ? 'text-[color:var(--ah-ink)]' : 'text-[color:var(--ah-ink-3)]'
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-[color:var(--ah-ink)] rounded-t" />
              )}
            </button>
          ))}
        </div>
      </div>

      {tab === 'posts' && (
        <section data-testid="profile-posts" className="bg-white">
          {loading && <div className="p-4"><Skeleton className="h-40 w-full rounded-2xl" /></div>}
          {data?.posts?.map((post) => (
            <PostCard key={post.id} post={post} showAuthor={false} />
          ))}
        </section>
      )}

      {tab === 'photos' && (
        <section data-testid="profile-photos" className="p-1 grid grid-cols-3 gap-1 bg-white">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-none" />
          ))}
          {data?.photos?.map((src, i) => (
            <button
              key={i}
              onClick={() => toast('Photo viewer coming soon')}
              className="aspect-square overflow-hidden ah-tap"
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </section>
      )}

      <PeopleSheet
        open={!!peopleTab}
        onOpenChange={(v) => !v && setPeopleTab(null)}
        title={peopleTab === 'following' ? `Following (${p.following})` : `Followers (${p.followers})`}
        testId={peopleTab === 'following' ? 'following-sheet' : 'followers-sheet'}
      />
    </AppShell>
  );
}

function MenuItem({ children, onClick, danger, ...rest }) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={`w-full text-left px-4 py-2.5 text-[14px] font-semibold hover:bg-[color:var(--ah-line-2)] ${
        danger ? 'text-red-600' : 'text-[color:var(--ah-ink)]'
      }`}
    >
      {children}
    </button>
  );
}

function StatButton({ value, label, testId, onClick }) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className="h-11 rounded-xl bg-[color:var(--ah-line-2)] flex items-center justify-center gap-2 ah-tap hover:bg-[color:var(--ah-line)]"
    >
      <span className="text-[15px] font-extrabold text-[color:var(--ah-ink)]">{value}</span>
      <span className="text-[14px] text-[color:var(--ah-ink-2)] font-medium">{label}</span>
    </button>
  );
}

function PeopleSheet({ open, onOpenChange, title, testId }) {
  return (
    <AppSheet open={open} onOpenChange={onOpenChange} title={title} testId={testId}>
      <ul className="space-y-3">
        {PEOPLE.map((u) => (
          <li key={u.id} className="flex items-center gap-3">
            <img src={u.avatar} alt="" className="w-10 h-10 rounded-full object-cover bg-[color:var(--ah-line-2)]" />
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold text-[color:var(--ah-ink)] truncate">{u.name}</div>
              <div className="text-[12px] text-[color:var(--ah-ink-3)] truncate">{u.handle}</div>
            </div>
            <button
              onClick={() => toast(`Following ${u.name}`)}
              className="h-9 px-3 rounded-full bg-[color:var(--ah-ink)] text-white text-[13px] font-bold ah-tap"
            >
              Follow
            </button>
          </li>
        ))}
      </ul>
    </AppSheet>
  );
}
