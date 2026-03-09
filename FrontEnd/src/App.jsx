import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PatientDashboard from './pages/PatientDashboard';
import EmergencyMode from './pages/EmergencyMode';
import LiveEmergencyMap from './pages/LiveEmergencyMap';
import DoctorAlert from './pages/DoctorAlert';
import DoctorNavigation from './pages/DoctorNavigation';
import DoctorProfile from './pages/DoctorProfile';
import IncidentReport from './pages/IncidentReport';
import AdminDashboard from './pages/AdminDashboard';

import Login from './pages/Login';
import DoctorOnboarding from './pages/DoctorOnboarding';
import Notifications from './pages/Notifications';
import MedicalRecords from './pages/MedicalRecords';
import VitalsHistory from './pages/VitalsHistory';
import Settings from './pages/Settings';
import SupportCenter from './pages/SupportCenter';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Original screens */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/emergency" element={<EmergencyMode />} />
        <Route path="/map" element={<LiveEmergencyMap />} />
        <Route path="/doctor-alert" element={<DoctorAlert />} />
        <Route path="/doctor-nav" element={<DoctorNavigation />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/incident" element={<IncidentReport />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* New screens from Stitch remix */}
        <Route path="/login" element={<Login />} />
        <Route path="/doctor-onboarding" element={<DoctorOnboarding />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/vitals" element={<VitalsHistory />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<SupportCenter />} />
        {/* Fallback */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
