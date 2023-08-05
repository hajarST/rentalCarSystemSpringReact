import React, { useEffect, useState } from "react";
import axios from "axios";
import {Typography, Box, Stack, Container, TableRow, TableCell, TableHead, TableBody, Table, TableContainer, Paper, Button} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../services/authHeader";
import EditIcon  from '@mui/icons-material/Edit';
import DeleteIcon  from '@mui/icons-material/Delete';
import RentalInfoDialog from "../components/RentalInfoDialog";
import ChangeRentalStatusDialog from "../components/ChangeRentalStatusDialog";
import {showSnackbar} from "../actions/snackbarActions";

const Rentals = () => {
    const userDetails = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();
    const token = AuthHeader();

    let navigate = useNavigate();
    const API_URL = "http://localhost:8080/api";
    const [statusList, setStatusList] = useState([]);
    const [rentals, setRentals] = useState([]);

    function getStatusName(name){
        switch(name){
            case "STATUS_PENDING": {
                return "En cours de traitement";
            }
            case "STATUS_ACCEPTED": {
                return "Accepté";
            }
            case "STATUS_REJECTED": {
                return "Refusé";
            }
            case "STATUS_CANCELLED": {
                return "Annullé";
            }
            default: {
                return "Non identifié";
            }
        }
    }

    const getRentals = () => {
        axios.get(API_URL + '/rentals',{
            headers: token
        })
            .then((response) => {
                setRentals(response.data)
            })
            .catch((error) => {
                console.log(error);
                dispatch(showSnackbar("Erreur lors du téléchargement de la liste des locations !!", false));
            })
    };

    const deleteRental = (id) => {
        axios.delete(API_URL + '/rental/'+id, {
            headers: token
        })
            .then(async () => {
                dispatch(showSnackbar("La location a été supprimée avec succès", true));
                getRentals();
            })
            .catch((error) => {
                console.log(error);
                dispatch(showSnackbar("Erreur lors de la suppression d'une location", false));
            })
    };

    useEffect(() => {
        if (!userDetails.roles.includes('ROLE_ADMIN')) {
            navigate('/', {replace: true});
        } else {
            getRentals();
            getStatusList();
        }
    },[userDetails.token]);

    const getStatusList = () => {
        axios.get(API_URL + '/rental-statuses')
            .then((response) => {
                if (response.data.length === 0) {
                    dispatch(showSnackbar("Échec du téléchargement des statuts de location", false));
                    navigate('/', {replace: true});
                } else {
                    setStatusList(response.data);
                }
            })
            .catch(async (error) => {
                console.log(error);
                dispatch(showSnackbar("Échec du téléchargement des statuts de location", false));
                //await delay(2000);
                navigate('/', {replace: true});
            })
    };

    return (
        <Container maxWidth="lg">
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 1 }}}
                noValidate
                autoComplete="off"
                marginTop={20}
            >
                <Stack spacing={2}>
                    <Typography variant='h4' align='center'>Liste des locations</Typography>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="center">Date de location</TableCell>
                                    <TableCell align="center">Durée de location</TableCell>
                                    <TableCell align="center">Voiture</TableCell>
                                    <TableCell align="center">Statut</TableCell>
                                    <TableCell align="center">Prix</TableCell>
                                    <TableCell align="center">Client</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rentals && rentals.length > 0 ? (
                                    rentals.map((rental, index) => (
                                    <TableRow
                                        key={rental.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell component="th" scope="row">
                                            {index+1}
                                        </TableCell>
                                        <TableCell align="center">{rental.addDate}</TableCell>
                                        <TableCell align="center">{rental.startDate + ' - ' + rental.endDate}</TableCell>
                                        <TableCell align="center">{rental.car.brand.name + ' ' + rental.car.model.name}</TableCell>
                                        <TableCell align="center">{getStatusName(rental.rentalStatus.name)}</TableCell>
                                        <TableCell align="center">{rental.price + ' MAD'}</TableCell>
                                        <TableCell align="center">{rental.user.username}</TableCell>
                                        <TableCell align="center">
                                            <RentalInfoDialog statusHistory={rental.statusHistory} />
                                            &nbsp;
                                            <ChangeRentalStatusDialog
                                                setRentals={[setRentals]}
                                                statusList={statusList}
                                                status={rental.rentalStatus}
                                                rentalID={rental.id}
                                            />
                                            &nbsp;
                                            <Button
                                                variant="contained"
                                                color="warning"
                                            >
                                                <EditIcon fontSize="small" />
                                            </Button>
                                            &nbsp;
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => {
                                                    deleteRental(rental.id);
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))) : (
                                    <TableRow><TableCell colSpan={8}><h2 align="center">Aucune  donnée à afficher</h2></TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Box>
        </Container>
    );
};

export default Rentals;