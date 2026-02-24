import React, { useState } from 'react';
import {
    Box, Typography, Chip, alpha, useTheme, Button, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert
} from '@mui/material';
import {
    CheckCircle as AdminIcon,
    Schedule as PendingIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import LuxDataGrid from '../common/LuxDataGrid';

const initialLog = [
    { id: 1, patient: 'Emma Wilson', medication: 'Amlodipine 5mg', dose: '1 tablet', time: '08:00 AM', route: 'Oral', nurse: 'Alice Nurse', status: 'Administered' },
    { id: 2, patient: 'Carlos Rivera', medication: 'Heparin 5000 IU', dose: '5000 IU', time: '09:00 AM', route: 'IV', nurse: 'Alice Nurse', status: 'Administered' },
    { id: 3, patient: 'Priya Sharma', medication: 'Metformin 500mg', dose: '1 tablet', time: '10:00 AM', route: 'Oral', nurse: 'Alice Nurse', status: 'Pending' },
    { id: 4, patient: "Liam O'Brien", medication: 'Morphine 2mg', dose: '2mg', time: '10:30 AM', route: 'IV', nurse: 'Alice Nurse', status: 'Pending' },
    { id: 5, patient: 'Fatima Al-Sayed', medication: 'Paracetamol 500mg', dose: '2 tablets', time: '12:00 PM', route: 'Oral', nurse: 'Alice Nurse', status: 'Pending' },
    { id: 6, patient: 'Emma Wilson', medication: 'Furosemide 40mg', dose: '1 tablet', time: '02:00 PM', route: 'Oral', nurse: 'Alice Nurse', status: 'Pending' },
];

function NurseMedLogView() {
    const theme = useTheme();
    const [log, setLog] = useState(initialLog);
    const [snack, setSnack] = useState('');

    const handleAdminister = (id) => {
        setLog(prev => prev.map(e => e.id === id ? { ...e, status: 'Administered' } : e));
        setSnack('Medication marked as administered');
    };

    const columns = [
        {
            id: 'patient',
            label: 'Patient',
            render: (val, row) => (
                <Box>
                    <Typography fontWeight={700} fontSize={13}>{val}</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>{row.route} route</Typography>
                </Box>
            )
        },
        {
            id: 'medication',
            label: 'Medication',
            render: (val, row) => (
                <Box>
                    <Typography fontWeight={700} fontSize={13}>{val}</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Dose: {row.dose}</Typography>
                </Box>
            )
        },
        {
            id: 'time',
            label: 'Scheduled Time',
            render: (val) => <Typography fontSize={13} fontWeight={700}>{val}</Typography>
        },
        {
            id: 'status',
            label: 'Status',
            render: (val) => (
                <Chip
                    icon={val === 'Administered' ? <AdminIcon sx={{ fontSize: 14 }} /> : <PendingIcon sx={{ fontSize: 14 }} />}
                    label={val}
                    size="small"
                    sx={{
                        fontWeight: 800, fontSize: '0.7rem', borderRadius: '10px',
                        bgcolor: val === 'Administered' ? alpha('#10B981', 0.1) : alpha('#F59E0B', 0.1),
                        color: val === 'Administered' ? '#10B981' : '#F59E0B',
                        border: `1px solid ${val === 'Administered' ? alpha('#10B981', 0.2) : alpha('#F59E0B', 0.2)}`,
                        '& .MuiChip-icon': { color: val === 'Administered' ? '#10B981' : '#F59E0B' }
                    }}
                />
            )
        },
    ];

    const actions = (row) => (
        row.status === 'Pending' ? (
            <Button size="small" onClick={() => handleAdminister(row.id)}
                sx={{
                    borderRadius: '10px', fontWeight: 700, fontSize: 11, px: 1.5,
                    color: 'success.main', bgcolor: alpha(theme.palette.success.main, 0.05)
                }}>
                Mark Given
            </Button>
        ) : null
    );

    return (
        <Box>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Box sx={{ mb: 5 }}>
                    <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                        NURSING PORTAL
                    </Typography>
                    <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.045em', mt: 0.3, lineHeight: 1 }}>
                        Medication Log
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.7 }}>
                        Record and verify all medication administrations for your shift.
                    </Typography>
                </Box>
            </motion.div>
            <LuxDataGrid
                title="Medication Administration Record"
                columns={columns}
                data={log}
                actions={actions}
            />
            <Snackbar open={!!snack} autoHideDuration={3000} onClose={() => setSnack('')}>
                <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 700 }}>{snack}</Alert>
            </Snackbar>
        </Box>
    );
}

export default NurseMedLogView;
