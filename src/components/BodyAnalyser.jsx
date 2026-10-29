import { useState } from 'react'
import { analyseBody } from '../logic/bodyAnalysis.js'
import { BODY_RULES } from '../data/bodyRules.js'

export default function BodyAnalyser({ onShapeChange }) {
  const [bust, setBust] = useState('')
  const [waist, setWaist] = useState('')
  const [hips, setHips] = useState('')
  const [shape, setShape] = useState(null)

  function handleAnalyse() {
    const s = analyseBody({ bust, waist, hips })
    if (!s) return alert('Please fill all three measurements.')
    setShape(s)
    onShapeChange(s)
  }

  return (
    <section className="card">
      <h2 className="text-xl font-medium text-jumino-sageDeep">2. Body Analysis</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-sm">Bust (cm)</span>
          <input className="input mt-1" type="number" value={bust} onChange={e => setBust(e.target.value)} placeholder="90" />
        </label>
        <label className="block">
          <span className="text-sm">Waist (cm)</span>
          <input className="input mt-1" type="number" value={waist} onChange={e => setWaist(e.target.value)} placeholder="70" />
        </label>
        <label className="block">
          <span className="text-sm">Hips (cm)</span>
          <input className="input mt-1" type="number" value={hips} onChange={e => setHips(e.target.value)} placeholder="95" />
        </label>
      </div>
      <button onClick={handleAnalyse} className="btn-primary">
        Analyse my shape
      </button>

      {shape && (
        <div className="p-4 bg-jumino-mist rounded-xl space-y-2">
          <p className="font-medium">{BODY_RULES[shape].label}</p>
          <p className="text-sm"><b>Wear:</b> {BODY_RULES[shape].tips.join(', ')}</p>
          <p className="text-sm"><b>Avoid:</b> {BODY_RULES[shape].avoid.join(', ')}</p>
          <p className="text-sm"><b>Jewellery:</b> {BODY_RULES[shape].jewellery}</p>
        </div>
      )}
    </section>
  )
}
