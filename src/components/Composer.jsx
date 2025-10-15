// src/components/Composer.jsx
import { useState, useRef } from 'react'

export default function Composer({ setPosts, me = 'you' }) {
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const imgRef = useRef(null)

  const urlOk = imageUrl.trim().length > 0

  function submit(e) {
    e.preventDefault()
    const url = imageUrl.trim()
    if (!url) return
    const post = {
      id: crypto.randomUUID(),
      imageUrl: url,
      caption: caption.trim(),
      author: me,
      avatar: 'https://i.pravatar.cc/100?u=' + me,
      likedByMe: false,
      likeCount: 0,
      comments: []
    }
    setPosts(prev => [post, ...prev])
    setImageUrl('')
    setCaption('')
    imgRef.current?.focus()
  }

  return (
    <form onSubmit={submit} aria-label="Create a new post" style={{ margin: '12px 0' }}>
      <h3>Create Post</h3>

      <div style={{ display: 'grid', gap: 6 }}>
        <input
          ref={imgRef}
          aria-label="Image URL"
          placeholder="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          style={{ width: '100%' }}
        />
        <input
          aria-label="Caption"
          placeholder="Caption (optional)"
          value={caption}
          onChange={e => setCaption(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <button type="submit" disabled={!urlOk} aria-disabled={!urlOk}>
          Share
        </button>
      </div>
    </form>
  )
}
