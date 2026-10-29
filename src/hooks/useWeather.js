import { useState } from 'react'

export function useWeather() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  async function fetchWeather(city) {
    setLoading(true)
    setError(null)
    try {
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      ).then(r => r.json())
      if (!geo.results || !geo.results[0]) throw new Error('City not found.')
      const { latitude, longitude, name } = geo.results[0]

      const w = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
      ).then(r => r.json())

      setData({ name, temp: w.current.temperature_2m, code: w.current.weather_code })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { fetchWeather, loading, error, data }
}
