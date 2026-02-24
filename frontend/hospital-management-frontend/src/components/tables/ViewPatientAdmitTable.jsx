import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Chip,
    alpha,
    useTheme,
    Button
} from "@mui/material";
import {
    Hotel as BedIcon,
    ExitToApp as DischargeIcon,
    RoomPreferences as RoomIcon,
    Person as PatientIcon
} from "@mui/icons-material";
import LuxDataGrid from "../common/LuxDataGrid";

function ViewPatientAdmitTable() {
    const [admissions, setAdmissions] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        setAdmissions([
            { id: 1, patientName: "Mike Ross", roomNumber: "101", admitDate: "2026-02-19", status: "Admitted" },
            { id: 2, patientName: "Rachel Zane", roomNumber: "202", admitDate: "2026-02-20", status: "Admitted" },
            { id: 3, patientName: "Harvey Specter", roomNumber: "VIP-1", admitDate: "2026-02-18", status: "Admitted" },
        ]);
    }, []);

    const columns = [
        {
            id: 'patientName',
            label: 'Inpatient',
            render: (val) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ p: 1, borderRadius: '12px', bgcolor: alpha(theme.palette.primary.main, 0.08), color: 'primary.main', display: 'flex' }}>
                        <PatientIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Typography variant="subtitle2" fontWeight={800}>{val}</Typography>
                </Box>
            )
        },
        {
            id: 'roomNumber',
            label: 'Room / Ward',
            render: (val) => (
                <Chip
                    label={`Room ${val}`}
                    size="small"
                    icon={<BedIcon sx={{ fontSize: '14px !important' }} />}
                    sx={{
                        fontWeight: 800,
                        borderRadius: '10px',
                        bgcolor: alpha(theme.palette.secondary.main, 0.08),
                        color: 'secondary.dark',
                        border: 'none',
                        fontSize: '0.75rem'
                    }}
                />
            )
        },
        {
            id: 'admitDate',
            label: 'Admission Date',
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
                    sx={{
                        fontWeight: 800,
                        borderRadius: '10px',
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: 'success.dark',
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
                variant="text"
                startIcon={<RoomIcon sx={{ fontSize: 16 }} />}
                sx={{ borderRadius: '10px', fontWeight: 800, textTransform: 'none' }}
            >
                Transfer
            </Button>
            <Button
                size="small"
                color="secondary"
                variant="contained"
                startIcon={<DischargeIcon sx={{ fontSize: 16 }} />}
                sx={{ borderRadius: '10px', fontWeight: 800, textTransform: 'none', boxShadow: 'none' }}
            >
                Discharge
            </Button>
        </Box>
    );

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 4, letterSpacing: '-0.02em' }}>
                Inpatient Management
            </Typography>

            <LuxDataGrid
                title="Active Admissions"
                columns={columns}
                data={admissions}
                actions={actions}
            />
        </Box>
    );
}

export default ViewPatientAdmitTable;
