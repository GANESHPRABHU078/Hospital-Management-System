import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, alpha, useTheme, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { LocalHospital, Login as LoginIcon, PersonAdd } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Navbar = () => {
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: scrolled
          ? theme.palette.mode === 'dark'
            ? alpha('#0A1628', 0.92)
            : alpha('#fff', 0.92)
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 6 }, py: 1, gap: 2 }}>
        {/* Brand */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }} component={Link} to="/">
            <Box sx={{
              width: 36, height: 36, borderRadius: '10px',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`
            }}>
              <LocalHospital sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
            <Typography sx={{
              fontWeight: 900, fontSize: 17, letterSpacing: '-0.03em',
              color: scrolled ? 'text.primary' : '#fff',
              transition: 'color 0.3s ease'
            }}>
              LifeBridge
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ flexGrow: 1 }} />

        {/* Nav links */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            {['About', 'Services', 'Contact'].map((label) => (
              <Button
                key={label}
                sx={{
                  fontWeight: 600, fontSize: 14, px: 1.5,
                  color: scrolled ? 'text.primary' : 'rgba(255,255,255,0.8)',
                  '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                  transition: 'color 0.3s ease',
                }}
              >
                {label}
              </Button>
            ))}

            <Button
              component={Link} to="/login"
              variant="outlined"
              startIcon={<LoginIcon />}
              sx={{
                ml: 1, fontWeight: 700, borderRadius: '12px', px: 2.5,
                borderColor: scrolled ? 'primary.main' : 'rgba(255,255,255,0.5)',
                color: scrolled ? 'primary.main' : '#fff',
                '&:hover': { borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.08), color: 'primary.main' },
                transition: 'all 0.3s ease',
              }}
            >
              Login
            </Button>

            <Button
              component={Link} to="/register"
              variant="contained"
              startIcon={<PersonAdd />}
              sx={{
                fontWeight: 700, borderRadius: '12px', px: 2.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                '&:hover': { transform: 'translateY(-1px)', boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.5)}` },
                transition: 'all 0.3s ease',
              }}
            >
              Register
            </Button>
          </Box>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
