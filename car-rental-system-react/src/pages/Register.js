import React, { useEffect, useState } from 'react';
import { Typography, TextField, Box, Button, Stack, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {showSnackbar} from "../actions/snackbarActions";

const API_URL = "http://localhost:8080/api/auth/";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);

    useEffect(() => {
        if (userDetails.token !== "") {
            navigate('/', {replace: true});
        }
    });

    const signUp = async () => {
        if(password === confirmPassword){
            axios.post(API_URL + "signup", { username: username, email: email, password: password})
            .then(() => {
                navigate('/login', { replace: true });
            })
                .catch(function(error) {
                    if(error.response.status === 401) {
                        dispatch(showSnackbar("Veuillez remplir tous les champs !!", false));
                    } else if(error.response.status === 409) {
                        dispatch(showSnackbar("Le nom d'utilisateur et/ou le mot de passe sont déjà pris", false));
                    } else {
                        dispatch(showSnackbar("Une erreur s'est produite lors de la tentative d'inscription, veuillez contacter votre administrateur", false));
                    }
                })
        }
        else if (password !== confirmPassword) {
            dispatch(showSnackbar("Les mots de passe ne sont pas identiques", false));
        }
    }

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
                    <Typography variant='h3' align='center'>Inscription</Typography>

                    <TextField
                        required
                        label="Nom d'utilisateur"
                        onChange={(e) => setUsername(e.target.value)}
                        />  

                    <TextField
                        required
                        label="Adresse email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />

                    <TextField
                        required
                        label="Mot de passe"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField
                        required
                        label="Confirmez le mot de passe"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                
                    <Button variant="contained" onClick={signUp}>Enregistrer</Button>
                    <Button variant="outlined" component={Link} to="../login">Vous avez déjà un compte? Connexion</Button>
                </Stack>
            </Box>
        </Container>
    );
};

export default Register;