import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assignment as TaskIcon,
  SupportAgent as SupportIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import LuxPortalShell from "../components/common/LuxPortalShell";
import StaffDashboard from "../components/staff/StaffDashboard";
import StaffTasksView from "../components/staff/StaffTasksView";
import StaffSupportView from "../components/staff/StaffSupportView";
import SettingsPanel from "../components/common/SettingsPanel";

const navItems = [
  { id: 'dashboard', text: 'Overview', icon: <DashboardIcon /> },
  { id: 'tasks', text: 'My Tasks', icon: <TaskIcon /> },
  { id: 'support', text: 'Support Center', icon: <SupportIcon /> },
  { id: 'settings', text: 'Settings', icon: <SettingsIcon /> },
];

function StaffProfile() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = (view) => {
    switch (view) {
      case 'dashboard':
        return <StaffDashboard onNavigate={setActiveView} />;
      case 'tasks':
        return <StaffTasksView />;
      case 'support':
        return <StaffSupportView />;
      case 'settings':
        return <SettingsPanel userName="Sam Staff" roleLabel="Staff Member" accentColor="primary" />;
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
      title="LifeBridge Hospital — Staff"
      roleLabel="Staff Member"
      accentColor="primary"
      userName="Sam Staff"
      renderContent={renderContent}
      defaultView="dashboard"
      activeView={activeView}
      onNavigate={setActiveView}
    />
  );
}

export default StaffProfile;
