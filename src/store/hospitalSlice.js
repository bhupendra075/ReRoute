import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  hospitals: [],
  selectedHospital: null,
  loading: false,
  error: null,
}

const hospitalSlice = createSlice({
  name: 'hospitals',
  initialState,
  reducers: {
    setHospitals(state, action) {
      state.hospitals = action.payload
    },
    setSelectedHospital(state, action) {
      state.selectedHospital = action.payload
    },
    updateHospitalCapacity(state, action) {
      state.hospitals = state.hospitals.map((h) =>
        h.id === action.payload.hospitalId
          ? { ...h, capacity: action.payload.capacity }
          : h,
      )
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
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