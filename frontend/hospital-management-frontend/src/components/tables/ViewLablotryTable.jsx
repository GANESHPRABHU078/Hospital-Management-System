import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Chip,
    alpha,
    useTheme,
    Button,
    Avatar
} from "@mui/material";
import {
    Science as LabIcon,
    Visibility as ViewIcon,
    CheckCircle as DoneIcon,
    Pending as PendingIcon
} from "@mui/icons-material";
import LuxDataGrid from "../common/LuxDataGrid";

function ViewLablotryTable() {
    const [tests, setTests] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        setTests([
            { id: 1, patientName: "Alice Brown", testName: "Complete Blood Count", date: "2026-02-15", status: "Completed" },
            { id: 2, patientName: "Bob White", testName: "Lipid Profile", date: "2026-02-18", status: "Pending" },
            { id: 3, patientName: "Charlie Green", testName: "X-Ray Chest", date: "2026-02-20", status: "Completed" },
        ]);
    }, []);

    const columns = [
        {
            id: 'patientName',
            label: 'Patient',
            render: (val) => (
                <Typography variant="subtitle2" fontWeight={800}>{val}</Typography>
            )
        },
        {
            id: 'testName',
            label: 'Diagnostics',
            render: (val) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main' }}>
                        <LabIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Typography variant="caption" fontWeight={700}>{val}</Typography>
                </Box>
            )
        },
        {
            id: 'date',
            label: 'Date',
            render: (val) => (
                <Typography variant="caption" color="text.secondary" fontWeight={600}>{val}</Typography>
            )
        },
        {
            id: 'status',
            label: 'Status',
            render: (val) => (
                <Chip
                    label={val}
                    size="small"
                    icon={val === 'Completed' ? <DoneIcon sx={{ fontSize: '14px !important' }} /> : <PendingIcon sx={{ fontSize: '14px !important' }} />}
                    sx={{
                        fontWeight: 800,
                        borderRadius: '10px',
                        bgcolor: val === 'Completed' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.warning.main, 0.1),
                        color: val === 'Completed' ? 'success.dark' : 'warning.dark',
                        border: 'none',
                        fontSize: '0.7rem'
                    }}
                />
            )
        }
    ];

    const actions = (row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
                size="small"
                variant="outlined"
                startIcon={<ViewIcon />}
                sx={{ borderRadius: '10px', fontWeight: 700, px: 2 }}
            >
                View Results
            </Button>
        </Box>
    );

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 4, letterSpacing: '-0.02em' }}>
                Laboratory Services
            </Typography>

            <LuxDataGrid
                title="Diagnostic Tests"
                columns={columns}
                data={tests}
                actions={actions}
            />
        </Box>
    );
}

export default ViewLablotryTable;
