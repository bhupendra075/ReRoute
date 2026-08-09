import { describe, it, expect } from '@jest/globals'
import { QRPayloadSchema, HospitalSchema } from '@/lib/validation'

describe('validation schemas', () => {
  describe('QRPayloadSchema', () => {
    it('validates a valid QR payload', () => {
      const payload = {
        patientId: '123e4567-e89b-12d3-a456-426614174000',
        timestamp: Date.now(),
        nonce: 'abc123def456ghi7',
        kid: 'v1',
      }
      const result = QRPayloadSchema.safeParse(payload)
      expect(result.success).toBe(true)
    })

    it('rejects a payload without patientId', () => {
      const payload = { timestamp: Date.now() }
      const result = QRPayloadSchema.safeParse(payload)
      expect(result.success).toBe(false)
    })
  })

  describe('HospitalSchema', () => {
    it('validates a valid hospital', () => {
      const hospital = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Test Hospital',
        latitude: 40.7128,
        longitude: -74.006,
        specializations: ['ICU', 'CARDIAC'],
        capacity: { ICU: 5, CARDIAC: 3 },
        isActive: true,
      }
      const result = HospitalSchema.safeParse(hospital)
      expect(result.success).toBe(true)
    })
  })
})
