import { TriageQueue } from '@/components/triage/TriageQueue'
import { QRGenerator } from '@/components/qr/QRGenerator'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export default function MobileDashboard() {
  return (
    <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <QRGenerator onGenerated={() => {}} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Active Sessions</CardTitle></CardHeader>
        <CardContent>
          <TriageQueue sessions={[]} />
        </CardContent>
      </Card>
    </div>
  )
}
