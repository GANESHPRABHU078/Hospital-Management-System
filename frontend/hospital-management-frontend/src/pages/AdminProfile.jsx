import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  LocalHospital as DoctorIcon,
  Group as StaffIcon,
  Medication as NurseIcon,
  Business as DeptIcon,
  Science as LabIcon,
  Event as AppIcon,
  Hotel as BedIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import ViewPatientTable from "../components/tables/ViewPatientTable";
import ViewDoctorTable from "../components/tables/ViewDoctorTable";
import ViewStaffTable from "../components/tables/ViewStaffTable";
import ViewNuresTable from "../components/tables/ViewNursesTable";
import ViewDepartmentTable from "../components/tables/ViewDepartmentTable";
import ViewLablotryTable from "../components/tables/ViewLablotryTable";
import ViewAppointmentTable from "../components/tables/ViewAppointmentTable";
import AdminDashboard from "../components/admin/AdminDashboard";
import BedLiveTracking from "../components/admin/BedLiveTracking";
import { fetchAdminData } from "../services/adminService";
import LuxPortalShell from "../components/common/LuxPortalShell";

const navItems = [
  { id: 'dashboard', text: 'Overview', icon: <DashboardIcon /> },
  { id: 'manage-patients', text: 'Patients', icon: <PeopleIcon /> },
  { id: 'manage-doctors', text: 'Doctors', icon: <DoctorIcon /> },
  { id: 'manage-staff', text: 'Staff', icon: <StaffIcon /> },
  { id: 'manage-nures', text: 'Nurses', icon: <NurseIcon /> },
  { id: 'manage-department', text: 'Departments', icon: <DeptIcon /> },
  { id: 'manage-lablotry', text: 'Laboratory', icon: <LabIcon /> },
  { id: 'manage-appointment', text: 'Appointments', icon: <AppIcon /> },
  { id: 'manage-patientAdmit', text: 'Bed Management', icon: <BedIcon /> },
  { id: 'settings', text: 'Settings', icon: <SettingsIcon /> },
];

const ComingSoon = ({ label }) => (
  <Box sx={{ p: 6, textAlign: 'center' }}>
    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 700 }}>{label} — Coming Soon</Typography>
  </Box>
);

function AdminProfile() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminData()
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
      case 'dashboard': return <AdminDashboard />;
      case 'manage-patients': return <ViewPatientTable />;
      case 'manage-doctors': return <ViewDoctorTable />;
      case 'manage-staff': return <ViewStaffTable />;
      case 'manage-nures': return <ViewNuresTable />;
      case 'manage-department': return <ViewDepartmentTable />;
      case 'manage-lablotry': return <ViewLablotryTable />;
      case 'manage-appointment': return <ViewAppointmentTable />;
      case 'manage-patientAdmit': return <BedLiveTracking />;
      default: return <ComingSoon label={view} />;
    }
  };

  return (
    <LuxPortalShell
      navItems={navItems}
      title="LifeBridge Hospital — Admin"
      roleLabel="Administrator"
      accentColor="primary"
      userName={`${userData.firstName || ''} ${userData.lastName || ''}`.trim()}
      renderContent={renderContent}
      defaultView="dashboard"
    />
  );
}

export default AdminProfile;
