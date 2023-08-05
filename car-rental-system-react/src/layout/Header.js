
import React from 'react';
import { Toolbar, Typography } from '@mui/material';
import CarRentalIcon from '@mui/icons-material/CarRental';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import CarImage from '../images/idirtech.PNG'; 

const Header = () => {
    return (
        <Toolbar disableGutters>
           
            <img
                src={CarImage}
                alt="Car Rental System"
                style={{ width: '32px', height: '32px', marginRight: '8px' }}
            />
            <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'Roboto',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none'
                }}
            >
                Car Rental System
            </Typography>
            
            <Navigation />
        </Toolbar>
    );
};

export default Header;
