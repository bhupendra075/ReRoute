import { useState, useEffect } from 'react'
import { useSupabase } from '@/hooks/useSupabase'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

export interface InsuranceTPA {
  id: string
  name: string
  code: string
  networkHospitals?: string[]
  cashlessTiers?: Record<string, string[]>
  isActive: boolean
}

export default function InsuranceTPAManager() {
  const { from } = useSupabase()
  const [tpas, setTpas] = useState<InsuranceTPA[]>([])
  const [editing, setEditing] = useState<InsuranceTPA | null>(null)
  const [formTpa, setFormTpa] = useState<Partial<InsuranceTPA>>({
    name: '',
    code: '',
    isActive: true,
  })

  // Load TPAs on mount
  useEffect(() => {
    ;(async () => {
      const { data, error } = await from('insurance_tpas').select('*')
      if (error) console.error('Error loading TPAs:', error)
      else setTpas(data || [])
    })()
  }, [])

  const handleSubmit = async () => {
    const tpaData = {
      ...formTpa,
      isEditing: editing ? editing.id : undefined,
    } as InsuranceTPA

    try {
      if (editing) {
        // Update existing TPA
        const { error } = await from('insurance_tpas')
          .update({
            name: formTpa.name,
            code: formTpa.code,
            cashlessTiers: formTpa.cashlessTiers,
            isActive: formTpa.isActive,
          })
          .eq('id', editing.id)
        if (error) throw error
      } else {
        // Create new TPA
        const { error } = await from('insurance_tpas').insert({
          name: formTpa.name,
          code: formTpa.code,
          cashlessTiers: formTpa.cashlessTiers,
          isActive: formTpa.isActive,
        })
        if (error) throw error
      }

      setTpas((prev) =>
        editing
          ? prev.map((t) => (t.id === editing.id ? tpaData : t))
          : [...prev, tpaData]
      )
      setEditing(null)
      setFormTpa({ name: '', code: '', isActive: true })
    } catch (err) {
      console.error('TPA save error:', err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await from('insurance_tpas').delete().eq('id', id)
      if (error) throw error
      setTpas(tpas.filter((t) => t.id !== id))
    } catch (err) {
      console.error('TPA delete error:', err)
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Insurance TPA Management</h1>

      {/* TPA List */}
      <Card>
        <CardHeader><CardTitle>TPA Cards</CardTitle></CardHeader>
        <CardContent>
          {tpas.length === 0 ? (
            <p className="text-gray-600">No TPA cards configured</p>
          ) : (
            <div className="space-y-2">
              {tpas.map((tpa) => (
                <div key={tpa.id} className="p-3 border rounded-lg flex items-center justify-between">
                  <span>
                    <strong>{tpa.name}</strong> ({tpa.code})
                    {tpa.networkHospitals && tpa.networkHospitals.length > 0 && (
                      <span className="text-sm text-gray-500">
                        • {tpa.networkHospitals.length} network hospitals
                      </span>
                    )}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => setEditing(tpa)}
                      title="Edit"
                    >
                      ✏️
                    </Button>
                    <Button
                      variant="ghost"
                        onClick={() => handleDelete(tpa.id)}
                        title="Delete"
                      >
                        🗑️
                      </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* TPA Form */}
      {editing ? (
        <Card>
          <CardHeader><CardTitle>Edit TPA Card</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="TPA Name"
                value={editing?.name || ''}
                onChange={(e) => setFormTpa({ ...formTpa, name: e.target.value })}
                required
              />
              <Input
                name="code"
                placeholder="TPA Code/Membership ID"
                value={editing?.code || ''}
                onChange={(e) =>
                  setFormTpa({ ...formTpa, code: e.target.value })
                }
                required
              />
              <Select
                name="isActive"
                options={[
                  { value: 'true', label: 'Active' },
                  { value: 'false', label: 'Inactive' },
                ]}
                value={editing?.isActive === false ? 'false' : 'true'}
                onChange={(e) =>
                  setFormTpa({ ...formTpa, isActive: e.target.value === 'false' })
                }
                required
              />
              <Button type="submit" variant="primary">
                {editing ? 'Update TPA' : 'Add TPA'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setEditing(null)
                  setFormTpa({ name: '', code: '', isActive: true })
                }}
                style={{ marginLeft: '10px' }}>
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader><CardTitle>Add New TPA Card</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="TPA Name"
                onChange={(e) =>
                  setFormTpa({ ...formTpa, name: e.target.value })
                }
                required
              />
              <Input
                name="code"
                placeholder="TPA Code/Membership ID"
                onChange={(e) =>
                  setFormTpa({ ...formTpa, code: e.target.value })
                }
                required
              />
              <Select
                name="isActive"
                options={[
                  { value: 'true', label: 'Active' },
                  { value: 'false', label: 'Inactive' },
                ]}
                value="true"
                onChange={(e) =>
                  setFormTpa({ ...formTpa, isActive: e.target.value === 'false' })
                }
                required
              />
              <Button type="submit" variant="primary">Add TPA</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}