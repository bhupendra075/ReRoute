export const APP_NAME = 'reroute'
export const APP_VERSION = '1.0.0'

export const BREAKPOINTS = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const TEST_IDS = {
  qrGenerator: 'qr-generator',
  qrScanner: 'qr-scanner',
  triageForm: 'triage-form',
  triageCard: 'triage-card',
  triageQueue: 'triage-queue',
  mapView: 'map-view',
  routeCard: 'route-card',
  hospitalMarker: 'hospital-marker',
  commandCenter: 'command-center',
  liveMap: 'live-map',
  capacityEditor: 'capacity-editor',
  insuranceMatrix: 'insurance-matrix',
  loginButton: 'login-button',
  registerButton: 'register-button',
  emergencyTrigger: 'emergency-trigger',
} as const

export const QR_NONCE_LENGTH = 16
export const QR_KEY_ID = 'v1'
export const QR_CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes
export const SESSION_EXPIRY_HOURS = 24
export const PUBLIC_KEY_CACHE_TTL_MS = 5 * 60 * 1000

export const HOSPITAL_SPECIALIZATIONS = [
  'ICU',
  'CARDIAC',
  'STROKE',
  'BURN',
  'TRAUMA',
  'PEDIATRIC',
  'OBSTETRIC',
  'GENERAL',
] as const

export const SESSION_STATUSES = [
  'active',
  'en_route',
  'arrived',
  'completed',
  'cancelled',
] as const

export const PRIORITY_LEVELS = ['standard', 'urgent', 'critical'] as const

export const USER_ROLES = ['patient', 'paramedic', 'dispatcher', 'er_staff', 'admin'] as const
