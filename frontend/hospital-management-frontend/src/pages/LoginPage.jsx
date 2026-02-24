import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box, Typography, TextField, Button, IconButton,
  InputAdornment, alpha, useTheme, CircularProgress, Divider
} from "@mui/material";
import {
  Visibility, VisibilityOff, Email, Lock,
  ArrowForward, LocalHospital
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { loginUser } from "../services/authService";
import isTokenExpired from "../utils/isTokenExpired";

const floatVariants = {
  animate: {
    y: [0, -18, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
  }
};

function LoginPage() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email || !password) { setMessage("Please enter both email and password."); return; }
    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      if (isTokenExpired(response.token)) { setMessage("Session Expired. Please login again."); return; }
      if (!response?.token) { setMessage("Invalid response from server."); return; }
      sessionStorage.setItem("token", response.token);
      const roleRoutes = {
        ROLE_PATIENT: "/patient/profile",
        ROLE_ADMIN: "/admin/profile",
        ROLE_DOCTOR: "/doctor/profile",
        ROLE_NURSE: "/nurse/profile",
        ROLE_STAFF: "/staff/profile",
      };
      const route = roleRoutes[response.role];
      if (route) navigate(route);
      else setMessage("Unknown role. Please contact support.");
    } catch {
      setMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      bgcolor: alpha(theme.palette.background.paper, 0.5),
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      '& fieldset': { borderColor: alpha(theme.palette.divider, 0.2) },
      '&:hover fieldset': { borderColor: alpha(theme.palette.primary.main, 0.5) },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.12)}`
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/* ─── LEFT PANEL ─── */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        width: '50%',
        position: 'relative',
        background: `linear-gradient(135deg, #0A1628 0%, #162040 40%, #0d2b50 70%, #1a1a40 100%)`,
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 6,
      }}>
        {/* Animated orbs */}
        {[
          { size: 400, x: '-20%', y: '-20%', color: alpha(theme.palette.primary.main, 0.15) },
          { size: 300, x: '60%', y: '60%', color: alpha(theme.palette.secondary.main, 0.1) },
          { size: 200, x: '70%', y: '-10%', color: alpha(theme.palette.primary.main, 0.08) },
        ].map((orb, i) => (
          <Box key={i} sx={{
            position: 'absolute', left: orb.x, top: orb.y,
            width: orb.size, height: orb.size, borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: 'blur(40px)',
          }} />
        ))}

        {/* Grid overlay */}
        <Box sx={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 440 }}>
          {/* Floating hospital icon */}
          <motion.div variants={floatVariants} animate="animate">
            <Box sx={{
              width: 100, height: 100, borderRadius: '28px', mx: 'auto', mb: 4,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.5)}`,
            }}>
              <LocalHospital sx={{ fontSize: 52, color: '#fff' }} />
            </Box>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', mb: 2, lineHeight: 1.1 }}>
              LifeBridge<br />Hospital
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: 500, lineHeight: 1.7, mb: 5 }}>
              Advanced clinical management platform.<br />Precision. Efficiency. Compassion.
            </Typography>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              {[
                { label: 'Doctors', value: '500+' },
                { label: 'Patients', value: '10K+' },
                { label: 'Uptime', value: '99.9%' },
              ].map((stat) => (
                <Box key={stat.label} sx={{
                  p: 2, borderRadius: '16px', textAlign: 'center', flex: 1,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(10px)',
                }}>
                  <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 20 }}>{stat.value}</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600 }}>{stat.label}</Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* ─── RIGHT PANEL ─── */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 3, md: 6 },
        bgcolor: 'background.default',
      }}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: 440 }}
        >
          {/* Header */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.04em', mb: 1 }}>
              Welcome back
            </Typography>
            <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
              Sign in to your clinical dashboard
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth label="Email Address" type="email"
                value={email} onChange={e => setEmail(e.target.value)}
                required sx={inputSx}
                InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment> }}
              />
              <TextField
                fullWidth label="Password"
                type={showPassword ? "text" : "password"}
                value={password} onChange={e => setPassword(e.target.value)}
                required sx={inputSx}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'text.disabled', fontSize: 20 }} /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(p => !p)} size="small" edge="end">
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {message && (
                <Box sx={{ p: 2, borderRadius: '12px', bgcolor: alpha(theme.palette.error.main, 0.08), border: `1px solid ${alpha(theme.palette.error.main, 0.2)}` }}>
                  <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>{message}</Typography>
                </Box>
              )}

              <Button
                type="submit" fullWidth variant="contained" size="large"
                disabled={loading}
                endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <ArrowForward />}
                sx={{
                  mt: 0.5, py: 1.7, borderRadius: '14px', fontWeight: 800, fontSize: 15,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.5)}`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </Button>
            </Box>
          </form>

          {/* Footer links */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Button component={Link} to="/" variant="text" size="small" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'none' }}>
              ← Back to Home
            </Button>
            <Typography color="text.secondary" variant="body2">
              No account?{' '}
              <Box component={Link} to="/register" sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Register here
              </Box>
            </Typography>
          </Box>

          <Divider sx={{ my: 3, opacity: 0.5 }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Specialized Access
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              fullWidth component={Link} to="/login/doctor" variant="outlined" size="small"
              sx={{ borderRadius: '10px', fontWeight: 700, py: 1, textTransform: 'none', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, color: 'text.secondary' }}
            >
              Doctor Portal
            </Button>
            <Button
              fullWidth component={Link} to="/login/staff" variant="outlined" size="small"
              sx={{ borderRadius: '10px', fontWeight: 700, py: 1, textTransform: 'none', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, color: 'text.secondary' }}
            >
              Staff & Admin
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}

export default LoginPage;
