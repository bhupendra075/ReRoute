import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSupabase } from '@/hooks/useSupabase'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { FormSection } from '@/components/forms/FormSection'

export default function ProfileSetup() {
  const navigate = useNavigate()
  const { from } = useSupabase()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const profile = {
      user_id: '',
      blood_type: formData.get('blood-type') as string,
      allergies: formData.get('allergies') as string | null,
      conditions: formData.get('conditions') as string | null,
      medications: formData.get('medications') as string | null,
      emergency_contact_name: formData.get('emergency-contact-name') as string | null,
      emergency_contact_phone: formData.get('emergency-contact-phone') as string | null,
      emergency_contact_relationship: formData.get('emergency-contact-relationship') as string | null,
    }

    const { error } = await from('health_profiles').insert(profile)
    if (error) throw error

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