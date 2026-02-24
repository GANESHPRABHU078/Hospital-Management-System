import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  alpha,
  useTheme,
  Button,
  IconButton,
  Chip,
  Avatar,
  Divider,
  Tooltip
} from '@mui/material';
import {
  Event as EventIcon,
  AccessTime as TimeIcon,
  MedicalServices as DeptIcon,
  Person as DocIcon,
  Cancel as CancelIcon,
  ArrowForward as DetailsIcon,
  History as PastIcon,
  Schedule as UpcomingIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const AppointmentCard = ({ app, onCancel }) => {
  const theme = useTheme();
  const isUpcoming = app.status === 'Upcoming';

  return (
    <Box sx={{
      p: 3,
      borderRadius: '24px',
      bgcolor: 'background.paper',
      border: `1px solid ${alpha(isUpcoming ? theme.palette.primary.main : theme.palette.divider, 0.1)}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: theme.palette.mode === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.05)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.palette.mode === 'dark' ? '0 12px 48px rgba(0,0,0,0.5)' : '0 12px 48px rgba(0,0,0,0.1)',
        borderColor: alpha(isUpcoming ? theme.palette.primary.main : theme.palette.divider, 0.3),
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }}>
      {/* Status Badge */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Chip
          icon={isUpcoming ? <UpcomingIcon sx={{ fontSize: '14px !important' }} /> : <PastIcon sx={{ fontSize: '14px !important' }} />}
          label={app.status}
          size="small"
          sx={{
            bgcolor: alpha(isUpcoming ? '#10B981' : theme.palette.text.disabled, 0.1),
            color: isUpcoming ? '#10B981' : 'text.secondary',
            fontWeight: 800,
            fontSize: 10,
            borderRadius: '10px',
            border: `1px solid ${alpha(isUpcoming ? '#10B981' : theme.palette.text.disabled, 0.2)}`
          }}
        />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
          ID: #APT-{app.id}
        </Typography>
      </Box>

      {/* Doctor Info */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Avatar sx={{
          width: 54, height: 54,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          fontSize: 18, fontWeight: 900
        }}>
          {app.doctor.split(' ').pop()[0]}
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: '-0.02em', mb: 0.2 }}>
            {app.doctor}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <DeptIcon sx={{ fontSize: 13 }} /> {app.department}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.06) }} />

      {/* Time & Date */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Date
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <EventIcon sx={{ fontSize: 14, color: 'primary.main' }} /> {app.date}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Time
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TimeIcon sx={{ fontSize: 14, color: 'primary.main' }} /> {app.time}
          </Typography>
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          endIcon={<DetailsIcon sx={{ fontSize: 14 }} />}
          sx={{ borderRadius: '12px', fontWeight: 700, fontSize: 12, py: 1 }}
        >
          View Details
        </Button>
        {isUpcoming && (
          <Tooltip title="Cancel Appointment">
            <IconButton
              onClick={() => onCancel(app.id)}
              sx={{
                borderRadius: '12px',
                bgcolor: alpha(theme.palette.error.main, 0.05),
                color: 'error.main',
                border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
                '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1) }
              }}
            >
              <CancelIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Simulated data fetch
    setAppointments([
      { id: 1, doctor: "Dr. Alice Smith", department: "Cardiology", date: "2026-03-01", time: "10:30 AM", status: "Upcoming" },
      { id: 2, doctor: "Dr. Bob Johnson", department: "Dermatology", date: "2026-03-05", time: "02:00 PM", status: "Upcoming" },
      { id: 3, doctor: "Dr. Clara Reed", department: "Neurology", date: "2026-01-15", time: "09:00 AM", status: "Past" },
      { id: 4, doctor: "Dr. Sarah Mitchell", department: "Pediatrics", date: "2026-04-10", time: "11:15 AM", status: "Upcoming" },
    ]);
  }, []);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(appointments.filter(a => a.id !== id));
    }
  };

  const upcoming = appointments.filter(a => a.status === 'Upcoming');
  const past = appointments.filter(a => a.status === 'Past');

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: '-0.04em', mb: 1 }}>
          Your Appointments
        </Typography>
        <Typography variant="body1" color="text.secondary" fontWeight={600}>
          Manage and track your upcoming and past clinical visits.
        </Typography>
      </Box>

      {upcoming.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em', mb: 2, display: 'block' }}>
            Upcoming Visits ({upcoming.length})
          </Typography>
          <Grid container spacing={3}>
            {upcoming.map((app, i) => (
              <Grid item xs={12} md={6} lg={4} key={app.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <AppointmentCard app={app} onCancel={handleCancel} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {past.length > 0 && (
        <Box>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800, letterSpacing: '0.1em', mb: 2, display: 'block' }}>
            Clinical History ({past.length})
          </Typography>
          <Grid container spacing={3}>
            {past.map((app, i) => (
              <Grid item xs={12} md={6} lg={4} key={app.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (upcoming.length + i) * 0.1 }}
                >
                  <AppointmentCard app={app} onCancel={handleCancel} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {appointments.length === 0 && (
        <Box sx={{ py: 10, textAlign: 'center', opacity: 0.5 }}>
          <PastIcon sx={{ fontSize: 64, mb: 2, color: 'text.disabled' }} />
          <Typography variant="h6" fontWeight={700}>No appointments found</Typography>
          <Typography variant="body2">Book your first visit to see it here.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ViewAppointments;

