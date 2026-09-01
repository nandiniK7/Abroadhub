import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import { toast } from 'sonner';
import { useAuth } from '../../store/AuthContext';
import { Image as ImageIcon, Hash, MapPin, X } from 'lucide-react';
import { api } from '../../services/api';

export default function CreatePostSheet({ open, onOpenChange }) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['nearby']);
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const addTag = (raw) => {
    const t = raw.replace(/^@/, '').trim().toLowerCase();
    if (t && !tags.includes(t)) setTags((cur) => [...cur, t]);
    setTagInput('');
  };

  const submit = async () => {
    if (!text.trim() && !imageUrl.trim()) {
      toast.error('Write something or add a photo.');
      return;
    }
    setSubmitting(true);
    try {
      const post = {
        id: `p_local_${Date.now()}`,
        author: {
          id: user?.id || 'me',
          name: user?.name || 'You',
          handle: user?.handle || '@you',
          avatar: user?.avatar,
          verified: true,
        },
        tags,
        text: text.trim(),
        images: imageUrl.trim() ? [imageUrl.trim()] : [],
        createdAt: 'now',
        likes: 0, comments: 0, shares: 0, liked: false,
      };
      await api.createPost?.(post);
      toast.success('Posted to your feed');
      setText(''); setImageUrl(''); setTags(['nearby']);
      onOpenChange(false);
    } catch (e) {
      toast.error(e?.message || 'Could not post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="p-0 rounded-t-[28px] max-h-[90vh] overflow-y-auto lg:max-w-lg lg:mx-auto lg:rounded-2xl lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:inset-x-0">
        <SheetHeader className="px-5 pt-5 pb-2 space-y-0">
          <SheetTitle className="text-[18px] font-extrabold text-[color:var(--ah-ink)] text-left">
            New post
          </SheetTitle>
        </SheetHeader>

        <div className="px-5 pt-3 pb-5">
          <div className="flex items-start gap-3">
            <img src={user?.avatar} alt="" className="w-10 h-10 rounded-full object-cover bg-[color:var(--ah-line-2)]" />
            <div className="flex-1">
              <div className="text-[14px] font-bold text-[color:var(--ah-ink)]">{user?.name}</div>
              <div className="text-[12px] text-[color:var(--ah-ink-3)]">{user?.handle}</div>
            </div>
          </div>

          <textarea
            data-testid="create-post-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="What's happening abroad?"
            className="mt-3 w-full bg-transparent outline-none text-[15px] text-[color:var(--ah-ink)] placeholder:text-[color:var(--ah-ink-3)] resize-none"
          />

          {imageUrl && (
            <div className="relative mt-2 rounded-xl overflow-hidden">
              <img src={imageUrl} alt="" className="w-full max-h-64 object-cover" />
              <button
                onClick={() => setImageUrl('')}
                aria-label="Remove image"
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 text-white grid place-items-center"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Tag chips */}
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-[color:var(--ah-coral-50)] text-[color:var(--ah-coral-600)] text-[12px] font-semibold flex items-center gap-1"
              >
                @{t}
                <button
                  onClick={() => setTags((cur) => cur.filter((x) => x !== t))}
                  className="w-4 h-4 grid place-items-center hover:bg-white/40 rounded-full"
                  aria-label={`Remove ${t}`}
                >
                  <X size={10} />
                </button>
              </span>
            ))}
            <input
              data-testid="create-post-tag-input"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ',' || e.key === ' ') && tagInput) {
                  e.preventDefault();
                  addTag(tagInput);
                }
              }}
              placeholder="Add tag"
              className="text-[12px] bg-transparent outline-none px-1 py-0.5 min-w-[80px]"
            />
          </div>

          {/* Toolbar */}
          <div className="mt-4 flex items-center gap-2">
            <ToolBtn
              testId="create-post-image-btn"
              icon={ImageIcon}
              label="Photo"
              onClick={() => {
                const url = window.prompt('Paste an image URL', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&h=500&q=80');
                if (url) setImageUrl(url);
              }}
            />
            <ToolBtn testId="create-post-tag-btn" icon={Hash} label="Tag" onClick={() => {
              const t = window.prompt('Add tag (without @)', 'community');
              if (t) addTag(t);
            }} />
            <ToolBtn testId="create-post-location-btn" icon={MapPin} label="Location" onClick={() => toast.info('Location coming soon')} />
          </div>

          <button
            data-testid="create-post-submit"
            disabled={submitting}
            onClick={submit}
            className="mt-5 w-full h-12 rounded-full bg-[color:var(--ah-coral)] hover:bg-[color:var(--ah-coral-600)] text-white text-[15px] font-bold ah-tap disabled:opacity-70"
          >
            {submitting ? 'Posting…' : 'Post'}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const ToolBtn = ({ icon: Icon, label, onClick, testId }) => (
  <button
    data-testid={testId}
    onClick={onClick}
    className="h-9 px-3 rounded-full bg-[color:var(--ah-line-2)] text-[13px] font-semibold text-[color:var(--ah-ink)] flex items-center gap-1.5 ah-tap hover:bg-[color:var(--ah-line)]"
  >
    <Icon size={14} strokeWidth={2} />
    {label}
  </button>
);
