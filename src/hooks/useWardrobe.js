import { useState, useEffect } from 'react'

const KEY = 'jumino-wardrobe'

export function useWardrobe() {
  const [wardrobe, setWardrobe] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(wardrobe))
  }, [wardrobe])

  function addItem(item) {
    setWardrobe(prev => [...prev, { ...item, id: Date.now() }])
  }
  function removeItem(id) {
    setWardrobe(prev => prev.filter(i => i.id !== id))
  }

  return { wardrobe, addItem, removeItem }
}
