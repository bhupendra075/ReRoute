import { describe, it, expect } from '@jest/globals'
import { shallowEqual } from 'react-redux'

describe('shallowEqual equality function', () => {
  describe('arrays', () => {
    it('returns true for same reference', () => {
      const a = [{ id: '1', name: 'A' }]
      expect(shallowEqual(a, a)).toBe(true)
    })

    it('returns false for arrays with different lengths', () => {
      const a = [{ id: '1', name: 'A' }]
      const b = [{ id: '1', name: 'A' }, { id: '2', name: 'B' }]
      expect(shallowEqual(a, b)).toBe(false)
    })

    it('returns false for arrays with different element references', () => {
      const a = [{ id: '1', name: 'A' }]
      const b = [{ id: '1', name: 'A' }] // Different object reference
      expect(shallowEqual(a, b)).toBe(false)
    })

    it('returns true for empty arrays (same reference)', () => {
      const a: unknown[] = []
      expect(shallowEqual(a, a)).toBe(true)
    })
  })

  describe('objects', () => {
    it('returns true for identical objects (same reference)', () => {
      const a = { id: '1', name: 'A', active: true }
      expect(shallowEqual(a, a)).toBe(true)
    })

    it('returns false when keys differ', () => {
      const a = { id: '1', name: 'A' }
      const b = { id: '1', name: 'A', extra: 'value' }
      expect(shallowEqual(a, b)).toBe(false)
    })

    it('returns false when values differ', () => {
      const a = { id: '1', name: 'A' }
      const b = { id: '1', name: 'B' }
      expect(shallowEqual(a, b)).toBe(false)
    })

    it('returns false when nested object reference differs', () => {
      const a = { id: '1', config: { theme: 'dark' } }
      const b = { id: '1', config: { theme: 'dark' } }
      expect(shallowEqual(a, b)).toBe(false) // shallowEqual doesn't deep compare
    })

    it('returns true when nested object is same reference', () => {
      const config = { theme: 'dark' }
      const a = { id: '1', config }
      const b = { id: '1', config }
      expect(shallowEqual(a, b)).toBe(true)
    })
  })

  describe('primitives', () => {
    it('returns true for identical strings', () => {
      expect(shallowEqual('hello', 'hello')).toBe(true)
    })

    it('returns false for different strings', () => {
      expect(shallowEqual('hello', 'world')).toBe(false)
    })

    it('returns true for identical numbers', () => {
      expect(shallowEqual(42, 42)).toBe(true)
    })

    it('returns false for different numbers', () => {
      expect(shallowEqual(42, 43)).toBe(false)
    })

    it('returns true for identical booleans', () => {
      expect(shallowEqual(true, true)).toBe(true)
      expect(shallowEqual(false, false)).toBe(true)
    })

    it('returns false for different booleans', () => {
      expect(shallowEqual(true, false)).toBe(false)
    })

    it('returns true for null', () => {
      expect(shallowEqual(null, null)).toBe(true)
    })

    it('returns true for undefined', () => {
      expect(shallowEqual(undefined, undefined)).toBe(true)
    })

    it('returns false for null vs undefined', () => {
      expect(shallowEqual(null, undefined)).toBe(false)
    })
  })

  describe('mixed types', () => {
    it('returns true for empty array vs empty object (both have no own enumerable properties)', () => {
      // shallowEqual checks own enumerable properties - both [] and {} have none
      expect(shallowEqual([], {})).toBe(true)
    })

    it('returns false for array vs primitive', () => {
      expect(shallowEqual([], 'string')).toBe(false)
    })
  })
})