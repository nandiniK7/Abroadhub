import React from 'react';
import AppShell from '../../components/layout/AppShell';
import * as LucideIcons from 'lucide-react';
import ServiceTile from '../../components/ServiceTile';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { EmptyState, ErrorState, Skeleton } from '../../components/states/States';

const Icon = ({ name, ...rest }) => {
  const C = LucideIcons[name] || LucideIcons.Circle;
  return <C {...rest} />;
};

export default function NearbyPage() {
  const cats = useAsync(() => api.getNearbyCategories(), []);
  const services = useAsync(() => api.getPopularServices(), []);

  return (
    <AppShell topbarVariant="title" topbarTitle="Nearby">
      {/* Location bar */}
      <div className="bg-white border-b border-[color:var(--ah-line)] px-4 py-3">
        <button
          data-testid="nearby-location"
          className="flex items-center gap-2 text-sm text-[color:var(--ah-ink-2)] ah-tap"
        >
          <LucideIcons.MapPin size={16} className="text-[color:var(--ah-coral)]" />
          <span>Lisbon, Portugal</span>
          <span className="text-[color:var(--ah-ink-3)]">· change</span>
        </button>
      </div>

      {/* Categories */}
      <section data-testid="nearby-categories" className="px-4 py-4">
        <h2 className="text-[15px] font-bold text-[color:var(--ah-ink)] mb-3">Categories</h2>
        {cats.loading && (
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}
          </div>
        )}
        {cats.error && <ErrorState onRetry={cats.refetch} />}
        {cats.data && (
          <div className="grid grid-cols-4 gap-3">
            {cats.data.map((c) => (
              <button
                key={c.id}
                data-testid={`nearby-cat-${c.id}`}
                className="aspect-square rounded-2xl bg-white border border-[color:var(--ah-line)] ah-shadow-card flex flex-col items-center justify-center gap-1.5 ah-tap hover:border-[color:var(--ah-coral)]"
              >
                <div className="w-9 h-9 rounded-xl bg-[color:var(--ah-coral-50)] grid place-items-center">
                  <Icon name={c.icon} size={18} className="text-[color:var(--ah-coral)]" />
                </div>
                <span className="text-[11px] font-semibold text-[color:var(--ah-ink)] text-center px-1 leading-tight">
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Popular services */}
      <section data-testid="nearby-popular" className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-bold text-[color:var(--ah-ink)]">Popular services</h2>
          <button className="text-[13px] font-semibold text-[color:var(--ah-coral)] ah-tap">See all</button>
        </div>

        {services.loading && (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        )}
        {services.error && <ErrorState onRetry={services.refetch} />}
        {!services.loading && services.data?.length === 0 && (
          <EmptyState title="Nothing nearby yet" subtitle="Check back once services are listed in your area." />
        )}
        {services.data && (
          <div className="grid grid-cols-2 gap-3">
            {services.data.map((s) => <ServiceTile key={s.id} service={s} />)}
          </div>
        )}
      </section>
    </AppShell>
  );
}
