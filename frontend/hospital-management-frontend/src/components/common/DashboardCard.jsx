import React, { useState } from 'react';
import { Paper, Box, Typography, alpha, useTheme } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, value, icon: IconComponent, color, trend, variant = 'light' }) => {
    const theme = useTheme();
    const isPositive = trend && (trend.startsWith('+') || !trend.startsWith('-'));
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    const getBackground = () => {
        if (theme.palette.mode === 'dark') return 'background.paper';
        switch (variant) {
            case 'blue': return `linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)`;
            case 'green': return `linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)`;
            case 'purple': return `linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)`;
            default: return 'background.paper';
        }
    };

    const getBorderColor = () => {
        if (theme.palette.mode === 'dark') return alpha(theme.palette.divider, 0.08);
        switch (variant) {
            case 'blue': return '#7DD3FC';
            case 'green': return '#86EFAC';
            case 'purple': return '#D8B4FE';
            default: return alpha(theme.palette.divider, 0.1);
        }
    };

    return (
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }} style={{ height: '100%' }}>
            <Paper sx={{
                p: 3, height: '100%', position: 'relative', overflow: 'hidden',
                borderRadius: '24px',
                background: getBackground(),
                border: `1px solid ${getBorderColor()}`,
                boxShadow: theme.palette.mode === 'light' ? '0 4px 20px rgba(0,0,0,0.03)' : 'none',
                transition: 'all 0.35s ease',
                '&:hover': {
                    boxShadow: theme.palette.mode === 'light' ? '0 12px 40px rgba(0,0,0,0.06)' : 'none',
                }
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box sx={{ zIndex: 1 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, mb: 1.5, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.04em', color: 'text.primary', lineHeight: 1 }}>
                            {value}
                        </Typography>
                    </Box>

                    <Box sx={{
                        p: 1.5, borderRadius: '14px',
                        bgcolor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.5)' : alpha(color || theme.palette.primary.main, 0.1),
                        color: color || 'primary.main',
                        display: 'flex',
                        border: theme.palette.mode === 'light' ? '1px solid rgba(255,255,255,0.8)' : 'none',
                    }}>
                        {IconComponent && <IconComponent sx={{ fontSize: 24 }} />}
                    </Box>
                </Box>

                {trend && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 2.5 }}>
                        <TrendIcon sx={{ fontSize: 14, color: isPositive ? '#059669' : '#DC2626' }} />
                        <Typography variant="caption" sx={{
                            fontWeight: 800, fontSize: 12,
                            color: isPositive ? '#059669' : '#DC2626'
                        }}>
                            {trend}
                        </Typography>
                    </Box>
                )}
            </Paper>
        </motion.div>
    );
};

export default DashboardCard;
