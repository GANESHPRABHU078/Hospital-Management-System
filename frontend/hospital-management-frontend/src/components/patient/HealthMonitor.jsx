import React from 'react';
import {
    Box, Typography, Grid, alpha, useTheme, LinearProgress,
    Tooltip, Chip, Divider
} from '@mui/material';
import {
    Favorite as HeartIcon,
    Air as LungIcon,
    Thermostat as TempIcon,
    WaterDrop as BloodIcon,
    TrendingUp,
    TrendingDown,
    HealthAndSafety as ShieldIcon,
    CheckCircle as NormalIcon,
    Warning as AlertIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const VitalCard = ({ icon: Icon, label, value, unit, status, trend, color, pct }) => {
    const theme = useTheme();
    const isNormal = status === 'Normal';

    return (
        <Box sx={{
            p: 2.5,
            borderRadius: '20px',
            bgcolor: 'background.paper',
            border: `1px solid ${alpha(color, 0.15)}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 8px 32px ${alpha(color, 0.05)}`,
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 40px ${alpha(color, 0.1)}`,
                transition: 'all 0.3s ease'
            }
        }}>
            {/* Background Glow */}
            <Box sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha(color, 0.2)}, transparent 70%)`,
                filter: 'blur(20px)',
                pointerEvents: 'none'
            }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{
                    p: 1.2,
                    borderRadius: '12px',
                    bgcolor: alpha(color, 0.1),
                    color: color,
                    display: 'flex'
                }}>
                    <Icon sx={{ fontSize: 24 }} />
                </Box>
                <Chip
                    icon={isNormal ? <NormalIcon sx={{ fontSize: '14px !important' }} /> : <AlertIcon sx={{ fontSize: '14px !important' }} />}
                    label={status}
                    size="small"
                    sx={{
                        bgcolor: alpha(isNormal ? '#10B981' : '#EF4444', 0.1),
                        color: isNormal ? '#10B981' : '#EF4444',
                        fontWeight: 800,
                        fontSize: 10,
                        borderRadius: '8px',
                        border: `1px solid ${alpha(isNormal ? '#10B981' : '#EF4444', 0.2)}`
                    }}
                />
            </Box>

            <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {label}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mt: 0.5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
                        {value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                        {unit}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ mt: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {trend === 'up' ? <TrendingUp sx={{ fontSize: 14, color: '#10B981' }} /> : <TrendingDown sx={{ fontSize: 14, color: '#EF4444' }} />}
                        {trend === 'up' ? '+2.4%' : '-1.2%'} from yesterday
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: color }}>
                        {pct}%
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={pct}
                    sx={{
                        height: 6,
                        borderRadius: 10,
                        bgcolor: alpha(color, 0.1),
                        '& .MuiLinearProgress-bar': {
                            bgcolor: color,
                            borderRadius: 10
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

const HealthMonitor = () => {
    const theme = useTheme();

    const vitals = [
        { icon: HeartIcon, label: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal', trend: 'up', color: theme.palette.secondary.main, pct: 72 },
        { icon: BloodIcon, label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'Normal', trend: 'down', color: theme.palette.primary.main, pct: 85 },
        { icon: TempIcon, label: 'Body Temp', value: '36.6', unit: '°C', status: 'Normal', trend: 'up', color: '#F59E0B', pct: 92 },
        { icon: LungIcon, label: 'Blood Oxygen', value: '98', unit: '%', status: 'Normal', trend: 'up', color: '#10B981', pct: 98 },
    ];

    return (
        <Box>
            {/* Header Section */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" fontWeight={900} sx={{ letterSpacing: '-0.02em', mb: 0.5 }}>
                        Live Health Monitor
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShieldIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                        Real-time biometric data sync active
                    </Typography>
                </Box>
                <Tooltip title="Data synced 1m ago">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: alpha(theme.palette.secondary.main, 0.1), px: 2, py: 1, borderRadius: '12px' }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main', boxShadow: `0 0 10px ${theme.palette.secondary.main}`, animation: 'pulse 2s infinite' }} />
                        <Typography sx={{ color: 'secondary.main', fontWeight: 800, fontSize: 12 }}>SYNCED</Typography>
                    </Box>
                </Tooltip>
            </Box>

            {/* Vitals Grid */}
            <Grid container spacing={3}>
                {vitals.map((vital, i) => (
                    <Grid item xs={12} sm={6} lg={3} key={i}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <VitalCard {...vital} />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* Health Summary Banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Box sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: '24px',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    flexWrap: 'wrap'
                }}>
                    <Box sx={{
                        p: 1.5,
                        borderRadius: '16px',
                        background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                        boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.4)}`,
                        display: 'flex',
                        color: '#fff'
                    }}>
                        <InfoIcon sx={{ fontSize: 24 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={900} sx={{ letterSpacing: '-0.01em' }}>
                            Daily Health Summary
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            All your vitals were within the optimal range today. Your average resting heart rate has decreased by 4bpm compared to last week, indicating improved cardiovascular health.
                        </Typography>
                    </Box>
                    <Chip
                        label="Overall: Excellent"
                        sx={{
                            bgcolor: '#10B981',
                            color: '#fff',
                            fontWeight: 900,
                            px: 1,
                            height: 32,
                            borderRadius: '10px'
                        }}
                    />
                </Box>
            </motion.div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}} />
        </Box>
    );
};

export default HealthMonitor;
