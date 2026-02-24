import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  alpha,
  useTheme,
  IconButton,
  Divider,
  CircularProgress
} from "@mui/material";
import {
  Edit,
  Save,
  Close,
  Person,
  Phone,
  Email,
  Cake,
  LocationCity,
  Public,
  Badge,
  Wc
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { validateForm } from "../../Javascript/validateForm";
import { updatePatient } from "../../services/patientService";

const PatientDetails = ({ userData }) => {
  const theme = useTheme();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    patientId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        patientId: userData.patientId || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        gender: userData.gender || "",
        dateOfBirth: userData.dateOfBirth || "",
        city: userData.city || "",
        state: userData.state || "",
        country: userData.country || "",
      });
    }
  }, [userData]);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(userData);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsLoading(true);
      await updatePatient(formData.email, formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating patient:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { label: "Patient ID", name: "patientId", icon: <Badge />, disabled: true },
    { label: "First Name", name: "firstName", icon: <Person />, disabled: false },
    { label: "Last Name", name: "lastName", icon: <Person />, disabled: false },
    { label: "Phone Number", name: "phoneNumber", icon: <Phone />, disabled: false },
    { label: "Email", name: "email", icon: <Email />, disabled: true },
    { label: "Date of Birth", name: "dateOfBirth", icon: <Cake />, disabled: false, type: "date" },
    { label: "Gender", name: "gender", icon: <Wc />, disabled: false },
    { label: "City", name: "city", icon: <LocationCity />, disabled: false },
    { label: "State", name: "state", icon: <Public />, disabled: false },
    { label: "Country", name: "country", icon: <Public />, disabled: false },
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header Profile Section */}
        <Box sx={{
          p: 4,
          borderRadius: "24px",
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.background.paper, 0.5)})`
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.background.paper, 0.9)})`,
          backdropFilter: "blur(20px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          display: "flex",
          alignItems: "center",
          gap: 4,
          mb: 4,
          flexWrap: "wrap"
        }}>
          <Avatar sx={{
            width: 120, height: 120,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            fontSize: 48, fontWeight: 900,
            boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`
          }}>
            {formData.firstName?.[0]}{formData.lastName?.[0]}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", mb: 0.5 }}>
              {formData.firstName} {formData.lastName}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={700} sx={{ opacity: 0.8, mb: 2 }}>
              Patient Record: #{formData.patientId}
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              {!isEditing ? (
                <Button
                  variant="contained" startIcon={<Edit />}
                  onClick={handleEditClick}
                  sx={{ borderRadius: "12px", px: 3, py: 1, fontWeight: 800 }}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained" startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                    onClick={handleSubmit} disabled={isLoading}
                    sx={{ borderRadius: "12px", px: 3, py: 1, fontWeight: 800 }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined" startIcon={<Close />}
                    onClick={handleCancelClick}
                    sx={{ borderRadius: "12px", px: 3, py: 1, fontWeight: 800 }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>

        {/* Detailed Info Grid */}
        <Grid container spacing={3}>
          {fields.map((field, i) => (
            <Grid item xs={12} md={6} key={field.name}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Box sx={{
                  p: 3,
                  borderRadius: "20px",
                  bgcolor: "background.paper",
                  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                    <Box sx={{
                      p: 1, borderRadius: "10px",
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                      display: "flex"
                    }}>
                      {field.icon}
                    </Box>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {field.label}
                    </Typography>
                  </Box>

                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="standard"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      disabled={field.disabled}
                      error={!!errors[field.name]}
                      helperText={errors[field.name]}
                      type={field.type || "text"}
                      InputProps={{
                        disableUnderline: false,
                        sx: { fontWeight: 800, fontSize: "1.1rem" }
                      }}
                    />
                  ) : (
                    <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: "-0.01em" }}>
                      {formData[field.name] || "—"}
                    </Typography>
                  )}
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default PatientDetails;

