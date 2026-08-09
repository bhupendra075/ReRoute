import { useState, useCallback } from 'react'
import { useQRCode } from '@/hooks/useQRCode'
import type { SignedQR } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface QRGeneratorProps {
  onGenerated?: (dataUrl: string) => void
}

export function QRGenerator({ onGenerated }: QRGeneratorProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const { generateQR, error } = useQRCode()

  const handleGenerate = useCallback(() => {
    const payload = {
      patientId: 'placeholder-patient-id',
      timestamp: Date.now(),
      nonce: crypto.randomUUID().slice(0, 16),
      kid: 'v1',
    }
    const qr: SignedQR = { payload, signature: '' }
    const dataUrl = generateQR(qr)
    if (dataUrl) {
      setQrDataUrl(dataUrl)
      onGenerated?.(dataUrl)
    }
  }, [generateQR, onGenerated])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Emergency QR</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGenerate} variant="primary">
          Generate QR Code
        </Button>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        {qrDataUrl && (
          <div className="flex justify-center">
            <img src={qrDataUrl} alt="Emergency QR Code" className="border rounded-lg" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
