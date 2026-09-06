const PREFIX = 'reroute:'

export function getStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function setStorage(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // Silently fail
  }
}

// IndexedDB wrapper for larger data (e.g., encryption keys)
const DB_NAME = 'reroute-offline'
const DB_VERSION = 1

function openDB() {
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

export async function getIndexedDB(key, fallback) {
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx = db.transaction('cache', 'readonly')
      const store = tx.objectStore('cache')
      const request = store.get(key)
      request.onsuccess = () => resolve(request.result ?? fallback)
      request.onerror = () => resolve(fallback)
    })
  } catch {
    return fallback
  }
}

export async function setIndexedDB(key, value) {
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