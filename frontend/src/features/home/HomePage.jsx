import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import HomeTopBar from '../../components/layout/HomeTopBar';
import StoryRing from '../../components/StoryRing';
import PostCard from '../../components/PostCard';
import { EmptyState, ErrorState, Skeleton } from '../../components/states/States';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { Users } from 'lucide-react';
import { useShell } from '../../components/layout/AppShell';

export default function HomePage() {
  const stories = useAsync(() => api.getStories(), []);
  const feed = useAsync(() => api.getFeed(), []);

  return (
    <AppShell topBar={<HomeTopBar unread={2} notifCount={2} />}>
      <HomeInner stories={stories} feed={feed} />
    </AppShell>
  );
}

function HomeInner({ stories, feed }) {
  const { openCreateMenu } = useShell();
  const [feedData, setFeedData] = useState(null);
  const items = feedData ?? feed.data;

  const onDelete = (id) => setFeedData((cur) => (cur ?? feed.data).filter((p) => p.id !== id));

  return (
    <>
      <section data-testid="stories-section" className="bg-white">
        <div className="flex gap-3 overflow-x-auto ah-scrollbar-hide px-4 py-4">
          {stories.loading && (
            <div className="w-[112px]">
              <Skeleton className="w-full h-[150px] rounded-2xl" />
            </div>
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
        {!feed.loading && items?.length === 0 && (
          <EmptyState icon={Users} title="Your feed is quiet" subtitle="Follow people or explore topics to fill it up." />
        )}
        {items?.map((p) => <PostCard key={p.id} post={p} onDelete={onDelete} />)}
      </section>
    </>
  );
}
