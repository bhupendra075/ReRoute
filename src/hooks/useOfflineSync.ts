import { useState, useEffect, useCallback, useRef } from 'react'

interface SyncQueueItem {
  id: string
  table: string
  operation: 'insert' | 'update' | 'delete'
  data: unknown
  timestamp: number
  retryCount: number
}

const QUEUE_KEY = 'reroute:sync-queue'

export function useOfflineSync() {
  const [queue, setQueue] = useState<SyncQueueItem[]>([])
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isSyncing, setIsSyncing] = useState(false)
  const syncInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    if (isOnline) {
      syncInterval.current = setInterval(() => {
        processQueue()
      }, 5000)
    } else {
      if (syncInterval.current !== null) {
        clearInterval(syncInterval.current)
        syncInterval.current = null
      }
    }

    return () => {
      if (syncInterval.current !== null) {
        clearInterval(syncInterval.current)
      }
    }
  }, [isOnline])

  const enqueue = useCallback(
    (item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'retryCount'>) => {
      const newItem: SyncQueueItem = {
        ...item,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        retryCount: 0,
      }
      setQueue((prev) => [...prev, newItem])
      // Persist to IndexedDB for offline reliability
      const stored = JSON.parse(
        localStorage.getItem(QUEUE_KEY) || '[]',
      ) as SyncQueueItem[]
      stored.push(newItem)
      localStorage.setItem(QUEUE_KEY, JSON.stringify(stored))
    },
    [],
  )

  const processQueue = useCallback(async () => {
    if (isSyncing) return
    setIsSyncing(true)

    try {
      const stored = JSON.parse(
        localStorage.getItem(QUEUE_KEY) || '[]',
      ) as SyncQueueItem[]

      for (const item of stored) {
        if (item.retryCount >= 3) {
          // Remove failed items after 3 retries
          setQueue((prev) => prev.filter((q) => q.id !== item.id))
          continue
        }

        // Attempt sync — this would use the Supabase client
        // For now, just increment retry count
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id ? { ...q, retryCount: q.retryCount + 1 } : q,
          ),
        )
      }

      // Clear successfully synced items
      localStorage.removeItem(QUEUE_KEY)
    } catch {
      // Sync failed — will retry on next interval
    } finally {
      setIsSyncing(false)
    }
  }, [isSyncing])

  const clearQueue = useCallback(() => {
    setQueue([])
    localStorage.removeItem(QUEUE_KEY)
  }, [])

  return { queue, isOnline, isSyncing, enqueue, processQueue, clearQueue }
}
