import React, { useState } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, BadgeCheck, Bookmark, Flag, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../services/api';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from './ui/dropdown-menu';
import AppSheet from './AppSheet';

export default function PostCard({ post, showAuthor = true }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const onLike = async () => {
    setLiked((v) => !v);
    setLikes((n) => n + (liked ? -1 : 1));
    try { await api.toggleLike(post.id); } catch { /* optimistic */ }
  };

  const onShare = async () => {
    const url = `${window.location.origin}/post/${post.id}`;
    const shareData = { title: `${post.author.name} on AbroadHub`, text: post.text?.slice(0, 100) || '', url };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard');
      }
    } catch { /* user cancelled — no-op */ }
  };

  const onCopyLink = async () => {
    const url = `${window.location.origin}/post/${post.id}`;
    try { await navigator.clipboard.writeText(url); toast.success('Link copied'); }
    catch { toast.error('Could not copy link'); }
  };

  const onSave = () => {
    setSaved((v) => { toast(v ? 'Removed from saved' : 'Saved'); return !v; });
  };

  return (
    <article
      data-testid={`post-card-${post.id}`}
      className="px-4 pt-4 pb-3 border-b border-[color:var(--ah-line)]"
    >
      {showAuthor && (
        <header className="flex items-start gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover bg-[color:var(--ah-line-2)]"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[15px] font-bold text-[color:var(--ah-ink)] truncate">
                {post.author.name}
              </span>
              {post.author.verified && (
                <BadgeCheck size={16} className="text-[color:var(--ah-verified)] fill-[color:var(--ah-verified)]" strokeWidth={0} />
              )}
            </div>
            <div className="text-[13px] text-[color:var(--ah-ink-3)]">{post.author.handle}</div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                data-testid={`post-more-${post.id}`}
                className="w-8 h-8 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-line-2)]"
                aria-label="More"
              >
                <MoreHorizontal size={18} className="text-[color:var(--ah-ink-2)]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem data-testid={`post-menu-save-${post.id}`} onClick={onSave}>
                <Bookmark size={14} className="mr-2" /> {saved ? 'Unsave' : 'Save post'}
              </DropdownMenuItem>
              <DropdownMenuItem data-testid={`post-menu-copy-${post.id}`} onClick={onCopyLink}>
                <LinkIcon size={14} className="mr-2" /> Copy link
              </DropdownMenuItem>
              <DropdownMenuItem
                data-testid={`post-menu-report-${post.id}`}
                onClick={() => toast('Report received', { description: "Thanks for helping keep AbroadHub safe." })}
                className="text-red-600 focus:text-red-600"
              >
                <Flag size={14} className="mr-2" /> Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      )}

      {post.tags?.length > 0 && (
        <div className={`flex flex-wrap gap-x-3 gap-y-1 ${showAuthor ? 'mt-2' : ''}`}>
          {post.tags.map((t) => (
            <button
              key={t}
              onClick={() => toast(`#${t}`, { description: 'Topic browsing coming soon' })}
              className="text-[13px] text-[color:var(--ah-ink-3)] font-medium hover:text-[color:var(--ah-coral)]"
            >
              @{t}
            </button>
          ))}
        </div>
      )}

      {post.text && (
        <p className="mt-2 text-[15px] text-[color:var(--ah-ink)] leading-[1.4] whitespace-pre-line">
          {post.text}
        </p>
      )}

      {post.images?.length > 0 && (
        <div className="mt-3 rounded-2xl overflow-hidden bg-[color:var(--ah-line-2)]">
          <img src={post.images[0]} alt="" className="w-full max-h-[360px] object-cover" loading="lazy" />
        </div>
      )}

      <footer className="mt-3 flex items-center gap-6">
        <button
          data-testid={`post-like-${post.id}`}
          onClick={onLike}
          className="flex items-center gap-1.5 ah-tap"
        >
          <Heart
            size={22}
            strokeWidth={1.8}
            className={liked ? 'fill-[color:var(--ah-coral)] text-[color:var(--ah-coral)]' : 'text-[color:var(--ah-ink)]'}
          />
          <span className="text-[14px] font-semibold text-[color:var(--ah-ink)]">{likes}</span>
        </button>
        <button
          data-testid={`post-comment-${post.id}`}
          onClick={() => setCommentsOpen(true)}
          className="flex items-center gap-1.5 ah-tap"
        >
          <MessageCircle size={22} strokeWidth={1.8} className="text-[color:var(--ah-ink)]" />
          <span className="text-[14px] font-semibold text-[color:var(--ah-ink)]">{post.comments}</span>
        </button>
        <button
          data-testid={`post-share-${post.id}`}
          onClick={onShare}
          className="flex items-center gap-1.5 ah-tap"
        >
          <Send size={22} strokeWidth={1.8} className="text-[color:var(--ah-ink)]" />
          <span className="text-[14px] font-semibold text-[color:var(--ah-ink)]">{post.shares || 0}</span>
        </button>
        <span className="ml-auto text-[13px] text-[color:var(--ah-ink-3)] font-medium">{post.createdAt}</span>
      </footer>

      <CommentsSheet post={post} open={commentsOpen} onOpenChange={setCommentsOpen} />
    </article>
  );
}

function CommentsSheet({ post, open, onOpenChange }) {
  const [items, setItems] = useState([
    { id: 'c1', author: 'Sara', avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=sara`, text: 'Amazing! 🙌', createdAt: '2m' },
    { id: 'c2', author: 'Diego', avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=diego`, text: 'Where is this?', createdAt: '5m' },
  ]);
  const [draft, setDraft] = useState('');

  const submit = () => {
    if (!draft.trim()) return;
    setItems((cur) => [...cur, { id: `local_${Date.now()}`, author: 'You', avatar: post.author.avatar, text: draft.trim(), createdAt: 'now' }]);
    setDraft('');
    toast.success('Comment posted');
  };

  return (
    <AppSheet open={open} onOpenChange={onOpenChange} title={`Comments (${items.length})`} testId="comments-sheet">
      <div className="space-y-4">
        {items.map((c) => (
          <div key={c.id} className="flex items-start gap-3">
            <img src={c.avatar} alt="" className="w-8 h-8 rounded-full object-cover bg-[color:var(--ah-line-2)]" />
            <div className="flex-1">
              <div className="text-[13px] font-bold text-[color:var(--ah-ink)]">
                {c.author} <span className="ml-1 text-[color:var(--ah-ink-3)] font-normal">· {c.createdAt}</span>
              </div>
              <div className="text-[14px] text-[color:var(--ah-ink)]">{c.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2">
        <input
          data-testid="comments-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          placeholder="Add a comment…"
          className="flex-1 h-11 px-3 rounded-full bg-[color:var(--ah-line-2)] outline-none text-[14px]"
        />
        <button
          data-testid="comments-submit"
          onClick={submit}
          className="h-11 px-5 rounded-full bg-[color:var(--ah-coral)] text-white text-[14px] font-bold ah-tap"
        >
          Post
        </button>
      </div>
    </AppSheet>
  );
}
