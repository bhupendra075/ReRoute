import React from 'react'

export const MapContainer: React.FC<any> = ({ children }) => <div>{children}</div>
export const TileLayer: React.FC<any> = () => <div />
export const Marker: React.FC<any> = () => <div />
export const useMap = () => ({ setView: () => {} })
export const useMapEvent = () => ({})
export const useMapEvents = () => ({})

export default {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvent,
  useMapEvents,
}
