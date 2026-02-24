import React from 'react';
import {
    Grid, Box, Typography, alpha, useTheme, Button,
    Avatar, Chip, Divider
} from '@mui/material';
import {
    Assignment as TaskIcon,
    SupportAgent as TicketIcon,
    People as StaffIcon,
    PendingActions as PendingIcon,
    TrendingUp,
    Add as AddIcon,
    ArrowForward,
    CheckCircle,
    Schedule,
    ErrorOutline,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import DashboardCard from '../common/DashboardCard';
import AnalyticsChart from '../common/AnalyticsChart';

const weeklyData = [
    { name: 'Mon', count: 5 },
    { name: 'Tue', count: 9 },
    { name: 'Wed', count: 7 },
    { name: 'Thu', count: 12 },
    { name: 'Fri', count: 11 },
    { name: 'Sat', count: 3 },
    { name: 'Sun', count: 2 },
];

const recentTasks = [
    { title: 'Update patient discharge forms', assignee: 'Sam Staff', priority: 'High', status: 'pending' },
    { title: 'Coordinate equipment maintenance', assignee: 'Sam Staff', priority: 'Medium', status: 'confirmed' },
    { title: 'Review supply inventory report', assignee: 'Sam Staff', priority: 'Low', status: 'confirmed' },
    { title: 'Staff scheduling for next week', assignee: 'Sam Staff', priority: 'High', status: 'urgent' },
];

const TaskRow = ({ title, assignee, priority, status }) => {
    const theme = useTheme();
    const statusConfig = {
        confirmed: { color: '#10B981', label: 'Done', icon: <CheckCircle sx={{ fontSize: 14 }} /> },
        pending: { color: '#F59E0B', label: 'In Progress', icon: <Schedule sx={{ fontSize: 14 }} /> },
        urgent: { color: theme.palette.error.main, label: 'Urgent', icon: <ErrorOutline sx={{ fontSize: 14 }} /> },
    };
    const prioColor = { High: '#EF4444', Medium: '#F59E0B', Low: '#10B981' };
    const s = statusConfig[status] || statusConfig.pending;

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: '14px',
            transition: 'all 0.2s', '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04) }
        }}>
            <Box sx={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                bgcolor: prioColor[priority] || '#F59E0B',
                boxShadow: `0 0 8px ${prioColor[priority] || '#F59E0B'}`
            }} />
            <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{title}</Typography>
                <Typography sx={{ fontSize: 11, color: 'text.secondary', fontWeight: 600 }}>{assignee}</Typography>
            </Box>
            <Chip icon={s.icon} label={s.label} size="small" sx={{
                bgcolor: alpha(s.color, 0.1), color: s.color, borderRadius: '8px',
                fontWeight: 800, fontSize: 10, border: `1px solid ${alpha(s.color, 0.2)}`,
                '& .MuiChip-icon': { color: s.color }
            }} />
        </Box>
    );
};

const StaffDashboard = ({ onNavigate }) => {
    const theme = useTheme();

    const statCards = [
        { title: 'Tasks Today', value: '11', icon: TaskIcon, color: theme.palette.primary.main, trend: '+4 new today', variant: 'blue' },
        { title: 'Open Tickets', value: '7', icon: TicketIcon, color: theme.palette.secondary.main, trend: '2 high priority', variant: 'purple' },
        { title: 'Staff On Duty', value: '24', icon: StaffIcon, color: '#F59E0B', trend: '3 on leave', variant: 'light' },
        { title: 'Pending Reviews', value: '5', icon: PendingIcon, color: '#10B981', trend: 'Due today', variant: 'green' },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                            STAFF PORTAL
                        </Typography>
                        <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.045em', mt: 0.3, lineHeight: 1 }}>
                            Good morning, Sam 👋
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.7 }}>
                            You have <strong>4 pending tasks</strong> and <strong>2 urgent tickets</strong> waiting.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="outlined" startIcon={<TicketIcon />}
                            onClick={() => onNavigate?.('support')}
                            sx={{ borderRadius: '12px', fontWeight: 700, px: 2.5 }}>
                            Support Center
                        </Button>
                        <Button variant="contained" startIcon={<AddIcon />}
                            onClick={() => onNavigate?.('tasks')}
                            sx={{
                                borderRadius: '12px', fontWeight: 800, px: 2.5,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                            }}>
                            New Task
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

            {/* Main Grid */}
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
                                title="Weekly Task Completions"
                                subtitle="Tasks completed per day this week"
                                data={weeklyData}
                                dataKey="count"
                                color={theme.palette.primary.main}
                            />
                        </Box>
                    </motion.div>
                </Grid>

                {/* Recent Tasks */}
                <Grid item xs={12} lg={5}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                        <Box sx={{
                            p: 3.5, bgcolor: 'background.paper', borderRadius: '24px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            boxShadow: theme.palette.mode === 'dark' ? '0 20px 60px rgba(0,0,0,0.3)' : '0 20px 60px rgba(0,0,0,0.06)',
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                                <Box>
                                    <Typography fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>Recent Tasks</Typography>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Today's work items</Typography>
                                </Box>
                                <Button size="small" endIcon={<ArrowForward fontSize="small" />}
                                    onClick={() => onNavigate?.('tasks')}
                                    sx={{ fontWeight: 700, fontSize: 12 }}>
                                    All tasks
                                </Button>
                            </Box>
                            <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.06), mb: 1 }} />
                            {recentTasks.map((t, i) => <TaskRow key={i} {...t} />)}
                        </Box>
                    </motion.div>
                </Grid>

                {/* Dark Quick Stats */}
                <Grid item xs={12}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <Box sx={{
                            p: 3.5, borderRadius: '24px', position: 'relative', overflow: 'hidden',
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, #0f172a, #1e293b)'
                                : 'linear-gradient(135deg, #0A1628, #1a3560)',
                            boxShadow: `0 20px 60px ${alpha(theme.palette.primary.dark, 0.35)}`,
                            display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap',
                        }}>
                            <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.25)}, transparent 70%)`, filter: 'blur(30px)' }} />
                            {[
                                { label: 'Tasks Completed', value: '148', color: theme.palette.primary.main },
                                { label: 'Avg Resolution Time', value: '2.4 hrs', color: '#10B981' },
                                { label: 'Tickets Resolved', value: '63', color: '#F59E0B' },
                            ].map((item, i) => (
                                <Box key={i} sx={{ flex: 1, minWidth: 140, position: 'relative' }}>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</Typography>
                                    <Typography sx={{ color: item.color, fontWeight: 900, fontSize: 32, letterSpacing: '-0.03em', lineHeight: 1.1, mt: 0.5 }}>{item.value}</Typography>
                                </Box>
                            ))}
                            <Button variant="outlined" endIcon={<TrendingUp />}
                                onClick={() => onNavigate?.('support')}
                                sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', fontWeight: 700, flexShrink: 0, '&:hover': { borderColor: 'rgba(255,255,255,0.5)', bgcolor: 'rgba(255,255,255,0.05)' } }}>
                                View Reports
                            </Button>
                        </Box>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StaffDashboard;
