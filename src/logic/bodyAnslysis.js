export function analyseBody({ bust, waist, hips }) {
  const b = Number(bust)
  const w = Number(waist)
  const h = Number(hips)
  if (!b || !w || !h) return null

  const diffBW = Math.abs(b - h)
  if (diffBW <= 5 && b - w >= 15 && h - w >= 15) return 'hourglass'
  if (h - b > 5) return 'pear'
  if (b - h > 5) return 'invertedTriangle'
  if (w >= b - 5) return 'apple'
  return 'rectangle'
}
