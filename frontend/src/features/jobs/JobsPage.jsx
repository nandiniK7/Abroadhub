import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import JobCard from '../../components/JobCard';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { EmptyState, ErrorState, Skeleton } from '../../components/states/States';

export default function JobsPage() {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const filters = useAsync(() => api.getJobFilters(), []);
  const jobs = useAsync(() => api.getJobs({ filter, q }), [filter, q]);

  return (
    <AppShell topbarVariant="title" topbarTitle="Jobs">
      {/* Location bar */}
      <div className="bg-white border-b border-[color:var(--ah-line)] px-4 py-3">
        <button
          data-testid="jobs-location"
          className="flex items-center gap-2 text-sm text-[color:var(--ah-ink-2)] ah-tap"
        >
          <MapPin size={16} className="text-[color:var(--ah-coral)]" />
          <span>Lisbon, Portugal</span>
          <span className="text-[color:var(--ah-ink-3)]">· change</span>
        </button>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 h-11 px-3 rounded-full bg-[color:var(--ah-bg)] border border-[color:var(--ah-line)] focus-within:border-[color:var(--ah-coral)] transition">
            <Search size={18} className="text-[color:var(--ah-ink-3)]" />
            <input
              data-testid="jobs-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search jobs, companies"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
          <button
            data-testid="jobs-filter-btn"
            className="w-11 h-11 rounded-full bg-white border border-[color:var(--ah-line)] grid place-items-center ah-tap"
            aria-label="Filters"
          >
            <SlidersHorizontal size={18} className="text-[color:var(--ah-ink-2)]" />
          </button>
        </div>

        {/* Filter chips */}
        <div className="mt-3 flex gap-2 overflow-x-auto ah-scrollbar-hide -mx-4 px-4">
          {(filters.data || []).map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                data-testid={`jobs-chip-${f}`}
                onClick={() => setFilter(f)}
                className={`px-3.5 h-8 flex-shrink-0 rounded-full text-[13px] font-semibold border ah-tap ${
                  active
                    ? 'bg-[color:var(--ah-coral)] border-[color:var(--ah-coral)] text-white'
                    : 'bg-white border-[color:var(--ah-line)] text-[color:var(--ah-ink-2)] hover:border-[color:var(--ah-coral)]'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <section data-testid="jobs-list" className="px-4 py-4 space-y-3">
        {jobs.loading && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[color:var(--ah-line)] p-4 flex gap-3">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
        {jobs.error && <ErrorState onRetry={jobs.refetch} />}
        {!jobs.loading && jobs.data?.length === 0 && (
          <EmptyState title="No jobs match" subtitle="Try clearing filters or search terms." />
        )}
        {jobs.data?.map((j) => <JobCard key={j.id} job={j} />)}
      </section>
    </AppShell>
  );
}
