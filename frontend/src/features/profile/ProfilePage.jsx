import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import { Plus, Bookmark, Menu, ChevronLeft, CheckCircle2 } from 'lucide-react';
import PostCard from '../../components/PostCard';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { Skeleton } from '../../components/states/States';
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useShell } from '../../components/layout/AppShell';

export default function ProfilePage() {
  const { data, loading } = useAsync(() => api.getProfile(), []);
  const [tab, setTab] = useState('posts');
  const { user: authed } = useAuth();
  const nav = useNavigate();
  const p = data?.user || authed || {};

  const top = <ProfileTopBar username={p.username} />;

  return (
    <AppShell topBar={top}>
      <section data-testid="profile-header" className="bg-white px-4 pt-5 pb-3">
        <div className="flex items-center gap-4">
          {loading ? (
            <Skeleton className="w-[90px] h-[90px] rounded-full" />
          ) : (
            <img src={p.avatar} alt={p.name} className="w-[90px] h-[90px] rounded-full object-cover bg-[color:var(--ah-line-2)]" />
          )}
          <div className="flex-1 grid grid-cols-2">
            <button data-testid="stat-followers" onClick={() => toastFor('Followers', p.followers)} className="text-center ah-tap">
              <div className="text-[18px] font-extrabold text-[color:var(--ah-ink)]">{p.followers ?? 0}</div>
              <div className="text-[13px] text-[color:var(--ah-ink-2)]">Followers</div>
            </button>
            <button data-testid="stat-following" onClick={() => toastFor('Following', p.following)} className="text-center ah-tap">
              <div className="text-[18px] font-extrabold text-[color:var(--ah-ink)]">{p.following ?? 0}</div>
              <div className="text-[13px] text-[color:var(--ah-ink-2)]">Following</div>
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div data-testid="profile-name" className="text-[16px] font-extrabold text-[color:var(--ah-ink)]">{p.name}</div>
          {p.languages?.length > 0 && (
            <div className="mt-1 flex items-center gap-1 text-[13px] text-[color:var(--ah-ink-2)]">
              <CheckCircle2 size={14} className="text-[color:var(--ah-coral)]" strokeWidth={2} />
              {p.languages.join(', ')}
            </div>
          )}
          {p.bio && <p className="mt-2 text-[14px] text-[color:var(--ah-ink)]">{p.bio}</p>}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button data-testid="profile-edit-btn" onClick={() => nav('/profile/edit')} className="h-10 rounded-xl border border-[color:var(--ah-line)] text-[14px] font-bold text-[color:var(--ah-ink)] ah-tap">Edit Profile</button>
          <button data-testid="profile-share-btn" onClick={() => window.navigator.share?.({ url: window.location.origin+'/profile' }).catch(() => {})} className="h-10 rounded-xl border border-[color:var(--ah-line)] text-[14px] font-bold text-[color:var(--ah-ink)] ah-tap">Share Profile</button>
        </div>
      </section>

      <div className="bg-white border-b border-[color:var(--ah-line)]">
        <div className="max-w-2xl mx-auto grid grid-cols-2">
          {['posts', 'photos'].map((t) => (
            <button key={t} data-testid={`profile-tab-${t}`} onClick={() => setTab(t)} className={`h-12 text-[15px] font-bold capitalize relative ah-tap ${tab === t ? 'text-[color:var(--ah-ink)]' : 'text-[color:var(--ah-ink-3)]'}`}>
              {t}
              {tab === t && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[color:var(--ah-ink)]" />}
            </button>
          ))}
        </div>
      </div>

      {tab === 'posts' && (
        <section data-testid="profile-posts" className="bg-white">
          {loading && <div className="p-4"><Skeleton className="h-40 w-full rounded-2xl" /></div>}
          {data?.posts?.map((post) => <PostCard key={post.id} post={post} />)}
        </section>
      )}

      {tab === 'photos' && (
        <section data-testid="profile-photos" className="p-1 grid grid-cols-3 gap-1 bg-white">
          {data?.photos?.map((src, i) => (
            <button key={i} className="aspect-square overflow-hidden ah-tap">
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </section>
      )}
    </AppShell>
  );
}

function toastFor() { /* noop for now */ }

function ProfileTopBar({ username }) {
  const nav = useNavigate();
  const { openCreateMenu } = useShell();
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[color:var(--ah-line)]">
      <div className="max-w-2xl mx-auto flex items-center gap-1 px-2 h-14">
        <button aria-label="Back" onClick={() => nav(-1)} className="w-11 h-11 grid place-items-center rounded-full ah-tap hover:bg-[color:var(--ah-line-2)]">
          <ChevronLeft size={22} className="text-[color:var(--ah-ink)]" strokeWidth={2} />
        </button>
        <h1 className="flex-1 text-[18px] font-bold text-[color:var(--ah-ink)]">{username || 'profile'}</h1>
        <button data-testid="profile-create-btn" aria-label="Create" onClick={openCreateMenu} className="w-10 h-10 grid place-items-center rounded-full ah-tap hover:bg-[color:var(--ah-line-2)]">
          <Plus size={20} className="text-[color:var(--ah-ink)]" />
        </button>
        <button data-testid="profile-bookmarks-btn" aria-label="Saved" onClick={() => nav('/settings')} className="w-10 h-10 grid place-items-center rounded-full ah-tap hover:bg-[color:var(--ah-line-2)]">
          <Bookmark size={18} className="text-[color:var(--ah-ink)]" strokeWidth={1.8} />
        </button>
        <button data-testid="profile-menu-btn" aria-label="Settings" onClick={() => nav('/settings')} className="w-10 h-10 grid place-items-center rounded-full ah-tap hover:bg-[color:var(--ah-line-2)]">
          <Menu size={20} className="text-[color:var(--ah-ink)]" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
