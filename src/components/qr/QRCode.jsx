import QRCode from 'qrcode.react'

export function QRCodeComponent({ data, size = 300, onError }) {
  try {
    const json = JSON.stringify(data)
    return (
      <div role="img" aria-label="QR code">
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
      </div>
    )
  } catch (err) {
    onError?.(err instanceof Error ? err : new Error('QR render failed'))
    return null
  }
}