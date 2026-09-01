import React, { useState, useEffect } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { Search } from 'lucide-react';
import { api } from '../../services/api';

const TABS = ['Posts', 'Accounts', 'Provider'];

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('Posts');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      let r = [];
      if (tab === 'Posts') r = await api.searchPosts(q);
      else if (tab === 'Accounts') r = await api.searchAccounts(q);
      else r = await api.searchProviders(q);
      if (alive) { setResults(r); setLoading(false); }
    })();
    return () => { alive = false; };
  }, [tab, q]);

  return (
    <AppShell hideBottomNav topBar={<SearchTopBar q={q} setQ={setQ} />}>
      <div data-testid="search-tabs" className="sticky top-14 z-20 bg-white border-b border-[color:var(--ah-line)]">
        <div className="max-w-2xl mx-auto grid grid-cols-3">
          {TABS.map((t) => (
            <button key={t} data-testid={`search-tab-${t.toLowerCase()}`} onClick={() => setTab(t)} className={`h-11 text-[14px] font-semibold relative ${tab === t ? 'text-[color:var(--ah-ink)]' : 'text-[color:var(--ah-ink-3)]'}`}>
              {t}
              {tab === t && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[color:var(--ah-ink)]" />}
            </button>
          ))}
        </div>
      </div>

      <section data-testid="search-results" className="bg-white min-h-[50vh]">
        {!q && (
          <div className="text-center text-[14px] text-[color:var(--ah-ink-3)] mt-16">
            Search for {tab === 'Posts' ? 'posts' : tab === 'Accounts' ? 'accounts' : 'providers'}
          </div>
        )}
        {q && loading && <div className="text-center text-[13px] text-[color:var(--ah-ink-3)] mt-12">Searching…</div>}
        {q && !loading && results.length === 0 && (
          <div className="text-center text-[14px] text-[color:var(--ah-ink-3)] mt-16">No {tab.toLowerCase()} found</div>
        )}

        {tab === 'Posts' && results.map((p) => (
          <div key={p.id} className="px-4 py-3 border-b border-[color:var(--ah-line)]">
            <div className="flex items-center gap-2 mb-1"><img src={p.author.avatar} alt="" className="w-8 h-8 rounded-full" /><span className="text-[14px] font-bold">{p.author.name}</span></div>
            <p className="text-[14px] text-[color:var(--ah-ink)]">{p.text}</p>
          </div>
        ))}
        {tab === 'Accounts' && results.map((u) => (
          <div key={u.id} className="px-4 py-3 flex items-center gap-3 border-b border-[color:var(--ah-line)]">
            <img src={u.avatar} alt="" className="w-11 h-11 rounded-full" />
            <div className="flex-1"><div className="text-[14px] font-bold">{u.name}</div><div className="text-[12px] text-[color:var(--ah-ink-3)]">@{u.username}</div></div>
          </div>
        ))}
        {tab === 'Provider' && results.map((p) => <ProviderRow key={p.id} provider={p} />)}
      </section>
    </AppShell>
  );
}

function ProviderRow({ provider }) {
  const [following, setFollowing] = useState(provider.following);
  const toggle = async () => { setFollowing((v) => !v); await api.toggleFollowProvider(provider.id); };
  return (
    <div className="px-4 py-3 flex items-center gap-3 border-b border-[color:var(--ah-line)]">
      <img src={provider.avatar} alt="" className="w-11 h-11 rounded-full" />
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold text-[color:var(--ah-ink)] truncate">{provider.name}</div>
        <div className="text-[12px] text-[color:var(--ah-ink-3)] truncate">@{provider.username || '—'}</div>
      </div>
      <button data-testid={`follow-${provider.id}`} onClick={toggle} className={`h-9 px-4 rounded-full text-[13px] font-bold ah-tap ${following ? 'bg-white border border-[color:var(--ah-line)] text-[color:var(--ah-ink)]' : 'bg-[color:var(--ah-ink)] text-white'}`}>
        {following ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

function SearchTopBar({ q, setQ }) {
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-[color:var(--ah-line)]">
      <PageHeader testId="search-header" title="" right={null} />
      <div className="max-w-2xl mx-auto -mt-14 h-14 flex items-center pl-12 pr-4">
        <div className="flex items-center gap-2 flex-1 h-10 px-3 rounded-full bg-[color:var(--ah-line-2)]">
          <Search size={16} className="text-[color:var(--ah-ink-3)]" />
          <input data-testid="search-input" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search here" className="flex-1 bg-transparent outline-none text-[14px]" />
        </div>
      </div>
    </div>
  );
}
