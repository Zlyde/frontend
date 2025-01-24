import { describe, it, expect, vi } from 'vitest'
import { fetchSettings, updateSettings, resetSettings } from './SettingCall'

global.fetch = vi.fn()

const API_URL = 'http://localhost:5001/api/setting'

describe('SettingCall Utilities', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('fetchSettings', () => {
    it('should fetch settings successfully', async () => {
      const mockSettings = { theme: 'dark', notifications: true }
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSettings)
      })

      const result = await fetchSettings()
      expect(global.fetch).toHaveBeenCalledWith(API_URL)
      expect(result).toEqual(mockSettings)
    })

    it('should throw error on fetch failure', async () => {
      global.fetch.mockResolvedValue({ ok: false })

      await expect(fetchSettings()).rejects.toThrow('Kunde inte hämta inställningar')
    })
  })

  describe('updateSettings', () => {
    it('should update settings successfully', async () => {
      const updatedSettings = { theme: 'light' }
      const mockResponse = { theme: 'light', notifications: true }

      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      const result = await updateSettings(updatedSettings)
      expect(global.fetch).toHaveBeenCalledWith(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      })
      expect(result).toEqual(mockResponse)
    })

    it('should throw error on update failure', async () => {
      const updatedSettings = { theme: 'light' }
      global.fetch.mockResolvedValue({ ok: false })

      await expect(updateSettings(updatedSettings)).rejects.toThrow('Kunde inte uppdatera inställningarna')
    })
  })

  describe('resetSettings', () => {
    it('should reset settings successfully', async () => {
      const mockDefaultSettings = { theme: 'default', notifications: false }
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockDefaultSettings)
      })

      const result = await resetSettings()
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/reset`, { method: 'PUT' })
      expect(result).toEqual(mockDefaultSettings)
    })

    it('should throw error on reset failure', async () => {
      global.fetch.mockResolvedValue({ ok: false })

      await expect(resetSettings()).rejects.toThrow('Kunde inte återställa inställningarna')
    })
  })
})