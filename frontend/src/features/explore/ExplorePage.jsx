import React, { useState, useMemo } from 'react';
import AppShell from '../../components/layout/AppShell';
import HomeTopBar from '../../components/layout/HomeTopBar';
import { Search } from 'lucide-react';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { EmptyState, Skeleton } from '../../components/states/States';
import { useNavigate } from 'react-router-dom';

export default function ExplorePage() {
  const [q, setQ] = useState('');
  const { data, loading } = useAsync(() => api.getExplore(), []);
  const nav = useNavigate();

  const filtered = useMemo(() => (data || []).filter((x) => !q.trim() || x.title.toLowerCase().includes(q.toLowerCase())), [data, q]);

  return (
    <AppShell topBar={<HomeTopBar />}>
      <div className="px-4 py-3 bg-white">
        <button
          data-testid="explore-search-open"
          onClick={() => nav('/search')}
          className="w-full flex items-center gap-2 h-11 px-3 rounded-full bg-[color:var(--ah-line-2)] text-left"
        >
          <Search size={18} className="text-[color:var(--ah-ink-3)]" />
          <span className="flex-1 text-[14px] text-[color:var(--ah-ink-3)]">Search</span>
        </button>
      </div>

      <section data-testid="explore-grid" className="px-3 pb-4 bg-white">
        {loading && (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (<Skeleton key={i} className="w-full rounded-2xl" style={{ height: 120 + (i % 4) * 60 }} />))}
          </div>
        )}
        {!loading && filtered.length === 0 && <EmptyState title="No results" />}
        {!loading && filtered.length > 0 && (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
            {filtered.map((item) => (
              <button
                key={item.id} data-testid={`explore-tile-${item.id}`}
                className="mb-3 block w-full rounded-2xl overflow-hidden bg-white ah-tap"
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
