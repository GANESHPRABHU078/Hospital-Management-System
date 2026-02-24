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
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from "@mui/icons-material";
import LuxDataGrid from "../common/LuxDataGrid";
import {
  fetchAllPatients,
  registerPatient,
  updatePatient,
  deletePatient,
} from "../../services/patientService";
import { validatePatientRegistration } from "../../Javascript/patientValidation";

const PATIENT_AVATARS = [
  'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  'https://cdn-icons-png.flaticon.com/512/3135/3135789.png',
  'https://cdn-icons-png.flaticon.com/512/3135/3135823.png'
];

function ViewPatientTable() {
  const [patients, setPatients] = useState([
    { id: 1, firstName: "Alice", lastName: "Johnson", email: "alice@example.com", phone: "123-456-7890", gender: "Female", bloodGroup: "O+", status: "Critical" },
    { id: 2, firstName: "Bob", lastName: "Smith", email: "bob@example.com", phone: "234-567-8901", gender: "Male", bloodGroup: "A-", status: "Stable" },
    { id: 3, firstName: "Charlie", lastName: "Brown", email: "charlie@example.com", phone: "345-678-9012", gender: "Male", bloodGroup: "B+", status: "Urgent" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const theme = useTheme();

  const [currentPatient, setCurrentPatient] = useState({
    firstName: "", lastName: "", email: "", phoneNumber: "",
    gender: "", dateOfBirth: "", city: "", state: "",
    country: "", password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await fetchAllPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleOpenModal = (mode = "add", patient = null) => {
    setFormMode(mode);
    setCurrentPatient(mode === "edit" && patient ? { ...patient } : {
      firstName: "", lastName: "", email: "", phoneNumber: "",
      gender: "", dateOfBirth: "", city: "", state: "",
      country: "", password: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { errors, isValid } = validatePatientRegistration(currentPatient, formMode === "edit");
    if (!isValid) {
      setErrorMessage(Object.values(errors).join(", "));
      setShowError(true);
      return;
    }

    try {
      if (formMode === "add") {
        await registerPatient(currentPatient);
        setSuccessMessage("Patient registered successfully!");
      } else {
        await updatePatient(currentPatient.email, currentPatient);
        setSuccessMessage("Patient records updated!");
      }
      await loadPatients();
      setShowSuccess(true);
      handleCloseModal();
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const handleDeletePatient = async (email) => {
    if (window.confirm("Permanent deletion of patient records?")) {
      try {
        await deletePatient(email);
        await loadPatients();
        setSuccessMessage("Patient deleted successfully!");
        setShowSuccess(true);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Error deleting patient");
        setShowError(true);
      }
    }
  };

  const columns = [
    {
      id: 'name',
      label: 'Patient',
      render: (val, row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={PATIENT_AVATARS[row.patientId % 3]} sx={{ width: 44, height: 44, border: '2px solid', borderColor: 'divider' }} />
          <Box>
            <Typography variant="subtitle2" fontWeight={800}>{row.firstName} {row.lastName}</Typography>
            <Typography variant="caption" color="text.secondary">PT-{row.patientId || 'NEW'}</Typography>
          </Box>
        </Box>
      )
    },
    {
      id: 'email',
      label: 'Contact',
      render: (val, row) => (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <EmailIcon sx={{ fontSize: 14, color: 'primary.light' }} />
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
      id: 'gender',
      label: 'Info',
      render: (val, row) => (
        <Box>
          <Chip label={val} size="small" variant="outlined" sx={{ fontWeight: 700, borderRadius: '8px', mb: 0.5 }} />
          <Typography variant="caption" display="block" color="text.secondary">{row.dateOfBirth}</Typography>
        </Box>
      )
    },
    {
      id: 'city',
      label: 'Location',
      render: (val, row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
          <Typography variant="caption" fontWeight={600}>{val}, {row.country}</Typography>
        </Box>
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
        onClick={() => handleDeletePatient(row.email)}
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
          Patient Records
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal("add")}
          sx={{ borderRadius: '16px', px: 4, py: 1.5, fontWeight: 800 }}
        >
          Add New Patient
        </Button>
      </Box>

      <LuxDataGrid
        title="Patient Directory"
        columns={columns}
        data={patients}
        actions={actions}
      />

      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: '32px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem' }}>
          {formMode === "add" ? "Patient Registration" : "Edit Health Record"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField label="First Name" name="firstName" value={currentPatient.firstName} onChange={handleInputChange} fullWidth />
            <TextField label="Last Name" name="lastName" value={currentPatient.lastName} onChange={handleInputChange} fullWidth />
            <TextField label="Email" name="email" value={currentPatient.email} onChange={handleInputChange} fullWidth disabled={formMode === "edit"} />
            <TextField label="Phone Number" name="phoneNumber" value={currentPatient.phoneNumber} onChange={handleInputChange} fullWidth />

            <TextField select label="Gender" name="gender" value={currentPatient.gender} onChange={handleInputChange} fullWidth>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField label="Date of Birth" name="dateOfBirth" value={currentPatient.dateOfBirth} onChange={handleInputChange} fullWidth placeholder="YYYY-MM-DD" />
            <TextField label="City" name="city" value={currentPatient.city} onChange={handleInputChange} fullWidth />
            <TextField label="State" name="state" value={currentPatient.state} onChange={handleInputChange} fullWidth />
            <TextField label="Country" name="country" value={currentPatient.country} onChange={handleInputChange} fullWidth />

            {formMode === "add" && (
              <TextField label="Password" name="password" type="password" value={currentPatient.password} onChange={handleInputChange} fullWidth sx={{ gridColumn: 'span 2' }} />
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseModal} sx={{ fontWeight: 700, color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ borderRadius: '14px', px: 4, fontWeight: 800 }}>
            {formMode === "add" ? "Register Patient" : "Update Record"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={showSuccess} autoHideDuration={4000} onClose={() => setShowSuccess(false)}>
        <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 700 }}>{successMessage}</Alert>
      </Snackbar>

      <Snackbar open={showError} autoHideDuration={4000} onClose={() => setShowError(false)}>
        <Alert severity="error" sx={{ borderRadius: '16px', fontWeight: 700 }}>{errorMessage}</Alert>
      </Snackbar>
    </Box>
  );
}

export default ViewPatientTable;
