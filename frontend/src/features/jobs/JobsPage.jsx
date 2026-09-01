import React, { useState, useMemo } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageTitleBar from '../../components/layout/PageTitleBar';
import {
  Search, MapPin, Navigation, Plus, LayoutGrid, ChevronDown, SlidersHorizontal, Check,
} from 'lucide-react';
import JobCard from '../../components/JobCard';
import JobDetailSheet from '../../components/JobDetailSheet';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { EmptyState, ErrorState, Skeleton } from '../../components/states/States';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from '../../components/ui/dropdown-menu';
import { toast } from 'sonner';

const DEFAULT_ADDRESS = '1536 Stellar Dr, Kenai, Alaska 99611, USA';

const JOB_TYPES = ['All', 'Full Time', 'Part Time', 'Contract'];
const SORTS = ['Newest', 'Highest paid', 'Nearest'];
const DISTANCES = ['5 km', '10 km', '25 km', '50 km', '100 km'];

export default function JobsPage() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [distance, setDistance] = useState('25 km');
  const [selected, setSelected] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { data, loading, error, refetch } = useAsync(() => api.getJobs(), []);

  const filtered = useMemo(() => {
    if (!data) return [];
    let list = data;
    if (type !== 'All') list = list.filter((j) => j.type === type);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((j) => j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s));
    }
    if (sort === 'Highest paid') {
      list = [...list].sort((a, b) => parseSalary(b.salary) - parseSalary(a.salary));
    }
    return list;
  }, [data, q, type, sort]);

  const openJob = (j) => { setSelected(j); setDetailOpen(true); };

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
                onClick={() => toast('Post a job coming soon', { description: 'Recruiter tools land next.' })}
                className="w-11 h-11 rounded-full bg-[color:var(--ah-coral)] grid place-items-center ah-tap shadow-sm"
              >
                <Plus size={20} className="text-white" strokeWidth={2.4} />
              </button>
              <button
                data-testid="jobs-view-toggle"
                onClick={() => toast(`${filtered.length} jobs match`)}
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
      <div className="px-4 pt-1 pb-2 bg-white">
        {/* Location */}
        <div className="flex items-center gap-2 h-12 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white">
          <MapPin size={16} className="text-[color:var(--ah-ink)]" />
          <span className="flex-1 text-[14px] text-[color:var(--ah-ink)] truncate">{DEFAULT_ADDRESS}</span>
          <button
            data-testid="jobs-locate"
            aria-label="Use my location"
            onClick={() => toast('Getting your location…')}
            className="w-8 h-8 grid place-items-center ah-tap"
          >
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
          <FilterDropdown
            testId="jobs-pill-filterby"
            icon={SlidersHorizontal}
            label={sort}
            value={sort}
            options={SORTS}
            onSelect={setSort}
          />
          <FilterDropdown
            testId="jobs-pill-jobtype"
            label={type === 'All' ? 'Job Type' : type}
            value={type}
            options={JOB_TYPES}
            onSelect={setType}
          />
          <FilterDropdown
            testId="jobs-pill-fulltime"
            label={type === 'All' ? 'Full Time' : type}
            value={type}
            options={JOB_TYPES}
            onSelect={setType}
          />
          <FilterDropdown
            testId="jobs-pill-distance"
            label={distance}
            value={distance}
            options={DISTANCES}
            onSelect={setDistance}
          />
        </div>
      </div>

      <section data-testid="jobs-list" className="px-4 pt-4 pb-4 space-y-3 bg-white">
        {loading && Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[color:var(--ah-line)] p-3 flex gap-3">
            <Skeleton className="w-[110px] h-[128px] rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
        {error && <ErrorState onRetry={refetch} />}
        {!loading && filtered.length === 0 && (
          <EmptyState title="No jobs match" subtitle="Try clearing filters or search terms." />
        )}
        {filtered.map((j) => <JobCard key={j.id} job={j} onOpen={openJob} />)}
      </section>

      <JobDetailSheet job={selected} open={detailOpen} onOpenChange={setDetailOpen} />
    </AppShell>
  );
}

function FilterDropdown({ testId, icon: Icon, label, value, options, onSelect }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          data-testid={testId}
          className="h-9 flex-shrink-0 rounded-lg border border-[color:var(--ah-line)] bg-white flex items-center gap-2 px-3 text-[13px] font-semibold text-[color:var(--ah-ink)] ah-tap"
        >
          {Icon && <Icon size={14} strokeWidth={2} />}
          {label}
          <ChevronDown size={14} className="text-[color:var(--ah-ink-2)]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt}
            data-testid={`${testId}-opt-${opt}`}
            onClick={() => onSelect(opt)}
            className="flex items-center justify-between"
          >
            <span>{opt}</span>
            {value === opt && <Check size={14} className="text-[color:var(--ah-coral)]" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function parseSalary(s) {
  if (!s) return 0;
  const m = s.replace(/[,$K]/g, (c) => (c === 'K' ? '000' : '')).match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}
