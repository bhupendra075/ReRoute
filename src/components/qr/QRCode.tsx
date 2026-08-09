import QRCode from 'qrcode.react'
import type { SignedQR } from '@/types'

interface QRCodeProps {
  data: SignedQR
  size?: number
  onError?: (error: Error) => void
}

export function QRCodeComponent({ data, size = 300, onError }: QRCodeProps) {
  try {
    const json = JSON.stringify(data)
    return (
      <QRCode
        value={json}
        size={size}
        level="M"
        includeMargin
        bgColor="#ffffff"
        fgColor="#1f2937"
        renderAs="canvas"
        imageSettings={undefined}
      />
    )
  } catch (err) {
    onError?.(err instanceof Error ? err : new Error('QR render failed'))
    return null
  }
}
