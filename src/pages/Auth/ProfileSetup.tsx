import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { FormSection } from '@/components/forms/FormSection'

export default function ProfileSetup() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Profile setup logic — would save to Supabase health_profiles table
    setLoading(false)
    navigate('/dashboard/mobile')
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title="Medical Information" description="This data is encrypted end-to-end and never stored in plaintext on our servers.">
          <Select label="Blood Type" options={[
            { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
            { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
            { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
            { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
            { value: 'Unknown', label: 'Unknown' },
          ]} />
          <Input label="Allergies" placeholder="e.g. penicillin, latex" />
          <Input label="Conditions" placeholder="e.g. diabetes, hypertension" />
          <Input label="Medications" placeholder="e.g. aspirin 81mg, insulin" />
        </FormSection>

        <FormSection title="Emergency Contacts">
          <Input label="Contact Name" placeholder="Full name" />
          <Input label="Phone" placeholder="Phone number" />
          <Input label="Relationship" placeholder="e.g. spouse, parent" />
        </FormSection>

        <Button type="submit" variant="primary" loading={loading}>
          Save Profile
        </Button>
      </form>
    </div>
  )
}
