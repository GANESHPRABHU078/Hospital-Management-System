import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Typography,
    Chip,
    alpha,
    useTheme,
    Alert,
    Snackbar,
} from "@mui/material";
import {
    CheckCircle as ConfirmIcon,
    Cancel as CancelIcon,
    Visibility as ViewIcon,
    CalendarToday as DateIcon,
    AccessTime as TimeIcon,
    Email as EmailIcon
} from "@mui/icons-material";
import LuxDataGrid from "../common/LuxDataGrid";

function ViewAppointmentTable() {
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formMode, setFormMode] = useState("view");
    const theme = useTheme();

    const [currentAppointment, setCurrentAppointment] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        message: "",
        status: "Pending",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Mock data for now
        const mockAppointments = [
            { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", date: "2026-03-01", time: "10:00 AM", status: "Confirmed" },
            { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321", date: "2026-03-02", time: "11:30 AM", status: "Pending" },
            { id: 3, name: "Robert Brown", email: "robert@test.com", phone: "5550123", date: "2026-03-05", time: "02:15 PM", status: "Confirmed" },
        ];
        setAppointments(mockAppointments);
    }, []);

    const handleOpenModal = (mode, appointment = null) => {
        setFormMode(mode);
        if (appointment) {
            setCurrentAppointment(appointment);
        } else {
            setCurrentAppointment({
                name: "", email: "", phone: "", date: "", time: "", message: "", status: "Pending",
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleStatusUpdate = (id, newStatus) => {
        setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
        setSuccessMessage(`Appointment status updated to ${newStatus}`);
        setShowSuccess(true);
    };

    const columns = [
        {
            id: 'name',
            label: 'Patient',
            render: (val, row) => (
                <Box>
                    <Typography variant="subtitle2" fontWeight={800}>{val}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <EmailIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
                        <Typography variant="caption" color="text.secondary">{row.email}</Typography>
                    </Box>
                </Box>
            )
        },
        {
            id: 'schedule',
            label: 'Schedule',
            render: (val, row) => (
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <DateIcon sx={{ fontSize: 14, color: 'primary.light' }} />
                        <Typography variant="caption" fontWeight={700}>{row.date}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TimeIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                        <Typography variant="caption" fontWeight={500}>{row.time}</Typography>
                    </Box>
                </Box>
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
                        bgcolor: val === 'Confirmed' ? alpha(theme.palette.success.main, 0.1) :
                            val === 'Cancelled' ? alpha(theme.palette.error.main, 0.1) :
                                alpha(theme.palette.warning.main, 0.1),
                        color: val === 'Confirmed' ? 'success.dark' :
                            val === 'Cancelled' ? 'error.dark' :
                                'warning.dark',
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
                onClick={() => handleOpenModal("view", row)}
                sx={{ minWidth: 40, borderRadius: '10px', color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.05) }}
            >
                <ViewIcon fontSize="small" />
            </Button>
            {row.status === 'Pending' && (
                <Button
                    size="small"
                    onClick={() => handleStatusUpdate(row.id, "Confirmed")}
                    sx={{ minWidth: 40, borderRadius: '10px', color: 'success.main', bgcolor: alpha(theme.palette.success.main, 0.05) }}
                >
                    <ConfirmIcon fontSize="small" />
                </Button>
            )}
            {row.status !== 'Cancelled' && (
                <Button
                    size="small"
                    color="error"
                    onClick={() => handleStatusUpdate(row.id, "Cancelled")}
                    sx={{ minWidth: 40, borderRadius: '10px', bgcolor: alpha(theme.palette.secondary.main, 0.05) }}
                >
                    <CancelIcon fontSize="small" />
                </Button>
            )}
        </Box>
    );

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 4, letterSpacing: '-0.02em' }}>
                Appointment Management
            </Typography>

            <LuxDataGrid
                title="Patient Visits"
                columns={columns}
                data={appointments}
                actions={actions}
            />

            <Dialog
                open={showModal}
                onClose={handleCloseModal}
                fullWidth
                maxWidth="sm"
                PaperProps={{ sx: { borderRadius: '32px', p: 1 } }}
            >
                <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem' }}>Visit Information</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', ml: 1 }}>Patient Details</Typography>
                            <Box sx={{ mt: 1, p: 2, borderRadius: '20px', bgcolor: alpha(theme.palette.primary.main, 0.03), border: '1px solid', borderColor: 'divider' }}>
                                <Typography variant="h6" fontWeight={800}>{currentAppointment.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{currentAppointment.email} • {currentAppointment.phone}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', ml: 1 }}>Date</Typography>
                                <Box sx={{ mt: 1, p: 1.5, borderRadius: '16px', bgcolor: alpha(theme.palette.background.paper, 0.5), border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DateIcon color="primary" fontSize="small" />
                                    <Typography variant="body2" fontWeight={700}>{currentAppointment.date}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', ml: 1 }}>Time</Typography>
                                <Box sx={{ mt: 1, p: 1.5, borderRadius: '16px', bgcolor: alpha(theme.palette.background.paper, 0.5), border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <TimeIcon color="primary" fontSize="small" />
                                    <Typography variant="body2" fontWeight={700}>{currentAppointment.time}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', ml: 1 }}>Patient Notes</Typography>
                            <Typography variant="body2" sx={{ mt: 1, p: 2, borderRadius: '20px', bgcolor: alpha(theme.palette.background.paper, 0.5), minHeight: 80, border: '1px dotted', borderColor: 'divider' }}>
                                {currentAppointment.message || "No additional notes provided."}
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleCloseModal} fullWidth variant="contained" sx={{ borderRadius: '16px', py: 1.5, fontWeight: 800 }}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={showSuccess} autoHideDuration={4000} onClose={() => setShowSuccess(false)}>
                <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 700 }}>{successMessage}</Alert>
            </Snackbar>
        </Box>
    );
}

export default ViewAppointmentTable;
