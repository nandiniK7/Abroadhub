import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { Heart, UserPlus, MessageCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { useRealtime } from '../../hooks/useRealtime';
import { RT } from '../../services/realtime';
import { EmptyState, Skeleton } from '../../components/states/States';
import { toast } from 'sonner';

const ICONS = { like: Heart, follow: UserPlus, comment: MessageCircle };
const ICON_BG = { like: 'bg-[color:var(--ah-coral-50)] text-[color:var(--ah-coral)]', follow: 'bg-[#DBEBFD] text-[#2A55B3]', comment: 'bg-[#D9F3EF] text-[#1F8A4C]' };

export default function NotificationsPage() {
  const { data, loading, refetch } = useAsync(() => api.getNotifications(), []);
  const [items, setItems] = useState(null);
  const list = items ?? data ?? [];

  useRealtime(RT.NOTIFICATION_NEW, (n) => setItems((cur) => [n, ...(cur ?? data ?? [])]));
  useRealtime(RT.NOTIFICATION_READ_ALL, () => setItems((cur) => (cur ?? data ?? []).map((n) => ({ ...n, read: true }))));

  const markAll = async () => {
    await api.markAllNotificationsRead();
    setItems(list.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked read');
  };

  const markOne = async (id) => {
    await api.markNotificationRead(id);
    setItems(list.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppShell topBar={<PageHeader testId="notifications-header" title="Notifications" right={
      <button data-testid="notif-mark-all" onClick={markAll} className="px-3 py-1.5 text-[13px] font-semibold text-[color:var(--ah-coral)] ah-tap">
        Mark all read
      </button>
    } />}>
      <section data-testid="notifications-list" className="bg-white">
        {loading && Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3.5 border-b border-[color:var(--ah-line)]">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2"><Skeleton className="h-3 w-1/4" /><Skeleton className="h-3 w-2/3" /></div>
          </div>
        ))}
        {!loading && list.length === 0 && (
          <EmptyState icon={Heart} title="Nothing new" subtitle="You're all caught up." />
        )}
        {list.map((n) => {
          const Icon = ICONS[n.kind] || Heart;
          return (
            <button
              key={n.id}
              data-testid={`notif-${n.id}`}
              onClick={() => markOne(n.id)}
              className={`w-full text-left flex items-start gap-3 px-4 py-3.5 border-b border-[color:var(--ah-line)] hover:bg-[color:var(--ah-line-2)] ${!n.read ? 'bg-[color:var(--ah-coral-50)]/40' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full grid place-items-center flex-shrink-0 ${ICON_BG[n.kind]}`}>
                <Icon size={18} className="fill-current" strokeWidth={0} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-[color:var(--ah-ink)]">{n.title}</div>
                <div className="text-[13px] text-[color:var(--ah-ink-2)] leading-tight">{n.description}</div>
              </div>
              <div className="text-[12px] text-[color:var(--ah-ink-3)] flex-shrink-0">{n.time}</div>
            </button>
          );
        })}
      </section>
    </AppShell>
  );
}
