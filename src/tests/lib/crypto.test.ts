import { describe, it, expect } from '@jest/globals'

describe('crypto helpers', () => {
  it('generates a nonce of the correct length', () => {
    const nonce = crypto.randomUUID().slice(0, 16)
    expect(nonce.length).toBe(16)
  })

  it('nonce contains only valid characters', () => {
    const nonce = crypto.randomUUID().slice(0, 16)
    expect(nonce).toMatch(/^[a-zA-Z0-9]+$/)
  })
})
