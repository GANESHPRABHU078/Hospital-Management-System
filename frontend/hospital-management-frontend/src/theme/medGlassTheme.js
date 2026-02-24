import { createTheme } from '@mui/material/styles';

const getLuxUITheme = (mode) => createTheme({
    palette: {
        mode,
        primary: {
            main: mode === 'light' ? '#0F172A' : '#38BDF8', // Obsidian to Sky Blue
            light: '#7DD3FC',
            dark: '#020617',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#EF4444', // Clinical Red
            light: '#F87171',
            dark: '#B91C1C',
            contrastText: '#ffffff',
        },
        background: {
            default: mode === 'light' ? '#F1F5F9' : '#020617', // Slate Pastel
            paper: mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.7)',
        },
        text: {
            primary: mode === 'light' ? '#0F172A' : '#F8FAFC',
            secondary: mode === 'light' ? '#475569' : '#94A3B8',
        },
        divider: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
    },
    shadows: [
        'none',
        '0 2px 4px rgba(0,0,0,0.02)',
        '0 4px 6px rgba(0,0,0,0.04)',
        '0 10px 15px rgba(0,0,0,0.05)',
        ...Array(21).fill('0 20px 25px rgba(0,0,0,0.1)') // Lux deep shadows
    ],
    typography: {
        fontFamily: '"Outfit", "Inter", sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 800, letterSpacing: '-0.02em' },
        h3: { fontWeight: 800, letterSpacing: '-0.04em' },
        h4: { fontWeight: 800, letterSpacing: '-0.03em' },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 800, letterSpacing: '0.02em' },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@keyframes gradientMove': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                body: {
                    background: mode === 'light'
                        ? `linear-gradient(-45deg, #F1F5F9, #F8FAFC, #E2E8F0, #F1F5F9)`
                        : `linear-gradient(-45deg, #020617, #0F172A, #1E293B, #020617)`,
                    backgroundSize: '400% 400%',
                    animation: 'gradientMove 15s ease infinite',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    '&::before': {
                        content: '""',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: mode === 'light'
                            ? `radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.1) 0px, transparent 50%),
                               radial-gradient(at 100% 100%, rgba(239, 68, 68, 0.05) 0px, transparent 50%)`
                            : `radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.15) 0px, transparent 50%),
                               radial-gradient(at 100% 100%, rgba(239, 68, 68, 0.1) 0px, transparent 50%)`,
                        pointerEvents: 'none',
                        zIndex: -1
                    }
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(16px) saturate(180%)',
                    borderRadius: '24px',
                    border: mode === 'light' ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: mode === 'light'
                        ? '0 10px 30px rgba(0, 0, 0, 0.03)'
                        : '0 30px 60px rgba(0, 0, 0, 0.4)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    padding: '12px 28px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                    },
                },
                containedPrimary: {
                    background: mode === 'light'
                        ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
                        : 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)',
                }
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid',
                    borderColor: mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
                    padding: '20px 16px',
                },
                head: {
                    fontWeight: 800,
                    backgroundColor: 'transparent',
                    color: mode === 'light' ? '#64748B' : '#94A3B8',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                }
            }
        },
    },
});

export default getLuxUITheme;
