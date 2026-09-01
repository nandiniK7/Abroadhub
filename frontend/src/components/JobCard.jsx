import React, { useState } from 'react';
import { Bookmark, MapPin, Building2, Briefcase } from 'lucide-react';
import { api } from '../services/api';

export default function JobCard({ job }) {
  const [saved, setSaved] = useState(job.saved);

  const onSave = async (e) => {
    e.stopPropagation();
    setSaved((v) => !v);
    try { await api.toggleSaveJob(job.id); } catch { /* noop */ }
  };

  return (
    <article
      data-testid={`job-card-${job.id}`}
      className="bg-white rounded-2xl ah-shadow-card border border-[color:var(--ah-line)] p-4 flex gap-3 ah-tap"
    >
      <img
        src={job.logo}
        alt={job.company}
        className="w-12 h-12 rounded-xl object-cover bg-[color:var(--ah-bg)] flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-[15px] font-bold text-[color:var(--ah-ink)] truncate">
              {job.title}
            </h3>
            <div className="text-[13px] text-[color:var(--ah-ink-2)] flex items-center gap-1">
              <Building2 size={12} /> {job.company}
            </div>
          </div>
          <button
            data-testid={`job-save-${job.id}`}
            onClick={onSave}
            className="w-9 h-9 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-bg)]"
            aria-label="Save job"
          >
            <Bookmark
              size={18}
              className={saved ? 'fill-[color:var(--ah-coral)] text-[color:var(--ah-coral)]' : 'text-[color:var(--ah-ink-2)]'}
            />
          </button>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[color:var(--ah-ink-3)]">
          <span className="flex items-center gap-1"><MapPin size={11} /> {job.city}</span>
          <span className="flex items-center gap-1"><Briefcase size={11} /> {job.type} · {job.remote}</span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-[color:var(--ah-ink)]">{job.salary}</span>
          <span className="text-[11px] text-[color:var(--ah-ink-3)]">{job.postedAt}</span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {job.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded-full bg-[color:var(--ah-coral-50)] text-[color:var(--ah-coral-600)] font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
