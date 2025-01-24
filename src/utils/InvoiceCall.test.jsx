import { describe, it, expect, vi } from 'vitest'
import { 
  fetchInvoices, 
  fetchSpecificInvoice, 
  markInvoiceAsPaid 
} from './InvoiceCall'

global.fetch = vi.fn()

const API_URL = 'http://localhost:5001/api/invoice'

describe('InvoiceCall Utilities', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('fetchInvoices', () => {
    it('should fetch invoices for a user', async () => {
      const userId = 1
      const mockInvoices = [{ id: 1 }, { id: 2 }]

      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockInvoices)
      })

      const result = await fetchInvoices(userId)
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/user/${userId}`)
      expect(result).toEqual(mockInvoices)
    })

    it('should throw error on fetch failure', async () => {
      const userId = 1
      global.fetch.mockResolvedValue({ ok: false })

      await expect(fetchInvoices(userId)).rejects.toThrow('Kunde inte hämta fakturor')
    })
  })

  describe('fetchSpecificInvoice', () => {
    it('should fetch a specific invoice', async () => {
      const invoiceId = 1
      const mockInvoice = { id: 1, amount: 100 }

      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockInvoice)
      })

      const result = await fetchSpecificInvoice(invoiceId)
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${invoiceId}`)
      expect(result).toEqual(mockInvoice)
    })

    it('should throw error on fetch failure', async () => {
      const invoiceId = 1
      global.fetch.mockResolvedValue({ ok: false })

      await expect(fetchSpecificInvoice(invoiceId)).rejects.toThrow('Kunde inte hämta fakturan')
    })
  })

  describe('markInvoiceAsPaid', () => {
    it('should mark invoice as paid', async () => {
      const invoiceId = 1
      const paymentMethod = 'prepaid'
      const mockUpdatedInvoice = { id: 1, status: 'paid' }

      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUpdatedInvoice)
      })

      const result = await markInvoiceAsPaid(invoiceId, paymentMethod)
      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/pay/${invoiceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethod })
      })
      expect(result).toEqual(mockUpdatedInvoice)
    })

    it('should throw error on payment failure', async () => {
      const invoiceId = 1
      const paymentMethod = 'prepaid'
      global.fetch.mockResolvedValue({ ok: false })

      await expect(markInvoiceAsPaid(invoiceId, paymentMethod))
        .rejects.toThrow('Kunde inte markera fakturan som betald')
    })
  })
})