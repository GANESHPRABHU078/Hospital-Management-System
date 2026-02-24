import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { Box, Typography, useTheme, alpha, Chip } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

// Custom tooltip for premium look
const CustomTooltip = ({ active, payload, label, color }) => {
    if (!active || !payload?.length) return null;
    return (
        <Box sx={{
            px: 2.5, py: 2, borderRadius: '16px',
            bgcolor: 'background.paper',
            border: `1px solid`,
            borderColor: alpha(color, 0.2),
            boxShadow: `0 16px 40px rgba(0,0,0,0.2), 0 0 0 1px ${alpha(color, 0.06)}`,
            backdropFilter: 'blur(20px)',
            minWidth: 120,
        }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'text.secondary', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {label}
            </Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 900, color: color, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {payload[0].value}
            </Typography>
        </Box>
    );
};

const AnalyticsChart = ({ title, data, dataKey, color, subtitle }) => {
    const theme = useTheme();
    const gradientId = `gradient-${dataKey}-${Math.random().toString(36).substr(2, 5)}`;

    // Compute simple stats
    const values = data?.map(d => d[dataKey]) || [];
    const max = Math.max(...values);
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / (values.length || 1));
    const last = values[values.length - 1] || 0;
    const prev = values[values.length - 2] || 0;
    const delta = last - prev;

    return (
        <Box sx={{ p: { xs: 2, md: 3.5 }, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 360 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mt: 0.4, display: 'block' }}>
                            {subtitle}
                        </Typography>
                    )}
                </Box>
                {/* Delta badge */}
                <Chip
                    icon={<TrendingUp sx={{ fontSize: '14px !important', color: delta >= 0 ? '#10B981 !important' : '#EF4444 !important' }} />}
                    label={`${delta >= 0 ? '+' : ''}${delta} vs prev`}
                    size="small"
                    sx={{
                        bgcolor: alpha(delta >= 0 ? '#10B981' : '#EF4444', 0.1),
                        color: delta >= 0 ? '#10B981' : '#EF4444',
                        fontWeight: 800, fontSize: 11, borderRadius: '10px',
                        border: `1px solid ${alpha(delta >= 0 ? '#10B981' : '#EF4444', 0.2)}`,
                    }}
                />
            </Box>

            {/* Chart */}
            <Box sx={{ flex: 1, minHeight: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 8, left: -24, bottom: 0 }}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                                <stop offset="55%" stopColor={color} stopOpacity={0.08} />
                                <stop offset="100%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="0"
                            vertical={false}
                            stroke={alpha(theme.palette.divider, 0.07)}
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false} tickLine={false}
                            tick={{ fill: theme.palette.text.secondary, fontSize: 11, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false} tickLine={false}
                            tick={{ fill: theme.palette.text.secondary, fontSize: 11, fontWeight: 700 }}
                            dx={-4}
                        />
                        <Tooltip
                            cursor={{ stroke: alpha(color, 0.2), strokeWidth: 2, strokeDasharray: '4 4' }}
                            content={<CustomTooltip color={color} />}
                        />
                        <ReferenceLine
                            y={avg} stroke={alpha(color, 0.25)}
                            strokeDasharray="6 4" strokeWidth={1.5}
                            label={{ value: 'Avg', fill: alpha(color, 0.5), fontSize: 10, fontWeight: 800, dx: 4 }}
                        />
                        <Area
                            type="monotone" dataKey={dataKey}
                            stroke={color} strokeWidth={3}
                            fillOpacity={1} fill={`url(#${gradientId})`}
                            dot={false}
                            activeDot={{ r: 7, stroke: theme.palette.background.paper, strokeWidth: 3, fill: color, filter: `drop-shadow(0 0 8px ${alpha(color, 0.8)})` }}
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>

            {/* Stat footer */}
            <Box sx={{ display: 'flex', gap: 3, mt: 2.5, pt: 2.5, borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}` }}>
                {[
                    { label: 'Peak', value: max },
                    { label: 'Avg / Day', value: avg },
                    { label: 'Latest', value: last },
                ].map(s => (
                    <Box key={s.label}>
                        <Typography sx={{ fontSize: 10, fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</Typography>
                        <Typography sx={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.03em', color: 'text.primary' }}>{s.value}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AnalyticsChart;
