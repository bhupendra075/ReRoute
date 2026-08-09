import { supabase } from '@/lib/supabaseClient'
import { useEffect } from 'react'

export function useSupabase() {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {})

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const from = (table: string) => supabase.from(table)

  return { supabase, from }
}
