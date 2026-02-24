import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Chip,
    Avatar,
    LinearProgress,
    IconButton,
    Tooltip,
    Fade
} from '@mui/material';
import {
    Hotel as BedIcon,
    Info as InfoIcon,
    Circle as StatusIcon,
    FilterList as FilterIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const WARDS = [
    { id: 'icu', name: 'ICU - Intensive Care', color: '#E53935' },
    { id: 'gen', name: 'General Ward', color: '#1976D2' },
    { id: 'ped', name: 'Pediatrics', color: '#43A047' },
    { id: 'mat', name: 'Maternity', color: '#AB47BC' }
];

const INITIAL_BEDS = [
    { id: 1, ward: 'icu', room: '101', bed: 'A', status: 'Occupied', patient: 'Mike Ross' },
    { id: 2, ward: 'icu', room: '101', bed: 'B', status: 'Available' },
    { id: 3, ward: 'icu', room: '102', bed: 'A', status: 'Cleaning' },
    { id: 4, ward: 'gen', room: '201', bed: 'A', status: 'Occupied', patient: 'Rachel Zane' },
    { id: 5, ward: 'gen', room: '201', bed: 'B', status: 'Occupied', patient: 'Harvey Specter' },
    { id: 6, ward: 'gen', room: '202', bed: 'A', status: 'Available' },
    { id: 7, ward: 'gen', room: '202', bed: 'B', status: 'Available' },
    { id: 8, ward: 'ped', room: '301', bed: 'A', status: 'Occupied', patient: 'Louis Litt' },
    { id: 9, ward: 'mat', room: '401', bed: 'A', status: 'Available' },
];

function BedLiveTracking() {
    const [beds, setBeds] = useState(INITIAL_BEDS);
    const [filterWard, setFilterWard] = useState('all');

    const getStatusColor = (status) => {
        switch (status) {
            case 'Occupied': return 'error';
            case 'Available': return 'success';
            case 'Cleaning': return 'warning';
            default: return 'default';
        }
    };

    const stats = {
        total: beds.length,
        occupied: beds.filter(b => b.status === 'Occupied').length,
        available: beds.filter(b => b.status === 'Available').length
    };

    const occupancyRate = Math.round((stats.occupied / stats.total) * 100);

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="h4" fontWeight={800} color="primary.main">
                        Hospital Bed Live-Tracking
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Real-time ward & room availability | 2025 Sync
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'right', minWidth: 200 }}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                        Hospital Occupancy: {occupancyRate}%
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={occupancyRate}
                        sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(0,0,0,0.05)' }}
                    />
                </Box>
            </Box>

            {/* Ward Cards */}
            {WARDS.map(ward => (
                <Box key={ward.id} sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Box sx={{ width: 4, height: 24, bgcolor: ward.color, borderRadius: 2 }} />
                        <Typography variant="h6" fontWeight={700}>{ward.name}</Typography>
                        <Chip
                            label={`${beds.filter(b => b.ward === ward.id && b.status === 'Available').length} Available`}
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                        />
                    </Box>

                    <Grid container spacing={3}>
                        {beds.filter(b => b.ward === ward.id).map(bed => (
                            <Grid item xs={12} sm={6} md={3} key={bed.id}>
                                <motion.div whileHover={{ y: -5 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            borderRadius: '20px',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            backgroundColor: 'background.paper',
                                            transition: 'all 0.3s ease',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            '&:hover': {
                                                borderColor: bed.status === 'Available' ? 'success.main' : 'primary.main',
                                                boxShadow: '0 12px 24px rgba(0,0,0,0.06)'
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                            <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.04)', color: 'text.secondary', width: 40, height: 40 }}>
                                                <BedIcon fontSize="small" />
                                            </Avatar>
                                            <Chip
                                                label={bed.status}
                                                color={getStatusColor(bed.status)}
                                                size="small"
                                                sx={{ fontSize: '0.7rem', fontWeight: 700 }}
                                            />
                                        </Box>
                                        <Typography variant="h6" fontWeight={800}>Room {bed.room}-{bed.bed}</Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                            {bed.status === 'Occupied' ? `Patient: ${bed.patient}` : 'Ready for occupancy'}
                                        </Typography>

                                        {bed.status === 'Occupied' && (
                                            <Tooltip title="View Patient Details">
                                                <IconButton size="small" sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                                                    <InfoIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
}

export default BedLiveTracking;
