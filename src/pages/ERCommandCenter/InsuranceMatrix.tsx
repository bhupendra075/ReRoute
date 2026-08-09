import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

interface InsuranceMatrixProps {
  tpas: Array<{ id: string; name: string; code: string; tiers: string[] }>
}

export function InsuranceMatrix({ tpas }: InsuranceMatrixProps) {
  return (
    <Card>
      <CardHeader><CardTitle>Insurance Coverage Matrix</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 font-medium">TPA</th>
                <th className="text-left py-2 px-3 font-medium">Code</th>
                <th className="text-left py-2 px-3 font-medium">Tier 1</th>
                <th className="text-left py-2 px-3 font-medium">Tier 2</th>
              </tr>
            </thead>
            <tbody>
              {tpas.map((tpa) => (
                <tr key={tpa.id} className="border-b">
                  <td className="py-2 px-3">{tpa.name}</td>
                  <td className="py-2 px-3 font-mono">{tpa.code}</td>
                  <td className="py-2 px-3">{tpa.tiers[0] ?? '—'}</td>
                  <td className="py-2 px-3">{tpa.tiers[1] ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
