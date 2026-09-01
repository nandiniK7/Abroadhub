import React from 'react';
import { Star, MapPin } from 'lucide-react';

export default function ServiceTile({ service }) {
  return (
    <article
      data-testid={`service-${service.id}`}
      className="bg-white rounded-2xl ah-shadow-card border border-[color:var(--ah-line)] overflow-hidden ah-tap"
    >
      <div className="relative">
        <img src={service.img} alt={service.name} className="w-full h-32 object-cover" />
        <span className="absolute top-2 left-2 bg-white/95 text-[11px] font-semibold px-2 py-0.5 rounded-full text-[color:var(--ah-ink)]">
          {service.category}
        </span>
      </div>
      <div className="p-3">
        <h4 className="text-[14px] font-bold text-[color:var(--ah-ink)] truncate">{service.name}</h4>
        <div className="mt-1 flex items-center justify-between text-[12px]">
          <span className="flex items-center gap-1 text-[color:var(--ah-ink-2)]">
            <Star size={12} className="fill-[color:var(--ah-warning)] text-[color:var(--ah-warning)]" />
            <span className="font-semibold text-[color:var(--ah-ink)]">{service.rating}</span>
            <span className="text-[color:var(--ah-ink-3)]">({service.reviews})</span>
          </span>
          <span className="flex items-center gap-1 text-[color:var(--ah-ink-3)]">
            <MapPin size={11} /> {service.distance}
          </span>
        </div>
      </div>
    </article>
  );
}
