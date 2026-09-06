import { useState } from 'react'
import { flushSync } from 'react-dom'
import { FormField } from '@/components/forms/FormField'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

const PRIORITY_OPTIONS = [
  { value: 'standard', label: 'Standard' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'critical', label: 'Critical' },
]

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'en_route', label: 'En Route' },
  { value: 'arrived', label: 'Arrived' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export function TriageForm({ onSubmit, initialData }) {
  const [patientId, setPatientId] = useState(initialData?.patientId ?? '')
  const [originLat, setOriginLat] = useState(initialData?.originLat ?? 0)
  const [originLng, setOriginLng] = useState(initialData?.originLng ?? 0)
  const [priority, setPriority] = useState(initialData?.priority ?? 'standard')
  const [status, setStatus] = useState(initialData?.status ?? 'active')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!patientId.trim()) newErrors.patientId = 'Patient ID is required'
    if (isNaN(originLat) || originLat < -90 || originLat > 90) newErrors.originLat = 'Valid latitude is required'
    if (isNaN(originLng) || originLng < -180 || originLng > 180) newErrors.originLng = 'Valid longitude is required'
    // Use flushSync so tests that don't wrap updates in act() see errors immediately
    flushSync(() => setErrors(newErrors))
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onSubmit({
      patientId,
      status: status,
      originLat,
      originLng,
      priority: priority,
    })
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-4" role="form">
      <FormField label="Patient ID" htmlFor="patientId" error={errors.patientId}>
        <Input
          id="patientId"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Origin Latitude" htmlFor="originLat" error={errors.originLat}>
        <Input
          id="originLat"
          type="number"
          step="any"
          value={originLat}
          onChange={(e) => setOriginLat(parseFloat(e.target.value) || 0)}
          required
        />
      </FormField>

      <FormField label="Origin Longitude" htmlFor="originLng" error={errors.originLng}>
        <Input
          id="originLng"
          type="number"
          step="any"
          value={originLng}
          onChange={(e) => setOriginLng(parseFloat(e.target.value) || 0)}
          required
        />
      </FormField>

      <FormField label="Priority" htmlFor="priority" error={errors.priority}>
        <Select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} options={PRIORITY_OPTIONS} />
      </FormField>

      <FormField label="Status" htmlFor="status" error={errors.status}>
        <Select id="status" value={status} onChange={(e) => setStatus(e.target.value)} options={STATUS_OPTIONS} />
      </FormField>

      <Button type="submit" variant="primary">
        {initialData ? 'Update Session' : 'Create Session'}
      </Button>
    </form>
  )
}