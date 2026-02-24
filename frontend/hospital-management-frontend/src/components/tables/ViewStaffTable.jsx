import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Avatar,
    Typography,
    Chip,
    alpha,
    useTheme
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Badge as BadgeIcon
} from "@mui/icons-material";
import LuxDataGrid from "../common/LuxDataGrid";

function ViewStaffTable() {
    const [staff, setStaff] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        setStaff([
            { id: 1, name: "Harvey Specter", role: "Hospital Manager", department: "Administration", status: 'Active', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
            { id: 2, name: "Donna Paulsen", role: "Sr. Executive", department: "Reception", status: 'Active', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png' },
            { id: 3, name: "Mike Ross", role: "IT Specialist", department: "Infrastructure", status: 'On Leave', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135823.png' },
        ]);
    }, []);

    const columns = [
        {
            id: 'name',
            label: 'Staff Member',
            render: (val, row) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={row.img} sx={{ width: 40, height: 40, border: '2px solid', borderColor: 'divider' }} />
                    <Box>
                        <Typography variant="subtitle2" fontWeight={700}>{val}</Typography>
                        <Typography variant="caption" color="text.secondary">{row.id}</Typography>
                    </Box>
                </Box>
            )
        },
        { id: 'role', label: 'Designation' },
        {
            id: 'department',
            label: 'Department',
            render: (val) => (
                <Chip
                    label={val}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600, borderRadius: '8px', bgcolor: alpha(theme.palette.primary.main, 0.05) }}
                />
            )
        },
        {
            id: 'status',
            label: 'Status',
            render: (val) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: val === 'Active' ? 'success.main' : 'warning.main' }} />
                    <Typography variant="caption" fontWeight={700}>{val}</Typography>
                </Box>
            )
        }
    ];

    const actions = (row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
                size="small"
                variant="text"
                startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
                Edit
            </Button>
            <Button
                size="small"
                variant="text"
                startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                sx={{ color: 'text.secondary', '&:hover': { color: 'secondary.main' } }}
            >
                Delete
            </Button>
        </Box>
    );

    return (
        <Box sx={{ mt: 2 }}>
            <LuxDataGrid
                title="Staff Directory"
                columns={columns}
                data={staff}
                actions={actions}
            />
        </Box>
    );
}

export default ViewStaffTable;
