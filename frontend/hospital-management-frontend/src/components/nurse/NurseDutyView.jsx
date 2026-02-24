import React from 'react';
import {
    Box, Typography, Chip, alpha, useTheme, Grid, Avatar
} from '@mui/material';
import { motion } from 'framer-motion';
import LuxDataGrid from '../common/LuxDataGrid';

const dutyData = [
    { id: 1, nurse: 'Alice Nurse', role: 'Charge Nurse', ward: 'Ward 2', shift: 'Morning (07:00–15:00)', date: '2026-02-21', status: 'On Duty' },
    { id: 2, nurse: 'Bob Richards', role: 'RN', ward: 'ICU', shift: 'Evening (15:00–23:00)', date: '2026-02-21', status: 'Scheduled' },
    { id: 3, nurse: 'Clara Wu', role: 'LPN', ward: 'Ward 3', shift: 'Night (23:00–07:00)', date: '2026-02-21', status: 'Scheduled' },
    { id: 4, nurse: 'Danny Osei', role: 'RN', ward: 'Ward 1', shift: 'Morning (07:00–15:00)', date: '2026-02-22', status: 'Scheduled' },
    { id: 5, nurse: 'Emma Johansson', role: 'Charge Nurse', ward: 'Ward 4', shift: 'Evening (15:00–23:00)', date: '2026-02-22', status: 'On Leave' },
    { id: 6, nurse: 'Alice Nurse', role: 'Charge Nurse', ward: 'Ward 2', shift: 'Morning (07:00–15:00)', date: '2026-02-22', status: 'Scheduled' },
];

const STATUS_COLOR = {
    'On Duty': '#10B981',
    'Scheduled': '#3B82F6',
    'On Leave': '#F59E0B',
};

function NurseDutyView() {
    const theme = useTheme();

    const columns = [
        {
            id: 'nurse',
            label: 'Nurse',
            render: (val, row) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{
                        width: 32, height: 32, fontSize: 12, fontWeight: 800,
                        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.06)})`,
                        color: 'secondary.main',
                    }}>
                        {val.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography fontWeight={700} fontSize={13}>{val}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>{row.role}</Typography>
                    </Box>
                </Box>
            )
        },
        { id: 'ward', label: 'Ward', render: (val) => <Typography fontWeight={700} fontSize={13}>{val}</Typography> },
        { id: 'shift', label: 'Shift', render: (val) => <Typography fontSize={13} fontWeight={600}>{val}</Typography> },
        { id: 'date', label: 'Date', render: (val) => <Typography fontSize={13} fontWeight={600}>{val}</Typography> },
        {
            id: 'status',
            label: 'Status',
            render: (val) => (
                <Chip label={val} size="small" sx={{
                    fontWeight: 800, fontSize: '0.7rem', borderRadius: '10px',
                    bgcolor: alpha(STATUS_COLOR[val] || '#3B82F6', 0.1),
                    color: STATUS_COLOR[val] || '#3B82F6',
                    border: `1px solid ${alpha(STATUS_COLOR[val] || '#3B82F6', 0.2)}`,
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
                        Duty Schedule
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.7 }}>
                        View and manage nursing duty assignments by ward and shift.
                    </Typography>
                </Box>
            </motion.div>
            <LuxDataGrid
                title="Nursing Shifts"
                columns={columns}
                data={dutyData}
            />
        </Box>
    );
}

export default NurseDutyView;
