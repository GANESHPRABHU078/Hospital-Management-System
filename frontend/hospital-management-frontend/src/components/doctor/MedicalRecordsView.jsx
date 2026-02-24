import React, { useState } from 'react';
import {
    Box, Typography, Chip, alpha, useTheme, Button,
    Dialog, DialogTitle, DialogContent, DialogActions, Divider, Avatar
} from '@mui/material';
import {
    Visibility as ViewIcon,
    LocalHospital as DiagnosisIcon,
    CalendarToday as DateIcon,
    Person as PatientIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import LuxDataGrid from '../common/LuxDataGrid';

const mockRecords = [
    { id: 1, patient: 'Sarah Mitchell', age: 45, diagnosis: 'Hypertension Stage 2', date: '2026-02-15', doctor: 'Dr. John Doe', status: 'Ongoing', notes: 'Patient showing improved BP readings. Continue medication Amlodipine 5mg daily. Follow-up in 30 days.' },
    { id: 2, patient: 'James Carter', age: 34, diagnosis: 'Chest Pain — Arrhythmia', date: '2026-02-18', doctor: 'Dr. John Doe', status: 'Critical', notes: 'ECG shows irregular rhythm. Ordered 24-hour Holter monitor. Referred to cardiology consult.' },
    { id: 3, patient: 'Emily Rosa', age: 28, diagnosis: 'Annual Physical Exam', date: '2026-02-20', doctor: 'Dr. John Doe', status: 'Resolved', notes: 'All vitals normal. Blood panel within range. No concerns noted. Next annual exam scheduled.' },
    { id: 4, patient: 'Omar Hassan', age: 52, diagnosis: 'Post-Surgery Recovery', date: '2026-02-10', doctor: 'Dr. John Doe', status: 'Ongoing', notes: 'Appendectomy recovery progressing well. Wound healing cleanly. Light activity permitted.' },
    { id: 5, patient: 'Yuki Tanaka', age: 61, diagnosis: 'Type 2 Diabetes Management', date: '2026-02-12', doctor: 'Dr. John Doe', status: 'Ongoing', notes: 'HbA1c at 7.2%. Adjusted Metformin dosage. Dietary counselling recommended. Monthly follow-up.' },
    { id: 6, patient: 'Maria Garcia', age: 39, diagnosis: 'Migraine — Chronic', date: '2026-01-28', doctor: 'Dr. John Doe', status: 'Resolved', notes: 'Prescribed Topiramate as prophylactic. Reported 70% reduction in frequency. Stable.' },
];

const statusColors = {
    Ongoing: { bg: '#3B82F6', label: '#fff' },
    Critical: { bg: '#EF4444', label: '#fff' },
    Resolved: { bg: '#10B981', label: '#fff' },
};

function MedicalRecordsView() {
    const theme = useTheme();
    const [selected, setSelected] = useState(null);

    const columns = [
        {
            id: 'patient',
            label: 'Patient',
            render: (val, row) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{
                        width: 36, height: 36, fontSize: 13, fontWeight: 800,
                        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.06)})`,
                        color: 'secondary.main', border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`
                    }}>
                        {val.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography fontWeight={800} fontSize={13}>{val}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>Age {row.age}</Typography>
                    </Box>
                </Box>
            )
        },
        {
            id: 'diagnosis',
            label: 'Diagnosis',
            render: (val) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DiagnosisIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
                    <Typography fontSize={13} fontWeight={700}>{val}</Typography>
                </Box>
            )
        },
        {
            id: 'date',
            label: 'Visit Date',
            render: (val) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DateIcon sx={{ fontSize: 13, color: 'text.disabled' }} />
                    <Typography fontSize={13} fontWeight={600}>{val}</Typography>
                </Box>
            )
        },
        {
            id: 'status',
            label: 'Status',
            render: (val) => {
                const cfg = statusColors[val] || statusColors.Ongoing;
                return (
                    <Chip label={val} size="small" sx={{
                        fontWeight: 800, fontSize: '0.7rem', borderRadius: '10px',
                        bgcolor: alpha(cfg.bg, 0.1),
                        color: cfg.bg,
                        border: `1px solid ${alpha(cfg.bg, 0.2)}`,
                    }} />
                );
            }
        },
    ];

    const actions = (row) => (
        <Button size="small" onClick={() => setSelected(row)}
            sx={{ minWidth: 40, borderRadius: '10px', color: 'secondary.main', bgcolor: alpha(theme.palette.secondary.main, 0.05) }}>
            <ViewIcon fontSize="small" />
        </Button>
    );

    return (
        <Box>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Box sx={{ mb: 5 }}>
                    <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                        PHYSICIAN PORTAL
                    </Typography>
                    <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.045em', mt: 0.3, lineHeight: 1 }}>
                        Medical Records
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.7 }}>
                        Patient diagnosis history, treatment notes, and clinical summaries.
                    </Typography>
                </Box>
            </motion.div>

            <LuxDataGrid
                title="Patient Record Archive"
                columns={columns}
                data={mockRecords}
                actions={actions}
            />

            {/* Detail Dialog */}
            <Dialog open={!!selected} onClose={() => setSelected(null)} fullWidth maxWidth="sm"
                PaperProps={{ sx: { borderRadius: '32px', p: 1 } }}>
                <DialogTitle sx={{ fontWeight: 900, fontSize: '1.4rem', pb: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            p: 1.2, borderRadius: '14px',
                            background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                            display: 'flex',
                        }}>
                            <PatientIcon sx={{ color: '#fff', fontSize: 22 }} />
                        </Box>
                        Medical Record Detail
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {selected && (
                        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <Box sx={{ p: 2.5, borderRadius: '20px', bgcolor: alpha(theme.palette.secondary.main, 0.04), border: '1px solid', borderColor: alpha(theme.palette.secondary.main, 0.1) }}>
                                <Typography variant="h6" fontWeight={900}>{selected.patient}</Typography>
                                <Typography variant="body2" color="text.secondary" fontWeight={600}>Age {selected.age} • Treated by {selected.doctor}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.06) }} />
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', ml: 1 }}>Diagnosis</Typography>
                                    <Box sx={{ mt: 0.8, p: 1.5, borderRadius: '14px', border: '1px solid', borderColor: 'divider' }}>
                                        <Typography fontWeight={700} fontSize={13}>{selected.diagnosis}</Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', ml: 1 }}>Status</Typography>
                                    <Box sx={{ mt: 0.8, p: 1.5, borderRadius: '14px', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
                                        <Chip label={selected.status} size="small" sx={{
                                            fontWeight: 800, borderRadius: '10px',
                                            bgcolor: alpha(statusColors[selected.status]?.bg || '#3B82F6', 0.1),
                                            color: statusColors[selected.status]?.bg || '#3B82F6',
                                        }} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', ml: 1 }}>Visit Date</Typography>
                                <Box sx={{ mt: 0.8, p: 1.5, borderRadius: '14px', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DateIcon color="secondary" fontSize="small" />
                                    <Typography fontWeight={700} fontSize={13}>{selected.date}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', ml: 1 }}>Clinical Notes</Typography>
                                <Box sx={{ mt: 0.8, p: 2, borderRadius: '16px', bgcolor: alpha(theme.palette.background.paper, 0.5), border: '1px dotted', borderColor: 'divider', lineHeight: 1.7 }}>
                                    <Typography variant="body2" fontWeight={600}>{selected.notes}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setSelected(null)} fullWidth variant="contained"
                        sx={{
                            borderRadius: '16px', py: 1.5, fontWeight: 800,
                            background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
                        }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default MedicalRecordsView;
