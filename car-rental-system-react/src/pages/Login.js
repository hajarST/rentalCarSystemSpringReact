// import React, { useEffect, useState } from 'react';
// import { Typography, TextField, Box, Button, Stack, Container } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from "axios";
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../reducers/userDetailsReducer';
// import {showSnackbar} from "../actions/snackbarActions";

// const API_URL = "http://localhost:8080/api/auth/";

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     let navigate = useNavigate();
//     const dispatch = useDispatch();
//     const userDetails = useSelector((state) => state.userDetails);

//     useEffect(() => {
//         if (userDetails.token !== "") {
//             navigate('/', {replace: true});
//         }
//     });

//     const logIn = async () => {
//         axios.post(API_URL + "signin", { username,password })
//         .then(response => {
//             if (response.data.token) {
//                 dispatch(login(response.data));
//             }

//             navigate('/', { replace: true });
//         })
//         .catch(function(error) {
//             if(error.response.status === 401) {
//                 dispatch(showSnackbar("Données de connexion incorrectes !!", false));
//             } else if(error.response.status === 404){
//                 dispatch(showSnackbar("L'utilisateur avec le nom d'utilisateur spécifié n'existe pas !!", false));
//             } else {
//                 dispatch(showSnackbar("Une erreur s'est produite lors de la tentative de connexion, veuillez contacter l'administrateur !!", false));
//             }
//         })
//     }

//     return (
//         <Container maxWidth="sm">
//             <Box
//                 component="form"
//                 sx={{'& .MuiTextField-root': { m: 1 }}}
//                 noValidate
//                 autoComplete="off"
//                 marginTop={20}
//             >
//                 <Stack spacing={2}>
//                     <Typography variant='h3' align='center'>Authentification</Typography>

//                     <TextField
//                         required
//                         label="Nom d'utilisateur"
//                         onChange={(e) => setUsername(e.target.value)}
//                     />

//                     <TextField
//                         required
//                         label="Mot de passe"
//                         type="password"
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
                
//                     <Button variant="contained" onClick={logIn}>Connectez-vous</Button>
//                     <Button variant="outlined" component={Link} to="../register">Inscrivez-vous</Button>
//                 </Stack>
//             </Box>
//         </Container>
//     );
// };

// export default Login;
import React, { useEffect, useState } from 'react';
import { Typography, TextField, Box, Button, Stack, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/userDetailsReducer';
import { showSnackbar } from "../actions/snackbarActions";

import LogoImage from '../images/idirtech.PNG'; 

const API_URL = "http://localhost:8080/api/auth/";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (userDetails.token !== "") {
      navigate('/', { replace: true });
    }
  }, [userDetails.token, navigate]);

  const logIn = async () => {
    axios.post(API_URL + "signin", { username, password })
      .then(response => {
        if (response.data.token) {
          dispatch(login(response.data));
        }
        navigate('/', { replace: true });
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          dispatch(showSnackbar("Données de connexion incorrectes !!", false));
        } else if (error.response.status === 404) {
          dispatch(showSnackbar("L'utilisateur avec le nom d'utilisateur spécifié n'existe pas !!", false));
        } else {
          dispatch(showSnackbar("Une erreur s'est produite lors de la tentative de connexion, veuillez contacter l'administrateur !!", false));
        }
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{'& .MuiTextField-root': { m: 1 }}}
        noValidate
        autoComplete="off"
        marginTop={20}
      >
        <Stack spacing={2}>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' , justifyContent: 'center' }}>
            <img src={LogoImage} alt="Logo" style={{ width: '100px', height: '100px', marginRight: '10px' }} />
            {/* <Typography variant='h3' align='center'>Authentification</Typography> */}
          </Box>

          <TextField
            required
            label="Nom d'utilisateur"
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            required
            label="Mot de passe"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" onClick={logIn}>Connectez-vous</Button>
          <Button variant="outlined" component={Link} to="../register">Inscrivez-vous</Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
