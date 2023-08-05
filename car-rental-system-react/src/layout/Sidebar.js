import React, { useState } from 'react';
import { Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CarRentalIcon from '@mui/icons-material/CarRental';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import CarImage from '../images/idirtech.PNG';
import Header from './Header';

const Sidebar = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <Toolbar disableGutters>
                <img
                    src={CarImage}
                    alt="Car Rental System"
                    style={{ width: '32px', height: '32px', marginRight: '8px', cursor: 'pointer' }}
                    onClick={toggleDrawer}
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
                        textDecoration: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Car Rental System
                </Typography>
            </Toolbar>

            {/* Drawer for sidebar */}
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
                <List>
                    <ListItem button component={Link} to="home">
                        <ListItemIcon>
                            <CarRentalIcon />
                        </ListItemIcon>
                        <ListItemText primary="Accueil" />
                    </ListItem>
                    <ListItem button component={Link} to="my-rentals">
                        <ListItemIcon>
                            <CarRentalIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mes locations" />
                    </ListItem>
                    {/* Add more navigation items as needed */}
                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;
