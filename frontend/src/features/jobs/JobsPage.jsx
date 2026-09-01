import React, { useState, useMemo } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageTitleBar from '../../components/layout/PageTitleBar';
import { Search, MapPin, Navigation, Plus, LayoutGrid, ChevronDown, SlidersHorizontal } from 'lucide-react';
import JobCard from '../../components/JobCard';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { EmptyState, ErrorState, Skeleton } from '../../components/states/States';

const DEFAULT_ADDRESS = '1536 Stellar Dr, Kenai, Alaska 99611, USA';

export default function JobsPage() {
  const [q, setQ] = useState('');
  const { data, loading, error, refetch } = useAsync(() => api.getJobs(), []);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!q.trim()) return data;
    const s = q.toLowerCase();
    return data.filter(
      (j) => j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s)
    );
  }, [data, q]);

  return (
    <AppShell
      topBar={
        <PageTitleBar
          testId="jobs-title-bar"
          title="Jobs"
          right={
            <>
              <button
                data-testid="jobs-create-btn"
                aria-label="Create job"
                className="w-11 h-11 rounded-full bg-[color:var(--ah-coral)] grid place-items-center ah-tap shadow-sm"
              >
                <Plus size={20} className="text-white" strokeWidth={2.4} />
              </button>
              <button
                data-testid="jobs-view-toggle"
                className="h-11 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white flex items-center gap-2 text-[13px] font-semibold text-[color:var(--ah-ink)] ah-tap"
              >
                <LayoutGrid size={16} />
                <span>25</span>
              </button>
            </>
          }
        />
      }
    >
      {/* Location */}
      <div className="px-4 pt-1 pb-2 bg-white">
        <div className="flex items-center gap-2 h-12 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white">
          <MapPin size={16} className="text-[color:var(--ah-ink)]" />
          <span className="flex-1 text-[14px] text-[color:var(--ah-ink)] truncate">{DEFAULT_ADDRESS}</span>
          <button data-testid="jobs-locate" aria-label="Use my location" className="w-8 h-8 grid place-items-center ah-tap">
            <Navigation size={16} className="text-[color:var(--ah-ink)]" />
          </button>
        </div>

        {/* Search */}
        <div className="mt-3 flex items-center gap-2 h-12 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white">
          <input
            data-testid="jobs-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for Jobs"
            className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[color:var(--ah-ink-3)]"
          />
          <Search size={18} className="text-[color:var(--ah-ink-2)]" />
        </div>

        {/* Filter pills */}
        <div className="mt-3 flex gap-2 overflow-x-auto ah-scrollbar-hide -mx-4 px-4">
          <FilterPill testId="jobs-pill-filterby" icon={SlidersHorizontal} label="Filter By" />
          <FilterPill testId="jobs-pill-jobtype" label="Job Type" />
          <FilterPill testId="jobs-pill-fulltime" label="Full Time" />
          <FilterPill testId="jobs-pill-distance" label="Distance" />
        </div>
      </div>

      {/* Results */}
      <section data-testid="jobs-list" className="px-4 pt-4 pb-4 space-y-3 bg-white">
        {loading && Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[color:var(--ah-line)] p-3 flex gap-3">
            <Skeleton className="w-[110px] h-[128px] rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-3/4" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 flex-1 rounded-xl" />
                <Skeleton className="h-9 flex-1 rounded-xl" />
                <Skeleton className="h-9 flex-1 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
        {error && <ErrorState onRetry={refetch} />}
        {!loading && filtered.length === 0 && (
          <EmptyState title="No jobs match" subtitle="Try clearing filters or search terms." />
        )}
        {filtered.map((j) => <JobCard key={j.id} job={j} />)}
      </section>
    </AppShell>
  );
}

const FilterPill = ({ label, icon: Icon, testId }) => (
  <button
    data-testid={testId}
    className="h-9 flex-shrink-0 rounded-lg border border-[color:var(--ah-line)] bg-white flex items-center gap-2 px-3 text-[13px] font-semibold text-[color:var(--ah-ink)] ah-tap"
  >
    {Icon && <Icon size={14} strokeWidth={2} />}
    {label}
    <ChevronDown size={14} className="text-[color:var(--ah-ink-2)]" />
  </button>
);
