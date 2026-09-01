import React, { useState, useMemo } from 'react';
import AppShell from '../../components/layout/AppShell';
import HomeTopBar from '../../components/layout/HomeTopBar';
import { Search, X } from 'lucide-react';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { EmptyState, ErrorState, Skeleton } from '../../components/states/States';

export default function ExplorePage() {
  const [q, setQ] = useState('');
  const { data, loading, error, refetch } = useAsync(() => api.getExplore(), []);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!q.trim()) return data;
    const s = q.toLowerCase();
    return data.filter((x) => x.title.toLowerCase().includes(s));
  }, [data, q]);

  return (
    <AppShell topBar={<HomeTopBar unread={2} />}>
      {/* Search bar */}
      <div className="px-4 py-3 bg-white border-b border-[color:var(--ah-line)]">
        <div className="flex items-center gap-2 h-12 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white">
          <Search size={18} className="text-[color:var(--ah-ink-3)]" />
          <input
            data-testid="explore-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search places, people, tags"
            className="flex-1 bg-transparent outline-none text-[14px] text-[color:var(--ah-ink)] placeholder:text-[color:var(--ah-ink-3)]"
          />
          {q && (
            <button
              data-testid="explore-clear"
              onClick={() => setQ('')}
              className="w-6 h-6 grid place-items-center rounded-full hover:bg-[color:var(--ah-line)]"
              aria-label="Clear"
            >
              <X size={14} className="text-[color:var(--ah-ink-2)]" />
            </button>
          )}
        </div>
      </div>

      <section data-testid="explore-grid" className="px-3 py-3 bg-white">
        {loading && (
          <div className="columns-2 sm:columns-3 gap-3 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="w-full rounded-xl" style={{ height: 120 + (i % 4) * 60 }} />
            ))}
          </div>
        )}
        {error && <ErrorState onRetry={refetch} />}
        {!loading && filtered.length === 0 && (
          <EmptyState title="No matches" subtitle="Try a different keyword." />
        )}
        {!loading && filtered.length > 0 && (
          <div className="columns-2 sm:columns-3 gap-3 [column-fill:_balance]">
            {filtered.map((item) => (
              <button
                key={item.id}
                data-testid={`explore-tile-${item.id}`}
                className="mb-3 block w-full rounded-xl overflow-hidden bg-white ah-tap relative group"
                style={{ height: item.h }}
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
