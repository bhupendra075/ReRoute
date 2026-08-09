import L from 'leaflet'
import type { Hospital } from '@/types/hospital'

export function createHospitalIcon(hospital: Hospital): L.DivIcon {
  const color = hospital.isActive ? '#22c55e' : '#ef4444'
  return L.divIcon({
    className: 'custom-hospital-marker',
    html: `<div style="background:${color};width:24px;height:24px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:bold;">${hospital.specializations[0]?.[0] ?? 'H'}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  })
}
