import React from "react";
import { Box, Typography, TextField, Button, Paper, Divider } from "@mui/material";

const Settings = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Admin Settings</Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Hospital Configuration</Typography>
                <Divider sx={{ mb: 2 }} />
                <TextField label="Hospital Name" fullWidth defaultValue="LifeBridge Hospital" margin="normal" />
                <TextField label="Contact Email" fullWidth defaultValue="contact@lifebridge.com" margin="normal" />
                <TextField label="Phone Number" fullWidth defaultValue="+1 234 567 8900" margin="normal" />
                <Button variant="contained" sx={{ mt: 2 }}>Save Changes</Button>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Security & Account</Typography>
                <Divider sx={{ mb: 2 }} />
                <TextField label="Admin Email" fullWidth defaultValue="admin@lifebridge.com" margin="normal" />
                <TextField label="Current Password" type="password" fullWidth margin="normal" />
                <TextField label="New Password" type="password" fullWidth margin="normal" />
                <Button variant="contained" color="secondary" sx={{ mt: 2 }}>Update Password</Button>
            </Paper>
        </Box>
    );
};

export default Settings;
