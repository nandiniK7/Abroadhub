import React, { useState } from 'react';
import AppShell, { useShell } from '../../components/layout/AppShell';
import HomeTopBar from '../../components/layout/HomeTopBar';
import StoryRing from '../../components/StoryRing';
import PostCard from '../../components/PostCard';
import { EmptyState, ErrorState, Skeleton } from '../../components/states/States';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { Users } from 'lucide-react';
import StoryViewer from './StoryViewer';

function HomeContent() {
  const { openCreatePost } = useShell();
  const stories = useAsync(() => api.getStories(), []);
  const feed = useAsync(() => api.getFeed(), []);
  const [viewing, setViewing] = useState(null);

  const onStoryClick = (s) => {
    if (s.isMe) { openCreatePost(); return; }
    setViewing(s);
  };

  return (
    <>
      {/* Stories row */}
      <section data-testid="stories-section" className="bg-white">
        <div className="flex gap-3 overflow-x-auto ah-scrollbar-hide px-4 py-3">
          {stories.loading && Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 w-[104px] bg-white rounded-2xl border border-[color:var(--ah-line)] px-3 pt-2.5 pb-2.5">
              <Skeleton className="w-14 h-14 rounded-full" />
              <Skeleton className="w-14 h-3" />
            </div>
          ))}
          {stories.data?.map((s) => (
            <div key={s.id} onClick={() => onStoryClick(s)} className="cursor-pointer">
              <StoryRing story={s} />
            </div>
          ))}
        </div>
      </section>

      {/* Feed */}
      <section data-testid="feed-section" className="bg-white">
        {feed.loading && Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="px-4 py-4 border-b border-[color:var(--ah-line)]">
            <div className="flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
            <Skeleton className="mt-3 h-4 w-3/4" />
            <Skeleton className="mt-2 h-52 w-full rounded-xl" />
          </div>
        ))}

        {feed.error && <ErrorState onRetry={feed.refetch} />}

        {!feed.loading && feed.data?.length === 0 && (
          <EmptyState icon={Users} title="Your feed is quiet" subtitle="Follow people or explore topics to fill it up." />
        )}

        {feed.data?.map((p) => <PostCard key={p.id} post={p} />)}
      </section>

      {viewing && <StoryViewer story={viewing} onClose={() => setViewing(null)} />}
    </>
  );
}

export default function HomePage() {
  return (
    <AppShell topBar={<HomeTopBarWrap />}>
      <HomeContent />
    </AppShell>
  );
}

function HomeTopBarWrap() {
  const { openCreatePost } = useShell();
  return <HomeTopBar unread={2} onCreate={openCreatePost} />;
}
