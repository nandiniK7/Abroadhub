import React from 'react';
import { Phone, MessageCircle, Send, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const typeStyles = {
  'Full Time': 'bg-[color:var(--ah-tag-green)] text-[color:var(--ah-tag-green-fg)]',
  'Part Time': 'bg-[color:var(--ah-tag-amber)] text-[color:var(--ah-tag-amber-fg)]',
  'Contract': 'bg-[color:var(--ah-tag-purple)] text-[color:var(--ah-tag-purple-fg)]',
  'Internship': 'bg-[color:var(--ah-tag-blue)] text-[color:var(--ah-tag-blue-fg)]',
};

export default function JobCard({ job, onOpen }) {
  const tagClass = typeStyles[job.type] || 'bg-[color:var(--ah-line-2)] text-[color:var(--ah-ink-2)]';
  const phone = job.phone || '+15551234567';

  const share = async (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/jobs/${job.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: job.title, text: `${job.title} at ${job.company}`, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard');
      }
    } catch { /* user cancelled */ }
  };

  return (
    <article
      data-testid={`job-card-${job.id}`}
      onClick={() => onOpen?.(job)}
      className="bg-white rounded-2xl border border-[color:var(--ah-line)] overflow-hidden cursor-pointer hover:border-[color:var(--ah-coral)]/50 transition-colors"
    >
      <div className="flex gap-3 p-3">
        <img
          src={job.cover}
          alt={job.title}
          className="w-[110px] h-[128px] rounded-xl object-cover bg-[color:var(--ah-line-2)] flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-[16px] font-bold text-[color:var(--ah-ink)] leading-tight">{job.title}</h3>
          <div className="text-[13px] text-[color:var(--ah-ink-2)] mt-0.5">{job.company}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-[color:var(--ah-ink-2)]">
            <span className={`px-2 py-0.5 rounded-md font-semibold ${tagClass}`}>{job.type}</span>
            <span className="font-semibold text-[color:var(--ah-ink)]">{job.salary}</span>
            <span className="flex items-center gap-1 text-[color:var(--ah-ink-2)]">
              <MapPin size={12} /> {job.location}
            </span>
          </div>
          <p className="mt-2 text-[13px] text-[color:var(--ah-ink-2)] leading-[1.35] line-clamp-2">
            {job.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-3 pb-3" onClick={(e) => e.stopPropagation()}>
        <a
          data-testid={`job-call-${job.id}`}
          href={`tel:${phone}`}
          className="h-10 rounded-xl border border-[color:var(--ah-line)] bg-white flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[color:var(--ah-ink)] ah-tap hover:bg-[color:var(--ah-line-2)]"
        >
          <Phone size={15} strokeWidth={2} /> Call Now
        </a>
        <button
          data-testid={`job-message-${job.id}`}
          onClick={() => toast('Opening chat…', { description: `Message ${job.company}` })}
          className="h-10 rounded-xl border border-[color:var(--ah-line)] bg-white flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[color:var(--ah-ink)] ah-tap hover:bg-[color:var(--ah-line-2)]"
        >
          <MessageCircle size={15} strokeWidth={2} /> Message
        </button>
        <button
          data-testid={`job-share-${job.id}`}
          onClick={share}
          className="h-10 rounded-xl border border-[color:var(--ah-line)] bg-white flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[color:var(--ah-ink)] ah-tap hover:bg-[color:var(--ah-line-2)]"
        >
          <Send size={15} strokeWidth={2} /> Share
        </button>
      </div>
    </article>
  );
}
