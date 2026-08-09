import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

interface CapacityEditorProps {
  hospitalId: string
  currentCapacity: Record<string, number>
}

const CAPACITY_CATEGORIES = ['ICU', 'CARDIAC', 'STROKE', 'BURN', 'TRAUMA', 'PEDIATRIC', 'OBSTETRIC', 'GENERAL']

export function CapacityEditor({ currentCapacity }: Omit<CapacityEditorProps, 'hospitalId'>) {
  return (
    <Card>
      <CardHeader><CardTitle>Capacity Editor</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CAPACITY_CATEGORIES.map((cat) => (
            <div key={cat} className="space-y-1">
              <label htmlFor={`cap-${cat}`} className="block text-sm font-medium text-gray-700">{cat}</label>
              <input
                id={`cap-${cat}`}
                type="number"
                min="0"
                defaultValue={currentCapacity[cat] ?? 0}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
