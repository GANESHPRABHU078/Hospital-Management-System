import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Chip,
    alpha,
    useTheme,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Avatar
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Business as DeptIcon,
    Person as HeadIcon,
    Description as InfoIcon
} from "@mui/icons-material";
import LuxDataGrid from "../common/LuxDataGrid";

function ViewDepartmentTable() {
    const [departments, setDepartments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentDept, setCurrentDept] = useState({ name: "", head: "", description: "" });
    const theme = useTheme();

    useEffect(() => {
        // Mock data
        setDepartments([
            { id: 1, name: "Cardiology", head: "Dr. Smith", description: "Comprehensive heart and cardiovascular care using advanced diagnostic tools." },
            { id: 2, name: "Neurology", head: "Dr. Jones", description: "Specialized treatment for brain, spinal cord, and peripheral nerve disorders." },
            { id: 3, name: "Pediatrics", head: "Dr. Emma Wilson", description: "Dedicated pediatric care for infants, children, and adolescents." },
        ]);
    }, []);

    const handleOpenModal = (dept = null) => {
        setCurrentDept(dept || { name: "", head: "", description: "" });
        setShowModal(true);
    };

    const columns = [
        {
            id: 'name',
            label: 'Department',
            render: (val) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                        <DeptIcon />
                    </Avatar>
                    <Typography variant="subtitle2" fontWeight={800}>{val}</Typography>
                </Box>
            )
        },
        {
            id: 'head',
            label: 'Head of Dept',
            render: (val) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HeadIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                    <Typography variant="caption" fontWeight={700}>{val}</Typography>
                </Box>
            )
        },
        {
            id: 'description',
            label: 'Description',
            render: (val) => (
                <Typography variant="caption" color="text.secondary" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    maxWidth: 300
                }}>
                    {val}
                </Typography>
            )
        }
    ];

    const actions = (row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
                size="small"
                onClick={() => handleOpenModal(row)}
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
                    Hospital Departments
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenModal()}
                    sx={{ borderRadius: '16px', px: 4, py: 1.5, fontWeight: 800 }}
                >
                    Define Department
                </Button>
            </Box>

            <LuxDataGrid
                title="Institutional Units"
                columns={columns}
                data={departments}
                actions={actions}
            />

            <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                fullWidth
                maxWidth="sm"
                PaperProps={{ sx: { borderRadius: '32px', p: 1 } }}
            >
                <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem' }}>
                    {currentDept.id ? "Modify Department" : "New Department"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField label="Department Name" fullWidth defaultValue={currentDept.name} />
                        <TextField label="Head of Department" fullWidth defaultValue={currentDept.head} />
                        <TextField label="Detailed Description" fullWidth multiline rows={4} defaultValue={currentDept.description} />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setShowModal(false)} sx={{ fontWeight: 700, color: 'text.secondary' }}>Cancel</Button>
                    <Button variant="contained" sx={{ borderRadius: '14px', px: 4, fontWeight: 800 }}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ViewDepartmentTable;
