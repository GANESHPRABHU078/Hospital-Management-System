import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  alpha,
  useTheme,
  Avatar
} from '@mui/material';
import {
  QrCode2 as QrIcon,
  Close as CloseIcon,
  LocalPharmacy as MedIcon,
  Person as DocIcon,
  Event as DateIcon,
  CheckCircle as DoneIcon,
  Schedule as ActiveIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';

const Prescriptions = () => {
  const theme = useTheme();
  const [prescriptions, setPrescriptions] = useState([]);
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedPrescript, setSelectedPrescript] = useState(null);

  useEffect(() => {
    // Simulated data
    setPrescriptions([
      { id: 1, medicine: "Amoxicillin", dosage: "500mg", frequency: "3 times a day", doctor: "Dr. Alice Smith", date: "2026-02-10", status: "Active" },
      { id: 2, medicine: "Lisinopril", dosage: "10mg", frequency: "Once daily", doctor: "Dr. Bob Johnson", date: "2026-01-15", status: "Completed" },
      { id: 3, medicine: "Metformin", dosage: "850mg", frequency: "Twice daily", doctor: "Dr. Emily Chen", date: "2026-02-01", status: "Active" },
    ]);
  }, []);

  const handleOpenQr = (p) => {
    setSelectedPrescript(p);
    setQrOpen(true);
  };

  const handleCloseQr = () => setQrOpen(false);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: '-0.04em', mb: 1 }}>
            Prescriptions
          </Typography>
          <Typography variant="body1" color="text.secondary" fontWeight={600}>
            View and manage your active and completed medication plans.
          </Typography>
        </Box>
        <Chip
          icon={<InfoIcon sx={{ fontSize: '14px !important' }} />}
          label="Pharmacy Ready"
          color="success"
          variant="outlined"
          sx={{ borderRadius: '12px', fontWeight: 800, px: 1 }}
        />
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: '32px',
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          bgcolor: 'background.paper',
          boxShadow: theme.palette.mode === 'dark' ? '0 12px 48px rgba(0,0,0,0.3)' : '0 12px 48px rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
              <TableCell sx={{ fontWeight: 800, py: 3, textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.05em' }}>Medication</TableCell>
              <TableCell sx={{ fontWeight: 800, py: 3, textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.05em' }}>Dosage & Freq</TableCell>
              <TableCell sx={{ fontWeight: 800, py: 3, textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.05em' }}>Prescribing Physician</TableCell>
              <TableCell sx={{ fontWeight: 800, py: 3, textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.05em' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 800, py: 3, textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.05em' }} align="right">Digital Key</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptions.map((row, i) => (
              <TableRow
                key={row.id}
                component={motion.tr}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) },
                  transition: 'background-color 0.2s ease'
                }}
              >
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ p: 1, borderRadius: '12px', bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', display: 'flex' }}>
                      <MedIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight={800}>{row.medicine}</Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>Issued: {row.date}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={700}>{row.dosage}</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>{row.frequency}</Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ width: 28, height: 28, bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main', fontSize: 12, fontWeight: 900 }}>
                      {row.doctor.split(' ').pop()[0]}
                    </Avatar>
                    <Typography variant="body2" fontWeight={600}>{row.doctor}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={row.status === 'Active' ? <ActiveIcon sx={{ fontSize: '14px !important' }} /> : <DoneIcon sx={{ fontSize: '14px !important' }} />}
                    label={row.status}
                    size="small"
                    sx={{
                      bgcolor: alpha(row.status === 'Active' ? theme.palette.primary.main : theme.palette.success.main, 0.1),
                      color: row.status === 'Active' ? 'primary.main' : 'success.main',
                      fontWeight: 800,
                      borderRadius: '10px',
                      fontSize: 11,
                      border: `1px solid ${alpha(row.status === 'Active' ? theme.palette.primary.main : theme.palette.success.main, 0.2)}`
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<QrIcon />}
                    onClick={() => handleOpenQr(row)}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 800,
                      px: 2,
                      bgcolor: 'background.paper',
                      color: 'text.primary',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      boxShadow: 'none',
                      '&:hover': { bgcolor: alpha(theme.palette.divider, 0.05), boxShadow: 'none' }
                    }}
                  >
                    Medical QR
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* QR Dialog */}
      <Dialog
        open={qrOpen}
        onClose={handleCloseQr}
        PaperProps={{
          sx: { borderRadius: '32px', p: 3, minWidth: 380, bgcolor: 'background.paper', backgroundImage: 'none', border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ p: 1, borderRadius: '10px', bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', display: 'flex' }}>
              <QrIcon />
            </Box>
            <Typography variant="h6" fontWeight={900}>Secure Prescription</Typography>
          </Box>
          <IconButton onClick={handleCloseQr} size="small" sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4, pb: 4 }}>
          {selectedPrescript && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <Box sx={{
                p: 5,
                bgcolor: '#fff',
                borderRadius: '24px',
                mb: 4,
                boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.15)}`,
                border: '8px solid #f8fafc'
              }}>
                <QRCodeSVG
                  value={JSON.stringify({
                    id: selectedPrescript.id,
                    med: selectedPrescript.medicine,
                    doc: selectedPrescript.doctor,
                    date: selectedPrescript.date
                  })}
                  size={200}
                />
              </Box>
              <Typography variant="h5" fontWeight={900} color="primary" align="center" gutterBottom>
                {selectedPrescript.medicine}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
                <Typography variant="body2" fontWeight={700} color="text.secondary">{selectedPrescript.dosage}</Typography>
                <Typography variant="body2" fontWeight={700} color="text.secondary">•</Typography>
                <Typography variant="body2" fontWeight={700} color="text.secondary">{selectedPrescript.frequency}</Typography>
              </Box>
              <Typography variant="caption" sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', px: 2, py: 0.5, borderRadius: '8px', fontWeight: 800, mt: 2 }}>
                VERIFIED CRYPTO-SIGNED PREPARATION
              </Typography>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Prescriptions;

