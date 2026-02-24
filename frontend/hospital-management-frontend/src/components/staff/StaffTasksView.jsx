import React, { useState } from 'react';
import {
    Box, Typography, Chip, alpha, useTheme, Button, Avatar
} from '@mui/material';
import {
    CheckCircle as DoneIcon,
    Schedule as InProgressIcon,
    ErrorOutline as UrgentIcon,
    Add as AddIcon,
    Snooze as SnoozeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import LuxDataGrid from '../common/LuxDataGrid';

const initialTasks = [
    { id: 1, title: 'Update patient discharge forms', category: 'Administration', priority: 'High', status: 'In Progress', due: '2026-02-21' },
    { id: 2, title: 'Coordinate equipment maintenance schedule', category: 'Facilities', priority: 'Medium', status: 'Pending', due: '2026-02-22' },
    { id: 3, title: 'Review monthly supply inventory', category: 'Inventory', priority: 'Low', status: 'Done', due: '2026-02-20' },
    { id: 4, title: 'Staff scheduling for next week', category: 'HR', priority: 'High', status: 'In Progress', due: '2026-02-21' },
    { id: 5, title: 'Submit compliance audit documents', category: 'Compliance', priority: 'High', status: 'Pending', due: '2026-02-23' },
    { id: 6, title: 'Onboard new ward assistant', category: 'HR', priority: 'Medium', status: 'Done', due: '2026-02-19' },
    { id: 7, title: 'Update emergency contact list', category: 'Administration', priority: 'Low', status: 'Pending', due: '2026-02-24' },
];

const STATUS_CFG = {
    Done: { color: '#10B981', icon: <DoneIcon sx={{ fontSize: 14 }} /> },
    'In Progress': { color: '#3B82F6', icon: <InProgressIcon sx={{ fontSize: 14 }} /> },
    Pending: { color: '#F59E0B', icon: <SnoozeIcon sx={{ fontSize: 14 }} /> },
    Urgent: { color: '#EF4444', icon: <UrgentIcon sx={{ fontSize: 14 }} /> },
};
const PRIO_COLOR = { High: '#EF4444', Medium: '#F59E0B', Low: '#10B981' };

function StaffTasksView() {
    const theme = useTheme();
    const [tasks, setTasks] = useState(initialTasks);

    const cycleStatus = (id) => {
        const cycle = ['Pending', 'In Progress', 'Done'];
        setTasks(prev => prev.map(t => {
            if (t.id !== id) return t;
            const next = cycle[(cycle.indexOf(t.status) + 1) % cycle.length];
            return { ...t, status: next };
        }));
    };

    const columns = [
        {
            id: 'title',
            label: 'Task',
            render: (val, row) => (
                <Box>
                    <Typography fontWeight={700} fontSize={13}>{val}</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>{row.category}</Typography>
                </Box>
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
                    border: `1px solid ${alpha(PRIO_COLOR[val] || '#F59E0B', 0.2)}`,
                }} />
            )
        },
        {
            id: 'status',
            label: 'Status',
            render: (val) => {
                const cfg = STATUS_CFG[val] || STATUS_CFG['Pending'];
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
        {
            id: 'due',
            label: 'Due Date',
            render: (val) => <Typography fontSize={13} fontWeight={600}>{val}</Typography>
        },
    ];

    const actions = (row) => (
        <Button size="small" onClick={() => cycleStatus(row.id)}
            sx={{
                borderRadius: '10px', fontWeight: 700, fontSize: 11, px: 1.5,
                color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.05)
            }}>
            Update
        </Button>
    );

    return (
        <Box>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                            STAFF PORTAL
                        </Typography>
                        <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.045em', mt: 0.3, lineHeight: 1 }}>
                            My Tasks
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.7 }}>
                            Track, manage, and update your daily work items.
                        </Typography>
                    </Box>
                </Box>
            </motion.div>
            <LuxDataGrid
                title="Task Board"
                columns={columns}
                data={tasks}
                actions={actions}
            />
        </Box>
    );
}

export default StaffTasksView;
