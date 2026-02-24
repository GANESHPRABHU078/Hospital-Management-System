import React from 'react';
import {
    Grid, Box, Typography, alpha, useTheme, Button,
    Avatar, Divider
} from '@mui/material';
import {
    MonitorHeart as HealthIcon,
    CalendarMonth as ApptIcon,
    MedicalServices as MedIcon,
    TrendingUp,
    ArrowForward,
    NotificationsActive as AlertIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import DashboardCard from '../common/DashboardCard';
import HealthMonitor from './HealthMonitor';

const PatientDashboard = () => {
    const theme = useTheme();

    const summaryStats = [
        { title: 'Heart Rate', value: '72 bpm', icon: HealthIcon, color: '#EF4444', trend: 'Normal', variant: 'purple' },
        { title: 'Blood Pressure', value: '120/80', icon: HealthIcon, color: '#3B82F6', trend: 'Optimal', variant: 'blue' },
        { title: 'Sleep Quality', value: '8.4h', icon: HealthIcon, color: '#10B981', trend: '+12%', variant: 'green' },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* ── Header ── */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                            PATIENT OVERVIEW
                        </Typography>
                        <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.045em', mt: 0.3, lineHeight: 1 }}>
                            Your Health Summary
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.8 }}>
                            Track your recovery progress and upcoming medical activities.
                        </Typography>
                    </Box>
                    <Button variant="contained" endIcon={<ArrowForward />} sx={{
                        borderRadius: '14px', fontWeight: 800, px: 3, py: 1.5,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}>
                        Book New Appointment
                    </Button>
                </Box>
            </motion.div>

            {/* ── Summary Stats ── */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {summaryStats.map((card, i) => (
                    <Grid item xs={12} md={4} key={i}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <DashboardCard {...card} />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* ── Main content grid ── */}
            <Grid container spacing={4}>
                {/* Left: Quick Health Snapshot */}
                <Grid item xs={12} lg={7}>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <Box sx={{
                            p: 4, bgcolor: 'background.paper', borderRadius: '32px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            boxShadow: '0 10px 40px rgba(0,0,0,0.02)'
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h5" fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>Live Vitals</Typography>
                                <Button size="small" variant="text" sx={{ fontWeight: 800 }}>View Monitoring</Button>
                            </Box>
                            <HealthMonitor />
                        </Box>
                    </motion.div>
                </Grid>

                {/* Right: Activity & Alerts */}
                <Grid item xs={12} lg={5}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {/* Next Appointment Card */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                            <Box sx={{
                                p: 3, borderRadius: '28px',
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                color: '#fff', position: 'relative', overflow: 'hidden',
                                boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.3)}`
                            }}>
                                <Box sx={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(30px)' }} />
                                <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    Next Appointment
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, mb: 3 }}>
                                    <Avatar sx={{ width: 56, height: 56, bgcolor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                        <ApptIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" fontWeight={800}>Dr. Alice Smith</Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 600 }}>Cardiology • Tomorrow at 10:30 AM</Typography>
                                    </Box>
                                </Box>
                                <Button fullWidth variant="contained" sx={{
                                    bgcolor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                                    borderRadius: '12px', fontWeight: 800,
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }
                                }}>
                                    View Appointment Details
                                </Button>
                            </Box>
                        </motion.div>

                        {/* Recent Alerts List */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                            <Box sx={{
                                p: 3.5, bgcolor: 'background.paper', borderRadius: '32px',
                                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                                boxShadow: '0 10px 40px rgba(0,0,0,0.02)'
                            }}>
                                <Typography variant="h6" fontWeight={900} sx={{ mb: 2.5, letterSpacing: '-0.02em' }}>Recent Alerts</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 2, p: 2, borderRadius: '16px', bgcolor: '#FEF2F2', border: '1px solid #FEE2E2' }}>
                                        <AlertIcon sx={{ color: '#EF4444' }} />
                                        <Box>
                                            <Typography variant="body2" fontWeight={800} color="#991B1B">Meds Reminder</Typography>
                                            <Typography variant="caption" sx={{ color: '#B91C1C', fontWeight: 600, display: 'block' }}>Take your Beta-Blocker now</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 2, p: 2, borderRadius: '16px', bgcolor: '#F0FDF4', border: '1px solid #DCFCE7' }}>
                                        <MedIcon sx={{ color: '#10B981' }} />
                                        <Box>
                                            <Typography variant="body2" fontWeight={800} color="#166534">Lab Results In</Typography>
                                            <Typography variant="caption" sx={{ color: '#15803D', fontWeight: 600, display: 'block' }}>Blood test reports are available</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </motion.div>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PatientDashboard;
