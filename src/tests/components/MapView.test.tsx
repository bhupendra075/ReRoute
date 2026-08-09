import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { MapView } from '@/components/map/MapView'

const mockHospitals = [
  {
    id: 'h1',
    name: 'Test Hospital',
    latitude: 40.7128,
    longitude: -74.006,
    address: '100 Main St',
    phone: '(555) 123-4567',
    specializations: ['ICU', 'TRAUMA'],
    capacity: { ICU: 5, TRAUMA: 8 },
    isActive: true,
    acceptsInsurance: ['TPA-001'],
  },
]

describe('MapView', () => {
  it('renders without crashing', () => {
    render(<MapView hospitals={mockHospitals} />)
    expect(screen.getByRole('img', { name: /hospital map/i })).toBeInTheDocument()
  })

  it('renders with custom height', () => {
    render(<MapView hospitals={mockHospitals} height="h-[300px]" />)
    const mapContainer = screen.getByRole('img', { name: /hospital map/i }).closest('div')
    expect(mapContainer).toHaveClass('h-[300px]')
  })

  it('renders with custom center and zoom', () => {
    render(<MapView hospitals={mockHospitals} center={[34.0522, -118.2437]} zoom={10} />)
    expect(screen.getByRole('img', { name: /hospital map/i })).toBeInTheDocument()
  })
})
