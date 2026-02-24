import React from 'react';
import {
    Grid, Box, Typography, alpha, useTheme, Button,
    Chip, Divider, LinearProgress
} from '@mui/material';
import {
    People as PatientsIcon,
    Medication as MedIcon,
    AssignmentTurnedIn as DutyIcon,
    NotificationsActive as AlertIcon,
    ArrowForward,
    CheckCircle,
    ErrorOutline,
    Add as AddIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import DashboardCard from '../common/DashboardCard';
import AnalyticsChart from '../common/AnalyticsChart';

const weeklyData = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 18 },
    { name: 'Wed', count: 15 },
    { name: 'Thu', count: 22 },
    { name: 'Fri', count: 17 },
    { name: 'Sat', count: 9 },
    { name: 'Sun', count: 6 },
];

const patientList = [
    { name: 'Emma Wilson', bed: 'Ward 2, Bed 4', vitals: 'Stable', meds: 2, alert: false },
    { name: 'Carlos Rivera', bed: 'Ward 3, Bed 7', vitals: 'Critical', meds: 4, alert: true },
    { name: 'Priya Sharma', bed: 'Ward 1, Bed 2', vitals: 'Stable', meds: 1, alert: false },
    { name: 'Liam O\'Brien', bed: 'ICU, Bed 1', vitals: 'Monitoring', meds: 6, alert: true },
    { name: 'Fatima Al-Sayed', bed: 'Ward 4, Bed 9', vitals: 'Stable', meds: 2, alert: false },
];

const metricsData = [
    { label: 'Medication Accuracy', value: '99.2%', pct: 99, color: '#10B981' },
    { label: 'Patient Response Time', value: '3.2 min', pct: 80, color: '#3B82F6' },
    { label: 'Shift Attendance', value: '100%', pct: 100, color: '#F59E0B' },
];

const ProgressBar = ({ label, value, pct, color }) => (
    <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.7 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{label}</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 800 }}>{value}</Typography>
        </Box>
        <LinearProgress variant="determinate" value={pct} sx={{
            height: 5, borderRadius: 10,
            bgcolor: 'rgba(0,0,0,0.06)',
            '& .MuiLinearProgress-bar': { borderRadius: 10, bgcolor: color }
        }} />
    </Box>
);

