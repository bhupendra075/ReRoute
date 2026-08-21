import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import type { InsuranceTPA } from '@/types/hospital'

interface InsuranceMatrixProps {
  tpas: InsuranceTPA[]
}

export function InsuranceMatrix({ tpas }: InsuranceMatrixProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insurance Coverage Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        {tpas.length === 0 ? (
          <p className="text-sm text-gray-500">No TPA data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium">TPA</th>
                  <th className="text-left py-2 px-3 font-medium">Code</th>
                  <th className="text-left py-2 px-3 font-medium">Status</th>
                  <th className="text-left py-2 px-3 font-medium">Network Hospitals</th>
                  <th className="text-left py-2 px-3 font-medium">Cashless Tiers</th>
                </tr>
              </thead>
              <tbody>
                {tpas.map((tpa) => (
                  <tr key={tpa.id} className="border-b">
                    <td className="py-2 px-3 font-medium">{tpa.name}</td>
                    <td className="py-2 px-3 font-mono text-xs">{tpa.code}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          tpa.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {tpa.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-600">
                      {tpa.networkHospitals && tpa.networkHospitals.length > 0
                        ? `${tpa.networkHospitals.length} hospitals`
                        : '—'}
                    </td>
                    <td className="py-2 px-3">
                      {tpa.cashlessTiers ? (
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(tpa.cashlessTiers).map(([tier, hospitals]) => (
                            <span
                              key={tier}
                              className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs"
                              title={`${tier}: ${hospitals.join(', ')}`}
                            >
                              {tier}
                            </span>
                          ))}
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
