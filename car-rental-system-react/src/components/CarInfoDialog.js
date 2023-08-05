import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import FuelIcon from '@mui/icons-material/LocalGasStation';
import MoneyIcon from '@mui/icons-material/MonetizationOn';
import CarIcon from '@mui/icons-material/AirportShuttle';
import ServiceIcon from '@mui/icons-material/MiscellaneousServices';
import GridItem from "./GridItem";

export default function CarInfoDialog(props){
    const userDetails = useSelector((state) => state.userDetails);

    const [openDialog, setOpenDialog] = useState(false);
    const [car] = useState(props.carInfo);
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

    function getFuelTypeName(name){
        switch(name){
            case "FUEL_GASOLINE": {
                return "Essence";
            }
            case "FUEL_HYBRID": {
                return "Hybride";
            }
            case "FUEL_LPG": {
                return "GPL";
            }
            case "FUEL_DIESEL": {
                return "Diesel";
            }
            case "FUEL_ELECTRIC": {
                return "Électrique";
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
                <InfoIcon fontSize="small" />
            </Button>

            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>{car.brand.name + ' ' + car.model.name + ' (' + car.year + ')'}</DialogTitle>

                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} align={"center"}>
                            <img
                                src={"data:image/jpeg;base64,"+car.carImage.fileContent}
                                height={250}
                                alt={car.brand.name + ' ' + car.model.name + ' photo'}
                                loading="lazy"
                            />
                        </Grid>

                        <GridItem xs={4} md={6} icon={<FuelIcon />} primaryText={"Carburant"} secondaryText={getFuelTypeName(car.fuelType.name)} />
                        <GridItem xs={4} md={6} icon={<ServiceIcon />} primaryText={"Kilométrage"} secondaryText={car.mileage + ' km'} />
                        <GridItem xs={4} md={6} icon={<CarIcon />} primaryText={"Capacité"} secondaryText={car.capacity + ', ' + car.horsePower + ' Cheval vapeur'} />
                        <GridItem xs={4} md={6} icon={<MoneyIcon />} primaryText={"Prix par jour "} secondaryText={car.price + ' MAD'} />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}