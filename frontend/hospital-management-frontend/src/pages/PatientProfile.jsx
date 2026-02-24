import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import {
  Home as HomeIcon,
  CalendarToday,
  History,
  LocalPharmacy,
  SmartToy as AssistantIcon,
  EventNote as ViewApptIcon,
  MonitorHeart as HealthIcon,
  Dashboard as DashboardIcon
} from "@mui/icons-material";
import PatientDetails from "../components/patient/PatientDetails";
import BookAppointment from "../components/patient/BookAppointment";
import ViewAppointments from "../components/patient/ViewAppointments";
import SmartAppointmentScheduling from "../components/common/SmartAppointmentScheduling";
import MedicalHistory from "../components/patient/MedicalHistory";
import Prescriptions from "../components/patient/Prescriptions";
import SymptomCheckerChatbot from "../components/ai/SymptomCheckerChatbot";
import HealthMonitor from "../components/patient/HealthMonitor";
import PatientDashboard from "../components/patient/PatientDashboard";
import { fetchPatientDetails } from "../services/patientService";
import LuxPortalShell from "../components/common/LuxPortalShell";

const navItems = [
  { id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'health-monitor', text: 'Health Monitor', icon: <HealthIcon /> },
  { id: 'profile', text: 'My Profile', icon: <HomeIcon /> },
  { id: 'ai-assistant', text: 'AI Symptom Check', icon: <AssistantIcon /> },
  { id: 'book-appointment', text: 'Smart Booking', icon: <CalendarToday /> },
  { id: 'view-appointments', text: 'My Appointments', icon: <ViewApptIcon /> },
  { id: 'medical-history', text: 'Medical History', icon: <History /> },
  { id: 'prescriptions', text: 'Prescriptions', icon: <LocalPharmacy /> },
];

function PatientProfile() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatientDetails()
      .then(data => { setUserData(data); setLoading(false); })
      .catch(() => { sessionStorage.clear(); navigate("/login"); });
  }, [navigate]);

  if (loading) return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  const renderContent = (view) => {
    switch (view) {
      case 'dashboard': return <PatientDashboard />;
      case 'health-monitor': return <HealthMonitor />;
      case 'profile': return <PatientDetails userData={userData} />;
      case 'ai-assistant': return <SymptomCheckerChatbot />;
      case 'book-appointment': return <SmartAppointmentScheduling />;
      case 'view-appointments': return <ViewAppointments />;
      case 'medical-history': return <MedicalHistory />;
      case 'prescriptions': return <Prescriptions />;
      default: return null;
    }
  };

  return (
    <LuxPortalShell
      navItems={navItems}
      title="LifeBridge Hospital — Patient"
      roleLabel="Patient"
      accentColor="primary"
      userName={`${userData.firstName || ''} ${userData.lastName || ''}`.trim()}
      renderContent={renderContent}
      defaultView="dashboard"
    />
  );
}

export default PatientProfile;
