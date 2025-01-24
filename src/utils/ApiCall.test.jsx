import { describe, it, expect, vi } from 'vitest'
import { fetchCities } from './ApiCall'

// Mock fetch globally
global.fetch = vi.fn()

describe('fetchCities', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should fetch cities successfully', async () => {
    const mockCities = [
      { city_id: 1, name: 'Jönköping' },
      { city_id: 2, name: 'Karlskrona' },
      { city_id: 5, name: 'Umeå' }
    ]

    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCities)
    })

    const result = await fetchCities()
    expect(result).toEqual(mockCities)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5001/api/city')
  })

  it('should return empty array on fetch error', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'))

    const result = await fetchCities()
    expect(result).toEqual([])
  })

  it('should return empty array on non-ok response', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve([])
    })

    const result = await fetchCities()
    expect(result).toEqual([])
  })
})
