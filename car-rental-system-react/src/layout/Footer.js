import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1074BD' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Car Rental System - 2023
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
