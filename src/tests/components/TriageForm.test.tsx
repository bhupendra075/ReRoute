import { describe, it, expect } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import { TriageForm } from '@/components/triage/TriageForm'

describe('TriageForm', () => {
  it('renders without crashing', () => {
    render(<TriageForm onSubmit={jest.fn()} />)
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('shows validation errors on submit', async () => {
    render(<TriageForm onSubmit={jest.fn()} />)
    const submitButton = screen.getByRole('button', { name: /create session/i })
    fireEvent.click(submitButton)

    expect(screen.getByText(/patient id is required/i)).toBeInTheDocument()
  })

  it('calls onSubmit with form data when valid', async () => {
    const onSubmit = jest.fn()
    render(<TriageForm onSubmit={onSubmit} />)

    fireEvent.change(screen.getByLabelText(/patient id/i), { target: { value: '123e4567-e89b-12d3-a456-426614174000' } })
    fireEvent.change(screen.getByLabelText(/origin latitude/i), { target: { value: '40.7128' } })
    fireEvent.change(screen.getByLabelText(/origin longitude/i), { target: { value: '-74.006' } })
    fireEvent.click(screen.getByRole('button', { name: /create session/i }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        patientId: '123e4567-e89b-12d3-a456-426614174000',
        originLat: 40.7128,
        originLng: -74.006,
        priority: 'standard',
        status: 'active',
      }),
    )
  })

  it('renders with initial data for editing', () => {
    const initialData = {
      patientId: 'existing-patient',
      status: 'active' as const,
      originLat: 40.7128,
      originLng: -74.006,
      priority: 'urgent' as const,
    }
    render(<TriageForm onSubmit={jest.fn()} initialData={initialData} />)

    expect(screen.getByLabelText(/patient id/i)).toHaveValue('existing-patient')
    expect(screen.getByLabelText(/priority/i)).toHaveValue('urgent')
  })
})
