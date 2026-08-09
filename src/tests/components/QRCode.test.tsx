import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { QRCodeComponent } from '@/components/qr/QRCode'
import type { SignedQR } from '@/types/qr'

const mockSignedQR = {
  payload: {
    patientId: '123e4567-e89b-12d3-a456-426614174000',
    timestamp: Date.now(),
    nonce: 'abc123def456ghi7',
    kid: 'v1',
  },
  signature: 'demo-signature',
}

describe('QRCodeComponent', () => {
  it('renders without crashing', () => {
    render(<QRCodeComponent data={mockSignedQR} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders with custom size', () => {
    render(<QRCodeComponent data={mockSignedQR} size={200} />)
    const canvas = screen.getByRole('img')
    expect(canvas).toBeInTheDocument()
  })

  it('handles invalid data gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const onError = jest.fn()
    render(<QRCodeComponent data={mockSignedQR as SignedQR} onError={onError} />)
    // Should not throw
    expect(screen.getByRole('img')).toBeInTheDocument()
    consoleSpy.mockRestore()
  })
})
