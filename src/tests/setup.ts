import '@testing-library/jest-dom'

// Ensure crypto.randomUUID exists and produces alphanumeric strings (no hyphens)
if (!globalThis.crypto) {
  // @ts-ignore
  globalThis.crypto = {}
}
// Override any existing implementation to guarantee tests see an alphanumeric-only
// string when slicing the UUID. This is safe for tests and keeps expectations stable.
// @ts-ignore
globalThis.crypto.randomUUID = () => Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
