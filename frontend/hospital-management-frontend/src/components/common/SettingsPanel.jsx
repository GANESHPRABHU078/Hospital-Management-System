import React, { useState } from 'react';
import {
    Box, Typography, Avatar, alpha, useTheme, Divider,
    Switch, FormControlLabel, Button, TextField, Grid, Chip, Snackbar, Alert
} from '@mui/material';
import {
    Person as PersonIcon,
    Notifications as NotifIcon,
    Security as SecurityIcon,
    Palette as ThemeIcon,
    Save as SaveIcon,
    Edit as EditIcon,
    CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const SettingsSection = ({ title, icon, children, delay = 0 }) => {
    const theme = useTheme();
    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
            <Box sx={{
                p: 4, borderRadius: '24px', bgcolor: 'background.paper',
                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                boxShadow: theme.palette.mode === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.06)',
                mb: 3,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <Box sx={{
                        p: 1.2, borderRadius: '12px',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: 'primary.main', display: 'flex'
                    }}>
                        {icon}
                    </Box>
                    <Typography fontWeight={900} sx={{ letterSpacing: '-0.02em' }}>{title}</Typography>
                </Box>
                <Divider sx={{ mb: 3, borderColor: alpha(theme.palette.divider, 0.06) }} />
                {children}
            </Box>
        </motion.div>
    );
};

function SettingsPanel({ userName = 'User', roleLabel = 'Staff', accentColor = 'primary' }) {
    const theme = useTheme();
    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [name, setName] = useState(userName);
    const [email, setEmail] = useState('user@lifebridge.com');
    const [phone, setPhone] = useState('+1 (555) 000-0000');
    const [notifs, setNotifs] = useState({
        appointments: true, emergencies: true, reports: false, system: true,
    });

    const handleSave = () => {
        setEditing(false);
        setSaved(true);
    };

    return (
        <Box sx={{ maxWidth: 860 }}>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Box sx={{ mb: 5 }}>
                    <Typography variant="overline" sx={{ color: `${accentColor}.main`, fontWeight: 800, letterSpacing: '0.1em', fontSize: 11 }}>
                        ACCOUNT SETTINGS
                    </Typography>
                    <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-0.045em', mt: 0.3, lineHeight: 1 }}>
                        Settings
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={600} sx={{ mt: 1, opacity: 0.7 }}>
                        Manage your profile, notifications and preferences.
                    </Typography>
                </Box>
            </motion.div>

            {/* Profile Section */}
            <SettingsSection title="Profile Information" icon={<PersonIcon />} delay={0.05}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                    <Avatar sx={{
                        width: 72, height: 72, fontSize: 24, fontWeight: 900,
                        background: `linear-gradient(135deg, ${theme.palette[accentColor]?.main || theme.palette.primary.main}, ${theme.palette[accentColor]?.dark || theme.palette.primary.dark})`,
                        boxShadow: `0 8px 24px ${alpha(theme.palette[accentColor]?.main || theme.palette.primary.main, 0.4)}`,
                    }}>
                        {name ? name[0]?.toUpperCase() : 'U'}
                    </Avatar>
                    <Box>
                        <Typography fontWeight={800} variant="h6">{name}</Typography>
                        <Chip label={roleLabel} size="small" sx={{
                            mt: 0.5, fontWeight: 800, fontSize: 11,
                            bgcolor: alpha(theme.palette[accentColor]?.main || theme.palette.primary.main, 0.1),
                            color: `${accentColor}.main`
                        }} />
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={editing ? <CheckIcon /> : <EditIcon />}
                        onClick={() => editing ? handleSave() : setEditing(true)}
                        sx={{ ml: 'auto', borderRadius: '12px', fontWeight: 700 }}
                    >
                        {editing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                </Box>
                <Grid container spacing={2.5}>
                    {[
                        { label: 'Full Name', value: name, setter: setName },
                        { label: 'Email Address', value: email, setter: setEmail },
                        { label: 'Phone Number', value: phone, setter: setPhone },
                        { label: 'Role', value: roleLabel, setter: null },
                    ].map(({ label, value, setter }) => (
                        <Grid item xs={12} sm={6} key={label}>
                            <TextField
                                label={label}
                                value={value}
                                onChange={setter ? (e) => setter(e.target.value) : undefined}
                                disabled={!editing || !setter}
                                fullWidth
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: '14px' },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: alpha(theme.palette.divider, 0.15)
                                    }
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </SettingsSection>

            {/* Notifications Section */}
            <SettingsSection title="Notification Preferences" icon={<NotifIcon />} delay={0.1}>
                <Grid container spacing={1}>
                    {[
                        { key: 'appointments', label: 'Appointment Reminders', desc: 'Get notified before upcoming appointments' },
                        { key: 'emergencies', label: 'Emergency Alerts', desc: 'Critical patient alerts and emergencies' },
                        { key: 'reports', label: 'Lab & Report Updates', desc: 'When lab results or reports are ready' },
                        { key: 'system', label: 'System Notifications', desc: 'System updates and maintenance notices' },
                    ].map(({ key, label, desc }) => (
                        <Grid item xs={12} sm={6} key={key}>
                            <Box sx={{
                                p: 2, borderRadius: '16px',
                                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                bgcolor: notifs[key] ? alpha(theme.palette.success.main, 0.03) : 'transparent',
                            }}>
                                <Box>
                                    <Typography fontWeight={700} fontSize={13}>{label}</Typography>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>{desc}</Typography>
                                </Box>
                                <Switch
                                    checked={notifs[key]}
                                    onChange={(e) => setNotifs(prev => ({ ...prev, [key]: e.target.checked }))}
                                    color="success"
                                    size="small"
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" startIcon={<SaveIcon />} onClick={() => setSaved(true)}
                        sx={{
                            borderRadius: '12px', fontWeight: 800, px: 3,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        }}>
                        Save Preferences
                    </Button>
                </Box>
            </SettingsSection>

            {/* Security Section */}
            <SettingsSection title="Security" icon={<SecurityIcon />} delay={0.15}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Current Password" type="password" fullWidth size="small"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="New Password" type="password" fullWidth size="small"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" sx={{ borderRadius: '12px', fontWeight: 700 }}
                            onClick={() => setSaved(true)}>
                            Update Password
                        </Button>
                    </Grid>
                </Grid>
            </SettingsSection>

            <Snackbar open={saved} autoHideDuration={3000} onClose={() => setSaved(false)}>
                <Alert severity="success" sx={{ borderRadius: '16px', fontWeight: 700 }}>
                    Settings saved successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default SettingsPanel;
