import React from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
} from "@mui/material";
import {
    Home,
    CalendarToday,
    History,
    LocalPharmacy,
} from "@mui/icons-material";

const Sidebar = ({ activeComponent, onSidebarClick }) => {
    const menuItems = [
        { id: "profile", text: "Patient Profile", icon: <Home /> },
        { id: "book-appointment", text: "Book Appointment", icon: <CalendarToday /> },
        { id: "view-appointments", text: "View Appointments", icon: <CalendarToday /> },
        { id: "medical-history", text: "Medical History", icon: <History /> },
        { id: "prescriptions", text: "Prescriptions", icon: <LocalPharmacy /> },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                    height: "100vh",
                    backgroundColor: "#2C3E50",
                    color: "#fff",
                    position: "relative",
                    zIndex: 0
                },
            }}
        >
            <List sx={{ marginTop: "64px" }}>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.id}
                        onClick={() => onSidebarClick(item.id)}
                        sx={{
                            backgroundColor: activeComponent === item.id ? "#2980B9" : "transparent",
                            "&:hover": { backgroundColor: "#34495E" },
                            color: "#fff",
                        }}
                    >
                        <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
