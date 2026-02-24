import React, { useState, useMemo } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    InputAdornment,
    Typography,
    IconButton,
    Pagination,
    alpha,
    useTheme
} from '@mui/material';
import {
    Search as SearchIcon,
    GetApp as DownloadIcon,
    PriorityHigh as UrgentIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const LuxDataGrid = ({ title, columns, data = [], actions, rowsPerPage = 5 }) => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    const filteredData = useMemo(() => {
        return data.filter(item =>
            Object.values(item).some(val =>
                String(val || '').toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // Smart Row Highlighting Logic
    const getRowStyle = (row) => {
        const isUrgent =
            String(row.status || '').toLowerCase() === 'critical' ||
            String(row.status || '').toLowerCase() === 'urgent' ||
            (row.priority && String(row.priority).toLowerCase() === 'high');

        if (isUrgent) {
            return {
                borderLeft: `4px solid ${theme.palette.secondary.main}`,
                bgcolor: alpha(theme.palette.secondary.main, 0.03),
                transition: 'all 0.3s ease'
            };
        }
        return {};
    };

    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 1 }}>
                <Box>
                    <Typography variant="h5" fontWeight={800} color="text.primary" sx={{ letterSpacing: '-0.02em' }}>
                        {title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        {filteredData.length} active records in view
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Live search records..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: '14px',
                                bgcolor: alpha(theme.palette.background.paper, 0.5),
                                width: { xs: 200, md: 350 },
                                '& fieldset': { border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1) },
                                '&:hover fieldset': { borderColor: alpha(theme.palette.primary.main, 0.3) },
                                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                            }
                        }}
                    />
                    <IconButton sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        color: 'primary.main',
                        borderRadius: '12px',
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) }
                    }}>
                        <DownloadIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    overflow: 'hidden',
                    background: alpha(theme.palette.background.paper, 0.4),
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.divider, 0.1),
                    borderRadius: '24px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)'
                }}
            >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                            {columns.map((col) => (
                                <TableCell key={col.id} align={col.align || 'left'}>
                                    {col.label}
                                </TableCell>
                            ))}
                            <TableCell align="right">Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <AnimatePresence mode="wait">
                            {paginatedData.map((row, index) => (
                                <TableRow
                                    key={row.id || index}
                                    component={motion.tr}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                    sx={{
                                        ...getRowStyle(row),
                                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04) },
                                        '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    {columns.map((col) => (
                                        <TableCell key={col.id} align={col.align || 'left'}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {col.id === columns[0].id && (String(row.status).toLowerCase() === 'critical') && (
                                                    <UrgentIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                                                )}
                                                {col.render ? col.render(row[col.id], row) : (
                                                    <Typography variant="body2" fontWeight={600} color="text.primary">
                                                        {row[col.id]}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </TableCell>
                                    ))}
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            {actions ? actions(row) : (
                                                <Box sx={{ width: 40 }} />
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>

                {filteredData.length === 0 && (
                    <Box sx={{ py: 12, textAlign: 'center' }}>
                        <Typography variant="h6" color="text.disabled" fontWeight={700}>
                            No matching intelligence found
                        </Typography>
                        <Typography variant="body2" color="text.disabled">
                            Try adjusting your filters or search terms
                        </Typography>
                    </Box>
                )}

                <Box sx={{
                    p: 2.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: alpha(theme.palette.background.paper, 0.2),
                    borderTop: `1px solid ${alpha(theme.palette.divider, 0.05)}`
                }}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                        Showing {paginatedData.length} of {filteredData.length} records
                    </Typography>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, v) => setPage(v)}
                        size="small"
                        shape="rounded"
                        color="primary"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                fontWeight: 800,
                                borderRadius: '8px'
                            }
                        }}
                    />
                </Box>
            </TableContainer>
        </Box>
    );
};

export default LuxDataGrid;
