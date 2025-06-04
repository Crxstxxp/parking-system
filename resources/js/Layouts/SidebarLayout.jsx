import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Link, usePage } from '@inertiajs/react';

const drawerWidth = 240;

const SidebarLayout = ({ children }) => {
    const { url } = usePage();

    const navItems = [
        { name: 'Estacionamiento', href: '/parking' },
        { name: 'Tipos de vehiculos', href: '/vehicles' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: 1300 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Sistema de Gestión
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <List>
                    {navItems.map(item => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton component={Link} href={item.href} selected={url === item.href}>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                {children}
            </Box>
        </Box>
    );
};

export default SidebarLayout;
