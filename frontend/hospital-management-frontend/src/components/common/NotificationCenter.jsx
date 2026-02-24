import React, { useState } from 'react';
import {
    Badge,
    IconButton,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
    Box,
    Avatar
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    EventAvailable as ApptIcon,
    LocalPharmacy as MedsIcon,
    Announcement as AlertIcon
} from '@mui/icons-material';

const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'appt', title: 'Appointment Confirmed', time: '2 hours ago', text: 'Dr. Smith has confirmed your appointment for tomorrow at 10 AM.', icon: <ApptIcon color="primary" /> },
    { id: 2, type: 'meds', title: 'New Prescription', time: '5 hours ago', text: 'A new prescription for Amoxicillin has been added to your record.', icon: <MedsIcon color="success" /> },
    { id: 3, type: 'alert', title: 'Health Update', time: '1 day ago', text: 'Your recent blood test results are now available for review.', icon: <AlertIcon color="warning" /> },
];

function NotificationCenter() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                color="inherit"
                sx={{
                    bgcolor: 'rgba(255,255,255,0.05)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
            >
                <Badge badgeContent={MOCK_NOTIFICATIONS.length} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 360,
                        maxHeight: 480,
                        borderRadius: '16px',
                        mt: 1.5,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                        border: '1px solid',
                        borderColor: 'divider',
                        overflow: 'hidden'
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight={700}>Notifications</Typography>
                    <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 600 }}>Mark all as read</Typography>
                </Box>
                <Divider />
                <List sx={{ p: 0 }}>
                    {MOCK_NOTIFICATIONS.map((notif) => (
                        <MenuItem
                            key={notif.id}
                            onClick={handleClose}
                            sx={{
                                py: 2,
                                px: 2,
                                whiteSpace: 'normal',
                                '&:hover': { bgcolor: 'action.hover' }
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                <Avatar sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                                    {notif.icon}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2" fontWeight={700}>{notif.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{notif.text}</Typography>
                                    <Typography variant="caption" color="text.disabled">{notif.time}</Typography>
                                </Box>
                            </Box>
                        </MenuItem>
                    ))}
                </List>
                <Divider />
                <Box sx={{ p: 1.5, textAlign: 'center' }}>
                    <Typography variant="button" color="primary" sx={{ fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer' }}>
                        View All Notifications
                    </Typography>
                </Box>
            </Menu>
        </>
    );
}

export default NotificationCenter;
