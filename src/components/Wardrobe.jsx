import { useState } from 'react'
import Swatch from './Swatch.jsx'

const CATEGORIES = ['top', 'bottom', 'outerwear', 'shoes', 'accessory']

export default function Wardrobe({ wardrobe, addItem, removeItem }) {
  const [name, setName] = useState('')
  const [cat, setCat] = useState('top')
  const [color, setColor] = useState('#8fa9c9')
  const [warmth, setWarmth] = useState(1)

  function handleAdd() {
    if (!name.trim()) return alert('Give the item a name.')
    addItem({ name: name.trim(), cat, color, warmth: Number(warmth) })
    setName('')
  }

  return (
    <section className="card">
      <h2 className="text-xl font-medium text-jumino-sageDeep">3. Wardrobe</h2>
      <p className="text-sm text-jumino-sage">Add items manually — name, category, colour, warmth.</p>

      <div className="grid md:grid-cols-5 gap-2">
        <input
          className="input md:col-span-2"
          placeholder="Blue cotton shirt"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select className="input" value={cat} onChange={e => setCat(e.target.value)}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="color"
          className="border rounded-lg p-1 h-10 w-full"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
        <select className="input" value={warmth} onChange={e => setWarmth(e.target.value)}>
          <option value={1}>Light (summer)</option>
          <option value={2}>Medium (mild)</option>
          <option value={3}>Heavy (cold)</option>
        </select>
      </div>
      <button onClick={handleAdd} className="bg-jumino-ink text-white rounded-lg px-4 py-2 hover:opacity-90 transition">
        + Add item
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {wardrobe.map(i => (
          <div key={i.id} className="border border-jumino-mist rounded-xl p-3 flex items-center gap-2 bg-white">
            <Swatch color={i.color} size={36} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{i.name}</p>
              <p className="text-xs text-jumino-sage">{i.cat} · warmth {i.warmth}</p>
            </div>
            <button onClick={() => removeItem(i.id)} className="text-rose-500 text-xs hover:text-rose-600">✕</button>
          </div>
        ))}
      </div>
    </section>
  )
}
