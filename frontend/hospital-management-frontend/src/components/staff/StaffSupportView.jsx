import React, { useState } from 'react';
import {
    Box, Typography, Chip, alpha, useTheme, Button
} from '@mui/material';
import {
    CheckCircle as ResolvedIcon,
    Schedule as OpenIcon,
    ErrorOutline as EscalatedIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import LuxDataGrid from '../common/LuxDataGrid';

const initialTickets = [
    { id: 1, subject: 'IT system login issue for ward 3', submittedBy: 'Nurse Alice', category: 'IT', priority: 'High', status: 'Open', created: '2026-02-20' },
    { id: 2, subject: 'Broken wheelchair in corridor B', submittedBy: 'Dr. Patel', category: 'Facilities', priority: 'Medium', status: 'Open', created: '2026-02-19' },
    { id: 3, subject: 'Missing patient wristbands (stock)', submittedBy: 'Sam Staff', category: 'Inventory', priority: 'Low', status: 'Resolved', created: '2026-02-18' },
    { id: 4, subject: 'HVAC temperature off in ICU', submittedBy: 'Charge Nurse Smith', category: 'Facilities', priority: 'High', status: 'Escalated', created: '2026-02-20' },
    { id: 5, subject: 'Request new gloves supply (Medium)', submittedBy: 'Dr. Johnson', category: 'Inventory', priority: 'Low', status: 'Resolved', created: '2026-02-17' },
    { id: 6, subject: 'Printer offline in admin office', submittedBy: 'Admin Desk', category: 'IT', priority: 'Medium', status: 'Open', created: '2026-02-21' },
];

const STATUS_CFG = {
    Open: { color: '#3B82F6', icon: <OpenIcon sx={{ fontSize: 14 }} /> },
    Resolved: { color: '#10B981', icon: <ResolvedIcon sx={{ fontSize: 14 }} /> },
    Escalated: { color: '#EF4444', icon: <EscalatedIcon sx={{ fontSize: 14 }} /> },
};
const PRIO_COLOR = { High: '#EF4444', Medium: '#F59E0B', Low: '#10B981' };

function StaffSupportView() {
    const theme = useTheme();
    const [tickets, setTickets] = useState(initialTickets);

    const handleResolve = (id) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    };

    const columns = [
        {
            id: 'subject',
            label: 'Subject',
            render: (val, row) => (
                <Box>
                    <Typography fontWeight={700} fontSize={13}>{val}</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>by {row.submittedBy}</Typography>
                </Box>
            )
        },
        {
            id: 'category',
            label: 'Category',
            render: (val) => (
                <Chip label={val} size="small" sx={{
                    fontWeight: 800, fontSize: '0.7rem', borderRadius: '10px',
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                }} />
            )
        },
        {
            id: 'priority',
            label: 'Priority',
            render: (val) => (
                <Chip label={val} size="small" sx={{
                    fontWeight: 800, fontSize: '0.7rem', borderRadius: '10px',
                    bgcolor: alpha(PRIO_COLOR[val] || '#F59E0B', 0.1),
                    color: PRIO_COLOR[val] || '#F59E0B',
                }} />
            )
        },
        {
            id: 'status',
            label: 'Status',
            render: (val) => {
                const cfg = STATUS_CFG[val] || STATUS_CFG['Open'];
                return (
                    <Chip icon={cfg.icon} label={val} size="small" sx={{
                        fontWeight: 800, fontSize: '0.7rem', borderRadius: '10px',
                        bgcolor: alpha(cfg.color, 0.1), color: cfg.color,
                        border: `1px solid ${alpha(cfg.color, 0.2)}`,
                        '& .MuiChip-icon': { color: cfg.color }
                    }} />
                );
            }
        },
        { id: 'created', label: 'Date', render: (val) => <Typography fontSize={13} fontWeight={600}>{val}</Typography> },
    ];

    const actions = (row) => (
        row.status !== 'Resolved' ? (
            <Button size="small" onClick={() => handleResolve(row.id)}
                sx={{
                    borderRadius: '10px', fontWeight: 700, fontSize: 11, px: 1.5,
                    color: 'success.main', bgcolor: alpha(theme.palette.success.main, 0.05)
                }}>
                Resolve
            </Button>
        ) : null
    );

    return (
        <Box>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Box sx={{ mb: 5 }}>
                    <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                        STAFF PORTAL
                    </Typography>
                    <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.045em', mt: 0.3, lineHeight: 1 }}>
                        Support Center
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.7 }}>
                        Manage and resolve support tickets from hospital staff.
                    </Typography>
                </Box>
            </motion.div>
            <LuxDataGrid
                title="Support Tickets"
                columns={columns}
                data={tickets}
                actions={actions}
            />
        </Box>
    );
}

export default StaffSupportView;
