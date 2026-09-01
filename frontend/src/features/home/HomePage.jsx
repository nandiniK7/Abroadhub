import React from 'react';
import AppShell from '../../components/layout/AppShell';
import StoryRing from '../../components/StoryRing';
import PostCard from '../../components/PostCard';
import { EmptyState, ErrorState, Skeleton } from '../../components/states/States';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { Users } from 'lucide-react';

export default function HomePage() {
  const stories = useAsync(() => api.getStories(), []);
  const feed = useAsync(() => api.getFeed(), []);

  return (
    <AppShell>
      {/* Stories row */}
      <section
        data-testid="stories-section"
        className="bg-white border-b border-[color:var(--ah-line)]"
      >
        <div className="flex gap-4 overflow-x-auto ah-scrollbar-hide px-4 py-3">
          {stories.loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="w-12 h-3" />
            </div>
          ))}
          {stories.data?.map((s) => <StoryRing key={s.id} story={s} />)}
        </div>
      </section>

      {/* Feed */}
      <section data-testid="feed-section" className="px-4 py-4 space-y-4">
        {feed.loading && Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[color:var(--ah-line)] p-4">
            <div className="flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
            <Skeleton className="mt-3 h-4 w-3/4" />
            <Skeleton className="mt-2 h-60 w-full rounded-xl" />
          </div>
        ))}

        {feed.error && <ErrorState onRetry={feed.refetch} />}

        {!feed.loading && feed.data?.length === 0 && (
          <EmptyState
            icon={Users}
            title="Your feed is quiet"
            subtitle="Follow people or explore topics to fill it up."
          />
        )}

        {feed.data?.map((p) => <PostCard key={p.id} post={p} />)}
      </section>
    </AppShell>
  );
}
