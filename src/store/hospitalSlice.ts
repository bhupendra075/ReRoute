import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Hospital } from '@/types'

interface HospitalState {
  hospitals: Hospital[]
  selectedHospital: Hospital | null
  loading: boolean
  error: string | null
}

const initialState: HospitalState = {
  hospitals: [],
  selectedHospital: null,
  loading: false,
  error: null,
}

const hospitalSlice = createSlice({
  name: 'hospitals',
  initialState,
  reducers: {
    setHospitals(state, action: PayloadAction<Hospital[]>) {
      state.hospitals = action.payload
    },
    setSelectedHospital(state, action: PayloadAction<Hospital | null>) {
      state.selectedHospital = action.payload
    },
    updateHospitalCapacity(
      state,
      action: PayloadAction<{ hospitalId: string; capacity: Record<string, number> }>,
    ) {
      state.hospitals = state.hospitals.map((h) =>
        h.id === action.payload.hospitalId
          ? { ...h, capacity: action.payload.capacity }
          : h,
      )
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const {
  setHospitals,
  setSelectedHospital,
  updateHospitalCapacity,
  setLoading,
  setError,
  clearError,
} = hospitalSlice.actions
export default hospitalSlice.reducer
