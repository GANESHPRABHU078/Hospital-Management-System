import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    Skeleton,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Alert,
    Stack,
    Grid
} from '@mui/material';
import {
    AutoAwesome as AiIcon,
    History as HistoryIcon,
    ReportProblem as RiskIcon,
    CheckCircle as HealthyIcon,
    Timeline as TrendIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

function MedicalSummaryAI({ patientName = "Mike Ross" }) {
    const [generating, setGenerating] = useState(false);
    const [summary, setSummary] = useState(null);

    const generateSummary = () => {
        setGenerating(true);
        setSummary(null);

        // Simulate AI synthesis
        setTimeout(() => {
            setSummary({
                overview: `${patientName} is a 32-year-old male with a history of mild hypertension. Recent trends show stable vitals but increased stress-related symptoms.`,
                keyHighlights: [
                    "Consistent blood pressure readings (130/85 avg).",
                    "Last checkup showed improved cholesterol levels.",
                    "Allergic to Penicillin - Critical Note."
                ],
                riskAssessment: {
                    level: "Low-Medium",
                    note: "Monitor cardiovascular trends during upcoming surgery."
                },
                recommendation: "Increase frequency of BMP monitoring for next 2 months."
            });
            setGenerating(false);
        }, 2500);
    };

    return (
        <Box>
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: '24px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h5" fontWeight={800} color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AiIcon /> AI Clinical Summary
                        </Typography>
                        <Typography variant="caption" color="text.secondary">Synthesized on-demand from full history</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={generateSummary}
                        disabled={generating}
                        startIcon={generating ? <AiIcon className="spin" /> : <AiIcon />}
                        sx={{ borderRadius: '12px', fontWeight: 700 }}
                    >
                        {generating ? 'Synthesizing...' : 'Generate AI Summary'}
                    </Button>
                </Box>

                <AnimatePresence mode="wait">
                    {generating && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Stack spacing={2}>
                                <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '80%' }} />
                                <Skeleton variant="rectangular" height={100} sx={{ borderRadius: '12px' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%' }} />
                            </Stack>
                        </motion.div>
                    )}

                    {!generating && !summary && (
                        <Box sx={{ textAlign: 'center', py: 6, opacity: 0.5 }}>
                            <HistoryIcon sx={{ fontSize: 60, mb: 2 }} />
                            <Typography variant="body1">Click the button for an AI-synthesized medical overview.</Typography>
                        </Box>
                    )}

                    {summary && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontStyle: 'italic', borderLeft: '4px solid', borderColor: 'primary.light', pl: 3 }}>
                                "{summary.overview}"
                            </Typography>

                            <Grid container spacing={4}>
                                <Grid item xs={12} md={7}>
                                    <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Key Highlights</Typography>
                                    <List dense>
                                        {summary.keyHighlights.map((h, i) => (
                                            <ListItem key={i} sx={{ px: 0 }}>
                                                <ListItemIcon sx={{ minWidth: 32 }}><HealthyIcon color="success" sx={{ fontSize: '1.2rem' }} /></ListItemIcon>
                                                <ListItemText primary={h} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Box sx={{ bgcolor: 'rgba(255, 152, 0, 0.05)', p: 2, borderRadius: '16px', border: '1px solid', borderColor: 'warning.light' }}>
                                        <Typography variant="subtitle2" fontWeight={700} color="warning.dark" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <RiskIcon sx={{ fontSize: '1rem' }} /> Risk Assessment
                                        </Typography>
                                        <Chip label={summary.riskAssessment.level} color="warning" size="small" sx={{ mb: 1, fontWeight: 700 }} />
                                        <Typography variant="caption" display="block">{summary.riskAssessment.note}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Alert icon={<AiIcon />} severity="info" sx={{ borderRadius: '12px' }}>
                                <Typography variant="subtitle2" fontWeight={700}>AI Recommendation:</Typography>
                                {summary.recommendation}
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Paper>
            <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 2s linear infinite; }
      `}</style>
        </Box>
    );
}

// Helper Mock

export default MedicalSummaryAI;
