import React from 'react';
import {
    Grid, Box, Typography, alpha, useTheme, Button,
    Avatar, Chip, LinearProgress, Divider
} from '@mui/material';
import {
    EventNote as ApptIcon, People as PatientsIcon, Star,
    ArrowForward, CheckCircle, Schedule, ErrorOutline,
    TrendingUp, AutoAwesome as AiIcon, FavoriteOutlined as HeartIcon,
    Biotech as LabIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import DashboardCard from '../common/DashboardCard';
import AnalyticsChart from '../common/AnalyticsChart';

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

const AppointmentRow = ({ name, time, condition, status }) => {
    const theme = useTheme();
    const statusConfig = {
        confirmed: { color: '#10B981', label: 'Confirmed', icon: <CheckCircle sx={{ fontSize: 14 }} /> },
        pending: { color: '#F59E0B', label: 'Pending', icon: <Schedule sx={{ fontSize: 14 }} /> },
        urgent: { color: theme.palette.secondary.main, label: 'Urgent', icon: <ErrorOutline sx={{ fontSize: 14 }} /> },
    };
    const s = statusConfig[status] || statusConfig.confirmed;
    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: '14px',
            transition: 'all 0.2s', '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04) }
        }}>
            <Avatar sx={{
                width: 40, height: 40, fontWeight: 800, fontSize: 14,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.06)})`,
                color: 'primary.main', border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
            }}>
                {name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 13 }}>{name}</Typography>
                <Typography sx={{ fontSize: 11, color: 'text.secondary', fontWeight: 600 }}>{condition}</Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Chip
                    icon={s.icon}
                    label={s.label}
                    size="small"
                    sx={{
                        bgcolor: alpha(s.color, 0.1), color: s.color, borderRadius: '8px', fontWeight: 800, fontSize: 10,
                        border: `1px solid ${alpha(s.color, 0.2)}`, mb: 0.5,
                        '& .MuiChip-icon': { color: s.color }
                    }}
                />
                <Typography sx={{ fontSize: 11, color: 'text.secondary', fontWeight: 700, display: 'block' }}>{time}</Typography>
            </Box>
        </Box>
    );
};

const DoctorDashboard = ({ onNavigate }) => {
    const theme = useTheme();

    const consultationData = [
        { name: 'Mon', count: 8 },
        { name: 'Tue', count: 14 },
        { name: 'Wed', count: 10 },
        { name: 'Thu', count: 18 },
        { name: 'Fri', count: 16 },
        { name: 'Sat', count: 6 },
        { name: 'Sun', count: 4 },
    ];

    const appointments = [
        { name: 'Sarah Mitchell', time: '09:00 AM', condition: 'Cardiology Follow-up', status: 'confirmed' },
        { name: 'James Carter', time: '10:30 AM', condition: 'Chest Pain — Urgent', status: 'urgent' },
        { name: 'Emily Rosa', time: '11:45 AM', condition: 'Annual Checkup', status: 'confirmed' },
        { name: 'Omar Hassan', time: '02:00 PM', condition: 'Post-Surgery Review', status: 'pending' },
        { name: 'Yuki Tanaka', time: '03:30 PM', condition: 'ECG Interpretation', status: 'confirmed' },
    ];

    const vitals = [
        { label: 'Patient Satisfaction', value: '4.9/5', pct: 98, color: '#10B981' },
        { label: 'Diagnosis Accuracy', value: '96%', pct: 96, color: theme.palette.primary.main },
        { label: 'Avg. Consult Time', value: '18 min', pct: 60, color: theme.palette.secondary.main },
        { label: 'Recovery Rate', value: '91%', pct: 91, color: '#F59E0B' },
    ];

    const statCards = [
        { title: "Today's Patients", value: '18', icon: PatientsIcon, color: theme.palette.primary.main, trend: '+3 vs yesterday', variant: 'blue' },
        { title: 'Appointments', value: '24', icon: ApptIcon, color: theme.palette.secondary.main, trend: '5 pending', variant: 'purple' },
        { title: 'Patient Rating', value: '4.9★', icon: Star, color: '#F59E0B', trend: 'Top 2% nationally', variant: 'light' },
        { title: 'Lab Pending', value: '6', icon: LabIcon, color: '#10B981', trend: '2 critical', variant: 'green' },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* ── Header ── */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                            PHYSICIAN PORTAL
                        </Typography>
                        <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.045em', mt: 0.3, lineHeight: 1 }}>
                            Good morning, Dr. John 👋
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.7 }}>
                            You have <strong>5 appointments</strong> and <strong>2 critical labs</strong> waiting for review.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="outlined" startIcon={<AiIcon />}
                            onClick={() => onNavigate?.('ai-insights')}
                            sx={{ borderRadius: '12px', fontWeight: 700, px: 2.5 }}>
                            AI Summary
                        </Button>
                        <Button variant="contained" startIcon={<ApptIcon />}
                            onClick={() => onNavigate?.('appointments')}
                            sx={{
                                borderRadius: '12px', fontWeight: 800, px: 2.5,
                                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                                boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.4)}`,
                            }}>
                            New Consultation
                        </Button>
                    </Box>
                </Box>
            </motion.div>

            {/* ── Stat Cards ── */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {statCards.map((card, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                            <DashboardCard {...card} />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* ── Main Bento Grid ── */}
            <Grid container spacing={3}>

                {/* Chart */}
                <Grid item xs={12} lg={8}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Box sx={{
                            bgcolor: 'background.paper', borderRadius: '24px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 20px 60px rgba(0,0,0,0.3)' : '0 20px 60px rgba(0,0,0,0.06)',
                        }}>
                            <AnalyticsChart
                                title="Weekly Consultations"
                                subtitle="Daily patient consultation volume this week"
                                data={consultationData}
                                dataKey="count"
                                color={theme.palette.secondary.main}
                            />
                        </Box>
                    </motion.div>
                </Grid>

                {/* Performance Metrics */}
                <Grid item xs={12} lg={4}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                        <Box sx={{
                            p: 3.5, bgcolor: 'background.paper', borderRadius: '24px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            height: '100%', display: 'flex', flexDirection: 'column', gap: 2.5,
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 20px 60px rgba(0,0,0,0.3)' : '0 20px 60px rgba(0,0,0,0.06)',
                        }}>
                            <Box>
                                <Typography fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>Performance</Typography>
                                <Typography variant="caption" color="text.secondary" fontWeight={600}>This month's clinical metrics</Typography>
                            </Box>
                            <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.08) }} />
                            {vitals.map((v, i) => <ProgressBar key={i} {...v} />)}
                        </Box>
                    </motion.div>
                </Grid>

                {/* AI Health Banner */}
                <Grid item xs={12}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
                        <Box sx={{
                            p: 3, borderRadius: '24px', display: 'flex', alignItems: 'center', gap: 3,
                            flexWrap: 'wrap',
                            background: theme.palette.mode === 'dark'
                                ? `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`
                                : `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.05)}, ${alpha(theme.palette.secondary.main, 0.08)})`,
                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                        }}>
                            <Box sx={{
                                p: 1.8, borderRadius: '16px',
                                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                                boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.4)}`,
                                display: 'flex',
                            }}>
                                <AiIcon sx={{ color: '#fff', fontSize: 28 }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>
                                    AI Clinical Insight Ready
                                </Typography>
                                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                    Patient James Carter shows ECG anomalies consistent with early-stage arrhythmia. Recommend cardiology consult.
                                </Typography>
                            </Box>
                            <Button variant="contained" endIcon={<ArrowForward />} size="small"
                                onClick={() => onNavigate?.('ai-insights')}
                                sx={{
                                    borderRadius: '12px', fontWeight: 800, px: 2.5, flexShrink: 0,
                                    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                                    boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.4)}`,
                                }}>
                                View Report
                            </Button>
                        </Box>
                    </motion.div>
                </Grid>

                {/* Today's Appointments */}
                <Grid item xs={12} md={7}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <Box sx={{
                            p: 3.5, bgcolor: 'background.paper', borderRadius: '24px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 20px 60px rgba(0,0,0,0.3)' : '0 20px 60px rgba(0,0,0,0.06)',
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                                <Box>
                                    <Typography fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>Today's Schedule</Typography>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>5 patients — next at 09:00 AM</Typography>
                                </Box>
                                <Button size="small" endIcon={<ArrowForward fontSize="small" />}
                                    onClick={() => onNavigate?.('appointments')}
                                    sx={{ fontWeight: 700, fontSize: 12 }}>All appointments</Button>
                            </Box>
                            <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.06), mb: 1 }} />
                            {appointments.map((a, i) => <AppointmentRow key={i} {...a} />)}
                        </Box>
                    </motion.div>
                </Grid>

                {/* Dark Metrics card */}
                <Grid item xs={12} md={5}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                        <Box sx={{
                            p: 3.5, height: '100%', borderRadius: '24px', position: 'relative', overflow: 'hidden',
                            background: theme.palette.mode === 'dark'
                                ? `linear-gradient(135deg, #0f172a, #1e293b)`
                                : `linear-gradient(135deg, #0A1628, #1a3560)`,
                            boxShadow: `0 20px 60px ${alpha(theme.palette.primary.dark, 0.35)}`,
                        }}>
                            {/* Orbs */}
                            <Box sx={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.3)}, transparent 70%)`, filter: 'blur(30px)' }} />
                            <Box sx={{ position: 'absolute', bottom: -40, left: -40, width: 130, height: 130, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.25)}, transparent 70%)`, filter: 'blur(25px)' }} />

                            <Typography fontWeight={900} sx={{ color: '#fff', mb: 3, position: 'relative', letterSpacing: '-0.02em' }}>
                                Quick Stats
                            </Typography>

                            {[
                                { icon: <HeartIcon />, label: 'Patients Treated', value: '2,847', color: theme.palette.secondary.main },
                                { icon: <TrendingUp />, label: 'Success Rate', value: '96.4%', color: '#10B981' },
                                { icon: <AiIcon />, label: 'AI Assists Used', value: '142', color: '#F59E0B' },
                            ].map((item, i) => (
                                <Box key={i} sx={{ mb: i < 2 ? 2.5 : 0 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{
                                            p: 1.3, borderRadius: '12px',
                                            bgcolor: alpha(item.color, 0.15), color: item.color, display: 'flex', flexShrink: 0
                                        }}>
                                            {item.icon}
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</Typography>
                                            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 24, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{item.value}</Typography>
                                        </Box>
                                    </Box>
                                    {i < 2 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mt: 2 }} />}
                                </Box>
                            ))}
                        </Box>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DoctorDashboard;
