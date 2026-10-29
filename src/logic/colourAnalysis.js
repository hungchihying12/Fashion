export function analyseColour({ undertone, contrast, chroma }) {
  let season
  if (undertone === 'warm') {
    season = chroma === 'bright' ? 'spring' : 'autumn'
  } else {
    season = chroma === 'bright' || contrast === 'high' ? 'winter' : 'summer'
  }
  return season
}
