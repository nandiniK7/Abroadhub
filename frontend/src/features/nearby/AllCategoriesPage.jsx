import React, { useState, useMemo } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { Search, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { toast } from 'sonner';

export default function AllCategoriesPage() {
  const [q, setQ] = useState('');
  const business = useAsync(() => api.getBusinessCategories(), []);
  const providers = useAsync(() => api.getServiceProviders(), []);

  const filter = (arr) => (arr || []).filter((n) => !q.trim() || n.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell hideBottomNav topBar={<PageHeader testId="all-categories-header" title="All Categories" />}>
      <div className="bg-white px-4 pt-3 pb-2">
        <div className="flex items-center gap-2 h-12 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white">
          <input
            data-testid="allcat-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services or Providers"
            className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[color:var(--ah-ink-3)]"
          />
          <Search size={18} className="text-[color:var(--ah-ink-2)]" />
        </div>
      </div>

      <section className="bg-white pt-2 pb-3">
        <div className="px-4 py-2 text-[14px] font-extrabold text-[color:var(--ah-ink)]">Business</div>
        {filter(business.data).map((name) => <Row key={name} name={name} />)}

        <div className="px-4 py-2 mt-2 text-[14px] font-extrabold text-[color:var(--ah-ink)]">Service Providers</div>
        {filter(providers.data).map((name) => <Row key={name} name={name} />)}
      </section>
    </AppShell>
  );
}

function Row({ name }) {
  return (
    <button
      data-testid={`allcat-row-${name.replace(/\W+/g, '-').toLowerCase()}`}
      onClick={() => toast(name, { description: 'Showing providers…' })}
      className="w-full flex items-center justify-between px-4 h-12 border-b border-[color:var(--ah-line)] hover:bg-[color:var(--ah-line-2)] text-left"
    >
      <span className="text-[14px] text-[color:var(--ah-ink)]">{name}</span>
      <ChevronRight size={16} className="text-[color:var(--ah-ink-3)]" />
    </button>
  );
}
