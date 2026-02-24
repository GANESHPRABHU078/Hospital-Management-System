import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Avatar,
    Chip,
    Divider,
    Stack,
    Tooltip,
    alpha,
    useTheme
} from '@mui/material';
import {
    Event as EventIcon,
    AutoAwesome as AiIcon,
    AccessTime as TimeIcon,
    CheckCircle as SuccessIcon,
    CheckCircle as NormalIcon,
    ArrowForward as DetailsIcon,
    Star as RecommendedIcon,
    Person as DocIcon,
    MedicalServices as DeptIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const DOCTORS = [
    { id: 1, name: 'Dr. John Doe', spec: 'Cardiologist', img: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png', rating: 4.9, experience: '12 yrs' },
    { id: 2, name: 'Dr. Sarah Smith', spec: 'Neurologist', img: 'https://cdn-icons-png.flaticon.com/512/3774/3774293.png', rating: 4.8, experience: '8 yrs' },
    { id: 3, name: 'Dr. Emily Chen', spec: 'Pediatrician', img: 'https://cdn-icons-png.flaticon.com/512/3774/3774290.png', rating: 5.0, experience: '15 yrs' },
];

const TIME_SLOTS = [
    { time: '09:00 AM', status: 'Busy' },
    { time: '10:00 AM', status: 'Available', recommended: true },
    { time: '11:00 AM', status: 'Available' },
    { time: '12:00 PM', status: 'Busy' },
    { time: '02:00 PM', status: 'Available', recommended: true },
    { time: '03:00 PM', status: 'Available' },
    { time: '04:30 PM', status: 'Available' },
];

function SmartAppointmentScheduling() {
    const theme = useTheme();
    const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    return (
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.04em', mb: 1.5 }}>
                    Smart Appointment<br />
                    <Box component="span" sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>Scheduler</Box>
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight={600}>
                    AI-powered availability prediction & slot optimization for the best care experience.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Specialist Selection */}
                <Grid item xs={12} md={4.5}>
                    <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, mb: 2, display: 'block', letterSpacing: '0.1em' }}>
                        1. SELECT SPECIALIST
                    </Typography>
                    <Stack spacing={2.5}>
                        {DOCTORS.map((doc, i) => (
                            <motion.div
                                key={doc.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Box
                                    onClick={() => setSelectedDoctor(doc)}
                                    sx={{
                                        p: 2.5,
                                        borderRadius: '24px',
                                        bgcolor: selectedDoctor.id === doc.id ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
                                        border: `2px solid ${selectedDoctor.id === doc.id ? theme.palette.primary.main : alpha(theme.palette.divider, 0.08)}`,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            transform: 'translateX(8px)',
                                            borderColor: alpha(theme.palette.primary.main, 0.4)
                                        },
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2.5
                                    }}
                                >
                                    <Avatar src={doc.img} sx={{
                                        width: 64, height: 64,
                                        boxShadow: selectedDoctor.id === doc.id ? `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}` : 'none',
                                        border: `2px solid ${selectedDoctor.id === doc.id ? theme.palette.primary.main : 'transparent'}`
                                    }} />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.01em', mb: 0.2 }}>
                                            {doc.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700, mb: 0.8 }}>
                                            {doc.spec} • {doc.experience}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Chip label={`${doc.rating} ★`} size="small" sx={{ fontWeight: 800, fontSize: 10, height: 20, bgcolor: alpha('#F59E0B', 0.1), color: '#F59E0B' }} />
                                            <Chip label="Top Rated" size="small" sx={{ fontWeight: 800, fontSize: 10, height: 20, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }} />
                                        </Box>
                                    </Box>
                                </Box>
                            </motion.div>
                        ))}
                    </Stack>
                </Grid>

                {/* Slot Selection */}
                <Grid item xs={12} md={7.5}>
                    <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, mb: 2, display: 'block', letterSpacing: '0.1em' }}>
                        2. OPTIMAL SLOTS
                    </Typography>
                    <Box sx={{
                        p: 4,
                        borderRadius: '32px',
                        bgcolor: 'background.paper',
                        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                        boxShadow: theme.palette.mode === 'dark' ? '0 12px 48px rgba(0,0,0,0.3)' : '0 12px 48px rgba(0,0,0,0.05)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Box>
                                <Typography variant="h5" fontWeight={900}>Availability Board</Typography>
                                <Typography variant="caption" color="text.secondary" fontWeight={700}>Today • {new Date().toLocaleDateString()}</Typography>
                            </Box>
                            <Chip icon={<AiIcon sx={{ fontSize: '14px !important' }} />} label="AI Recommendation Active" color="primary" size="small" sx={{ fontWeight: 800, px: 1, py: 2, borderRadius: '12px' }} />
                        </Box>

                        <Grid container spacing={2}>
                            {TIME_SLOTS.map((slot, i) => (
                                <Grid item xs={12} sm={6} md={4} key={slot.time}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 + i * 0.05 }}
                                    >
                                        <Button
                                            fullWidth
                                            disabled={slot.status === 'Busy'}
                                            variant={selectedSlot === slot.time ? 'contained' : 'outlined'}
                                            onClick={() => setSelectedSlot(slot.time)}
                                            sx={{
                                                py: 3,
                                                borderRadius: '18px',
                                                flexDirection: 'column',
                                                gap: 1,
                                                borderWidth: 2,
                                                borderColor: selectedSlot === slot.time ? 'primary.main' : alpha(theme.palette.divider, 0.1),
                                                bgcolor: selectedSlot === slot.time ? 'primary.main' : 'transparent',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                '&:hover': {
                                                    borderWidth: 2,
                                                    bgcolor: selectedSlot === slot.time ? 'primary.main' : alpha(theme.palette.primary.main, 0.04)
                                                }
                                            }}
                                        >
                                            <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.02em', lineHeight: 1 }}>{slot.time}</Typography>
                                            <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 700 }}>{slot.status}</Typography>

                                            {slot.recommended && (
                                                <Box sx={{
                                                    position: 'absolute',
                                                    top: 0, right: 0,
                                                    p: 0.5, px: 1,
                                                    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                                                    borderRadius: '0 0 0 12px',
                                                    display: 'flex', alignItems: 'center', gap: 0.5
                                                }}>
                                                    <RecommendedIcon sx={{ fontSize: 10, color: '#fff' }} />
                                                    <Typography sx={{ fontSize: 9, color: '#fff', fontWeight: 900 }}>AI SLOT</Typography>
                                                </Box>
                                            )}
                                        </Button>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>

                        <Divider sx={{ my: 4, opacity: 0.5 }} />

                        <AnimatePresence mode="wait">
                            {selectedSlot ? (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <Box sx={{
                                        p: 3,
                                        borderRadius: '20px',
                                        bgcolor: alpha(theme.palette.secondary.main, 0.05),
                                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 3,
                                        mb: 4
                                    }}>
                                        <Box sx={{
                                            p: 1.5,
                                            borderRadius: '14px',
                                            bgcolor: 'secondary.main',
                                            color: '#fff',
                                            display: 'flex'
                                        }}>
                                            <SuccessIcon sx={{ fontSize: 24 }} />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle1" fontWeight={900}>Booking Summary</Typography>
                                            <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                                Visit with <strong>{selectedDoctor.name}</strong> on <strong>{selectedSlot}</strong>
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                borderRadius: '12px',
                                                px: 4,
                                                fontWeight: 900,
                                                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                                                boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.4)}`
                                            }}
                                        >
                                            Confirm Visit
                                        </Button>
                                    </Box>
                                </motion.div>
                            ) : (
                                <Box sx={{ py: 2, textAlign: 'center', opacity: 0.4 }}>
                                    <Typography variant="body2" fontWeight={700}>Please select a time slot to continue</Typography>
                                </Box>
                            )}
                        </AnimatePresence>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SmartAppointmentScheduling;

