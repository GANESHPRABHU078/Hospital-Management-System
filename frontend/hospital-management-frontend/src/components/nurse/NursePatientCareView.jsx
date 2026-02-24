import React from 'react';
import {
    Box, Typography, Chip, alpha, useTheme, Avatar, LinearProgress
} from '@mui/material';
import {
    FavoriteBorder as VitalsIcon,
    Medication as MedIcon,
    ErrorOutline as AlertIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import LuxDataGrid from '../common/LuxDataGrid';

const patients = [
    { id: 1, name: 'Emma Wilson', bed: 'Ward 2, Bed 4', condition: 'Stable', bp: '118/76', spo2: 99, meds: 2, nextCare: '14:00', alert: false },
    { id: 2, name: 'Carlos Rivera', bed: 'Ward 3, Bed 7', condition: 'Critical', bp: '145/95', spo2: 91, meds: 4, nextCare: 'Now', alert: true },
    { id: 3, name: 'Priya Sharma', bed: 'Ward 1, Bed 2', condition: 'Stable', bp: '120/80', spo2: 98, meds: 1, nextCare: '15:30', alert: false },
    { id: 4, name: "Liam O'Brien", bed: 'ICU, Bed 1', condition: 'Monitoring', bp: '132/82', spo2: 94, meds: 6, nextCare: 'Now', alert: true },
    { id: 5, name: 'Fatima Al-Sayed', bed: 'Ward 4, Bed 9', condition: 'Stable', bp: '115/72', spo2: 99, meds: 2, nextCare: '16:00', alert: false },
];

const CONDITION_COLOR = {
    Stable: '#10B981',
    Critical: '#EF4444',
    Monitoring: '#F59E0B',
};

function NursePatientCareView() {
    const theme = useTheme();

    const columns = [
        {
            id: 'name',
            label: 'Patient',
            render: (val, row) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {row.alert && <AlertIcon sx={{ fontSize: 16, color: '#EF4444' }} />}
                    <Avatar sx={{
                        width: 36, height: 36, fontSize: 13, fontWeight: 800,
                        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.06)})`,
                        color: 'secondary.main',
                    }}>
                        {val.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography fontWeight={700} fontSize={13}>{val}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>{row.bed}</Typography>
                    </Box>
                </Box>
            )
        },
        {
            id: 'condition',
            label: 'Condition',
            render: (val) => (
                <Chip label={val} size="small" sx={{
                    fontWeight: 800, fontSize: '0.7rem', borderRadius: '10px',
                    bgcolor: alpha(CONDITION_COLOR[val] || '#3B82F6', 0.1),
                    color: CONDITION_COLOR[val] || '#3B82F6',
                    border: `1px solid ${alpha(CONDITION_COLOR[val] || '#3B82F6', 0.2)}`,
                }} />
            )
        },
        {
            id: 'bp',
            label: 'Blood Pressure',
            render: (val) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VitalsIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
                    <Typography fontSize={13} fontWeight={700}>{val} mmHg</Typography>
                </Box>
            )
        },
        {
            id: 'spo2',
            label: 'SpO₂',
            render: (val) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography fontSize={13} fontWeight={800} sx={{ color: val >= 95 ? '#10B981' : val >= 90 ? '#F59E0B' : '#EF4444' }}>
                        {val}%
                    </Typography>
                    <LinearProgress variant="determinate" value={val} sx={{
                        width: 50, height: 4, borderRadius: 10,
                        bgcolor: 'rgba(0,0,0,0.06)',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 10,
                            bgcolor: val >= 95 ? '#10B981' : val >= 90 ? '#F59E0B' : '#EF4444'
                        }
                    }} />
                </Box>
            )
        },
        {
            id: 'meds',
            label: 'Meds Due',
            render: (val) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <MedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                    <Typography fontSize={13} fontWeight={700}>{val} today</Typography>
                </Box>
            )
        },
        {
            id: 'nextCare',
            label: 'Next Care',
            render: (val) => (
                <Chip label={val} size="small" sx={{
                    fontWeight: 800, fontSize: '0.7rem', borderRadius: '10px',
                    bgcolor: val === 'Now' ? alpha('#EF4444', 0.1) : alpha('#3B82F6', 0.08),
                    color: val === 'Now' ? '#EF4444' : 'primary.main',
                }} />
            )
        },
    ];

    return (
        <Box>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Box sx={{ mb: 5 }}>
                    <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                        NURSING PORTAL
                    </Typography>
                    <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.045em', mt: 0.3, lineHeight: 1 }}>
                        Patient Care
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.7 }}>
                        Live vitals, care schedule, and medication tracking for assigned patients.
                    </Typography>
                </Box>
            </motion.div>
            <LuxDataGrid
                title="Patient Vitals & Care"
                columns={columns}
                data={patients}
            />
        </Box>
    );
}

export default NursePatientCareView;
