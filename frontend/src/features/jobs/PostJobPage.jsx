import React, { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { Camera } from 'lucide-react';
import { api } from '../../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function PostJobPage() {
  const nav = useNavigate();
  const [f, setF] = useState({
    logo: '', title: '', company: '', mobile: '', country: '+1',
    location: '', salary: '', minExp: '', maxExp: '',
    jobType: 'Full Time', workType: 'Hybrid', section: 'Technical',
    countryName: 'United States', url: '', description: '', languages: [],
  });
  const set = (k, v) => setF((cur) => ({ ...cur, [k]: v }));

  const submit = async () => {
    if (!f.title || !f.company || !f.description) { toast.error('Please fill in title, company, description'); return; }
    await api.createJob({
      title: f.title, company: f.company, cover: f.logo || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&h=500&q=80',
      type: f.jobType, salary: f.salary || '—', location: f.location || 'Remote',
      description: f.description, postedAt: 'just now', phone: `${f.country}${f.mobile}`,
    });
    toast.success('Job posted');
    nav('/jobs');
  };

  return (
    <AppShell hideBottomNav topBar={<PageHeader testId="post-job-header" title="Post a Job" right={
      <button data-testid="post-job-submit" onClick={submit} className="px-3 py-1.5 text-[14px] font-bold text-[color:var(--ah-coral)] ah-tap">Post</button>
    } />}>
      <div className="bg-white px-4 py-5 space-y-4">
        <div className="flex flex-col items-center gap-1">
          <button
            data-testid="post-job-logo"
            onClick={() => set('logo', window.prompt('Company logo URL', f.logo) || f.logo)}
            className="w-24 h-24 rounded-full bg-[color:var(--ah-line-2)] grid place-items-center border border-dashed border-[color:var(--ah-line)] overflow-hidden"
          >
            {f.logo ? <img src={f.logo} alt="" className="w-full h-full object-cover" /> : <Camera size={22} className="text-[color:var(--ah-ink-3)]" />}
          </button>
          <span className="text-[12px] text-[color:var(--ah-ink-3)]">Company Logo (Optional)</span>
        </div>

        <Field label="Job Title"><Input data-testid="pj-title" value={f.title} onChange={(e) => set('title', e.target.value)} /></Field>
        <Field label="Company Name"><Input data-testid="pj-company" value={f.company} onChange={(e) => set('company', e.target.value)} /></Field>
        <Field label="Mobile Number">
          <div className="flex gap-2">
            <select data-testid="pj-country" value={f.country} onChange={(e) => set('country', e.target.value)} className="h-11 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white outline-none text-[14px] w-[80px]">
              <option>+1</option><option>+44</option><option>+91</option><option>+61</option>
            </select>
            <Input data-testid="pj-mobile" value={f.mobile} onChange={(e) => set('mobile', e.target.value)} />
          </div>
        </Field>
        <Field label="Job Location"><Input data-testid="pj-location" value={f.location} onChange={(e) => set('location', e.target.value)} /></Field>
        <Field label="Salary"><Input data-testid="pj-salary" value={f.salary} onChange={(e) => set('salary', e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Min Experience"><Input data-testid="pj-min" value={f.minExp} onChange={(e) => set('minExp', e.target.value)} placeholder="0" /></Field>
          <Field label="Max Experience"><Input data-testid="pj-max" value={f.maxExp} onChange={(e) => set('maxExp', e.target.value)} placeholder="10" /></Field>
        </div>
        <Field label="Job Type *">
          <Select data-testid="pj-jobtype" value={f.jobType} onChange={(e) => set('jobType', e.target.value)}>
            <option>Full Time</option><option>Part Time</option><option>Contract</option><option>Internship</option>
          </Select>
        </Field>
        <Field label="Work Type *">
          <Select data-testid="pj-worktype" value={f.workType} onChange={(e) => set('workType', e.target.value)}>
            <option>On-site</option><option>Hybrid</option><option>Remote</option>
          </Select>
        </Field>
        <Field label="Section *">
          <Select data-testid="pj-section" value={f.section} onChange={(e) => set('section', e.target.value)}>
            <option>Technical</option><option>Non-Technical</option><option>Design</option><option>Sales</option>
          </Select>
        </Field>
        <Field label="Country *">
          <Select data-testid="pj-countryname" value={f.countryName} onChange={(e) => set('countryName', e.target.value)}>
            <option>United States</option><option>United Kingdom</option><option>India</option><option>Australia</option>
          </Select>
        </Field>
        <Field label="URL"><Input data-testid="pj-url" value={f.url} onChange={(e) => set('url', e.target.value)} placeholder="https://…" /></Field>
        <Field label="Job Description *"><textarea data-testid="pj-desc" value={f.description} onChange={(e) => set('description', e.target.value)} rows={4} className="w-full px-3 py-2 rounded-xl border border-[color:var(--ah-line)] outline-none text-[14px] resize-none" /></Field>
        <Field label="Languages">
          <button data-testid="pj-languages" onClick={() => { const v = window.prompt('Comma-separated languages', f.languages.join(', ')); if (v != null) set('languages', v.split(',').map((s) => s.trim()).filter(Boolean)); }} className="w-full h-11 px-3 rounded-xl border border-[color:var(--ah-line)] bg-white text-left text-[14px] text-[color:var(--ah-ink-2)]">
            {f.languages.length ? f.languages.join(', ') : 'Select languages'}
          </button>
        </Field>

        <button data-testid="post-job-submit-btn" onClick={submit} className="mt-2 w-full h-12 rounded-full bg-[color:var(--ah-ink)] text-white text-[15px] font-bold ah-tap">
          Post Job
        </button>
      </div>
    </AppShell>
  );
}

const Field = ({ label, children }) => (
  <label className="block">
    <div className="text-[13px] font-bold text-[color:var(--ah-ink)] mb-1.5">{label}</div>
    {children}
  </label>
);
const Input = (props) => <input {...props} className="w-full h-11 px-3 rounded-xl border border-[color:var(--ah-line)] outline-none text-[14px] focus:border-[color:var(--ah-coral)]" />;
const Select = (props) => <select {...props} className="w-full h-11 px-3 rounded-xl border border-[color:var(--ah-line)] outline-none text-[14px] bg-white focus:border-[color:var(--ah-coral)]" />;
