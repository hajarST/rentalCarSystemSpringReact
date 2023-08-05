import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, {useState} from "react";
import AuthHeader from "../services/authHeader";
import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";
import {showSnackbar} from "../actions/snackbarActions";
import {useDispatch} from "react-redux";
const API_URL = "http://localhost:8080/api";

export default function ChangeImageDialog(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const token = AuthHeader();

    const [setCars] = props.cars;
    const [carID] = useState(props.carID);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const getCarsList = async () => {
        axios.get(API_URL + '/cars/available')
            .then((response) => {
                setCars(response.data);
            })
            .catch((error) => {
                console.log(error);
                dispatch(showSnackbar("Erreur lors du téléchargement de la liste des voitures disponibles.", false));
            })
    };

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);

        axios.put(API_URL + '/car/'+carID+'/image', formData, {
            headers: token
        })
            .then(async () => {
                dispatch(showSnackbar("La photo a été changée avec succès.", true));
                await delay(2000);
                handleClose();
                setCars(getCarsList());
            })
            .catch((error) => {
                console.log(error);
                dispatch(showSnackbar("Erreur lors du changement de la photo.", false));
            })
    };

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                    handleClickOpen();
                }}
            >
                <ImageIcon fontSize="small" />
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modifier la photo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Choisissez une nouvelle photo de la voiture, puis confirmez les changements en appuyant sur le bouton.
                    </DialogContentText>
                    <input type="file" accept="image/*" onChange={onFileChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onFileUpload}>Valider</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}