/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SUPABASE_SERVICE_ROLE_KEY: string
  readonly VITE_ORS_API_KEY: string
  readonly VITE_VAPID_PUBLIC_KEY: string
  readonly VITE_VAPID_PRIVATE_KEY: string
  readonly VITE_FCM_SERVER_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
