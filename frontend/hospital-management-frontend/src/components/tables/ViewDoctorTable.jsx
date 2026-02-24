import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Avatar,
  Typography,
  Chip,
  alpha,
  useTheme,
  Alert,
  Snackbar,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Badge as BadgeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import LuxDataGrid from "../common/LuxDataGrid";

import {
  fetchAllDoctors,
  registerDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../services/doctorService";

const DOCTOR_AVATARS = [
  'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
  'https://cdn-icons-png.flaticon.com/512/2785/2785482.png',
  'https://cdn-icons-png.flaticon.com/512/6069/6069189.png'
];

function ViewDoctorTable() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const theme = useTheme();

  const [currentDoctor, setCurrentDoctor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: null,
    city: "",
    state: "",
    country: "",
    password: "",
    joiningDate: null,
    specialization: "",
    bloodGroup: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const specializations = [
    "Cardiology", "Dermatology", "Neurology", "Pediatrics",
    "Orthopedics", "Psychiatry", "General Medicine",
  ];

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await fetchAllDoctors();
      setDoctors(data);
    } catch (error) {
      setErrorMessage("Failed to fetch doctors");
      setShowError(true);
    }
  };

  const handleOpenModal = (mode, doctor = null) => {
    setFormMode(mode);
    if (mode === "edit" && doctor) {
      setCurrentDoctor({
        ...doctor,
        joiningDate: doctor.joiningDate ? new Date(doctor.joiningDate) : null,
        dateOfBirth: doctor.dateOfBirth ? new Date(doctor.dateOfBirth) : null,
        password: "",
      });
    } else {
      setCurrentDoctor({
        firstName: "", lastName: "", email: "", phoneNumber: "",
        gender: "", dateOfBirth: null, city: "", state: "",
        country: "", password: "", joiningDate: null,
        specialization: "", bloodGroup: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (formMode === "add") {
        await registerDoctor(currentDoctor);
        setSuccessMessage("Doctor added successfully!");
      } else {
        await updateDoctor(currentDoctor.email, currentDoctor);
        setSuccessMessage("Doctor updated successfully!");
      }
      await loadDoctors();
      setShowSuccess(true);
      handleCloseModal();
    } catch (error) {
      setErrorMessage("Operation failed: " + (error.response?.data || error.message));
      setShowError(true);
    }
  };

  const handleDeleteDoctor = async (email) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteDoctor(email);
        await loadDoctors();
        setSuccessMessage("Doctor deleted successfully!");
        setShowSuccess(true);
      } catch (error) {
        setErrorMessage("Delete failed");
        setShowError(true);
      }
    }
  };

  const columns = [
    {
      id: 'name',
      label: 'Doctor Name',
      render: (val, row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={DOCTOR_AVATARS[row.doctorId % 3]} sx={{ width: 44, height: 44, border: '2px solid', borderColor: 'divider' }} />
          <Box>
            <Typography variant="subtitle2" fontWeight={800}>{row.firstName} {row.lastName}</Typography>
            <Typography variant="caption" color="text.secondary">ID: {row.doctorId || 'NEW'}</Typography>
          </Box>
        </Box>
      )
    },
    {
      id: 'specialization',
      label: 'Specialization',
      render: (val) => (
        <Chip
          label={val}
          size="small"
          sx={{
            fontWeight: 700,
            borderRadius: '10px',
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            color: 'primary.main',
            border: 'none'
          }}
        />
      )
    },
    {
      id: 'email',
      label: 'Contact Details',
      render: (val, row) => (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <EmailIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
            <Typography variant="caption" fontWeight={500}>{val}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
            <Typography variant="caption" fontWeight={500}>{row.phoneNumber}</Typography>
          </Box>
        </Box>
      )
    },
    {
      id: 'joiningDate',
      label: 'Joined',
      render: (val) => (
        <Typography variant="caption" fontWeight={600} color="text.secondary">
          {val ? new Date(val).toLocaleDateString() : 'N/A'}
        </Typography>
      )
    }
  ];

  const actions = (row) => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        size="small"
        onClick={() => handleOpenModal("edit", row)}
        sx={{ minWidth: 40, borderRadius: '10px', color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.05) }}
      >
        <EditIcon fontSize="small" />
      </Button>
      <Button
        size="small"
        color="error"
        onClick={() => handleDeleteDoctor(row.email)}
        sx={{ minWidth: 40, borderRadius: '10px', bgcolor: alpha(theme.palette.secondary.main, 0.05) }}
      >
        <DeleteIcon fontSize="small" />
      </Button>
    </Box>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.02em' }}>
          Doctor Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal("add")}
          sx={{ borderRadius: '16px', px: 4, py: 1.5, fontWeight: 800 }}
        >
          Register Doctor
        </Button>
      </Box>

      <LuxDataGrid
        title="Physicians & Specialists"
        columns={columns}
        data={doctors}
        actions={actions}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog
          open={showModal}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="md"
          PaperProps={{ sx: { borderRadius: '32px', p: 2 } }}
        >
          <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem', pb: 1 }}>
            {formMode === "add" ? "Add New Physician" : "Modify Staff Details"}
          </DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField label="First Name" name="firstName" value={currentDoctor.firstName} onChange={handleInputChange} fullWidth />
              <TextField label="Last Name" name="lastName" value={currentDoctor.lastName} onChange={handleInputChange} fullWidth />
              <TextField label="Email" name="email" value={currentDoctor.email} onChange={handleInputChange} fullWidth disabled={formMode === "edit"} />
              <TextField label="Phone" name="phoneNumber" value={currentDoctor.phoneNumber} onChange={handleInputChange} fullWidth />

              <TextField select label="Specialization" name="specialization" value={currentDoctor.specialization} onChange={handleInputChange} fullWidth>
                {specializations.map((spec) => <MenuItem key={spec} value={spec}>{spec}</MenuItem>)}
              </TextField>

              <TextField select label="Blood Group" name="bloodGroup" value={currentDoctor.bloodGroup} onChange={handleInputChange} fullWidth>
                {bloodGroups.map((bg) => <MenuItem key={bg} value={bg}>{bg}</MenuItem>)}
              </TextField>

              <DatePicker
                label="Date of Birth"
                value={currentDoctor.dateOfBirth}
                onChange={(date) => setCurrentDoctor(prev => ({ ...prev, dateOfBirth: date }))}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />

              <DatePicker
                label="Joining Date"
                value={currentDoctor.joiningDate}
                onChange={(date) => setCurrentDoctor(prev => ({ ...prev, joiningDate: date }))}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />

              {formMode === "add" && (
                <TextField label="Password" name="password" type="password" value={currentDoctor.password} onChange={handleInputChange} fullWidth sx={{ gridColumn: 'span 2' }} />
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={handleCloseModal} sx={{ fontWeight: 700, color: 'text.secondary' }}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit} sx={{ borderRadius: '14px', px: 4, fontWeight: 800 }}>
              {formMode === "add" ? "Register Physician" : "Save Changes"}
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>

      <Snackbar open={showSuccess} autoHideDuration={4000} onClose={() => setShowSuccess(false)}>
        <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 700 }}>{successMessage}</Alert>
      </Snackbar>

      <Snackbar open={showError} autoHideDuration={4000} onClose={() => setShowError(false)}>
        <Alert severity="error" sx={{ borderRadius: '16px', fontWeight: 700 }}>{errorMessage}</Alert>
      </Snackbar>
    </Box>
  );
}

export default ViewDoctorTable;