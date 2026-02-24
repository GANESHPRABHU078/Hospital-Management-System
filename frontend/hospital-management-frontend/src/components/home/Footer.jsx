import React from 'react';
import { Box, Container, Typography, Grid, Divider, alpha, useTheme, Link as MuiLink } from '@mui/material';
import { LocalHospital } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const columns = [
  { title: 'Platform', links: ['Patient Portal', 'Doctor Dashboard', 'Admin Control', 'Nurse Station'] },
  { title: 'Services', links: ['Emergency Care', 'Appointments', 'Lab Results', 'Prescriptions'] },
  { title: 'Company', links: ['About Us', 'Careers', 'Privacy Policy', 'Contact'] },
];

function Footer() {
  const theme = useTheme();
  return (
    <Box sx={{
      bgcolor: theme.palette.mode === 'dark' ? '#020617' : '#0A1628',
      color: 'rgba(255,255,255,0.6)',
      pt: 10, pb: 4,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top glow */}
      <Box sx={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 1, bgcolor: alpha(theme.palette.primary.main, 0.5),
        boxShadow: `0 0 60px 1px ${alpha(theme.palette.primary.main, 0.4)}`,
      }} />

      <Container maxWidth="lg">
        <Grid container spacing={8} mb={8}>
          {/* Brand column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              <Box sx={{
                width: 40, height: 40, borderRadius: '12px',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.5)}`
              }}>
                <LocalHospital sx={{ color: '#fff', fontSize: 22 }} />
              </Box>
              <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 18 }}>LifeBridge Hospital</Typography>
            </Box>
            <Typography sx={{ lineHeight: 1.8, fontSize: 14, maxWidth: 260 }}>
              Advanced clinical management platform delivering precision healthcare with compassion.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
              {['#10B981', '#3B82F6', '#F59E0B'].map((c, i) => (
                <Box key={i} sx={{
                  width: 10, height: 10, borderRadius: '50%', bgcolor: c,
                  boxShadow: `0 0 10px ${c}`, cursor: 'pointer'
                }} />
              ))}
            </Box>
          </Grid>

          {/* Link columns */}
          {columns.map((col) => (
            <Grid item xs={6} md={2.5} key={col.title}>
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 13, mb: 2.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {col.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {col.links.map(link => (
                  <Typography key={link} sx={{
                    fontSize: 14, cursor: 'pointer', transition: 'color 0.2s ease',
                    '&:hover': { color: '#fff' }
                  }}>
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography sx={{ fontSize: 13 }}>
            © 2025 LifeBridge Hospital. All rights reserved.
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            Powered by{' '}
            <Box component="span" sx={{ color: alpha(theme.palette.primary.light, 0.8), fontWeight: 700 }}>
              LuxUI V3
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
