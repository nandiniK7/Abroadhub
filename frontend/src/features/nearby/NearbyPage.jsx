import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import { Search, MapPin, LayoutGrid, ChevronRight } from 'lucide-react';
import * as Lucide from 'lucide-react';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { Skeleton } from '../../components/states/States';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function NearbyPage() {
  const nav = useNavigate();
  const cats = useAsync(() => api.getNearbyCategories(), []);
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('1-5, 1-5, Telangana, India');

  const top = (
    <header className="bg-white sticky top-0 z-30 border-b border-[color:var(--ah-line)]">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
        <h1 className="text-[20px] font-extrabold text-[color:var(--ah-ink)]">Nearby</h1>
        <button onClick={() => toast('Grid view')} className="h-9 px-3 rounded-lg border border-[color:var(--ah-line)] flex items-center gap-1.5 text-[13px] font-semibold ah-tap">
          <LayoutGrid size={14} /> 1
        </button>
      </div>
    </header>
  );

  const openCat = (c) => {
    if (c.id === 'more') nav('/nearby/categories');
    else toast(c.name, { description: 'Showing providers…' });
  };

  return (
    <AppShell topBar={top}>
      <div className="bg-white px-4 pt-3 pb-2">
        <button
          data-testid="nearby-location"
          onClick={() => setLocation(window.prompt('Enter location', location) || location)}
          className="w-full flex items-center gap-2 h-12 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white ah-tap text-left"
        >
          <MapPin size={16} className="text-[color:var(--ah-ink)]" />
          <span className="flex-1 text-[14px] text-[color:var(--ah-ink)] truncate">{location}</span>
        </button>
        <div className="mt-3 flex items-center gap-2 h-12 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white">
          <input
            data-testid="nearby-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for all categories"
            className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[color:var(--ah-ink-3)]"
          />
          <Search size={18} className="text-[color:var(--ah-ink-2)]" />
        </div>
      </div>

      <section data-testid="nearby-categories" className="bg-white px-4 py-4">
        <div className="grid grid-cols-3 gap-x-3 gap-y-5">
          {cats.loading && Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2"><Skeleton className="w-full aspect-square rounded-2xl" /><Skeleton className="h-3 w-3/4 mx-auto" /></div>
          ))}
          {cats.data?.filter((c) => !q.trim() || c.name.toLowerCase().includes(q.toLowerCase())).map((c) => {
            const Icon = Lucide[c.icon] || Lucide.Circle;
            return (
              <button
                key={c.id}
                data-testid={`nearby-cat-${c.id}`}
                onClick={() => openCat(c)}
                className="flex flex-col items-center gap-2 ah-tap"
              >
                <div className="w-16 h-16 rounded-2xl grid place-items-center" style={{ backgroundColor: c.color }}>
                  <Icon size={26} className="text-[color:var(--ah-ink)]" strokeWidth={1.6} />
                </div>
                <span className="text-[12px] font-semibold text-[color:var(--ah-ink)] text-center leading-tight">{c.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[16px] font-bold text-[color:var(--ah-ink)]">Housing</h2>
          <button onClick={() => nav('/nearby/categories')} className="text-[12px] font-bold text-[color:var(--ah-coral)] tracking-wide">SEE ALL</button>
        </div>
        <button onClick={() => nav('/nearby/categories')} className="w-full flex items-center justify-between p-3 border border-[color:var(--ah-line)] rounded-xl ah-tap">
          <span className="text-[14px] text-[color:var(--ah-ink)] font-medium">Browse housing providers</span>
          <ChevronRight size={16} className="text-[color:var(--ah-ink-3)]" />
        </button>
      </section>
    </AppShell>
  );
}
