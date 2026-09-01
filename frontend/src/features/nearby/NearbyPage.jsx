import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageTitleBar from '../../components/layout/PageTitleBar';
import { Search, MapPin, Navigation, Bell, LayoutGrid } from 'lucide-react';
import ServiceCard from '../../components/ServiceTile';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { EmptyState, ErrorState, Skeleton } from '../../components/states/States';

const DEFAULT_ADDRESS = '1536 Stellar Dr, Kenai, Alaska 99611, USA';

export default function NearbyPage() {
  const [q, setQ] = useState('');
  const cats = useAsync(() => api.getNearbyCategories(), []);
  const services = useAsync(() => api.getPopularServices(), []);

  const visibleCats = (cats.data || []).slice(0, 11);
  const showMoreTile = true;

  return (
    <AppShell
      topBar={
        <PageTitleBar
          testId="nearby-title-bar"
          title="Nearby"
          right={
            <>
              <button
                data-testid="nearby-view-toggle"
                className="h-11 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white flex items-center gap-2 text-[13px] font-semibold text-[color:var(--ah-ink)] ah-tap"
              >
                <LayoutGrid size={16} />
                <span>25</span>
              </button>
              <div className="relative">
                <button
                  data-testid="nearby-notifications-btn"
                  aria-label="Notifications"
                  className="w-11 h-11 rounded-full grid place-items-center ah-tap"
                >
                  <Bell size={20} className="text-[color:var(--ah-ink)]" />
                </button>
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[color:var(--ah-live)] text-white text-[10px] font-bold grid place-items-center">
                  2
                </span>
              </div>
            </>
          }
        />
      }
    >
      {/* Location + search */}
      <div className="px-4 pt-1 pb-2 bg-white">
        <div className="flex items-center gap-2 h-12 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white">
          <MapPin size={16} className="text-[color:var(--ah-ink)]" />
          <span className="flex-1 text-[14px] text-[color:var(--ah-ink)] truncate">{DEFAULT_ADDRESS}</span>
          <button data-testid="nearby-locate" aria-label="Use my location" className="w-8 h-8 grid place-items-center ah-tap">
            <Navigation size={16} className="text-[color:var(--ah-ink)]" />
          </button>
        </div>

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

      {/* Category grid */}
      <section data-testid="nearby-categories" className="px-4 py-4 bg-white">
        {cats.loading && (
          <div className="grid grid-cols-4 gap-x-3 gap-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-full aspect-square rounded-2xl" />
                <Skeleton className="h-3 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        )}
        {cats.error && <ErrorState onRetry={cats.refetch} />}
        {cats.data && (
          <div className="grid grid-cols-4 gap-x-3 gap-y-4">
            {visibleCats
              .filter((c) => !q.trim() || c.name.toLowerCase().includes(q.toLowerCase()))
              .map((c) => (
                <button
                  key={c.id}
                  data-testid={`nearby-cat-${c.id}`}
                  className="flex flex-col items-center gap-1.5 ah-tap"
                >
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full aspect-square rounded-2xl object-cover bg-[color:var(--ah-line-2)]"
                    loading="lazy"
                  />
                  <span className="text-[12px] font-semibold text-[color:var(--ah-ink)] text-center leading-tight">
                    {c.name}
                  </span>
                </button>
              ))}
            {showMoreTile && (
              <button
                data-testid="nearby-cat-more"
                className="flex flex-col items-center gap-1.5 ah-tap"
              >
                <div className="w-full aspect-square rounded-2xl bg-[color:var(--ah-line)] grid place-items-center">
                  <span className="text-[22px] font-extrabold text-white">100+</span>
                </div>
                <span className="text-[12px] font-semibold text-[color:var(--ah-ink)] text-center leading-tight">
                  100+<br />Categories
                </span>
              </button>
            )}
          </div>
        )}
      </section>

      {/* Popular services */}
      <section data-testid="nearby-popular" className="px-4 pb-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[20px] font-extrabold text-[color:var(--ah-ink)]">Most Popular Services</h2>
          <button data-testid="popular-see-all" className="text-[12px] font-bold text-[color:var(--ah-live)] tracking-wide">
            SEE ALL
          </button>
        </div>
        {services.loading && (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[200px] rounded-2xl" />
            ))}
          </div>
        )}
        {services.error && <ErrorState onRetry={services.refetch} />}
        {!services.loading && services.data?.length === 0 && (
          <EmptyState title="Nothing nearby yet" subtitle="Check back once services are listed in your area." />
        )}
        {services.data && (
          <div className="grid grid-cols-2 gap-3">
            {services.data.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        )}
      </section>
    </AppShell>
  );
}
