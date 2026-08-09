// Type declarations for the reroute project

export type { QRPayload, SignedQR } from './qr'
export type { EmergencySession } from './triage'
export type { Hospital, InsuranceTPA } from './hospital'
export type { User } from './validation'

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
