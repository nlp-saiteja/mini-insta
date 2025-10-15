// src/App.jsx
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { seedPosts } from './data/posts'
import Navbar from './components/Navbar'
import Composer from './components/Composer'
import Feed from './components/Feed'
import Profile from './components/Profile'

const STORAGE_KEY = 'mini-insta-posts'

export default function App() {
  // Lazy init: prefer saved posts; fall back to seeds
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : seedPosts
    } catch {
      return seedPosts
    }
  })

  // Hydrate on mount (mirrors the lab PDF)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setPosts(JSON.parse(saved))
    } catch {}
  }, [])

  // Persist whenever posts change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    } catch {}
  }, [posts])

  return (
    <>
      <Navbar />
      {/* Centered container per rubric */}
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Composer setPosts={setPosts} />
                <Feed posts={posts} setPosts={setPosts} />
              </>
            }
          />
          <Route
            path="/u/:handle"
            element={<Profile posts={posts} setPosts={setPosts} />}
          />
          <Route path="*" element={<p style={{ opacity: 0.7 }}>Not found</p>} />
        </Routes>
      </main>
    </>
  )
}