const NurseDashboard = ({ onNavigate }) => {
    const theme = useTheme();

    const statCards = [
        { title: 'Assigned Patients', value: '5', icon: PatientsIcon, color: theme.palette.secondary.main, trend: '2 critical', variant: 'purple' },
        { title: 'Medications Due', value: '12', icon: MedIcon, color: '#10B981', trend: 'Next in 15 min', variant: 'green' },
        { title: 'Duty Hours', value: '6.5h', icon: DutyIcon, color: theme.palette.primary.main, trend: '1.5h remaining', variant: 'blue' },
        { title: 'Alerts', value: '2', icon: AlertIcon, color: '#EF4444', trend: 'Immediate action', variant: 'light' },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                            NURSING PORTAL
                        </Typography>
                        <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.045em', mt: 0.3, lineHeight: 1 }}>
                            Good morning, Alice 👋
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.7 }}>
                            You have <strong>2 critical patients</strong> and <strong>12 medications</strong> due today.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="outlined" startIcon={<DutyIcon />}
                            onClick={() => onNavigate?.('duty')}
                            sx={{ borderRadius: '12px', fontWeight: 700, px: 2.5 }}>
                            View Schedule
                        </Button>
                        <Button variant="contained" startIcon={<MedIcon />}
                            onClick={() => onNavigate?.('meds')}
                            sx={{
                                borderRadius: '12px', fontWeight: 800, px: 2.5,
                                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                                boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.4)}`,
                            }}>
                            Medication Log
                        </Button>
                    </Box>
                </Box>
            </motion.div>

            {/* Stat Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {statCards.map((card, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                            <DashboardCard {...card} />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} lg={7}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Box sx={{
                            bgcolor: 'background.paper', borderRadius: '24px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            boxShadow: theme.palette.mode === 'dark' ? '0 20px 60px rgba(0,0,0,0.3)' : '0 20px 60px rgba(0,0,0,0.06)',
                        }}>
                            <AnalyticsChart
                                title="Weekly Patient Care Activities"
                                subtitle="Total care interactions per day"
                                data={weeklyData}
                                dataKey="count"
                                color={theme.palette.secondary.main}
                            />
                        </Box>
                    </motion.div>
                </Grid>

                {/* Performance */}
                <Grid item xs={12} lg={5}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                        <Box sx={{
                            p: 3.5, bgcolor: 'background.paper', borderRadius: '24px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            height: '100%', display: 'flex', flexDirection: 'column', gap: 2.5,
                            boxShadow: theme.palette.mode === 'dark' ? '0 20px 60px rgba(0,0,0,0.3)' : '0 20px 60px rgba(0,0,0,0.06)',
                        }}>
                            <Box>
                                <Typography fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>Performance</Typography>
                                <Typography variant="caption" color="text.secondary" fontWeight={600}>This month's nursing metrics</Typography>
                            </Box>
                            <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.08) }} />
                            {metricsData.map((v, i) => <ProgressBar key={i} {...v} />)}
                        </Box>
                    </motion.div>
                </Grid>

                {/* Patient Snapshot */}
                <Grid item xs={12}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <Box sx={{
                            p: 3.5, bgcolor: 'background.paper', borderRadius: '24px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            boxShadow: theme.palette.mode === 'dark' ? '0 20px 60px rgba(0,0,0,0.3)' : '0 20px 60px rgba(0,0,0,0.06)',
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                                <Box>
                                    <Typography fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>My Patients</Typography>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>5 assigned — 2 require immediate attention</Typography>
                                </Box>
                                <Button size="small" endIcon={<ArrowForward fontSize="small" />}
                                    onClick={() => onNavigate?.('patients')}
                                    sx={{ fontWeight: 700, fontSize: 12 }}>
                                    Full care view
                                </Button>
                            </Box>
                            <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.06), mb: 1 }} />
                            <Grid container spacing={2}>
                                {patientList.map((p, i) => (
                                    <Grid item xs={12} sm={6} md={4} key={i}>
                                        <Box sx={{
                                            p: 2, borderRadius: '16px',
                                            border: `1px solid ${p.alert ? alpha('#EF4444', 0.25) : alpha(theme.palette.divider, 0.08)}`,
                                            bgcolor: p.alert ? alpha('#EF4444', 0.03) : alpha(theme.palette.primary.main, 0.02),
                                            display: 'flex', alignItems: 'center', gap: 1.5
                                        }}>
                                            <Box sx={{
                                                width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                                                bgcolor: p.vitals === 'Critical' ? '#EF4444' : p.vitals === 'Monitoring' ? '#F59E0B' : '#10B981',
                                                boxShadow: `0 0 8px ${p.vitals === 'Critical' ? '#EF4444' : p.vitals === 'Monitoring' ? '#F59E0B' : '#10B981'}`,
                                            }} />
                                            <Box sx={{ flex: 1 }}>
                                                <Typography fontWeight={700} fontSize={13}>{p.name}</Typography>
                                                <Typography variant="caption" color="text.secondary" fontWeight={600}>{p.bed}</Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Chip label={p.vitals} size="small" sx={{
                                                    fontWeight: 800, fontSize: 10, borderRadius: '8px',
                                                    bgcolor: alpha(p.vitals === 'Critical' ? '#EF4444' : p.vitals === 'Monitoring' ? '#F59E0B' : '#10B981', 0.1),
                                                    color: p.vitals === 'Critical' ? '#EF4444' : p.vitals === 'Monitoring' ? '#F59E0B' : '#10B981',
                                                }} />
                                                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mt: 0.3 }}>{p.meds} meds</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NurseDashboard;
