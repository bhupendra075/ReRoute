import { QRCodeComponent } from '@/components/qr/QRCode'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function Passport() {
  // Public QR view — no auth required. Displays a sample signed QR for demonstration.
  const sampleQR = {
    payload: {
      patientId: 'demo-patient-id',
      timestamp: Date.now(),
      nonce: 'demo-nonce-1234',
      kid: 'v1',
      bloodType: 'O+',
      allergies: ['penicillin'],
      conditions: ['hypertension'],
      medications: ['aspirin 81mg'],
    },
    signature: 'demo-signature',
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle>Emergency Passport QR</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <QRCodeComponent data={sampleQR} size={256} />
          <p className="text-sm text-gray-500">Scan this QR to access emergency medical information.</p>
        </CardContent>
      </Card>
    </div>
  )
}
