import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, FormControl, MenuItem, Select} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AuthHeader from "../services/authHeader";
import {showSnackbar} from "../actions/snackbarActions";
const API_URL = "http://localhost:8080/api";

export default function ChangeRentalStatusDialog(props){
    const userDetails = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();
    const token = AuthHeader();

    const [openDialog, setOpenDialog] = useState(false);
    const [currentStatus] = useState(props.status);
    const [setRentals] = props.setRentals;
    const [status, setStatus] = React.useState(0);
    const [rentalID] = useState(props.rentalID);
    const [statusList] = useState(props.statusList);
    let navigate = useNavigate();

    useEffect(() => {
        if (!userDetails.roles.includes('ROLE_ADMIN')) {
            navigate('/', {replace: true});
        }
    },[userDetails.token]);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleChange = (event) => {
        setStatus(event.target.value);

        axios.put(API_URL + '/rental/'+rentalID+'/status/'+event.target.value, {},{
            headers: token,
        })
            .then(async () => {
                dispatch(showSnackbar("Le statut de location a été modifié avec succès.", true));
                await delay(2000);
                getRentals();
                handleClose();
            })
            .catch((error) => {
                console.log(error);
                dispatch(showSnackbar("Erreur lors du changement du statut de location.", false));
            })

    };

    const getRentals = () => {
        axios.get(API_URL + '/rentals',{
            headers: token
        })
            .then((response) => {
                setRentals(response.data)
            })
            .catch((error) => {
                console.log(error);
                dispatch(showSnackbar("Erreur lors du téléchargement de la liste des locations.", false));
            })
    };

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
                return "Annulé";
            }
            default: {
                return "Non identifié";
            }
        }
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    handleClickOpen();
                }}
            >
                <BookmarkIcon fontSize="small" />
            </Button>

            <Dialog open={openDialog} onClose={handleClose} maxWidth={"xs"} fullWidth>
                <DialogTitle>Changer le statut de location</DialogTitle>

                <DialogContent align="center">
                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            label="Status"
                            onChange={handleChange}
                            required
                        >
                            { statusList && statusList.length > 0 && (
                                statusList
                                    .filter(status => status.id !== currentStatus.id)
                                    .map((filteredStatus, index) => {
                                        return (
                                            <MenuItem key={index} value={filteredStatus.id}>{getStatusName(filteredStatus.name)}</MenuItem>
                                        );
                                    })
                            )}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}