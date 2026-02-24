import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Chip,
    alpha,
    useTheme,
    Button
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    MedicalInformation as NurseIcon
} from "@mui/icons-material";
import LuxDataGrid from "../common/LuxDataGrid";

const NURSE_AVATARS = [
    'https://cdn-icons-png.flaticon.com/512/3844/3844723.png',
    'https://cdn-icons-png.flaticon.com/512/3844/3844655.png',
    'https://cdn-icons-png.flaticon.com/512/3844/3844787.png'
];

function ViewNursesTable() {
    const [nurses, setNurses] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        setNurses([
            { id: 1, name: "Sarah Connor", department: "Emergency", shift: "Night" },
            { id: 2, name: "Emma Wilson", department: "Pediatrics", shift: "Day" },
            { id: 3, name: "Clara Oswald", department: "Cardiology", shift: "Day" },
        ]);
    }, []);

    const columns = [
        {
            id: 'name',
            label: 'Nurse Name',
            render: (val, row) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={NURSE_AVATARS[row.id % 3]} sx={{ width: 44, height: 44, border: '2px solid', borderColor: 'divider' }} />
                    <Box>
                        <Typography variant="subtitle2" fontWeight={800}>{val}</Typography>
                        <Typography variant="caption" color="text.secondary">ID: NS-{row.id}</Typography>
                    </Box>
                </Box>
            )
        },
        {
            id: 'department',
            label: 'Department',
            render: (val) => (
                <Chip
                    label={val}
                    size="small"
                    sx={{
                        fontWeight: 700,
                        borderRadius: '10px',
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        color: 'primary.main',
                        border: 'none'
                    }}
                />
            )
        },
        {
            id: 'shift',
            label: 'Shift',
            render: (val) => (
                <Chip
                    label={val}
                    variant="outlined"
                    size="small"
                    sx={{
                        fontWeight: 600,
                        borderRadius: '8px',
                        borderStyle: 'dashed'
                    }}
                />
            )
        }
    ];

    const actions = (row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
                size="small"
                sx={{ minWidth: 40, borderRadius: '10px', color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.05) }}
            >
                <EditIcon fontSize="small" />
            </Button>
            <Button
                size="small"
                color="error"
                sx={{ minWidth: 40, borderRadius: '10px', bgcolor: alpha(theme.palette.secondary.main, 0.05) }}
            >
                <DeleteIcon fontSize="small" />
            </Button>
        </Box>
    );

    return (
        <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.02em' }}>
                    Nursing Staff
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ borderRadius: '16px', px: 4, py: 1.5, fontWeight: 800 }}
                >
                    Add Nurse
                </Button>
            </Box>

            <LuxDataGrid
                title="Clinical Team"
                columns={columns}
                data={nurses}
                actions={actions}
            />
        </Box>
    );
}

export default ViewNursesTable;
