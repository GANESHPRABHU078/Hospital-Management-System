import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Box, Typography, TextField, Button, IconButton,
    InputAdornment, alpha, useTheme, CircularProgress, Chip
} from "@mui/material";
import {
    Visibility, VisibilityOff, Email, Lock,
    ArrowForward, LocalHospital, MedicalServices, MedicalInformation,
    VerifiedUser, AutoAwesome as AiIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { loginUser } from "../services/authService";
import isTokenExpired from "../utils/isTokenExpired";

const features = [
    { icon: <AiIcon sx={{ fontSize: 18 }} />, text: "AI Clinical Insights" },
    { icon: <MedicalInformation sx={{ fontSize: 18 }} />, text: "Patient Management" },
    { icon: <VerifiedUser sx={{ fontSize: 18 }} />, text: "Secure & HIPAA Compliant" },
];

function DoctorLoginPage() {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [physicianPassword, setPhysicianPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        if (!email || !physicianPassword) { setMessage("Please enter both email and password."); return; }
        setLoading(true);
        try {
            const response = await loginUser({ email, password: physicianPassword });
            if (isTokenExpired(response.token)) { setMessage("Session expired. Please login again."); return; }
            if (!response?.token) { setMessage("Invalid response from server."); return; }
            sessionStorage.setItem("token", response.token);
            if (response.role === "ROLE_DOCTOR") navigate("/doctor/profile");
            else setMessage("This portal is for doctors only.");
        } catch {
            setMessage("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '14px',
            bgcolor: alpha('#fff', 0.05),
            backdropFilter: 'blur(10px)',
            color: '#fff',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.35)' },
            '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main, boxShadow: `0 0 0 3px ${alpha(theme.palette.secondary.main, 0.15)}` },
        },
        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
        '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.secondary.light },
        '& .MuiInputBase-input': { color: '#fff' },
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* ─ Left Dark Panel ─ */}
            <Box sx={{
                width: { xs: '100%', md: '58%' },
                background: `linear-gradient(135deg, #0A1628 0%, #111827 40%, #0d2b50 70%, #0A1628 100%)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                p: { xs: 4, md: 7 }, position: 'relative', overflow: 'hidden',
            }}>
                {/* Orbs */}
                <Box sx={{ position: 'absolute', top: '-15%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.12)}, transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)}, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />

                <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 440, width: '100%' }}>
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 6 }}>
                        <Box sx={{
                            width: 46, height: 46, borderRadius: '14px',
                            background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.5)}`
                        }}>
                            <MedicalServices sx={{ color: '#fff', fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 17, lineHeight: 1 }}>LifeBridge Hospital</Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Physician Portal</Typography>
                        </Box>
                    </Box>

                    <Typography variant="h2" sx={{ color: '#fff', fontWeight: 900, letterSpacing: '-0.05em', mb: 2, lineHeight: 1.05 }}>
                        Doctor<br />
                        <Box component="span" sx={{
                            background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.primary.light})`,
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>Sign In</Box>
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, fontWeight: 500, mb: 6, lineHeight: 1.7 }}>
                        Access your patient schedule, AI clinical insights, and medical records.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
                        <TextField
                            fullWidth label="Doctor Email" type="email" value={email}
                            onChange={e => setEmail(e.target.value)} sx={inputSx}
                            InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 20 }} /></InputAdornment> }}
                        />
                        <TextField
                            fullWidth label="Password" type={showPassword ? 'text' : 'password'} value={physicianPassword}
                            onChange={e => setPhysicianPassword(e.target.value)} sx={inputSx}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 20 }} /></InputAdornment>,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(p => !p)} edge="end" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>

                    {message && (
                        <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', bgcolor: alpha(theme.palette.error.main, 0.12), border: `1px solid ${alpha(theme.palette.error.main, 0.25)}` }}>
                            <Typography sx={{ color: theme.palette.error.light, fontWeight: 600, fontSize: 13 }}>{message}</Typography>
                        </Box>
                    )}

                    <Button
                        fullWidth variant="contained" size="large"
                        onClick={handleLogin} disabled={loading}
                        endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <ArrowForward />}
                        sx={{
                            py: 1.9, borderRadius: '14px', fontWeight: 900, fontSize: 15,
                            background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                            boxShadow: `0 10px 30px ${alpha(theme.palette.secondary.main, 0.45)}`,
                            '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 16px 40px ${alpha(theme.palette.secondary.main, 0.55)}` },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {loading ? 'Authenticating…' : 'Sign In to Doctor Portal'}
                    </Button>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
                            Not a doctor?{' '}
                            <Box component={Link} to="/login" sx={{ color: alpha(theme.palette.secondary.light, 0.9), fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                Main Login
                            </Box>
                        </Typography>
                        <Box component={Link} to="/login/staff" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600, textDecoration: 'none', '&:hover': { color: '#fff' } }}>
                            Staff portal →
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* ─ Right Info Panel ─ */}
            <Box sx={{
                display: { xs: 'none', md: 'flex' }, width: '42%',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                bgcolor: 'background.default', p: 6,
            }}>
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                    <Box sx={{ maxWidth: 340 }}>
                        <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                            YOUR CLINICAL WORKSPACE
                        </Typography>
                        <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: '-0.04em', mt: 1, mb: 2 }}>
                            Everything you need,<br />in one portal.
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 5, lineHeight: 1.7, fontWeight: 500 }}>
                            AI-powered patient insights, real-time scheduling, and seamless medical record access.
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {features.map((f, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                                    <Box sx={{
                                        display: 'flex', alignItems: 'center', gap: 2, p: 2.5, borderRadius: '16px',
                                        bgcolor: 'background.paper',
                                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                                    }}>
                                        <Box sx={{
                                            p: 1.3, borderRadius: '12px', display: 'flex',
                                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                            color: 'secondary.main'
                                        }}>
                                            {f.icon}
                                        </Box>
                                        <Typography fontWeight={700} fontSize={14}>{f.text}</Typography>
                                    </Box>
                                </motion.div>
                            ))}
                        </Box>
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
}

export default DoctorLoginPage;
