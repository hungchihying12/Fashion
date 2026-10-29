import { useState } from 'react'
import { analyseColour } from '../logic/colourAnalysis.js'
import { SEASONS } from '../data/seasons.js'
import Swatch from './Swatch.jsx'

export default function ColourAnalyser({ onSeasonChange }) {
  const [undertone, setUndertone] = useState('warm')
  const [contrast, setContrast] = useState('high')
  const [chroma, setChroma] = useState('bright')
  const [season, setSeason] = useState(null)

  function handleAnalyse() {
    const s = analyseColour({ undertone, contrast, chroma })
    setSeason(s)
    onSeasonChange(s)
  }

  return (
    <section className="card">
      <h2 className="text-xl font-medium text-jumino-sageDeep">1. Colour Analysis</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm">Undertone</span>
          <select className="input mt-1" value={undertone} onChange={e => setUndertone(e.target.value)}>
            <option value="warm">Warm (gold looks better)</option>
            <option value="cool">Cool (silver looks better)</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm">Contrast</span>
          <select className="input mt-1" value={contrast} onChange={e => setContrast(e.target.value)}>
            <option value="high">High (dark features, light skin)</option>
            <option value="low">Low (soft, blended features)</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm">Chroma</span>
          <select className="input mt-1" value={chroma} onChange={e => setChroma(e.target.value)}>
            <option value="bright">Bright / clear colours</option>
            <option value="muted">Muted / soft colours</option>
          </select>
        </label>
        <button onClick={handleAnalyse} className="btn-primary mt-6">
          Analyse my season
        </button>
      </div>

      {season && (
        <div className="p-4 bg-jumino-mist rounded-xl">
          <p className="font-medium">{SEASONS[season].name}</p>
          <p className="text-sm mt-1">Your best colours:</p>
          <div className="flex gap-2 mt-2">
            {SEASONS[season].colours.map(c => (
              <Swatch key={c} color={c} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
