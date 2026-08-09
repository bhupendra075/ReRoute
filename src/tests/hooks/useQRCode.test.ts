import { describe, it, expect } from '@jest/globals'
import { renderHook } from '@testing-library/react'
import { useQRCode } from '@/hooks/useQRCode'

describe('useQRCode', () => {
  it('returns generateQR, verifyQR, qrDataUrl, and error', () => {
    const { result } = renderHook(() => useQRCode())
    expect(typeof result.current.generateQR).toBe('function')
    expect(typeof result.current.verifyQR).toBe('function')
    expect(result.current.qrDataUrl).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('generates a QR data URL from valid signed QR data', () => {
    const signedQR = {
      payload: {
        patientId: '123e4567-e89b-12d3-a456-426614174000',
        timestamp: Date.now(),
        nonce: 'abc123def456ghi7',
        kid: 'v1',
      },
      signature: 'demo-signature',
    }

    const { result } = renderHook(() => useQRCode())
    const dataUrl = result.current.generateQR(signedQR)

    expect(dataUrl).toBeTruthy()
    expect(typeof dataUrl).toBe('string')
    expect(dataUrl?.startsWith('data:image/png')).toBe(true)
    expect(result.current.qrDataUrl).toBeTruthy()
  })
})
