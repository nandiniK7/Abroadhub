import React from 'react';
import AppSheet from './AppSheet';
import { MapPin, Building2, Phone, MessageCircle, Send, Briefcase, Coins } from 'lucide-react';
import { toast } from 'sonner';

export default function JobDetailSheet({ job, open, onOpenChange }) {
  if (!job) return null;
  const phone = job.phone || '+15551234567';

  return (
    <AppSheet open={open} onOpenChange={onOpenChange} testId="job-detail-sheet">
      <div>
        <img
          src={job.cover}
          alt={job.title}
          className="w-full h-40 rounded-2xl object-cover bg-[color:var(--ah-line-2)]"
        />
        <h2 className="mt-4 text-[22px] font-extrabold text-[color:var(--ah-ink)] leading-tight">
          {job.title}
        </h2>
        <div className="mt-1 text-[14px] text-[color:var(--ah-ink-2)] flex items-center gap-1">
          <Building2 size={14} /> {job.company}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-[12px] text-center">
          <Info icon={Briefcase} label={job.type} />
          <Info icon={Coins} label={job.salary} />
          <Info icon={MapPin} label={job.location} />
        </div>

        <h3 className="mt-5 text-[15px] font-bold text-[color:var(--ah-ink)]">About the role</h3>
        <p className="mt-1.5 text-[14px] text-[color:var(--ah-ink-2)] leading-[1.5]">
          {job.description} We are a growing team hiring for {job.title.toLowerCase()} in {job.location}.
          You will collaborate with a supportive crew, ship meaningful work, and have room to grow.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <a
            data-testid="job-detail-call"
            href={`tel:${phone}`}
            className="h-11 rounded-xl bg-[color:var(--ah-ink)] text-white flex items-center justify-center gap-2 text-[14px] font-bold ah-tap"
          >
            <Phone size={16} /> Call
          </a>
          <button
            data-testid="job-detail-message"
            onClick={() => toast(`Message ${job.company}`, { description: 'Chat coming soon.' })}
            className="h-11 rounded-xl border border-[color:var(--ah-line)] flex items-center justify-center gap-2 text-[14px] font-bold ah-tap"
          >
            <MessageCircle size={16} /> Message
          </button>
          <button
            data-testid="job-detail-share"
            onClick={async () => {
              const url = `${window.location.origin}/jobs/${job.id}`;
              try {
                if (navigator.share) await navigator.share({ title: job.title, url });
                else { await navigator.clipboard.writeText(url); toast.success('Link copied'); }
              } catch { /* noop */ }
            }}
            className="h-11 rounded-xl border border-[color:var(--ah-line)] flex items-center justify-center gap-2 text-[14px] font-bold ah-tap"
          >
            <Send size={16} /> Share
          </button>
        </div>

        <button
          data-testid="job-detail-apply"
          onClick={() => toast.success('Application sent!', { description: `${job.company} will get back to you.` })}
          className="mt-3 w-full h-12 rounded-full bg-[color:var(--ah-coral)] text-white text-[15px] font-bold ah-tap"
        >
          Apply now
        </button>
      </div>
    </AppSheet>
  );
}

const Info = ({ icon: Icon, label }) => (
  <div className="rounded-xl bg-[color:var(--ah-line-2)] py-2.5 px-2 flex flex-col items-center gap-1">
    <Icon size={14} className="text-[color:var(--ah-ink-2)]" />
    <span className="font-semibold text-[color:var(--ah-ink)] leading-tight">{label}</span>
  </div>
);
