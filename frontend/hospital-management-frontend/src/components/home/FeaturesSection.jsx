import React from 'react';
import { Container, Grid, Typography, Box, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PaymentsIcon from '@mui/icons-material/Payment';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HotelIcon from '@mui/icons-material/Hotel';
import SecurityIcon from '@mui/icons-material/Security';

const features = [
  {
    icon: PersonIcon,
    title: 'Smart Patient Management',
    description: 'Comprehensive patient records, history tracking and AI-driven triage suggestions.',
    gradient: ['#4F46E5', '#7C3AED'],
  },
  {
    icon: MedicalServicesIcon,
    title: 'Doctor Operations',
    description: 'Assign specialists, manage rotating schedules, and optimize clinical workflows.',
    gradient: ['#0EA5E9', '#2563EB'],
  },
  {
    icon: PaymentsIcon,
    title: 'Seamless Billing',
    description: 'End-to-end financial reporting with transparent invoicing and insurance integration.',
    gradient: ['#10B981', '#059669'],
  },
  {
    icon: PsychologyIcon,
    title: 'AI Diagnostics',
    description: 'LLM-powered symptom checker and automated clinical summary generation.',
    gradient: ['#F59E0B', '#D97706'],
  },
  {
    icon: HotelIcon,
    title: 'Live Bed Tracking',
    description: 'Real-time bed occupancy maps with automated admission and discharge alerts.',
    gradient: ['#EC4899', '#BE185D'],
  },
  {
    icon: SecurityIcon,
    title: 'Enterprise Security',
    description: 'AES-256 field encryption, role-based access control, and full audit trails.',
    gradient: ['#6366F1', '#4338CA'],
  },
];

function FeaturesSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{
      py: { xs: 10, md: 16 },
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle background accent */}
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 800, height: 800, borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.04)}, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
            <Typography variant="overline" sx={{
              color: 'primary.main', fontWeight: 800, letterSpacing: '0.12em', fontSize: 12, mb: 2, display: 'block'
            }}>
              Platform Capabilities
            </Typography>
            <Typography variant="h2" sx={{
              fontWeight: 900, color: 'text.primary', letterSpacing: '-0.04em',
              mb: 2.5, fontSize: { xs: '2rem', md: '3rem' }
            }}>
              Everything your hospital needs,
              <Box component="span" sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', ml: 1.5
              }}>
                in one place
              </Box>
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 560, mx: 'auto', fontSize: 17, lineHeight: 1.7, fontWeight: 500 }}>
              A purpose-built clinical platform that handles everything from patient triage to financial reporting.
            </Typography>
          </Box>
        </motion.div>

        {/* Feature Grid */}
        <Grid container spacing={3}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  style={{ height: '100%' }}
                >
                  <Box sx={{
                    p: 4, borderRadius: '24px', height: '100%',
                    bgcolor: 'background.paper',
                    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                    transition: 'all 0.4s ease',
                    position: 'relative', overflow: 'hidden',
                    '&:hover': {
                      borderColor: alpha(feature.gradient[0], 0.4),
                      boxShadow: `0 20px 60px ${alpha(feature.gradient[0], isDark ? 0.15 : 0.1)}`,
                    }
                  }}>
                    {/* Corner glow on hover */}
                    <Box sx={{
                      position: 'absolute', top: -30, right: -30, width: 100, height: 100,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${alpha(feature.gradient[0], 0.15)}, transparent 70%)`,
                    }} />

                    {/* Icon */}
                    <Box sx={{
                      width: 54, height: 54, borderRadius: '16px', mb: 3,
                      background: `linear-gradient(135deg, ${feature.gradient[0]}, ${feature.gradient[1]})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 8px 24px ${alpha(feature.gradient[0], 0.35)}`,
                    }}>
                      <Icon sx={{ color: '#fff', fontSize: 26 }} />
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.02em' }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.75, fontSize: 14, fontWeight: 500 }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
