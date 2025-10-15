// src/components/PostCard.jsx
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'

export default function PostCard({ post, setPosts }) {
  // compute alt text for the main image (caption preferred, else fallback)
  const authorHandle = `@${String(post.author).replace(/^@/, '')}`
  const imgAlt =
    (post.caption && post.caption.trim()) ||
    (post.alt && String(post.alt).trim()) ||
    `Photo by ${authorHandle}`

  function toggleLike() {
    setPosts(prev =>
      prev.map(p =>
        p.id === post.id
          ? {
              ...p,
              likedByMe: !p.likedByMe,
              likeCount: p.likedByMe ? p.likeCount - 1 : p.likeCount + 1,
            }
          : p
      )
    )
  }

  return (
    <article
      style={{
        border: '1px solid #ddd',
        borderRadius: 12,
        marginBottom: 16,
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0.75rem 1rem',
        }}
      >
        <img
          src={post.avatar}
          alt={`${String(post.author).replace(/^@/, '')} avatar`}
          width="40"
          height="40"
          style={{ borderRadius: '50%' }}
        />
        <strong>
          <Link
            to={`/u/${String(post.author).replace(/^@/, '')}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
            aria-label={`View ${authorHandle}'s profile`}
          >
            {authorHandle}
          </Link>
        </strong>
      </header>

      {/* Post image */}
      <img
        src={post.imageUrl || post.image}
        alt={imgAlt}
        style={{ width: '100%', maxHeight: 500, objectFit: 'cover', display: 'block' }}
      />

      {/* Caption */}
      {post.caption && (
        <p style={{ padding: '0.75rem 1rem', margin: 0 }}>{post.caption}</p>
      )}

      {/* Likes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 1rem 0.75rem' }}>
        <button
          onClick={toggleLike}
          aria-pressed={post.likedByMe}
          aria-label={post.likedByMe ? 'Unlike' : 'Like'}
        >
          {post.likedByMe ? '❤️' : '🤍'}
        </button>
        <span>{post.likeCount} likes</span>
      </div>

      {/* Comments list */}
      <ul
        style={{
          listStyle: 'none',
          padding: '0 1rem',
          margin: 0,
          borderTop: '1px solid #eee',
        }}
      >
        {(post.comments ?? []).length === 0 ? (
          <li style={{ opacity: 0.7, padding: '0.5rem 0' }}>Be the first to comment</li>
        ) : (
          post.comments.map(c => (
            <li key={c.id} style={{ padding: '0.4rem 0' }}>
              <strong>{c.author}</strong> {c.text}
            </li>
          ))
        )}
      </ul>

      {/* Comment form */}
      <CommentForm postId={post.id} setPosts={setPosts} />
    </article>
  )
}
