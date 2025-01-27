import { describe, it, expect, vi } from 'vitest'
import { fetchUsers, fetchUser, deleteUser, updateUser } from './UserCall'

global.fetch = vi.fn()

const API_URL = 'http://localhost:5001/api/v1/user'

describe('UserCall Utilities', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('fetchUsers', () => {
    it('should fetch all users', async () => {
      const mockUsers = [{ id: 1 }, { id: 2 }]
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUsers)
      })

      const result = await fetchUsers()
      expect(global.fetch).toHaveBeenCalledWith(API_URL)
      expect(result).toEqual(mockUsers)
    })

    it('should throw error on fetch failure', async () => {
      global.fetch.mockResolvedValue({ ok: false })

      await expect(fetchUsers()).rejects.toThrow('Kunde inte hämta användare')
    })
  })

  describe('fetchUser', () => {
    it('should fetch a specific user', async () => {
      const userId = 1
      const mockUser = { id: 1, name: 'Test User' }
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUser)
      })

      const result = await fetchUser(userId)
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${userId}`)
      expect(result).toEqual(mockUser)
    })

    it('should throw error on fetch failure', async () => {
      const userId = 1
      global.fetch.mockResolvedValue({ ok: false })

      await expect(fetchUser(userId)).rejects.toThrow('Kunde inte hämta användare')
    })
  })

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 1
      const mockResponse = { message: 'User deleted' }
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      const result = await deleteUser(userId)
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${userId}`, { method: 'DELETE' })
      expect(result).toEqual(mockResponse)
    })

    it('should throw error on delete failure', async () => {
      const userId = 1
      global.fetch.mockResolvedValue({ ok: false })

      await expect(deleteUser(userId)).rejects.toThrow('Kunde inte ta bort användaren')
    })
  })

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = 1
      const updatedData = { name: 'New Name' }
      const mockResponse = { id: 1, name: 'New Name' }
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      const result = await updateUser(userId, updatedData)
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      expect(result).toEqual(mockResponse)
    })

    it('should throw error on update failure', async () => {
      const userId = 1
      const updatedData = { name: 'New Name' }
      global.fetch.mockResolvedValue({ ok: false })

      await expect(updateUser(userId, updatedData)).rejects.toThrow('Kunde inte uppdatera användaren')
    })
  })
})