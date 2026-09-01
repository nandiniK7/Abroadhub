import React from 'react';
import { Heart } from 'lucide-react';

// Popular service card — photo with a heart+likes chip overlaid.
export default function ServiceCard({ service }) {
  return (
    <article
      data-testid={`service-${service.id}`}
      className="relative rounded-2xl overflow-hidden ah-tap"
    >
      <img
        src={service.img}
        alt={service.name}
        className="w-full h-[200px] object-cover bg-[color:var(--ah-line-2)]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/95 backdrop-blur">
        <Heart size={14} className="fill-[color:var(--ah-coral)] text-[color:var(--ah-coral)]" strokeWidth={0} />
        <span className="text-[12px] font-bold text-[color:var(--ah-ink)]">{service.likes}</span>
      </div>
      {service.name && (
        <div className="absolute left-3 bottom-3 right-3 text-white text-[13px] font-bold drop-shadow">
          {service.name}
        </div>
      )}
    </article>
  );
}
