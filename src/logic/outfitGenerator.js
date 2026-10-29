import { SEASONS } from '../data/seasons.js'
import { BODY_RULES } from '../data/bodyRules.js'

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function neededWarmthForTemp(temp) {
  if (temp >= 24) return 1
  if (temp >= 15) return 2
  return 3
}

export function generateOutfit({ wardrobe, temp, season, bodyShape }) {
  const warmth = neededWarmthForTemp(temp)
  const tops = wardrobe.filter(i => i.cat === 'top' && i.warmth <= warmth)
  const bottoms = wardrobe.filter(i => i.cat === 'bottom')
  const shoes = wardrobe.filter(i => i.cat === 'shoes')
  const outer = wardrobe.filter(i => i.cat === 'outerwear' && i.warmth >= warmth)

  if (!tops.length || !bottoms.length) {
    return { error: 'Add at least one top and one bottom to your wardrobe first.' }
  }

  const items = [
    pick(tops),
    pick(bottoms),
    shoes.length ? pick(shoes) : null,
    temp < 18 && outer.length ? pick(outer) : null,
  ].filter(Boolean)

  let paletteMatches = 0
  if (season && SEASONS[season]) {
    const palette = SEASONS[season].colours.map(c => c.toLowerCase())
    paletteMatches = items.filter(i => palette.includes(i.color.toLowerCase())).length
  }

  return {
    items,
    temp,
    warmth,
    paletteMatches,
    paletteNote: season
      ? paletteMatches
        ? `✿ ${paletteMatches} item(s) match your ${season} palette.`
        : `⚠ None of these match your ${season} palette — consider swapping a piece.`
      : '',
    bodyTip: bodyShape ? BODY_RULES[bodyShape].tips[0] : null,
  }
}
