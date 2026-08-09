import { useState, useCallback } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import type { SignedQR } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface QRScannerProps {
  onScan?: (signedQR: SignedQR) => void
}

export function QRScanner({ onScan }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [scannerId] = useState('qr-scanner')

  const startScanning = useCallback(() => {
    setError(null)
    setIsScanning(true)

    const scanner = new Html5Qrcode(scannerId)

    scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        try {
          const signedQR: SignedQR = JSON.parse(decodedText)
          onScan?.(signedQR)
          scanner.stop()
          setIsScanning(false)
        } catch {
          setError('Invalid QR code format')
          scanner.stop()
          setIsScanning(false)
        }
      },
      () => {
        // Ignore scan failures (continuous scanning)
      },
    ).catch((err) => {
      setError(err instanceof Error ? err.message : 'Scanner failed to start')
      setIsScanning(false)
    })
  }, [onScan, scannerId])

  const stopScanning = useCallback(() => {
    const scanner = new Html5Qrcode(scannerId)
    scanner.stop().catch(() => {})
    setIsScanning(false)
  }, [scannerId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan QR Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div id={scannerId} className="w-64 h-64 border rounded-lg overflow-hidden" />
        </div>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <div className="flex gap-3">
          {!isScanning ? (
            <Button onClick={startScanning} variant="primary">
              Start Scanning
            </Button>
          ) : (
            <Button onClick={stopScanning} variant="secondary">
              Stop Scanning
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
