import React, { useState, useEffect } from 'react';
import AppShell from '../../components/layout/AppShell';
import HomeTopBar from '../../components/layout/HomeTopBar';
import StoryRing from '../../components/StoryRing';
import PostCard from '../../components/PostCard';
import { EmptyState, ErrorState, Skeleton } from '../../components/states/States';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { useRealtime } from '../../hooks/useRealtime';
import { RT } from '../../services/realtime';
import { Users } from 'lucide-react';
import { useShell } from '../../components/layout/AppShell';

export default function HomePage() {
  const stories = useAsync(() => api.getStories(), []);
  const feed = useAsync(() => api.getFeed(), []);
  const [unread, setUnread] = useState(0);
  useRealtime(RT.NOTIFICATION_NEW, () => setUnread((n) => n + 1));

  return (
    <AppShell topBar={<HomeTopBar unread={0} notifCount={unread} />}>
      <HomeInner stories={stories} feed={feed} />
    </AppShell>
  );
}

function HomeInner({ stories, feed }) {
  const { openCreateMenu } = useShell();
  const [items, setItems] = useState(null);

  // Seed local state once feed loads, then react to realtime.
  useEffect(() => { if (feed.data && !items) setItems(feed.data); }, [feed.data, items]);
  useRealtime(RT.POST_CREATED, (post) => setItems((cur) => [post, ...(cur ?? [])]));
  useRealtime(RT.POST_DELETED, ({ id }) => setItems((cur) => (cur ?? []).filter((p) => p.id !== id)));
  useRealtime(RT.POST_LIKED, ({ id, liked, likes }) =>
    setItems((cur) => (cur ?? []).map((p) => p.id === id ? { ...p, liked, likes } : p))
  );

  const onDelete = (id) => setItems((cur) => (cur ?? []).filter((p) => p.id !== id));
  const list = items ?? feed.data;

  return (
    <>
      <section data-testid="stories-section" className="bg-white">
        <div className="flex gap-3 overflow-x-auto ah-scrollbar-hide px-4 py-4">
          {stories.loading && (
            <div className="w-[128px]"><Skeleton className="w-full h-[150px] rounded-2xl" /></div>
          )}
          {stories.data?.map((s) => (
            <StoryRing key={s.id} story={s} onOpen={openCreateMenu} />
          ))}
        </div>
      </section>

      <section data-testid="feed-section" className="bg-white">
        {feed.loading && Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="px-4 py-4 border-b border-[color:var(--ah-line)]">
            <div className="flex gap-3"><Skeleton className="w-11 h-11 rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-3 w-1/3" /><Skeleton className="h-3 w-1/4" /></div></div>
            <Skeleton className="mt-3 h-4 w-3/4" />
            <Skeleton className="mt-2 h-52 w-full rounded-2xl" />
          </div>
        ))}
        {feed.error && <ErrorState onRetry={feed.refetch} />}
        {!feed.loading && list?.length === 0 && (
          <EmptyState icon={Users} title="Your feed is quiet" subtitle="Follow people or explore topics to fill it up." />
        )}
        {list?.map((p) => <PostCard key={p.id} post={p} onDelete={onDelete} />)}
      </section>
    </>
  );
}
