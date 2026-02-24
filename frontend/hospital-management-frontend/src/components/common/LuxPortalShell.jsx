import React, { useState } from 'react';
import {
    Box, Drawer, AppBar, Toolbar, Typography, List, ListItem,
    ListItemIcon, ListItemText, Avatar, IconButton, alpha, useTheme,
    Tooltip, Divider
} from '@mui/material';
import {
    ChevronLeft, ChevronRight
} from '@mui/icons-material';
import { AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import NotificationCenter from './NotificationCenter';
import LogoutButton from '../../pages/LogoutButton';
import PageTransition from './PageTransition';

const SIDEBAR_WIDTH = 270;
const SIDEBAR_COLLAPSED = 72;

/**
 * LuxPortalShell — A shared premium portal wrapper for all role portals.
 * Props:
 *  - navItems: [{ id, text, icon }]
 *  - title: string (e.g. "Admin Panel")
 *  - roleLabel: string (e.g. "Administrator")
 *  - accentColor: string (theme color key, e.g. 'primary')
 *  - userName: string
 *  - children: rendered based on activeComponent
 *  - renderContent: (activeComponent) => JSX
 */
const LuxPortalShell = ({
    navItems = [],
    title = 'LifeBridge Hospital',
    roleLabel = 'User',
    accentColor = 'primary',
    userName = '',
    renderContent,
    defaultView = 'dashboard',
    activeView,       // controlled
    onNavigate,       // controlled setter
}) => {
    const theme = useTheme();
    const [internalView, setInternalView] = useState(defaultView);
    const [collapsed, setCollapsed] = useState(false);

    // support both controlled (activeView/onNavigate) and uncontrolled modes
    const activeComponent = activeView !== undefined ? activeView : internalView;
    const setActiveComponent = onNavigate || setInternalView;

    const sidebarColor = theme.palette.mode === 'dark'
        ? `linear-gradient(180deg, #0f172a 0%, #1e293b 100%)`
        : `linear-gradient(180deg, #0A1628 0%, #1a2a4a 100%)`;

    const currentDrawerWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH;

    const currentItem = navItems.find(n => n.id === activeComponent);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', overflow: 'hidden' }}>
            {/* ─── SIDEBAR ─── */}
            <Drawer
                variant="permanent"
                sx={{
                    width: currentDrawerWidth,
                    flexShrink: 0,
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '& .MuiDrawer-paper': {
                        width: currentDrawerWidth,
                        boxSizing: 'border-box',
                        background: sidebarColor,
                        borderRight: 'none',
                        overflowX: 'hidden',
                        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '4px 0 30px rgba(0,0,0,0.4)',
                    },
                }}
            >
                {/* Logo Area */}
                <Box sx={{
                    px: collapsed ? 1.5 : 3,
                    py: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    minHeight: 72,
                    borderBottom: `1px solid rgba(255,255,255,0.06)`
                }}>
                    {!collapsed && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{
                                width: 36, height: 36,
                                borderRadius: '10px',
                                background: `linear-gradient(135deg, ${theme.palette[accentColor].main}, ${theme.palette[accentColor].dark})`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 4px 15px ${alpha(theme.palette[accentColor].main, 0.5)}`
                            }}>
                                <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 16 }}>L</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: 1.1 }}>
                                    LifeBridge
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    {roleLabel}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    <IconButton
                        onClick={() => setCollapsed(!collapsed)}
                        size="small"
                        sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' } }}
                    >
                        {collapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
                    </IconButton>
                </Box>

                {/* User Card */}
                {!collapsed && (
                    <Box sx={{ px: 2, py: 2.5 }}>
                        <Box sx={{
                            p: 2,
                            borderRadius: '16px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex', alignItems: 'center', gap: 1.5
                        }}>
                            <Avatar sx={{
                                width: 38, height: 38,
                                background: `linear-gradient(135deg, ${theme.palette[accentColor].main}, ${theme.palette[accentColor].dark})`,
                                fontSize: 14, fontWeight: 800
                            }}>
                                {userName ? userName[0]?.toUpperCase() : 'U'}
                            </Avatar>
                            <Box sx={{ overflow: 'hidden' }}>
                                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {userName || 'User'}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600 }}>
                                    {roleLabel}
                                </Typography>
                            </Box>
                            <Box sx={{
                                ml: 'auto', width: 8, height: 8, borderRadius: '50%',
                                bgcolor: '#10B981', boxShadow: '0 0 8px #10B981', flexShrink: 0
                            }} />
                        </Box>
                    </Box>
                )}

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: 2 }} />

                {/* Nav Items */}
                <List sx={{ px: 1.5, mt: 1.5, flexGrow: 1 }}>
                    {navItems.map((item) => {
                        const isActive = activeComponent === item.id;
                        return (
                            <Tooltip key={item.id} title={collapsed ? item.text : ''} placement="right">
                                <ListItem
                                    button
                                    onClick={() => setActiveComponent(item.id)}
                                    sx={{
                                        borderRadius: '12px',
                                        mb: 0.5,
                                        px: collapsed ? 1.5 : 2,
                                        py: 1.2,
                                        justifyContent: collapsed ? 'center' : 'flex-start',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        background: isActive
                                            ? `linear-gradient(90deg, ${alpha(theme.palette[accentColor].main, 0.25)}, transparent)`
                                            : 'transparent',
                                        '&:hover': {
                                            background: isActive
                                                ? `linear-gradient(90deg, ${alpha(theme.palette[accentColor].main, 0.3)}, transparent)`
                                                : 'rgba(255,255,255,0.06)',
                                        },
                                        '&::before': isActive ? {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0, top: '15%', bottom: '15%',
                                            width: 3,
                                            borderRadius: '0 4px 4px 0',
                                            bgcolor: theme.palette[accentColor].main,
                                            boxShadow: `0 0 12px ${alpha(theme.palette[accentColor].main, 0.8)}`,
                                        } : {},
                                    }}
                                >
                                    <ListItemIcon sx={{
                                        color: isActive ? theme.palette[accentColor].light : 'rgba(255,255,255,0.4)',
                                        minWidth: collapsed ? 0 : 38,
                                        mr: collapsed ? 0 : 0,
                                    }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    {!collapsed && (
                                        <ListItemText
                                            primary={item.text}
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: 13.5,
                                                    fontWeight: isActive ? 700 : 500,
                                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                                                }
                                            }}
                                        />
                                    )}
                                </ListItem>
                            </Tooltip>
                        );
                    })}
                </List>

                {/* Logout at bottom */}
                <Box sx={{ px: 1.5, pb: 2 }}>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 1.5 }} />
                    <Box sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end' }}>
                        <LogoutButton />
                    </Box>
                </Box>
            </Drawer>

            {/* ─── MAIN ─── */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Top AppBar */}
                <AppBar
                    position="sticky"
                    elevation={0}
                    sx={{
                        background: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.background.paper, 0.85)
                            : alpha(theme.palette.background.paper, 0.9),
                        backdropFilter: 'blur(20px)',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                        zIndex: theme.zIndex.drawer - 1,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0, left: 0, right: 0,
                            height: 2,
                            background: `linear-gradient(90deg, ${theme.palette[accentColor].main}, ${theme.palette[accentColor].light}, transparent)`,
                            opacity: 0.7,
                        }
                    }}
                >
                    <Toolbar sx={{ gap: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
                                {currentItem?.text || title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: alpha(theme.palette[accentColor].main, 0.8), fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                {title}
                            </Typography>
                        </Box>
                        <NotificationCenter />
                        <ThemeToggle />
                        <Box sx={{ position: 'relative' }}>
                            <Avatar sx={{
                                width: 36, height: 36, cursor: 'pointer',
                                background: `linear-gradient(135deg, ${theme.palette[accentColor].main}, ${theme.palette[accentColor].dark})`,
                                fontSize: 14, fontWeight: 900,
                                boxShadow: `0 4px 16px ${alpha(theme.palette[accentColor].main, 0.5)}`,
                            }}>
                                {userName ? userName[0]?.toUpperCase() : 'U'}
                            </Avatar>
                            <Box sx={{
                                position: 'absolute', bottom: 1, right: 1,
                                width: 9, height: 9, borderRadius: '50%',
                                bgcolor: '#10B981', border: '2px solid',
                                borderColor: 'background.paper',
                                boxShadow: '0 0 6px #10B981'
                            }} />
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Page Content */}
                <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, overflowY: 'auto' }}>
                    <AnimatePresence mode="wait">
                        <PageTransition key={activeComponent}>
                            {renderContent(activeComponent)}
                        </PageTransition>
                    </AnimatePresence>
                </Box>
            </Box>
        </Box>
    );
};

export default LuxPortalShell;
