import { describe, it, expect, vi } from 'vitest'
import { fetchBikes, fetchBikeStats, updateBike } from './BikeCall'

global.fetch = vi.fn()

const API_URL = 'http://localhost:5001/api/v1/bike'

describe('BikeCall Utilities', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('fetchBikes', () => {
    it('should fetch bikes successfully', async () => {
      const mockBikes = [{ id: 1 }, { id: 2 }]
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockBikes)
      })

      const result = await fetchBikes()
      expect(result).toEqual(mockBikes)
      expect(global.fetch).toHaveBeenCalledWith(API_URL)
    })

    it('should handle fetch error', async () => {
      global.fetch.mockRejectedValue(new Error('Fetch error'))

      await expect(fetchBikes()).rejects.toThrow('Fetch error')
    })
  })

  describe('fetchBikeStats', () => {
    it('should calculate bike statistics', async () => {
      const mockBikes = [
        { status: 'in-use' },
        { status: 'charging' },
        { status: 'available' }
      ]
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockBikes)
      })

      const stats = await fetchBikeStats()
      expect(stats).toHaveProperty('totalBikes')
      expect(stats).toHaveProperty('activeRentals')
      expect(stats).toHaveProperty('chargingStations')
    })

    it('should throw error if bike fetch fails', async () => {
      vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Fetch error'))

      await expect(fetchBikeStats()).rejects.toThrow('Fetch error')
    })
  })

  describe('updateBike', () => {
    it('should update bike successfully', async () => {
      const bikeId = 1
      const updatedData = { status: 'available' }
      const mockResponse = { id: 1, status: 'available' }

      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      const result = await updateBike(bikeId, updatedData)
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${bikeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      expect(result).toEqual(mockResponse)
    })

    it('should throw error on failed update', async () => {
      const bikeId = 1
      const updatedData = { status: 'available' }

      global.fetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({})
      })

      await expect(updateBike(bikeId, updatedData)).rejects.toThrow('Kunde inte uppdatera cykeln')
    })
  })
})
