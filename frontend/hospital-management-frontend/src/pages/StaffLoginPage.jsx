import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Box, Typography, TextField, Button, IconButton,
    InputAdornment, alpha, useTheme, CircularProgress
} from "@mui/material";
import {
    Visibility, VisibilityOff, Email, Lock,
    ArrowForward, BusinessCenter, ManageAccounts,
    AdminPanelSettings, VerifiedUser, Security
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { loginUser } from "../services/authService";
import isTokenExpired from "../utils/isTokenExpired";

const features = [
    { icon: <AdminPanelSettings sx={{ fontSize: 18 }} />, text: "Admin Control Panel" },
    { icon: <ManageAccounts sx={{ fontSize: 18 }} />, text: "Staff & Resource Management" },
    { icon: <Security sx={{ fontSize: 18 }} />, text: "Role-Based Access Control" },
];

function StaffLoginPage() {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [staffPassword, setStaffPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        if (!email || !staffPassword) { setMessage("Please enter both email and password."); return; }
        setLoading(true);
        try {
            const response = await loginUser({ email, password: staffPassword });
            if (isTokenExpired(response.token)) { setMessage("Session expired. Please login again."); return; }
            if (!response?.token) { setMessage("Invalid response from server."); return; }
            sessionStorage.setItem("token", response.token);
            const staffRoles = { ROLE_ADMIN: "/admin/profile", ROLE_STAFF: "/staff/profile", ROLE_NURSE: "/nurse/profile" };
            const route = staffRoles[response.role];
            if (route) navigate(route);
            else setMessage("This portal is for staff and managers only.");
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
            '&.Mui-focused fieldset': { borderColor: '#F59E0B', boxShadow: `0 0 0 3px ${alpha('#F59E0B', 0.15)}` },
        },
        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#FCD34D' },
        '& .MuiInputBase-input': { color: '#fff' },
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* ─ Right Info Panel ─ */}
            <Box sx={{
                display: { xs: 'none', md: 'flex' }, width: '40%',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                bgcolor: 'background.default', p: 6,
            }}>
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                    <Box sx={{ maxWidth: 320 }}>
                        <Typography variant="overline" sx={{ color: '#F59E0B', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                            MANAGEMENT PORTAL
                        </Typography>
                        <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: '-0.04em', mt: 1, mb: 2 }}>
                            Hospital<br />Operations Hub
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 5, lineHeight: 1.7, fontWeight: 500 }}>
                            Manage hospital resources, track staff, handle billing and admissions from a single secure portal.
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {features.map((f, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                                    <Box sx={{
                                        display: 'flex', alignItems: 'center', gap: 2, p: 2.5, borderRadius: '16px',
                                        bgcolor: 'background.paper',
                                        border: `1px solid ${alpha('#F59E0B', 0.1)}`,
                                    }}>
                                        <Box sx={{ p: 1.3, borderRadius: '12px', display: 'flex', bgcolor: alpha('#F59E0B', 0.1), color: '#F59E0B' }}>
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

            {/* ─ Left Dark Login Panel ─ */}
            <Box sx={{
                flex: 1,
                background: `linear-gradient(135deg, #0A1628 0%, #1a1208 40%, #1a0d00 70%, #0A1628 100%)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                p: { xs: 4, md: 7 }, position: 'relative', overflow: 'hidden',
            }}>
                {/* Orbs */}
                <Box sx={{ position: 'absolute', top: '-20%', right: '-10%', width: 450, height: 450, borderRadius: '50%', background: `radial-gradient(circle, ${alpha('#F59E0B', 0.1)}, transparent 70%)`, filter: 'blur(50px)' }} />
                <Box sx={{ position: 'absolute', bottom: '-15%', left: '-5%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)}, transparent 70%)`, filter: 'blur(40px)' }} />
                <Box sx={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

                <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 440, width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 6 }}>
                        <Box sx={{
                            width: 46, height: 46, borderRadius: '14px',
                            background: `linear-gradient(135deg, #F59E0B, #D97706)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 8px 24px ${alpha('#F59E0B', 0.5)}`
                        }}>
                            <BusinessCenter sx={{ color: '#fff', fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 17, lineHeight: 1 }}>LifeBridge Hospital</Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Staff & Management</Typography>
                        </Box>
                    </Box>

                    <Typography variant="h2" sx={{ color: '#fff', fontWeight: 900, letterSpacing: '-0.05em', mb: 2, lineHeight: 1.05 }}>
                        Staff &<br />
                        <Box component="span" sx={{ background: `linear-gradient(135deg, #FCD34D, #F59E0B)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Manager Login
                        </Box>
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, fontWeight: 500, mb: 6, lineHeight: 1.7 }}>
                        Access hospital management tools, staff scheduling, and administrative functions.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                        <TextField
                            fullWidth label="Staff Email" type="email" value={email}
                            onChange={e => setEmail(e.target.value)} sx={inputSx}
                            InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 20 }} /></InputAdornment> }}
                        />
                        <TextField
                            fullWidth label="Password" type={showPassword ? 'text' : 'password'} value={staffPassword}
                            onChange={e => setStaffPassword(e.target.value)} sx={inputSx}
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
                            background: `linear-gradient(135deg, #F59E0B, #D97706)`,
                            boxShadow: `0 10px 30px ${alpha('#F59E0B', 0.4)}`,
                            '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 16px 40px ${alpha('#F59E0B', 0.5)}` },
                            transition: 'all 0.3s ease',
                            color: '#000',
                        }}
                    >
                        {loading ? 'Authenticating…' : 'Sign In to Staff Portal'}
                    </Button>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
                            Main login:{' '}
                            <Box component={Link} to="/login" sx={{ color: alpha('#FCD34D', 0.9), fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                Patient Portal
                            </Box>
                        </Typography>
                        <Box component={Link} to="/login/doctor" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600, textDecoration: 'none', '&:hover': { color: '#fff' } }}>
                            Doctor portal →
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default StaffLoginPage;
