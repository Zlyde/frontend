import { describe, it, expect, vi } from 'vitest'
import { 
  fetchStations, 
  fetchZones, 
  fetchBikesAtStation, 
  fetchBikesAtZone 
} from './StationZoneCall'

global.fetch = vi.fn()

const API_URL = 'http://localhost:5001/api'

describe('StationZoneCall Utilities', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('fetchStations', () => {
    it('should fetch stations successfully', async () => {
      const mockStations = [{ id: 1 }, { id: 2 }]
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockStations)
      })

      const result = await fetchStations()
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/station`)
      expect(result).toEqual(mockStations)
    })

    it('should throw error on fetch failure', async () => {
      global.fetch.mockResolvedValue({ ok: false })

      await expect(fetchStations()).rejects.toThrow('Kunde inte hämta laddstationer')
    })
  })

  describe('fetchZones', () => {
    it('should fetch zones successfully', async () => {
      const mockZones = [{ id: 1 }, { id: 2 }]
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockZones)
      })

      const result = await fetchZones()
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/zone`)
      expect(result).toEqual(mockZones)
    })

    it('should throw error on fetch failure', async () => {
      global.fetch.mockResolvedValue({ ok: false })

      await expect(fetchZones()).rejects.toThrow('Kunde inte hämta parkeringszoner')
    })
  })

  describe('fetchBikesAtStation', () => {
    it('should fetch bikes at a station', async () => {
      const stationId = 1
      const mockBikes = [{ id: 1 }, { id: 2 }]
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockBikes)
      })

      const result = await fetchBikesAtStation(stationId)
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/station/${stationId}/bikes`)
      expect(result).toEqual(mockBikes)
    })

    it('should throw error on fetch failure', async () => {
      const stationId = 1
      global.fetch.mockResolvedValue({ ok: false })

      await expect(fetchBikesAtStation(stationId)).rejects.toThrow('Kunde inte hämta cyklar för laddstationen')
    })
  })

  describe('fetchBikesAtZone', () => {
    it('should fetch bikes at a zone', async () => {
      const zoneId = 1
      const mockBikes = [{ id: 1 }, { id: 2 }]
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockBikes)
      })

      const result = await fetchBikesAtZone(zoneId)
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/zone/${zoneId}/bikes`)
      expect(result).toEqual(mockBikes)
    })

    it('should throw error on fetch failure', async () => {
      const zoneId = 1
      global.fetch.mockResolvedValue({ ok: false })

      await expect(fetchBikesAtZone(zoneId)).rejects.toThrow('Kunde inte hämta cyklar för parkeringszonen')
    })
  })
})