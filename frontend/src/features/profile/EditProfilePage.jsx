import React, { useState, useEffect } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { Lock } from 'lucide-react';
import { api } from '../../services/api';
import { toast } from 'sonner';
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function EditProfilePage() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ name: '', username: '', email: '', phone: '', bio: '', website: '', country: '', gender: '', occupation: '', languages: '', avatar: '' });

  useEffect(() => { (async () => {
    const me = await api.me();
    setF({
      name: me.name || '', username: me.username || '', email: me.email || '',
      phone: me.phone || '', bio: me.bio || '', website: me.website || '',
      country: me.country || '', gender: me.gender || '', occupation: me.occupation || '',
      languages: (me.languages || []).join(', '), avatar: me.avatar || '',
    });
  })(); }, [user]);

  const save = async () => {
    await api.updateProfile({
      name: f.name, username: f.username, phone: f.phone, bio: f.bio, website: f.website,
      gender: f.gender, occupation: f.occupation,
      languages: f.languages.split(',').map((s) => s.trim()).filter(Boolean),
      avatar: f.avatar,
    });
    toast.success('Profile updated');
    nav(-1);
  };

  const set = (k, v) => setF((c) => ({ ...c, [k]: v }));

  return (
    <AppShell hideBottomNav topBar={<PageHeader testId="edit-profile-header" title="Edit Profile" right={
      <button data-testid="edit-profile-save" onClick={save} className="px-3 py-1.5 text-[14px] font-bold text-[color:var(--ah-coral)] ah-tap">Save</button>
    } />}>
      <div className="bg-white px-4 py-5">
        <div className="flex flex-col items-center gap-2">
          <img src={f.avatar} alt="" className="w-24 h-24 rounded-full object-cover bg-[color:var(--ah-line-2)]" />
          <button data-testid="edit-profile-photo" onClick={() => set('avatar', window.prompt('Avatar URL', f.avatar) || f.avatar)} className="text-[13px] font-bold text-[color:var(--ah-coral)] ah-tap">Edit profile picture</button>
        </div>
        <div className="mt-5 divide-y divide-[color:var(--ah-line)]">
          <Row label="Name"><Input testId="ep-name" value={f.name} onChange={(v) => set('name', v)} /></Row>
          <Row label="Username"><Input testId="ep-username" value={f.username} onChange={(v) => set('username', v)} /></Row>
          <Row label="Email" locked><Input value={f.email} disabled /></Row>
          <Row label="Phone"><Input testId="ep-phone" value={f.phone} onChange={(v) => set('phone', v)} /></Row>
          <Row label="Bio"><Input testId="ep-bio" value={f.bio} onChange={(v) => set('bio', v)} placeholder="Add bio" /></Row>
          <Row label="Website"><Input testId="ep-website" value={f.website} onChange={(v) => set('website', v)} placeholder="Add website" /></Row>
          <Row label="Country" locked><Input value={f.country} disabled /></Row>
          <Row label="Gender">
            <select data-testid="ep-gender" value={f.gender} onChange={(e) => set('gender', e.target.value)} className="w-full py-2 outline-none text-[14px] text-right bg-transparent">
              <option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option>
            </select>
          </Row>
          <Row label="Occupation"><Input testId="ep-occupation" value={f.occupation} onChange={(v) => set('occupation', v)} placeholder="Add Occupation" /></Row>
          <Row label="Languages"><Input testId="ep-languages" value={f.languages} onChange={(v) => set('languages', v)} placeholder="English, Hindi, …" /></Row>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, locked, children }) {
  return (
    <div className="flex items-center py-3 gap-3">
      <div className="w-[100px] text-[13px] text-[color:var(--ah-ink-2)] flex items-center gap-1">{label}{locked && <Lock size={12} />}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
function Input({ value, onChange, disabled, placeholder, testId }) {
  return (
    <input
      data-testid={testId}
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full py-2 outline-none text-[14px] text-right bg-transparent placeholder:text-[color:var(--ah-ink-3)] disabled:text-[color:var(--ah-ink-3)]"
    />
  );
}
