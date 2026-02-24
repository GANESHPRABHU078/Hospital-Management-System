import React from 'react';
import {
    Grid, Box, Typography, alpha, useTheme, Button,
    LinearProgress, Divider, IconButton
} from '@mui/material';
import {
    People, LocalHospital, TrendingUp, EventAvailable,
    ShieldMoon as CriticalIcon, MedicalServices as SurgeryIcon,
    KingBed as BedIcon, ArrowForward, MoreVert
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import DashboardCard from '../common/DashboardCard';
import AnalyticsChart from '../common/AnalyticsChart';

// ─── Mini donut / ring progress ───────────────────────
const RingProgress = ({ value, color, size = 64, stroke = 6 }) => {
    const r = (size - stroke * 2) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;
    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
                strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
        </svg>
    );
};

// ─── Activity Row ──────────────────────────────────────
const ActivityRow = ({ label, subLabel, value, color, pct }) => (
    <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.6 }}>
            <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{label}</Typography>
                {subLabel && <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{subLabel}</Typography>}
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: 15 }}>{value}</Typography>
        </Box>
        <LinearProgress variant="determinate" value={pct} sx={{
            height: 5, borderRadius: 10,
            bgcolor: 'rgba(255,255,255,0.06)',
            '& .MuiLinearProgress-bar': { borderRadius: 10, bgcolor: color }
        }} />
    </Box>
);

// ─── Alert Row ─────────────────────────────────────────
const AlertRow = ({ title, desc, type }) => {
    const theme = useTheme();
    const colors = { urgent: theme.palette.secondary.main, info: theme.palette.primary.main, ok: '#10B981' };
    const c = colors[type] || colors.info;
    return (
        <Box sx={{
            display: 'flex', gap: 2, p: 2, borderRadius: '14px',
            bgcolor: alpha(c, 0.06), border: `1px solid ${alpha(c, 0.14)}`
        }}>
            <Box sx={{ mt: 0.3, width: 8, height: 8, borderRadius: '50%', bgcolor: c, boxShadow: `0 0 8px ${c}`, flexShrink: 0 }} />
            <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 13, color: c }}>{title}</Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', fontWeight: 500, mt: 0.3 }}>{desc}</Typography>
            </Box>
        </Box>
    );
};

