import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container, Grid, Chip, alpha, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward, Verified, LocalHospital, AccessTime, HealthAndSafety } from "@mui/icons-material";

const trustBadges = [
  { icon: <Verified sx={{ fontSize: 14 }} />, label: 'JCI Accredited' },
  { icon: <AccessTime sx={{ fontSize: 14 }} />, label: '24/7 Emergency' },
  { icon: <HealthAndSafety sx={{ fontSize: 14 }} />, label: 'ISO 9001:2015' },
];

const stats = [
  { value: '500+', label: 'Specialists' },
  { value: '10K+', label: 'Patients Served' },
  { value: '98%', label: 'Success Rate' },
  { value: '24/7', label: 'Support' },
];

function HeroSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: isDark
        ? `linear-gradient(135deg, #020617 0%, #0A1628 40%, #0d2b50 70%, #020617 100%)`
        : `linear-gradient(135deg, #0A1628 0%, #162040 40%, #1a3560 70%, #0A1628 100%)`,
      pt: 12,
    }}>
      {/* Background Orbs */}
      {[
        { width: 600, height: 600, left: '-15%', top: '-20%', color: alpha(theme.palette.primary.main, 0.12) },
        { width: 400, height: 400, right: '-10%', bottom: '-10%', color: alpha(theme.palette.secondary.main, 0.1) },
        { width: 300, height: 300, right: '30%', top: '10%', color: alpha(theme.palette.primary.main, 0.06) },
      ].map((orb, i) => (
        <Box key={i} sx={{
          position: 'absolute', left: orb.left, right: orb.right, top: orb.top, bottom: orb.bottom,
          width: orb.width, height: orb.height, borderRadius: '50%',
          background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />
      ))}

      {/* Grid overlay */}
      <Box sx={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <Grid container spacing={8} alignItems="center">
          {/* ─ LEFT TEXT ─ */}
          <Grid item xs={12} lg={6}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {/* Trust badges */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
                {trustBadges.map((b, i) => (
                  <Chip
                    key={i}
                    icon={b.icon}
                    label={b.label}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.12)', fontWeight: 600, fontSize: 11,
                      '& .MuiChip-icon': { color: alpha(theme.palette.primary.light, 0.9) }
                    }}
                  />
                ))}
              </Box>

              <Typography variant="h1" sx={{
                fontWeight: 900, color: '#fff', lineHeight: 1.05, mb: 3,
                fontSize: { xs: '2.8rem', md: '4rem', lg: '5rem' },
                letterSpacing: '-0.05em',
              }}>
                Next-Gen<br />
                <Box component="span" sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Healthcare
                </Box>
                <br />Management
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, fontWeight: 500, lineHeight: 1.7, mb: 5, maxWidth: 500 }}>
                Experience precision healthcare with AI-powered diagnostics, real-time bed management, and seamless clinical workflows.
              </Typography>

              {/* CTA Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link} to="/register"
                  variant="contained" size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 1.8, px: 4, borderRadius: '14px', fontWeight: 800, fontSize: 15,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.5)}`,
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 14px 40px ${alpha(theme.palette.primary.main, 0.6)}` },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link} to="/login"
                  variant="outlined" size="large"
                  sx={{
                    py: 1.8, px: 4, borderRadius: '14px', fontWeight: 700,
                    borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)',
                    '&:hover': { borderColor: 'rgba(255,255,255,0.5)', bgcolor: 'rgba(255,255,255,0.05)' },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </motion.div>
          </Grid>

          {/* ─ RIGHT STATS ─ */}
          <Grid item xs={12} lg={6}>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Box sx={{
                      p: 4, borderRadius: '24px',
                      background: i % 2 === 0
                        ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.primary.main, 0.05)})`
                        : 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(20px)',
                      textAlign: 'center',
                      cursor: 'default',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'translateY(-4px)', border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}` }
                    }}>
                      <Typography sx={{ fontWeight: 900, fontSize: 42, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: 13, mt: 1, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              {/* Hospital icon card */}
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <Box sx={{
                  mt: 3, p: 3, borderRadius: '24px', display: 'flex', alignItems: 'center', gap: 2,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                  backdropFilter: 'blur(20px)',
                }}>
                  <Box sx={{
                    width: 50, height: 50, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.4)}`,
                  }}>
                    <LocalHospital sx={{ color: '#fff', fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>LuxHealthcare V3</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600 }}>
                      AI-Powered Clinical Platform
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 'auto', display: 'flex', gap: 0.8 }}>
                    {['#10B981', '#3B82F6', '#F59E0B'].map(c => (
                      <Box key={c} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c, boxShadow: `0 0 8px ${c}` }} />
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;
