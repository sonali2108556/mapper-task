import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import glogo from '../assets/images/glogo.webp';
import { Container } from '@mui/material';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: 'white' }}>
            <Container maxWidth="lg">
                <AppBar position="static" color='inherit' elevation={0} sx={{py:1}}>
                    <Toolbar>
                        <a href="/"><img src={glogo} alt='Graviti Logo' width="100px"></img></a>
                    </Toolbar>
                </AppBar>
            </Container>
        </Box>
    );
}
