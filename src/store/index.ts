import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import triageReducer from './triageSlice'
import hospitalReducer from './hospitalSlice'
import sessionReducer from './sessionSlice'
import settingsReducer from './settingsSlice'
import { supabaseApi } from './api/supabaseApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    triage: triageReducer,
    hospitals: hospitalReducer,
    session: sessionReducer,
    settings: settingsReducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
