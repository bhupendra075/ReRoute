import { useState, useCallback } from 'react'
import type { SignedQR } from '@/types/qr'

interface UseQRCodeReturn {
  generateQR: (signedQR: SignedQR) => string | null
  verifyQR: (signedQR: SignedQR) => Promise<boolean>
  qrDataUrl: string | null
  error: string | null
}

export function useQRCode(): UseQRCodeReturn {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateQR = useCallback((signedQR: SignedQR): string | null => {
    try {
      const json = JSON.stringify(signedQR)
      const canvas = document.createElement('canvas')
      if (!canvas) {
        setError('Canvas not supported')
        return null
      }
      canvas.width = 300
      canvas.height = 300
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        setError('Canvas not supported')
        return null
      }

      // Simple QR-like visual representation
      // In production, use qrcode.react's QRCodeCanvas component
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 300, 300)
      ctx.fillStyle = '#1f2937'

      const data = new TextEncoder().encode(json)
      let hash = 0
      for (let i = 0; i < data.length; i++) {
        hash = ((hash << 5) - hash + (data[i] ?? 0)) | 0
      }

      const moduleCount = 21
      const moduleSize = Math.floor(300 / (moduleCount + 8))
      const offset = Math.floor(300 - moduleCount * moduleSize) / 2

      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          const seed = (hash * (row * moduleCount + col + 1)) & 0xffffffff
          if (seed % 3 !== 0) {
            ctx.fillStyle = '#1f2937'
          } else {
            ctx.fillStyle = '#ffffff'
          }
          ctx.fillRect(
            offset + col * moduleSize,
            offset + row * moduleSize,
            moduleSize,
            moduleSize,
          )
        }
      }

      const dataUrl = canvas.toDataURL('image/png')
      setQrDataUrl(dataUrl)
      setError(null)
      return dataUrl
    } catch (err) {
      const message = err instanceof Error ? err.message : 'QR generation failed'
      setError(message)
      setQrDataUrl(null)
      return null
    }
  }, [])

  const verifyQR = useCallback(async (_signedQR: SignedQR): Promise<boolean> => {
    try {
      // In production, this would use the Web Crypto API to verify the ECDSA signature
      // For now, return true as a placeholder
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'QR verification failed')
      return false
    }
  }, [])

  return { generateQR, verifyQR, qrDataUrl, error }
}
