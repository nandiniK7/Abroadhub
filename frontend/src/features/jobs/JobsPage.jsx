import React, { useState, useMemo } from 'react';
import AppShell from '../../components/layout/AppShell';
import { Search, MapPin, Bookmark, Plus, Phone, MessageCircle, Send } from 'lucide-react';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { EmptyState, ErrorState, Skeleton } from '../../components/states/States';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function JobsPage() {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const { data, loading, error, refetch } = useAsync(() => api.getJobs(), []);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!q.trim()) return data;
    const s = q.toLowerCase();
    return data.filter((j) => j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s));
  }, [data, q]);

  const top = (
    <header className="bg-white sticky top-0 z-30 border-b border-[color:var(--ah-line)]">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
        <h1 className="text-[20px] font-extrabold text-[color:var(--ah-ink)]">Jobs</h1>
        <div className="flex items-center gap-1">
          <button data-testid="jobs-bookmarks" onClick={() => toast('Saved jobs coming soon')} aria-label="Saved" className="w-11 h-11 grid place-items-center rounded-full ah-tap hover:bg-[color:var(--ah-line-2)]">
            <Bookmark size={20} className="text-[color:var(--ah-ink)]" strokeWidth={1.8} />
          </button>
          <button data-testid="jobs-create-btn" onClick={() => nav('/jobs/new')} aria-label="Post job" className="w-11 h-11 grid place-items-center rounded-full ah-tap hover:bg-[color:var(--ah-line-2)]">
            <Plus size={22} className="text-[color:var(--ah-ink)]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );

  return (
    <AppShell topBar={top}>
      <div className="px-4 pt-3 pb-2 bg-white">
        <button
          data-testid="jobs-location"
          onClick={() => setLocation(window.prompt('Enter your location', location) || location)}
          className="w-full flex items-center gap-2 h-12 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white ah-tap text-left"
        >
          <MapPin size={16} className="text-[color:var(--ah-ink)]" />
          <span className={`flex-1 text-[14px] truncate ${location ? 'text-[color:var(--ah-ink)]' : 'text-[color:var(--ah-ink-3)]'}`}>
            {location || 'Tap to select location'}
          </span>
        </button>
        <div className="mt-3 flex items-center gap-2 h-12 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white">
          <input
            data-testid="jobs-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jobs..."
            className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[color:var(--ah-ink-3)]"
          />
          <Search size={18} className="text-[color:var(--ah-ink-2)]" />
        </div>
      </div>

      <section data-testid="jobs-list" className="bg-white px-4 py-3">
        <h2 className="text-[16px] font-bold text-[color:var(--ah-ink)] mb-2">Recently Posted</h2>
        <div className="space-y-3">
          {loading && Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
          {error && <ErrorState onRetry={refetch} />}
          {!loading && filtered.length === 0 && <EmptyState title="No jobs match" />}
          {filtered.map((j) => <JobCard key={j.id} job={j} />)}
        </div>
      </section>
    </AppShell>
  );
}

function JobCard({ job }) {
  const [saved, setSaved] = useState(job.saved);
  const share = async () => {
    const url = `${window.location.origin}/jobs/${job.id}`;
    try { if (navigator.share) await navigator.share({ title: job.title, url }); else { await navigator.clipboard.writeText(url); toast.success('Link copied'); } } catch {}
  };
  return (
    <article data-testid={`job-card-${job.id}`} className="border border-[color:var(--ah-line)] rounded-2xl p-3">
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-[16px] font-bold text-[color:var(--ah-ink)] leading-tight truncate">{job.title}</h3>
          <div className="text-[13px] text-[color:var(--ah-ink-2)] mt-0.5">{job.company}</div>
        </div>
        <button
          data-testid={`job-save-${job.id}`}
          onClick={async () => { setSaved((v) => !v); await api.toggleSaveJob(job.id); }}
          aria-label="Save"
          className="w-9 h-9 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-line-2)]"
        >
          <Bookmark size={18} className={saved ? 'fill-[color:var(--ah-ink)] text-[color:var(--ah-ink)]' : 'text-[color:var(--ah-ink-2)]'} />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
        <span className="px-2 py-0.5 rounded-md bg-[color:var(--ah-line-2)] text-[color:var(--ah-ink)] font-semibold">{job.type}</span>
        <span className="font-semibold text-[color:var(--ah-ink)]">{job.salary}</span>
        <span className="flex items-center gap-1 text-[color:var(--ah-ink-2)]"><MapPin size={12} /> {job.location}</span>
      </div>
      <p className="mt-2 text-[13px] text-[color:var(--ah-ink-2)]">{job.description}</p>
      <div className="mt-2 text-[12px] text-[color:var(--ah-ink-3)]">{job.postedAt}</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <a data-testid={`job-call-${job.id}`} href={`tel:${job.phone || ''}`} className="h-10 rounded-xl border border-[color:var(--ah-line)] flex items-center justify-center gap-1.5 text-[13px] font-semibold ah-tap">
          <Phone size={14} strokeWidth={2} /> Call Now
        </a>
        <button data-testid={`job-message-${job.id}`} onClick={() => toast(`Message ${job.company}`)} className="h-10 rounded-xl border border-[color:var(--ah-line)] flex items-center justify-center gap-1.5 text-[13px] font-semibold ah-tap">
          <MessageCircle size={14} strokeWidth={2} /> Message
        </button>
        <button data-testid={`job-share-${job.id}`} onClick={share} className="h-10 rounded-xl border border-[color:var(--ah-line)] flex items-center justify-center gap-1.5 text-[13px] font-semibold ah-tap">
          <Send size={14} strokeWidth={2} /> Share
        </button>
      </div>
    </article>
  );
}
