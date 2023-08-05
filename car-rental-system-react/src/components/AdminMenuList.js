// import React, { useState, useEffect, useRef } from "react";
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import { Link } from 'react-router-dom';
// import {Button, Grow, MenuItem, MenuList, Paper, Popper, Stack} from "@mui/material";

// export default function AdminMenuList() {
//     const [open, setOpen] = useState(false);
//     const anchorRef = useRef(null);

//     const handleToggle = () => {
//         setOpen((prevOpen) => !prevOpen);
//     };

//     const handleClose = (event) => {
//         if (anchorRef.current && anchorRef.current.contains(event.target)) {
//             return;
//         }

//         setOpen(false);
//     };

//     function handleListKeyDown(event) {
//         if (event.key === 'Tab') {
//             event.preventDefault();
//             setOpen(false);
//         } else if (event.key === 'Escape') {
//             setOpen(false);
//         }
//     }

//     const prevOpen = useRef(open);
//     useEffect(() => {
//         if (prevOpen.current === true && open === false) {
//             anchorRef.current.focus();
//         }

//         prevOpen.current = open;
//     }, [open]);

//     return (
//         <Stack direction="row" spacing={2}>
//             <div>
//                 <Button
//                     ref={anchorRef}
//                     id="composition-button"
//                     aria-controls={open ? 'composition-menu' : undefined}
//                     aria-expanded={open ? 'true' : undefined}
//                     aria-haspopup="true"
//                     sx={{ my: 2, color: 'red', display: 'block' }}
//                     onClick={handleToggle}
//                 >
//                     Administrateur
//                 </Button>
//                 <Popper
//                     open={open}
//                     anchorEl={anchorRef.current}
//                     role={undefined}
//                     placement="bottom-start"
//                     transition
//                     disablePortal
//                 >
//                     {({ TransitionProps, placement }) => (
//                         <Grow
//                             {...TransitionProps}
//                             style={{
//                                 transformOrigin:
//                                     placement === 'bottom-start' ? 'left top' : 'left bottom',
//                             }}
//                         >
//                             <Paper>
//                                 <ClickAwayListener onClickAway={handleClose}>
//                                     <MenuList
//                                         autoFocusItem={open}
//                                         id="composition-menu"
//                                         aria-labelledby="composition-button"
//                                         onKeyDown={handleListKeyDown}
//                                     >
//                                         <MenuItem onClick={handleClose} component={Link} to="car/list">Liste des voitures</MenuItem>
//                                         <MenuItem onClick={handleClose} component={Link} to="rentals">Liste des locations</MenuItem>
//                                         <MenuItem onClick={handleClose}>Gestion des utilisateurs</MenuItem>
//                                     </MenuList>
//                                 </ClickAwayListener>
//                             </Paper>
//                         </Grow>
//                     )}
//                 </Popper>
//             </div>
//         </Stack>
//     );
// }

import React, { useState, useEffect, useRef } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Link } from 'react-router-dom';
import { IconButton, Stack, Paper, MenuList, MenuItem, Popper, Grow, ListItemIcon } from "@mui/material";
import CarListIcon from '@mui/icons-material/DirectionsCar';
import CarRentalIcon from '@mui/icons-material/CarRental';
import UsersIcon from '@mui/icons-material/People';

export default function AdminMenuList() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2}>
            <div>
                <IconButton
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    sx={{ my: 2, color: 'red', display: 'block' }}
                    onClick={handleToggle}
                >
                    <UsersIcon />
                    Administrateur
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClose} component={Link} to="car/list">
                                            <ListItemIcon>
                                                <CarListIcon />
                                            </ListItemIcon>
                                            Liste des voitures
                                        </MenuItem>
                                        <MenuItem onClick={handleClose} component={Link} to="rentals">
                                            <ListItemIcon>
                                                <CarRentalIcon />
                                            </ListItemIcon>
                                            Liste des locations
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <UsersIcon />
                                            </ListItemIcon>
                                            Gestion des utilisateurs
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}
