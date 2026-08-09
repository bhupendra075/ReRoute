import { TriageQueue } from '@/components/triage/TriageQueue'
import { QRGenerator } from '@/components/qr/QRGenerator'
import { QRScanner } from '@/components/qr/QRScanner'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export default function DesktopDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>QR Generator</CardTitle></CardHeader>
          <CardContent><QRGenerator onGenerated={() => {}} /></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>QR Scanner</CardTitle></CardHeader>
          <CardContent><QRScanner onScan={() => {}} /></CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Active Sessions</CardTitle></CardHeader>
          <CardContent><TriageQueue sessions={[]} /></CardContent>
        </Card>
      </div>
    </div>
  )
}
