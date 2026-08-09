import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import AppLayout from './components/layout/AppLayout'
import Index from './pages/Index'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ProfileSetup from './pages/Auth/ProfileSetup'
import MobileDashboard from './pages/Dashboard/MobileDashboard'
import DesktopDashboard from './pages/Dashboard/DesktopDashboard'
import Trigger from './pages/Emergency/Trigger'
import Passport from './pages/Emergency/Passport'
import CommandCenter from './pages/ERCommandCenter/CommandCenter'
import Settings from './pages/Settings'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Index />} />
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/register" element={<Register />} />
            <Route path="auth/setup" element={<ProfileSetup />} />
            <Route path="dashboard/mobile" element={<MobileDashboard />} />
            <Route path="dashboard/desktop" element={<DesktopDashboard />} />
            <Route path="emergency/trigger" element={<Trigger />} />
            <Route path="emergency/passport" element={<Passport />} />
            <Route path="er/command-center" element={<CommandCenter />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
