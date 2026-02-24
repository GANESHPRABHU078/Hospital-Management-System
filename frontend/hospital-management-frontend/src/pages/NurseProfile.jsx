import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AssignmentTurnedIn as DutyIcon,
  People as PatientsIcon,
  LocalHospital as MedsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import LuxPortalShell from "../components/common/LuxPortalShell";
import NurseDashboard from "../components/nurse/NurseDashboard";
import NurseDutyView from "../components/nurse/NurseDutyView";
import NursePatientCareView from "../components/nurse/NursePatientCareView";
import NurseMedLogView from "../components/nurse/NurseMedLogView";
import SettingsPanel from "../components/common/SettingsPanel";

const navItems = [
  { id: 'dashboard', text: 'Overview', icon: <DashboardIcon /> },
  { id: 'duty', text: 'Duty Schedule', icon: <DutyIcon /> },
  { id: 'patients', text: 'Patient Care', icon: <PatientsIcon /> },
  { id: 'meds', text: 'Medication Log', icon: <MedsIcon /> },
  { id: 'settings', text: 'Settings', icon: <SettingsIcon /> },
];

function NurseProfile() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = (view) => {
    switch (view) {
      case 'dashboard':
        return <NurseDashboard onNavigate={setActiveView} />;
      case 'duty':
        return <NurseDutyView />;
      case 'patients':
        return <NursePatientCareView />;
      case 'meds':
        return <NurseMedLogView />;
      case 'settings':
        return <SettingsPanel userName="Alice Nurse" roleLabel="Nurse" accentColor="secondary" />;
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
      title="LifeBridge Hospital — Nursing"
      roleLabel="Nurse"
      accentColor="secondary"
      userName="Alice Nurse"
      renderContent={renderContent}
      defaultView="dashboard"
      activeView={activeView}
      onNavigate={setActiveView}
    />
  );
}

export default NurseProfile;
