const PREFIX = 'reroute:'

export function getStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function setStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // Silently fail
  }
}

// IndexedDB wrapper for larger data (e.g., encryption keys)
const DB_NAME = 'reroute-offline'
const DB_VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('cache')) {
        db.createObjectStore('cache', { keyPath: 'key' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function getIndexedDB<T>(key: string, fallback: T): Promise<T> {
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx = db.transaction('cache', 'readonly')
      const store = tx.objectStore('cache')
      const request = store.get(key)
      request.onsuccess = () => resolve((request.result as T) ?? fallback)
      request.onerror = () => resolve(fallback)
    })
  } catch {
    return fallback
  }
}

export async function setIndexedDB(key: string, value: unknown): Promise<void> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction('cache', 'readwrite')
      const store = tx.objectStore('cache')
      store.put({ key, value })
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  } catch {
    // Silently fail
  }
}
