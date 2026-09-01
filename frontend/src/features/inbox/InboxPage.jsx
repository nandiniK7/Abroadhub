import React from 'react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { PenSquare } from 'lucide-react';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { EmptyState, Skeleton } from '../../components/states/States';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function InboxPage() {
  const { data, loading } = useAsync(() => api.getConversations(), []);
  const nav = useNavigate();

  return (
    <AppShell topBar={<PageHeader testId="inbox-header" title="Inbox" right={
      <button data-testid="inbox-compose" aria-label="Compose" onClick={() => toast('Compose coming soon')} className="w-11 h-11 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-line-2)]">
        <PenSquare size={20} className="text-[color:var(--ah-ink)]" strokeWidth={1.8} />
      </button>
    } />}>
      <section data-testid="conversations-list" className="bg-white">
        {loading && Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--ah-line)]">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2"><Skeleton className="h-3 w-1/3" /><Skeleton className="h-3 w-1/2" /></div>
          </div>
        ))}
        {!loading && data?.length === 0 && <EmptyState title="No messages yet" />}
        {data?.map((c) => (
          <button
            key={c.id}
            data-testid={`conv-${c.id}`}
            onClick={() => nav(`/inbox/${c.id}`)}
            className="w-full text-left flex items-center gap-3 px-4 py-3.5 border-b border-[color:var(--ah-line)] hover:bg-[color:var(--ah-line-2)]"
          >
            <img src={c.avatar} alt="" className="w-12 h-12 rounded-full object-cover bg-[color:var(--ah-line-2)]" />
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-bold text-[color:var(--ah-ink)] truncate">{c.name}</div>
              <div className="text-[13px] text-[color:var(--ah-ink-3)] truncate">{c.last}</div>
            </div>
            <div className="text-[12px] text-[color:var(--ah-ink-3)] flex-shrink-0">{c.time}</div>
          </button>
        ))}
      </section>
    </AppShell>
  );
}
