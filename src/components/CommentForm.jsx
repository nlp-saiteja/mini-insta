// src/components/CommentForm.jsx
import { useState } from 'react'

export default function CommentForm({ postId, setPosts, me = '@you' }) {
  const [text, setText] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return

    setPosts(prev =>
      prev.map(p =>
        p.id !== postId
          ? p
          : {
              ...p,
              comments: [
                ...(p.comments ?? []),
                { id: crypto.randomUUID(), author: me, text: t },
              ],
            }
      )
    )
    setText('')
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', gap: 6, padding: '0.5rem 1rem', borderTop: '1px solid #eee' }}
      aria-label="Add a comment"
    >
      <input
        aria-label="Comment text"
        placeholder="Add a comment..."
        value={text}
        onChange={e => setText(e.target.value)}
        style={{
          flex: 1,
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: '0.5rem 0.75rem',
        }}
      />
      <button
        type="submit"
        disabled={!text.trim()}
        aria-disabled={!text.trim()}
        style={{
          border: 'none',
          background: '#111827',
          color: 'white',
          borderRadius: 8,
          padding: '0.5rem 0.9rem',
          cursor: 'pointer',
          opacity: text.trim() ? 1 : 0.5,
        }}
      >
        Post
      </button>
    </form>
  )
}