const AdminDashboard = () => {
    const theme = useTheme();

    const patientTrendData = [
        { name: 'Mon', count: 42, revenue: 12000 },
        { name: 'Tue', count: 58, revenue: 18400 },
        { name: 'Wed', count: 45, revenue: 14200 },
        { name: 'Thu', count: 72, revenue: 24100 },
        { name: 'Fri', count: 68, revenue: 21800 },
        { name: 'Sat', count: 32, revenue: 9500 },
        { name: 'Sun', count: 28, revenue: 7800 },
    ];

    const deptData = [
        { label: 'Cardiology', subLabel: '48 patients', value: '94%', pct: 94, color: theme.palette.secondary.main },
        { label: 'Neurology', subLabel: '31 patients', value: '76%', pct: 76, color: theme.palette.primary.main },
        { label: 'Orthopedics', subLabel: '24 patients', value: '62%', pct: 62, color: '#10B981' },
        { label: 'Oncology', subLabel: '17 patients', value: '48%', pct: 48, color: '#F59E0B' },
    ];

    const alerts = [
        { title: 'Critical: ICU at 95% capacity', desc: '2 beds remaining — initiate transfer protocol', type: 'urgent' },
        { title: '8 Scheduled Surgeries Today', desc: 'All prep confirmed. Standby notified.', type: 'info' },
        { title: 'Lab System Sync Complete', desc: 'All patient results updated at 08:42 AM', type: 'ok' },
    ];

    const statCards = [
        { title: 'Total Patients', value: '1,284', icon: People, color: theme.palette.primary.main, trend: '+12%', variant: 'blue' },
        { title: 'Medical Staff', value: '198', icon: LocalHospital, color: theme.palette.secondary.main, trend: 'Active', variant: 'purple' },
        { title: 'Revenue (MTD)', value: '$84.2k', icon: TrendingUp, color: '#10B981', trend: '+8.4%', variant: 'green' },
        { title: 'Avg. Wait Time', value: '14m', icon: EventAvailable, color: '#F59E0B', trend: '-2m', variant: 'light' },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* ── Header ── */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                            REAL-TIME OPERATIONS
                        </Typography>
                        <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.045em', mt: 0.3, lineHeight: 1 }}>
                            Hospital Command
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.7 }}>
                            Clinical throughput and operational intelligence dashboard
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="outlined" sx={{ borderRadius: '12px', fontWeight: 700, px: 2.5 }}>Export Report</Button>
                        <Button variant="contained" sx={{
                            borderRadius: '12px', fontWeight: 800, px: 2.5,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        }}>System Health</Button>
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

            {/* ── Main Grid ── */}
            <Grid container spacing={3}>

                {/* Chart — large */}
                <Grid item xs={12} lg={8}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Box sx={{
                            bgcolor: 'background.paper',
                            borderRadius: '24px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            overflow: 'hidden',
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 20px 60px rgba(0,0,0,0.3)'
                                : '0 20px 60px rgba(0,0,0,0.06)',
                        }}>
                            <AnalyticsChart
                                title="Patient Admission Flow"
                                subtitle="Weekly trend analysis of inpatient check-ins"
                                data={patientTrendData}
                                dataKey="count"
                                color={theme.palette.primary.main}
                            />
                        </Box>
                    </motion.div>
                </Grid>

                {/* Dept load */}
                <Grid item xs={12} lg={4}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                        <Box sx={{
                            p: 3.5, bgcolor: 'background.paper', borderRadius: '24px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            height: '100%', display: 'flex', flexDirection: 'column', gap: 2.5,
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 20px 60px rgba(0,0,0,0.3)'
                                : '0 20px 60px rgba(0,0,0,0.06)',
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>Dept. Capacity</Typography>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Live occupancy rates</Typography>
                                </Box>
                                <IconButton size="small"><MoreVert fontSize="small" /></IconButton>
                            </Box>
                            <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.08) }} />
                            {deptData.map((d, i) => <ActivityRow key={i} {...d} />)}
                        </Box>
                    </motion.div>
                </Grid>

                {/* Critical metrics bento */}
                <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <Box sx={{
                            p: 3.5, height: '100%', borderRadius: '24px',
                            background: theme.palette.mode === 'dark'
                                ? `linear-gradient(135deg, #0f172a, #1e293b)`
                                : `linear-gradient(135deg, #0A1628, #1a3560)`,
                            position: 'relative', overflow: 'hidden',
                            boxShadow: `0 20px 60px ${alpha(theme.palette.primary.dark, 0.3)}`,
                        }}>
                            {/* Orb */}
                            <Box sx={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.3)}, transparent 70%)`, filter: 'blur(30px)' }} />
                            <Box sx={{ position: 'absolute', bottom: -40, left: -40, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.2)}, transparent 70%)`, filter: 'blur(25px)' }} />

                            <Typography fontWeight={900} sx={{ color: '#fff', mb: 3, letterSpacing: '-0.02em', position: 'relative' }}>
                                Critical Metrics
                            </Typography>

                            {[
                                { icon: <CriticalIcon />, label: 'Urgent Cases', value: '12', pct: 80, color: theme.palette.secondary.main },
                                { icon: <SurgeryIcon />, label: 'Surgeries Today', value: '8', pct: 53, color: '#F59E0B' },
                                { icon: <BedIcon />, label: 'Available Beds', value: '14', pct: 35, color: '#10B981' },
                            ].map((item, i) => (
                                <Box key={i} sx={{ mb: i < 2 ? 3 : 0, position: 'relative' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <Box sx={{
                                            p: 1.2, borderRadius: '12px', display: 'flex',
                                            bgcolor: alpha(item.color, 0.15),
                                            color: item.color
                                        }}>
                                            {item.icon}
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{item.label}</Typography>
                                            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 26, lineHeight: 1, letterSpacing: '-0.03em' }}>{item.value}</Typography>
                                        </Box>
                                        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <RingProgress value={item.pct} color={item.color} size={52} stroke={5} />
                                            <Typography sx={{ position: 'absolute', fontSize: 9, fontWeight: 800, color: '#fff' }}>{item.pct}%</Typography>
                                        </Box>
                                    </Box>
                                    {i < 2 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />}
                                </Box>
                            ))}
                        </Box>
                    </motion.div>
                </Grid>

                {/* Live Alerts */}
                <Grid item xs={12} md={8}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                        <Box sx={{
                            p: 3.5, bgcolor: 'background.paper', borderRadius: '24px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            display: 'flex', flexDirection: 'column', gap: 0,
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 20px 60px rgba(0,0,0,0.3)'
                                : '0 20px 60px rgba(0,0,0,0.06)',
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                                <Box>
                                    <Typography fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>Live Alerts</Typography>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Clinical priority feed</Typography>
                                </Box>
                                <Button size="small" endIcon={<ArrowForward fontSize="small" />} sx={{ fontWeight: 700, fontSize: 12 }}>
                                    View all
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {alerts.map((a, i) => <AlertRow key={i} {...a} />)}
                            </Box>
                        </Box>
                    </motion.div>
                </Grid>

            </Grid>
        </Box>
    );
};

export default AdminDashboard;
