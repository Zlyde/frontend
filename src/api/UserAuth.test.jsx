import { describe, it, expect, vi, beforeEach } from 'vitest'
import { userRegister, userLogin } from './UserAuth'

// Mock global fetch
global.fetch = vi.fn()

describe('Authentication functions', () => {
  beforeEach(() => {
    // Återställ alla mocks mellan tester
    vi.clearAllMocks()
  })

  describe('userRegister', () => {
    it('ska skicka korrekt registreringsförfrågan', async () => {
      // Arrangera
      const mockResponse = { ok: true, json: () => Promise.resolve({ message: 'Registrering lyckades' }) }
      fetch.mockResolvedValueOnce(mockResponse)

      const name = 'Test Person'
      const email = 'test@example.com'
      const password = 'password123'

      // Agera
      const response = await userRegister(name, email, password)

      // Verifiera
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5001/api/v1/auth/register',
        {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password })
        }
      )
      expect(response).toBe(mockResponse)
    })

    it('ska hantera registreringsfel', async () => {
      // Arrangera
      const mockError = new Error('Registrering misslyckades')
      fetch.mockRejectedValueOnce(mockError)

      // Agera & Verifiera
      await expect(userRegister('Test', 'test@example.com', 'password123'))
        .rejects
        .toThrow('Registrering misslyckades')
    })
  })

  describe('userLogin', () => {
    it('ska hantera lyckad inloggning', async () => {
      // Arrangera
      const mockData = { token: 'fake-token', user: { id: 1, name: 'Test' } }
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockData)
      }
      fetch.mockResolvedValueOnce(mockResponse)

      const email = 'test@example.com'
      const password = 'password123'

      // Agera
      const result = await userLogin(email, password)

      // Verifiera
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5001/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        }
      )
      expect(result).toEqual(mockData)
    })

    it('ska hantera misslyckad inloggning med felaktigt svar', async () => {
      // Arrangera
      const mockResponse = {
        ok: false,
        json: () => Promise.resolve({ error: 'Ogiltiga inloggningsuppgifter' })
      }
      fetch.mockResolvedValueOnce(mockResponse)

      // Agera & Verifiera
      await expect(userLogin('test@example.com', 'wrongpassword'))
        .rejects
        .toThrow('Inloggning misslyckades')
    })

    it('ska hantera backend-felmeddelande', async () => {
      // Arrangera
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ error: 'Användaren finns inte' })
      }
      fetch.mockResolvedValueOnce(mockResponse)

      // Agera & Verifiera
      await expect(userLogin('nonexistent@example.com', 'password123'))
        .rejects
        .toThrow('Användaren finns inte')
    })

    it('ska hantera nätverksfel', async () => {
      // Arrangera
      fetch.mockRejectedValueOnce(new Error('Nätverksfel'))

      // Agera & Verifiera
      await expect(userLogin('test@example.com', 'password123'))
        .rejects
        .toThrow('Nätverksfel')
    })
  })
})
