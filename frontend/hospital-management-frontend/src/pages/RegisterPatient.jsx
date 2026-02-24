import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerPatient } from "../services/patientService";
import {
  Box, Button, Typography, TextField, Grid, MenuItem,
  alpha, useTheme, InputAdornment, CircularProgress,
  Stepper, Step, StepLabel, Paper
} from "@mui/material";
import {
  Person, Email, Phone, Home, Lock, ArrowForward,
  ArrowBack, CheckCircle, LocalHospital, Wc, Cake
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { validatePatientRegistration } from "../Javascript/patientValidation";

const steps = ['Personal', 'Contact', 'Security'];

const RegisterPatient = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [patientData, setPatientData] = useState({
    firstName: "", lastName: "", email: "", phoneNumber: "",
    gender: "", dateOfBirth: "", address: "", city: "",
    state: "", country: "", password: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    const { errors: newErrors, isValid } = validatePatientRegistration(patientData);
    setErrors(newErrors);
    if (!isValid) return;
    setLoading(true);
    try {
      await registerPatient(patientData);
      setMessage({ text: "Registration successful! You can now log in.", type: "success" });
      setActiveStep(3); // success state
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      bgcolor: alpha(theme.palette.background.paper, 0.5),
      backdropFilter: 'blur(10px)',
      '& fieldset': { borderColor: alpha(theme.palette.divider, 0.2) },
      '&:hover fieldset': { borderColor: alpha(theme.palette.primary.main, 0.4) },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.12)}`
      }
    }
  };

  const stepContent = [
    // Step 0: Personal Info
    <Grid container spacing={2.5}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="First Name" name="firstName" value={patientData.firstName}
          onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName} sx={inputSx}
          InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Last Name" name="lastName" value={patientData.lastName}
          onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName} sx={inputSx}
          InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth select label="Gender" name="gender" value={patientData.gender}
          onChange={handleChange} error={!!errors.gender} helperText={errors.gender} sx={inputSx}
          InputProps={{ startAdornment: <InputAdornment position="start"><Wc sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }}>
          {['Male', 'Female', 'Other'].map(g => <MenuItem key={g} value={g.toLowerCase()}>{g}</MenuItem>)}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Date of Birth" name="dateOfBirth" type="date"
          value={patientData.dateOfBirth} onChange={handleChange}
          error={!!errors.dateOfBirth} helperText={errors.dateOfBirth}
          InputLabelProps={{ shrink: true }} sx={inputSx}
          InputProps={{ startAdornment: <InputAdornment position="start"><Cake sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }} />
      </Grid>
    </Grid>,

    // Step 1: Contact
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <TextField fullWidth label="Email Address" name="email" type="email" value={patientData.email}
          onChange={handleChange} error={!!errors.email} helperText={errors.email} sx={inputSx}
          InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }} />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Phone Number" name="phoneNumber" value={patientData.phoneNumber}
          onChange={handleChange} error={!!errors.phoneNumber} helperText={errors.phoneNumber} sx={inputSx}
          InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }} />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Address" name="address" value={patientData.address}
          onChange={handleChange} sx={inputSx}
          InputProps={{ startAdornment: <InputAdornment position="start"><Home sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField fullWidth label="City" name="city" value={patientData.city} onChange={handleChange} sx={inputSx} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField fullWidth label="State" name="state" value={patientData.state} onChange={handleChange} sx={inputSx} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField fullWidth label="Country" name="country" value={patientData.country} onChange={handleChange} sx={inputSx} />
      </Grid>
    </Grid>,

    // Step 2: Security
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <TextField fullWidth label="Password" name="password" type="password" value={patientData.password}
          onChange={handleChange} error={!!errors.password} helperText={errors.password} sx={inputSx}
          InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }} />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ p: 3, borderRadius: '14px', bgcolor: alpha(theme.palette.primary.main, 0.05), border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}` }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            By registering, you agree to our Terms of Service and Privacy Policy. Your data is secured with AES-256 encryption.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  ];

  if (activeStep === 3) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 420 }}>
            <Box sx={{
              width: 100, height: 100, borderRadius: '50%', mx: 'auto', mb: 3,
              background: `linear-gradient(135deg, #10B981, #059669)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 20px 50px rgba(16,185,129,0.4)',
            }}>
              <CheckCircle sx={{ color: '#fff', fontSize: 52 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-0.03em' }}>All set!</Typography>
            <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
              Your patient account has been created successfully. You can now sign in.
            </Typography>
            <Button component={Link} to="/login" variant="contained" size="large"
              sx={{ borderRadius: '14px', fontWeight: 800, py: 1.8, px: 4 }}>
              Sign In Now
            </Button>
          </Box>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Panel */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        width: '42%',
        background: `linear-gradient(135deg, #0A1628 0%, #162040 40%, #0d2b50 70%, #1a1a40 100%)`,
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        p: 6, position: 'relative', overflow: 'hidden',
      }}>
        {/* Orbs */}
        <Box sx={{ position: 'absolute', top: '-20%', left: '-10%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)}, transparent 70%)`, filter: 'blur(40px)' }} />
        <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)}, transparent 70%)`, filter: 'blur(40px)' }} />
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 380 }}>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <Box sx={{
              width: 90, height: 90, borderRadius: '24px', mx: 'auto', mb: 4,
              background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 20px 50px ${alpha(theme.palette.secondary.main, 0.5)}`,
            }}>
              <LocalHospital sx={{ fontSize: 46, color: '#fff' }} />
            </Box>
          </motion.div>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', mb: 2, lineHeight: 1.1 }}>
            Join LifeBridge
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, fontWeight: 500, lineHeight: 1.7 }}>
            Create your patient account in minutes and get access to the full clinical platform.
          </Typography>
          {/* Step info */}
          <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {['Personal Details', 'Contact Information', 'Secure Access'].map((s, i) => (
              <Box key={i} sx={{
                display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: '14px',
                bgcolor: activeStep === i ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: activeStep === i ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
                transition: 'all 0.3s ease',
              }}>
                <Box sx={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800,
                  bgcolor: activeStep > i ? '#10B981' : activeStep === i ? theme.palette.primary.main : 'rgba(255,255,255,0.08)',
                  color: '#fff',
                }}>
                  {activeStep > i ? '✓' : i + 1}
                </Box>
                <Typography sx={{ color: activeStep === i ? '#fff' : 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: 14 }}>{s}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right Form Panel */}
      <Box sx={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        p: { xs: 3, md: 6 }, bgcolor: 'background.default',
      }}>
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }} style={{ width: '100%', maxWidth: 520 }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.04em', mb: 0.5 }}>
              {steps[activeStep]}
            </Typography>
            <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
              Step {activeStep + 1} of {steps.length}
            </Typography>
          </Box>

          {/* Progress bar */}
          <Box sx={{ mb: 4, height: 4, borderRadius: '4px', bgcolor: alpha(theme.palette.divider, 0.15), overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              style={{ height: '100%', background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, borderRadius: 4 }}
            />
          </Box>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            >
              {stepContent[activeStep]}
            </motion.div>
          </AnimatePresence>

          {message.text && activeStep < 3 && (
            <Box sx={{ mt: 2.5, p: 2, borderRadius: '12px', bgcolor: alpha(message.type === 'success' ? '#10B981' : theme.palette.error.main, 0.08), border: `1px solid ${alpha(message.type === 'success' ? '#10B981' : theme.palette.error.main, 0.2)}` }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: message.type === 'success' ? '#10B981' : 'error.main' }}>{message.text}</Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            {activeStep > 0 && (
              <Button onClick={() => setActiveStep(p => p - 1)} variant="outlined" startIcon={<ArrowBack />}
                sx={{ flex: 1, py: 1.7, borderRadius: '14px', fontWeight: 700 }}>
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button onClick={() => setActiveStep(p => p + 1)} variant="contained" endIcon={<ArrowForward />}
                sx={{
                  flex: 1, py: 1.7, borderRadius: '14px', fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
                  '&:hover': { transform: 'translateY(-1px)', boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.45)}` },
                  transition: 'all 0.3s ease',
                }}>
                Continue
              </Button>
            ) : (
              <Button onClick={handleSubmit} variant="contained" endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <CheckCircle />}
                disabled={loading}
                sx={{
                  flex: 1, py: 1.7, borderRadius: '14px', fontWeight: 800,
                  background: `linear-gradient(135deg, #10B981, #059669)`,
                  boxShadow: '0 8px 24px rgba(16,185,129,0.35)',
                  '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 12px 30px rgba(16,185,129,0.45)' },
                  transition: 'all 0.3s ease',
                }}>
                {loading ? 'Creating Account…' : 'Create Account'}
              </Button>
            )}
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography color="text.secondary" variant="body2">
              Already registered?{' '}
              <Box component={Link} to="/login" sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Sign in here
              </Box>
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default RegisterPatient;
