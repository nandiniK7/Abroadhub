import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageTitleBar from '../../components/layout/PageTitleBar';
import { MoreVertical, Phone, Globe, Star } from 'lucide-react';
import PostCard from '../../components/PostCard';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { Skeleton } from '../../components/states/States';
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { data, loading } = useAsync(() => api.getProfile(), []);
  const [tab, setTab] = useState('posts');
  const { logout, user: authed } = useAuth();
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = async () => { await logout(); nav('/login', { replace: true }); };
  const p = data?.user || authed || {};

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
                  className="absolute right-0 top-11 bg-white rounded-xl border border-[color:var(--ah-line)] ah-shadow-card overflow-hidden min-w-[140px] z-20"
                >
                  <button
                    data-testid="profile-menu-logout"
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2.5 text-[14px] font-semibold text-[color:var(--ah-ink)] hover:bg-[color:var(--ah-line-2)]"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          }
        />
      }
    >
      {/* Header */}
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
                <button className="font-semibold text-[color:var(--ah-ink)] underline underline-offset-2">
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

        {/* Followers / Following */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatButton testId="stat-following" value={p.following || 0} label="Following" />
          <StatButton testId="stat-followers" value={p.followers || 0} label="Followers" />
        </div>

        {/* Actions */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <ActionButton testId="profile-call-btn" icon={Phone} label="Call Now" />
          <ActionButton testId="profile-website-btn" icon={Globe} label="Website" />
        </div>
      </section>

      {/* Tabs */}
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
            <button key={i} className="aspect-square overflow-hidden ah-tap">
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </section>
      )}
    </AppShell>
  );
}

const StatButton = ({ value, label, testId }) => (
  <button
    data-testid={testId}
    className="h-11 rounded-xl bg-[color:var(--ah-line-2)] flex items-center justify-center gap-2 ah-tap"
  >
    <span className="text-[15px] font-extrabold text-[color:var(--ah-ink)]">{value}</span>
    <span className="text-[14px] text-[color:var(--ah-ink-2)] font-medium">{label}</span>
  </button>
);

const ActionButton = ({ icon: Icon, label, testId }) => (
  <button
    data-testid={testId}
    className="h-12 rounded-xl border border-[color:var(--ah-line)] bg-white flex items-center justify-center gap-2 ah-tap"
  >
    <Icon size={18} strokeWidth={2} className="text-[color:var(--ah-ink)]" />
    <span className="text-[15px] font-bold text-[color:var(--ah-ink)]">{label}</span>
  </button>
);
