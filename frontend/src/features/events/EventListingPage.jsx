import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { CalendarDays, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function EventListingPage() {
  const nav = useNavigate();
  const [f, setF] = useState({
    name: '', type: 'Party & NightLife', description: '', mode: 'Offline', audience: 'All',
    paid: false, startDate: '', endDate: '', phone: '', venue: '', instructions: '',
    website: '', bookingLink: '', languages: [], photos: [],
  });
  const set = (k, v) => setF((c) => ({ ...c, [k]: v }));

  const submit = () => {
    if (!f.name || !f.description || !f.startDate || !f.phone) { toast.error('Please fill in required fields'); return; }
    toast.success('Event posted');
    nav('/');
  };

  return (
    <AppShell hideBottomNav topBar={<PageHeader testId="event-header" title="Event Listing" />}>
      <div className="bg-white px-4 py-4 space-y-4">
        <Field label="Event Name *" counter={`${f.name.length}/50`}>
          <input data-testid="ev-name" maxLength={50} value={f.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Startup Networking Night" className={fieldInput} />
        </Field>
        <Field label="Event Type *">
          <select data-testid="ev-type" value={f.type} onChange={(e) => set('type', e.target.value)} className={fieldInput}>
            <option>Party & NightLife</option><option>Music & Concert</option><option>Networking</option><option>Cultural</option><option>Sports</option>
          </select>
        </Field>
        <Field label="Description *" counter={`${f.description.length}/1500`}>
          <textarea data-testid="ev-desc" maxLength={1500} rows={3} value={f.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe the event..." className={fieldInput + ' resize-none'} />
        </Field>
        <Field label="Event Mode *">
          <select data-testid="ev-mode" value={f.mode} onChange={(e) => set('mode', e.target.value)} className={fieldInput}>
            <option>Offline</option><option>Online</option><option>Hybrid</option>
          </select>
        </Field>
        <Field label="Audience Type *">
          <select data-testid="ev-audience" value={f.audience} onChange={(e) => set('audience', e.target.value)} className={fieldInput}>
            <option>All</option><option>18+</option><option>Students</option><option>Family friendly</option>
          </select>
        </Field>

        <div className="flex items-center justify-between py-1">
          <span className="text-[14px] font-semibold text-[color:var(--ah-ink)]">It&apos;s Paid</span>
          <button data-testid="ev-paid" onClick={() => set('paid', !f.paid)} className={`w-11 h-6 rounded-full ${f.paid ? 'bg-[color:var(--ah-ink)]' : 'bg-[color:var(--ah-line)]'}`}>
            <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${f.paid ? 'translate-x-5' : 'translate-x-0.5'}`} style={{ marginTop: 2 }} />
          </button>
        </div>

        <Field label="Start Date & Time *">
          <div className="relative"><input data-testid="ev-start" type="datetime-local" value={f.startDate} onChange={(e) => set('startDate', e.target.value)} className={fieldInput} /><CalendarDays size={16} className="absolute right-3 top-3 text-[color:var(--ah-ink-3)] pointer-events-none" /></div>
        </Field>
        <Field label="End Date & Time">
          <div className="relative"><input data-testid="ev-end" type="datetime-local" value={f.endDate} onChange={(e) => set('endDate', e.target.value)} className={fieldInput} /><CalendarDays size={16} className="absolute right-3 top-3 text-[color:var(--ah-ink-3)] pointer-events-none" /></div>
        </Field>
        <Field label="Phone Number *"><input data-testid="ev-phone" value={f.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+1234567890" className={fieldInput} /></Field>
        <Field label="Search Venue Location *"><input data-testid="ev-venue" value={f.venue} onChange={(e) => set('venue', e.target.value)} placeholder="Search by name, college, landmark…" className={fieldInput} /></Field>
        <Field label="Instructions"><textarea data-testid="ev-instructions" rows={2} value={f.instructions} onChange={(e) => set('instructions', e.target.value)} placeholder="Street, building, floor, etc." className={fieldInput + ' resize-none'} /></Field>
        <Field label="Website URL"><input data-testid="ev-website" value={f.website} onChange={(e) => set('website', e.target.value)} placeholder="https://..." className={fieldInput} /></Field>
        <Field label="Booking Link"><input data-testid="ev-booking" value={f.bookingLink} onChange={(e) => set('bookingLink', e.target.value)} placeholder="https://..." className={fieldInput} /></Field>
        <Field label="Languages hosted in (max 3)">
          <button data-testid="ev-languages" onClick={() => { const v = window.prompt('Languages', f.languages.join(', ')); if (v != null) set('languages', v.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 3)); }} className={fieldInput + ' text-left'}>
            {f.languages.length ? f.languages.join(', ') : 'Select languages'}
          </button>
        </Field>
        <Field label="Photos *">
          <button data-testid="ev-photos" onClick={() => { const url = window.prompt('Photo URL'); if (url) set('photos', [...f.photos, url]); }} className="w-24 h-24 rounded-xl bg-[color:var(--ah-line-2)] border border-dashed border-[color:var(--ah-line)] grid place-items-center">
            <Camera size={22} className="text-[color:var(--ah-ink-3)]" />
          </button>
          {f.photos.length > 0 && <div className="mt-2 flex gap-2 flex-wrap">{f.photos.map((p, i) => <img key={i} src={p} alt="" className="w-16 h-16 rounded-lg object-cover" />)}</div>}
        </Field>

        <button data-testid="ev-submit" onClick={submit} className="w-full h-12 rounded-full bg-[color:var(--ah-ink)] text-white text-[15px] font-bold ah-tap">
          Post Event
        </button>
      </div>
    </AppShell>
  );
}

const fieldInput = 'w-full h-11 px-3 rounded-xl border border-[color:var(--ah-line)] outline-none text-[14px] bg-white focus:border-[color:var(--ah-coral)]';

function Field({ label, counter, children }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-bold text-[color:var(--ah-ink)]">{label}</span>
        {counter && <span className="text-[11px] text-[color:var(--ah-ink-3)]">{counter}</span>}
      </div>
      {children}
    </label>
  );
}
