
// import { Link, useNavigate } from 'react-router-dom';
// import { Box, Button, IconButton } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from "../reducers/userDetailsReducer";
// import AdminMenuList from "../components/AdminMenuList";
// import HomeIcon from '@mui/icons-material/Home';
// import ProfileIcon from '@mui/icons-material/AccountCircle';
// import LoginIcon from '@mui/icons-material/Login';
// import RegisterIcon from '@mui/icons-material/PersonAdd';
// import LogoutIcon from '@mui/icons-material/ExitToApp';
// import CarRentalIcon from '@mui/icons-material/CarRental';

// const styles = {
//   iconButton: {
//     fontFamily: 'Roboto, sans-serif', // Apply Roboto font family
//     fontSize: '16px', // Adjust the font size as needed
//   },
// };

// const Navigation = () => {
//     let navigate = useNavigate();
//     const userDetails = useSelector((state) => state.userDetails);
//     const dispatch = useDispatch();

//     const logOut = () => {
//         dispatch(logout());
//         navigate('/', { replace: true });
//     };
//     return (
//         <>
//             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
//                 <IconButton
//                     component={Link}
//                     sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
//                     to="home"
//                 >
//                     <HomeIcon /> Accueil
//                 </IconButton>
//             </Box>

//             {userDetails.roles.includes("ROLE_ADMIN") && (
//                 <>
//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
//                         <AdminMenuList />
//                     </Box>
//                 </>
//             )}

//             {(userDetails.roles.includes('ROLE_USER') || userDetails.roles.includes('ROLE_ADMIN')) ? (
//                 <>
//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
//                         <IconButton
//                             component={Link}
//                             sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
//                             to="my-rentals"
//                         > 
//                             <CarRentalIcon /> Mes locations
//                          </IconButton> 
//                     </Box>
//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
//                         <IconButton
//                             component={Link}
//                             sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
//                             to="profile"
//                         >
//                             <ProfileIcon /> Mon profil
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
//                         <IconButton
//                             sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
//                             onClick={logOut}
//                         >
//                             <LogoutIcon /> Se déconnecter
//                         </IconButton>
//                     </Box>
//                 </>
//             ) : (
//                 <>
//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
//                         <IconButton
//                             component={Link}
//                             sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
//                             to="login"
//                         >
//                             <LoginIcon /> Se connecter
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
//                         <IconButton
//                             component={Link}
//                             sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
//                             to="register"
//                         >
//                             <RegisterIcon /> S'inscrire
//                         </IconButton>
//                     </Box>
//                 </>
//             )}
//         </>
//     );
// };

// export default Navigation;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../reducers/userDetailsReducer";
import AdminMenuList from "../components/AdminMenuList";
import HomeIcon from '@mui/icons-material/Home';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import RegisterIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import CarRentalIcon from '@mui/icons-material/CarRental';

const styles = {
  iconButton: {
    fontFamily: 'Roboto, sans-serif', // Apply Roboto font family
    fontSize: '16px', // Adjust the font size as needed
  },
};

const Navigation = () => {
  let navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
        <IconButton
          component={Link}
          sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
          to="home"
        >
          <HomeIcon /> Accueil
        </IconButton>
      </Box>

      {userDetails.roles.includes("ROLE_ADMIN") && (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
          <AdminMenuList />
        </Box>
      )}

      {(userDetails.roles.includes('ROLE_USER') || userDetails.roles.includes('ROLE_ADMIN')) && (
        <>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              component={Link}
              sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
              to="my-rentals"
            > 
              <CarRentalIcon /> Mes locations
            </IconButton> 
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              component={Link}
              sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
              to="profile"
            >
              <ProfileIcon /> Mon profil
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
              onClick={logOut}
            >
              <LogoutIcon /> Se déconnecter
            </IconButton>
          </Box>
        </>
      )}

      {(!userDetails.roles.includes('ROLE_USER') && !userDetails.roles.includes('ROLE_ADMIN')) && (
        <>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              component={Link}
              sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
              to="login"
            >
              <LoginIcon /> Se connecter
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              component={Link}
              sx={{ ...styles.iconButton, my: 2, color: 'white', display: 'block' }}
              to="register"
            >
              <RegisterIcon /> S'inscrire
            </IconButton>
          </Box>
        </>
      )}
    </React.Fragment>
  );
};

export default Navigation;
