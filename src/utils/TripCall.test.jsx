import { describe, it, expect, vi } from 'vitest'
import { fetchRentalHistory, fetchRentalDetails } from './TripCall'

global.fetch = vi.fn()

const API_URL = 'http://localhost:5001/api/trip'

describe('TripCall Utilities', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('fetchRentalHistory', () => {
    it('should fetch rental history for a user', async () => {
      const userId = 1
      const mockTrips = [{ id: 1 }, { id: 2 }]

      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTrips)
      })

      const result = await fetchRentalHistory(userId)
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/user/${userId}`)
      expect(result).toEqual(mockTrips)
    })

    it('should throw error on fetch failure', async () => {
      const userId = 1
      global.fetch.mockResolvedValue({ ok: false })

      await expect(fetchRentalHistory(userId)).rejects.toThrow('Kunde inte hämta uthyrningshistorik')
    })
  })

  describe('fetchRentalDetails', () => {
    it('should fetch specific rental details', async () => {
      const tripId = 1
      const mockTripDetails = { id: 1, duration: 30 }

      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTripDetails)
      })

      const result = await fetchRentalDetails(tripId)
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${tripId}`)
      expect(result).toEqual(mockTripDetails)
    })

    it('should throw error on fetch failure', async () => {
      const tripId = 1
      global.fetch.mockResolvedValue({ ok: false })

      await expect(fetchRentalDetails(tripId)).rejects.toThrow('Kunde inte hämta detaljinformation för resan')
    })
  })
})