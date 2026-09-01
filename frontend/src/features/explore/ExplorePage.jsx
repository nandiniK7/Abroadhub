import React, { useState, useMemo } from 'react';
import AppShell from '../../components/layout/AppShell';
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
    <AppShell>
      {/* Search bar */}
      <div className="px-4 py-3 bg-white border-b border-[color:var(--ah-line)] sticky top-14 z-20">
        <div className="flex items-center gap-2 h-11 px-3 rounded-full bg-[color:var(--ah-bg)] border border-[color:var(--ah-line)] focus-within:border-[color:var(--ah-coral)] transition">
          <Search size={18} className="text-[color:var(--ah-ink-3)]" />
          <input
            data-testid="explore-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search places, people, tags"
            className="flex-1 bg-transparent outline-none text-sm text-[color:var(--ah-ink)] placeholder:text-[color:var(--ah-ink-3)]"
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

      {/* Masonry via CSS columns */}
      <section data-testid="explore-grid" className="px-3 py-3">
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
                className="mb-3 block w-full rounded-xl overflow-hidden bg-white ah-shadow-card ah-tap relative group"
                style={{ height: item.h }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute left-2 bottom-2 right-2 text-left">
                  <div className="text-[12px] font-semibold text-white drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
