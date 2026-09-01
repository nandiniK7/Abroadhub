import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import { Settings, MapPin, Share2, LogOut } from 'lucide-react';
import PostCard from '../../components/PostCard';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { Skeleton } from '../../components/states/States';
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { data, loading } = useAsync(() => api.getProfile(), []);
  const [tab, setTab] = useState('posts');
  const { logout, user } = useAuth();
  const nav = useNavigate();

  const onLogout = () => { logout(); nav('/login', { replace: true }); };

  const profile = data?.user || user;

  return (
    <AppShell
      topbarVariant="title"
      topbarTitle="Profile"
      topbarRight={
        <button
          data-testid="profile-settings-btn"
          className="w-10 h-10 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-bg)]"
          aria-label="Settings"
          onClick={onLogout}
        >
          <LogOut size={18} className="text-[color:var(--ah-ink-2)]" />
        </button>
      }
    >
      {/* Header */}
      <section data-testid="profile-header" className="bg-white border-b border-[color:var(--ah-line)] px-4 py-5">
        <div className="flex items-center gap-4">
          {loading ? (
            <Skeleton className="w-20 h-20 rounded-full" />
          ) : (
            <img
              src={profile?.avatar}
              alt={profile?.name}
              className="w-20 h-20 rounded-full object-cover bg-[color:var(--ah-bg)]"
            />
          )}
          <div className="flex-1 grid grid-cols-3 text-center gap-2">
            <Stat label="Posts" value={profile?.postsCount || 0} testId="stat-posts" />
            <Stat label="Followers" value={profile?.followers || 0} testId="stat-followers" />
            <Stat label="Following" value={profile?.following || 0} testId="stat-following" />
          </div>
        </div>

        <div className="mt-4">
          <h2 data-testid="profile-name" className="text-lg font-bold text-[color:var(--ah-ink)]">
            {profile?.name || '—'}
          </h2>
          <div className="text-[13px] text-[color:var(--ah-ink-3)]">{profile?.handle}</div>
          {profile?.city && (
            <div className="mt-1 text-[13px] text-[color:var(--ah-ink-2)] flex items-center gap-1">
              <MapPin size={12} /> {profile.city}
            </div>
          )}
          {profile?.bio && (
            <p className="mt-2 text-[14px] text-[color:var(--ah-ink)] leading-relaxed">{profile.bio}</p>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            data-testid="profile-edit-btn"
            className="flex-1 h-10 rounded-full bg-[color:var(--ah-coral)] text-white text-sm font-semibold ah-tap"
          >
            Edit profile
          </button>
          <button
            data-testid="profile-share-btn"
            className="w-10 h-10 rounded-full bg-white border border-[color:var(--ah-line)] grid place-items-center ah-tap"
          >
            <Share2 size={16} className="text-[color:var(--ah-ink-2)]" />
          </button>
          <button
            data-testid="profile-menu-btn"
            className="w-10 h-10 rounded-full bg-white border border-[color:var(--ah-line)] grid place-items-center ah-tap"
          >
            <Settings size={16} className="text-[color:var(--ah-ink-2)]" />
          </button>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-14 z-10 bg-white border-b border-[color:var(--ah-line)]">
        <div className="max-w-2xl mx-auto grid grid-cols-2">
          {['posts', 'photos'].map((t) => (
            <button
              key={t}
              data-testid={`profile-tab-${t}`}
              onClick={() => setTab(t)}
              className={`h-11 text-sm font-semibold capitalize ah-tap relative ${
                tab === t ? 'text-[color:var(--ah-coral)]' : 'text-[color:var(--ah-ink-3)]'
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-0.5 rounded-t bg-[color:var(--ah-coral)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {tab === 'posts' && (
        <section data-testid="profile-posts" className="px-4 py-4 space-y-4">
          {loading && <Skeleton className="h-40 w-full rounded-2xl" />}
          {data?.posts?.map((p) => <PostCard key={p.id} post={p} />)}
        </section>
      )}

      {tab === 'photos' && (
        <section data-testid="profile-photos" className="p-1 grid grid-cols-3 gap-1">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-none" />
          ))}
          {data?.photos?.map((p, i) => (
            <button key={i} className="aspect-square overflow-hidden ah-tap">
              <img src={p} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </section>
      )}
    </AppShell>
  );
}

const Stat = ({ label, value, testId }) => (
  <div data-testid={testId}>
    <div className="text-lg font-extrabold text-[color:var(--ah-ink)]">{value}</div>
    <div className="text-[11px] text-[color:var(--ah-ink-3)] font-medium uppercase tracking-wide">{label}</div>
  </div>
);
