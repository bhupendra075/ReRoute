import { MapView } from '@/components/map/MapView'
import { TriageQueue } from '@/components/triage/TriageQueue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import type { Hospital } from '@/types'

// Mock data for demonstration
const mockHospitals: Hospital[] = [
  {
    id: 'demo-1',
    name: 'Central General Hospital',
    latitude: 40.7128,
    longitude: -74.0060,
    address: '100 Main St',
    phone: '(555) 123-4567',
    specializations: ['ICU', 'TRAUMA', 'CARDIAC'],
    capacity: { ICU: 5, CARDIAC: 3, STROKE: 2, BURN: 1, TRAUMA: 8, PEDIATRIC: 4, OBSTETRIC: 3, GENERAL: 12 },
    isActive: true,
    acceptsInsurance: ['TPA-001', 'TPA-002'],
  },
]

export default function CommandCenter() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">ER Command Center</h1>

      <Card>
        <CardHeader><CardTitle>Live Hospital Map</CardTitle></CardHeader>
        <CardContent>
          <MapView hospitals={mockHospitals} center={[40.7128, -74.006]} zoom={12} height="h-[400px]" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Triage Queue</CardTitle></CardHeader>
        <CardContent>
          <TriageQueue sessions={[]} />
        </CardContent>
      </Card>
    </div>
  )
}
