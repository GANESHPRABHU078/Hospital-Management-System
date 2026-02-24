import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  EventNote as ApptIcon,
  People as PatientsIcon,
  MenuBook as RecordsIcon,
  AutoAwesome as AiIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import MedicalSummaryAI from "../components/ai/MedicalSummaryAI";
import DoctorDashboard from "../components/doctor/DoctorDashboard";
import MedicalRecordsView from "../components/doctor/MedicalRecordsView";
import LuxPortalShell from "../components/common/LuxPortalShell";
import ViewAppointmentTable from "../components/tables/ViewAppointmentTable";
import ViewPatientTable from "../components/tables/ViewPatientTable";
import SettingsPanel from "../components/common/SettingsPanel";

const navItems = [
  { id: 'dashboard', text: 'Overview', icon: <DashboardIcon /> },
  { id: 'ai-insights', text: 'AI Insights', icon: <AiIcon /> },
  { id: 'appointments', text: 'My Appointments', icon: <ApptIcon /> },
  { id: 'patients', text: 'My Patients', icon: <PatientsIcon /> },
  { id: 'records', text: 'Medical Records', icon: <RecordsIcon /> },
  { id: 'settings', text: 'Settings', icon: <SettingsIcon /> },
];

function DoctorProfile() {
  const [userData] = useState({ firstName: "John", lastName: "Doe" });
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = (view) => {
    switch (view) {
      case 'dashboard':
        return <DoctorDashboard onNavigate={setActiveView} />;
      case 'ai-insights':
        return <MedicalSummaryAI />;
      case 'appointments':
        return <ViewAppointmentTable />;
      case 'patients':
        return <ViewPatientTable />;
      case 'records':
        return <MedicalRecordsView />;
      case 'settings':
        return <SettingsPanel userName={`Dr. ${userData.firstName} ${userData.lastName}`} roleLabel="Physician" accentColor="secondary" />;
      default:
        return (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 700 }}>{view} — Coming Soon</Typography>
          </Box>
        );
    }
  };

  return (
    <LuxPortalShell
      navItems={navItems}
      title="LifeBridge Hospital — Doctor"
      roleLabel="Physician"
      accentColor="secondary"
      userName={`Dr. ${userData.firstName} ${userData.lastName}`}
      renderContent={renderContent}
      defaultView="dashboard"
      activeView={activeView}
      onNavigate={setActiveView}
    />
  );
}

export default DoctorProfile;
