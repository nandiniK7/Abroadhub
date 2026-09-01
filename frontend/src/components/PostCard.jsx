import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, MapPin } from 'lucide-react';
import { api } from '../services/api';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);

  const onLike = async () => {
    setLiked((v) => !v);
    setLikes((n) => n + (liked ? -1 : 1));
    try { await api.toggleLike(post.id); } catch { /* revert intentionally minimal */ }
  };

  return (
    <article
      data-testid={`post-card-${post.id}`}
      className="bg-white rounded-2xl ah-shadow-card border border-[color:var(--ah-line)] overflow-hidden"
    >
      {/* Header */}
      <header className="flex items-center gap-3 p-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover bg-[color:var(--ah-bg)]"
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-[color:var(--ah-ink)] truncate">
            {post.author.name}
          </div>
          <div className="text-[12px] text-[color:var(--ah-ink-3)] flex items-center gap-1">
            <MapPin size={11} /> {post.author.city} · {post.createdAt}
          </div>
        </div>
        <button
          data-testid={`post-more-${post.id}`}
          className="w-9 h-9 rounded-full grid place-items-center ah-tap hover:bg-[color:var(--ah-bg)]"
          aria-label="More"
        >
          <MoreHorizontal size={18} className="text-[color:var(--ah-ink-2)]" />
        </button>
      </header>

      {/* Body */}
      {post.text && (
        <p className="px-4 pb-3 text-[15px] text-[color:var(--ah-ink)] leading-relaxed">
          {post.text}
        </p>
      )}

      {post.images?.length > 0 && (
        <div className="w-full bg-[color:var(--ah-bg)]">
          <img
            src={post.images[0]}
            alt=""
            className="w-full max-h-[480px] object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Actions */}
      <footer className="flex items-center gap-1 px-2 py-2">
        <button
          data-testid={`post-like-${post.id}`}
          onClick={onLike}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full ah-tap hover:bg-[color:var(--ah-bg)]"
        >
          <Heart
            size={20}
            className={liked ? 'fill-[color:var(--ah-coral)] text-[color:var(--ah-coral)]' : 'text-[color:var(--ah-ink-2)]'}
          />
          <span className={`text-[13px] font-semibold ${liked ? 'text-[color:var(--ah-coral)]' : 'text-[color:var(--ah-ink-2)]'}`}>
            {likes}
          </span>
        </button>
        <button
          data-testid={`post-comment-${post.id}`}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full ah-tap hover:bg-[color:var(--ah-bg)]"
        >
          <MessageCircle size={20} className="text-[color:var(--ah-ink-2)]" />
          <span className="text-[13px] font-semibold text-[color:var(--ah-ink-2)]">
            {post.comments}
          </span>
        </button>
        <button
          data-testid={`post-share-${post.id}`}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-full ah-tap hover:bg-[color:var(--ah-bg)]"
        >
          <Share2 size={19} className="text-[color:var(--ah-ink-2)]" />
        </button>
      </footer>
    </article>
  );
}
