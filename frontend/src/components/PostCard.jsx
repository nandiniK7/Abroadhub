import React, { useState } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, BadgeCheck } from 'lucide-react';
import { api } from '../services/api';

// Flat post — no card wrapper, dividers between posts. Matches the mobile screenshot.
export default function PostCard({ post, showAuthor = true }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);

  const onLike = async () => {
    setLiked((v) => !v);
    setLikes((n) => n + (liked ? -1 : 1));
    try { await api.toggleLike(post.id); } catch { /* keep optimistic */ }
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
              {post.author.verified && (
                // outline of the tick on top (BadgeCheck uses fill above; use white check overlay via stroke=none is already applied)
                <span className="sr-only">verified</span>
              )}
            </div>
            <div className="text-[13px] text-[color:var(--ah-ink-3)]">{post.author.handle}</div>
          </div>
          <button
            data-testid={`post-more-${post.id}`}
            className="w-8 h-8 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-line-2)]"
            aria-label="More"
          >
            <MoreHorizontal size={18} className="text-[color:var(--ah-ink-2)]" />
          </button>
        </header>
      )}

      {/* @tags row */}
      {post.tags?.length > 0 && (
        <div className={`flex flex-wrap gap-x-3 gap-y-1 ${showAuthor ? 'mt-2' : ''}`}>
          {post.tags.map((t) => (
            <span key={t} className="text-[13px] text-[color:var(--ah-ink-3)] font-medium">
              @{t}
            </span>
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
          <img
            src={post.images[0]}
            alt=""
            className="w-full max-h-[360px] object-cover"
            loading="lazy"
          />
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
          className="flex items-center gap-1.5 ah-tap"
        >
          <MessageCircle size={22} strokeWidth={1.8} className="text-[color:var(--ah-ink)]" />
          <span className="text-[14px] font-semibold text-[color:var(--ah-ink)]">{post.comments}</span>
        </button>
        <button
          data-testid={`post-share-${post.id}`}
          className="flex items-center gap-1.5 ah-tap"
        >
          <Send size={22} strokeWidth={1.8} className="text-[color:var(--ah-ink)]" />
          <span className="text-[14px] font-semibold text-[color:var(--ah-ink)]">{post.shares || 0}</span>
        </button>
        <span className="ml-auto text-[13px] text-[color:var(--ah-ink-3)] font-medium">{post.createdAt}</span>
      </footer>
    </article>
  );
}
