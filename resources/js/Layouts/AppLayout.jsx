import React from 'react';
import { Link } from '@inertiajs/react';
import { Container, AppBar, Toolbar, Button } from '@mui/material';

export default function AppLayout({ children }) {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} href="/">Inicio</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                {children}
            </Container>
        </div>
    );
}
