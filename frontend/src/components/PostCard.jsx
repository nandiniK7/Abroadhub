import React, { useState } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, Camera, Pencil, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from './ui/dropdown-menu';
import ShareMenuSheet from './ShareMenuSheet';
import { toast } from 'sonner';

export default function PostCard({ post, showAuthor = true, onDelete }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [shareOpen, setShareOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const onLike = async () => {
    setLiked((v) => !v);
    setLikes((n) => n + (liked ? -1 : 1));
    try { await api.toggleLike(post.id); } catch { /* optimistic */ }
  };

  const onDeletePost = async () => {
    if (!window.confirm('Delete this post?')) return;
    try { await api.deletePost(post.id); toast.success('Post deleted'); onDelete?.(post.id); }
    catch { toast.error('Could not delete'); }
  };

  const isLong = post.text && post.text.length > 120;
  const displayText = isLong && !expanded ? post.text.slice(0, 120) + '…' : post.text;

  const url = `${window.location.origin}/post/${post.id}`;

  return (
    <article data-testid={`post-card-${post.id}`} className="px-4 pt-4 pb-3 border-b border-[color:var(--ah-line)]">
      {showAuthor && (
        <header className="flex items-start gap-3">
          <img src={post.author.avatar} alt={post.author.name} className="w-11 h-11 rounded-full object-cover bg-[color:var(--ah-line-2)]" />
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-bold text-[color:var(--ah-ink)] leading-tight truncate">{post.author.name}</div>
            <div className="text-[13px] text-[color:var(--ah-ink-3)]">{post.author.handle}</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button data-testid={`post-more-${post.id}`} aria-label="More" className="w-8 h-8 grid place-items-center rounded-full ah-tap hover:bg-[color:var(--ah-line-2)]">
                <MoreHorizontal size={20} className="text-[color:var(--ah-ink-2)]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem data-testid={`post-menu-story-${post.id}`} onClick={() => toast('Added to your story')}>
                <Camera size={14} className="mr-2" /> Add to your story
              </DropdownMenuItem>
              {post.author.mine && (
                <DropdownMenuItem data-testid={`post-menu-edit-${post.id}`} onClick={() => toast('Edit post coming soon')}>
                  <Pencil size={14} className="mr-2" /> Edit Post
                </DropdownMenuItem>
              )}
              {post.author.mine && (
                <DropdownMenuItem data-testid={`post-menu-delete-${post.id}`} onClick={onDeletePost} className="text-red-600 focus:text-red-600">
                  <Trash2 size={14} className="mr-2" /> Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      )}

      {post.text && (
        <p className={`${showAuthor ? 'mt-2' : ''} text-[15px] text-[color:var(--ah-ink)] leading-[1.45] whitespace-pre-line`}>
          {displayText}
          {isLong && !expanded && (
            <button onClick={() => setExpanded(true)} className="ml-1 text-[color:var(--ah-ink-3)] font-medium">
              View more
            </button>
          )}
        </p>
      )}

      {post.images?.length > 0 && (
        <div className="mt-3 rounded-2xl overflow-hidden bg-[color:var(--ah-line-2)]">
          <img src={post.images[0]} alt="" className="w-full max-h-[440px] object-cover" loading="lazy" />
        </div>
      )}

      <footer className="mt-3 flex items-center gap-6">
        <button data-testid={`post-like-${post.id}`} onClick={onLike} className="flex items-center gap-1.5 ah-tap">
          <Heart size={22} strokeWidth={1.8} className={liked ? 'fill-[color:var(--ah-coral)] text-[color:var(--ah-coral)]' : 'text-[color:var(--ah-ink)]'} />
          <span className="text-[14px] font-semibold text-[color:var(--ah-ink)]">{likes}</span>
        </button>
        <button data-testid={`post-comment-${post.id}`} onClick={() => toast('Comments coming soon')} className="flex items-center gap-1.5 ah-tap">
          <MessageCircle size={22} strokeWidth={1.8} className="text-[color:var(--ah-ink)]" />
          <span className="text-[14px] font-semibold text-[color:var(--ah-ink)]">{post.comments}</span>
        </button>
        <button data-testid={`post-share-${post.id}`} onClick={() => setShareOpen(true)} className="flex items-center gap-1.5 ah-tap">
          <Send size={22} strokeWidth={1.8} className="text-[color:var(--ah-ink)]" />
          <span className="text-[14px] font-semibold text-[color:var(--ah-ink)]">{post.shares || 0}</span>
        </button>
        <span className="ml-auto text-[13px] text-[color:var(--ah-ink-3)]">{post.createdAt}</span>
      </footer>

      <ShareMenuSheet open={shareOpen} onOpenChange={setShareOpen} url={url} />
    </article>
  );
}
