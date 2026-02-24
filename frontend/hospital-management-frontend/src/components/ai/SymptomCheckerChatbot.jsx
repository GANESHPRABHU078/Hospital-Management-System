import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    IconButton,
    Avatar,
    List,
    ListItem,
    Chip,
    Fade,
    CircularProgress
} from '@mui/material';
import {
    Send as SendIcon,
    SmartToy as RobotIcon,
    Person as UserIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
    "I have a persistent headache",
    "Feeling nauseous after meals",
    "Dry cough and mild fever",
    "Sudden back pain"
];

function SymptomCheckerChatbot() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your AI health assistant. What symptoms are you experiencing today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const userMessage = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI thinking
        setTimeout(() => {
            let botResponse = "I've noted that. Based on common medical knowledge, this could be related to several factors. Please remember I'm an AI, not a doctor. Would you like to schedule a consultation with our specialist?";

            if (text.toLowerCase().includes("headache")) {
                botResponse = "A persistent headache can be caused by stress, dehydration, or vision issues. Have you noticed any other symptoms like light sensitivity?";
            } else if (text.toLowerCase().includes("fever")) {
                botResponse = "A fever is often a sign of infection. Ensure you stay hydrated and monitor your temperature. If it exceeds 102°F, please contact us immediately.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Paper
                elevation={0}
                sx={{
                    height: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))'
                }}
            >
                {/* Chat Header */}
                <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                        <RobotIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={700}>AI Medical Assistant</Typography>
                        <Typography variant="caption">Online | 2025 Standard</Typography>
                    </Box>
                </Box>

                {/* Messages area */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, x: msg.sender === 'bot' ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{
                                    alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                                    maxWidth: '80%'
                                }}
                            >
                                <Box sx={{ display: 'flex', gap: 1, flexDirection: msg.sender === 'bot' ? 'row' : 'row-reverse' }}>
                                    <Avatar sx={{
                                        width: 32,
                                        height: 32,
                                        bgcolor: msg.sender === 'bot' ? 'primary.light' : 'secondary.main',
                                        fontSize: '1rem'
                                    }}>
                                        {msg.sender === 'bot' ? <RobotIcon sx={{ fontSize: '1.2rem' }} /> : <UserIcon sx={{ fontSize: '1.2rem' }} />}
                                    </Avatar>
                                    <Paper sx={{
                                        p: 2,
                                        borderRadius: msg.sender === 'bot' ? '0 16px 16px 16px' : '16px 0 16px 16px',
                                        bgcolor: msg.sender === 'bot' ? 'background.default' : 'primary.main',
                                        color: msg.sender === 'bot' ? 'text.primary' : 'white',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                    }}>
                                        <Typography variant="body2">{msg.text}</Typography>
                                    </Paper>
                                </Box>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 5 }}>
                                <CircularProgress size={12} thickness={5} />
                                <Typography variant="caption" color="text.secondary">AI is thinking...</Typography>
                            </Box>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </Box>

                {/* Input area */}
                <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
                    <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {SUGGESTIONS.map((s) => (
                            <Chip
                                key={s}
                                label={s}
                                size="small"
                                onClick={() => handleSend(s)}
                                sx={{ cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: 'primary.light', color: 'white' } }}
                            />
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Describe your symptoms..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                        <IconButton
                            color="primary"
                            onClick={() => handleSend(input)}
                            disabled={!input.trim() || isTyping}
                            sx={{ bgcolor: 'rgba(25, 118, 210, 0.1)', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default SymptomCheckerChatbot;
