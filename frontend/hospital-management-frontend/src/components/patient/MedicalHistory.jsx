import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  alpha,
  useTheme,
  Avatar
} from '@mui/material';
import {
  History as HistoryIcon,
  Timeline as TimelineIcon,
  FiberManualRecord as DotIcon,
  Assignment as NoteIcon,
  EventAvailable as DateIcon,
  HealthAndSafety as ConditionIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MedicalHistory = () => {
  const theme = useTheme();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([
      { id: 1, condition: "Hypertension", diagnosisDate: "2020-05-10", status: "Ongoing", notes: "Regular checkups required", severity: "Moderate" },
      { id: 2, condition: "Appendectomy", diagnosisDate: "2015-11-22", status: "Recovered", notes: "Surgery successful", severity: "Low" },
      { id: 3, condition: "Seasonal Allergies", diagnosisDate: "2018-03-15", status: "Intermittent", notes: "Allergic to pollen", severity: "Low" },
      { id: 4, condition: "Type 2 Diabetes", diagnosisDate: "2022-08-20", status: "Ongoing", notes: "Dietary control and medication", severity: "High" },
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Recovered': return '#10B981';
      case 'Ongoing': return theme.palette.primary.main;
      case 'Intermittent': return '#F59E0B';
      default: return theme.palette.text.disabled;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{
          p: 1.5,
          borderRadius: '16px',
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: 'primary.main',
          display: 'flex'
        }}>
          <HistoryIcon />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: '-0.04em' }}>
            Clinical History
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            A comprehensive record of your diagnosed conditions and treatments.
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: '32px',
          bgcolor: 'background.paper',
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow: theme.palette.mode === 'dark' ? '0 12px 48px rgba(0,0,0,0.3)' : '0 12px 48px rgba(0,0,0,0.05)',
        }}
      >
        <List sx={{ p: 0 }}>
          {history.length > 0 ? history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Box sx={{
                position: 'relative',
                pl: 4,
                pb: index < history.length - 1 ? 4 : 0,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 7,
                  top: 28,
                  bottom: 0,
                  width: 2,
                  bgcolor: alpha(theme.palette.divider, 0.1),
                  display: index < history.length - 1 ? 'block' : 'none'
                }
              }}>
                {/* Timeline Dot */}
                <Box sx={{
                  position: 'absolute',
                  left: 0,
                  top: 8,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: 'background.paper',
                  border: `3px solid ${getStatusColor(item.status)}`,
                  zIndex: 1,
                  boxShadow: `0 0 10px ${alpha(getStatusColor(item.status), 0.3)}`
                }} />

                <Box sx={{
                  p: 3,
                  borderRadius: '24px',
                  bgcolor: alpha(theme.palette.background.default, 0.4),
                  border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.background.default, 0.8),
                    borderColor: alpha(getStatusColor(item.status), 0.3),
                    transform: 'translateX(10px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: '-0.01em', mb: 0.5 }}>
                        {item.condition}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <DateIcon sx={{ fontSize: 13 }} /> Diagnosed: {item.diagnosisDate}
                        </Typography>
                        <DotIcon sx={{ fontSize: 4, color: 'text.disabled' }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                          Severity: {item.severity}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={item.status}
                      size="small"
                      sx={{
                        bgcolor: alpha(getStatusColor(item.status), 0.1),
                        color: getStatusColor(item.status),
                        fontWeight: 800,
                        fontSize: 10,
                        borderRadius: '10px',
                        border: `1px solid ${alpha(getStatusColor(item.status), 0.2)}`
                      }}
                    />
                  </Box>

                  <Box sx={{
                    p: 2,
                    borderRadius: '14px',
                    bgcolor: alpha(theme.palette.divider, 0.03),
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5
                  }}>
                    <NoteIcon sx={{ fontSize: 16, color: 'text.secondary', mt: 0.3 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, lineHeight: 1.6 }}>
                      {item.notes}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          )) : (
            <Box sx={{ py: 6, textAlign: 'center', opacity: 0.5 }}>
              <ConditionIcon sx={{ fontSize: 48, mb: 1, color: 'text.disabled' }} />
              <Typography variant="h6" fontWeight={700}>No records found</Typography>
            </Box>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default MedicalHistory;

