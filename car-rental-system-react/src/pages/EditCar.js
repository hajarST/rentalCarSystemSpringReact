import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';
import {TextField, Typography, Box, Select, Container, FormGroup, InputLabel, Button, Grid, MenuItem} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import AuthHeader from "../services/authHeader";
import {showSnackbar} from "../actions/snackbarActions";
const API_URL = "http://localhost:8080/api";

const EditCar = () => {
    const [fuelList, setFuelList] = useState([]);
    let navigate = useNavigate();
    let { id } = useParams();

    const currentTime = new Date();
    const maxYear = currentTime.getFullYear();
    const [productionYear, setProductionYear] = useState(currentTime.getFullYear());

    const [horsePower, setHorsePower] = useState(1);
    const [price, setPrice] = useState(1);
    const [mileage, setMileage] = useState(0);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [capacity, setCapacity] = useState("");
    const [fuelType, setFuelType] = useState(1);

    const userDetails = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();
    const token = AuthHeader();

    useEffect(() => {
        getFuelList();
        getCarInfo();
    }, [userDetails.token]);

    const getCarInfo = () => {
        if((userDetails.token !== "") && (userDetails.roles.includes("ROLE_ADMIN"))){
            axios.get(API_URL + '/car/'+id, {
                headers: token
            })
                .then(async (response) => {
                    if(response.data.length === 0){
                        dispatch(showSnackbar("Aucune voiture correspondante trouvée", false));
                        await delay(2000);
                        navigate("../car/add");
                    } else {
                        setHorsePower(response.data.horsePower);
                        setPrice(response.data.price);
                        setMileage(response.data.mileage);
                        setBrand(response.data.brand.name);
                        setModel(response.data.model.name);
                        setCapacity(response.data.capacity);
                        setFuelType(response.data.fuelType.id);
                        setProductionYear(response.data.year);
                    }
                })
                .catch(async (error) => {
                    console.log(error);
                    dispatch(showSnackbar("Erreur lors du téléchargement des données de la voiture !!", false));
                    await delay(2000);
                    navigate('/', {replace: true});
                })
        } else {
            navigate('/', { replace: true });
        }
    };

    const getFuelList = () => {
        axios.get(API_URL + '/fuels')
            .then((response) => {
                if (response.data.length === 0) {
                    dispatch(showSnackbar("Erreur lors du téléchargement de la liste des types de carburant !!", false));
                    //await delay(2000);
                    navigate('/', {replace: true});
                } else {
                    setFuelList(response.data);
                }
            })
            .catch(async (error) => {
                console.log(error);
                dispatch(showSnackbar("Erreur lors du téléchargement de la liste des types de carburant !!", false));
                //await delay(2000);
                navigate('/', {replace: true});
            })
    };

    const handleChangeProductionYear = event => {
        const value = Math.max(1970, Math.min(maxYear, Number(event.target.value)));
        setProductionYear(value);
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
                return "Eléctrique";
            }
            default: {
                return "Non identifié";
            }
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const editCar = async () => {
        if(horsePower === "" || price === "" || mileage === "" || brand === "" || model === "" || capacity === "" || productionYear === ""){
            dispatch(showSnackbar("Veuillez remplir tous les champs !!", false));
        }
        else{
            axios.put(API_URL + '/car/'+id, {
                horsePower: horsePower,
                price: price,
                mileage: mileage,
                brand: brand,
                model: model,
                capacity: capacity,
                fuelType: fuelType,
                year: productionYear,
            },{
                headers: token,
            })
                .then(async () => {
                    dispatch(showSnackbar("Les informations sur la voiture ont été modifiées avec succès.", true));
                    await delay(2000);
                    navigate('/', {replace: true});
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(showSnackbar("Erreur lors de la modification des données de la voiture !!", false));
                })
        }
    }

    return (
        <Container maxWidth="md">
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 1 }}}
                noValidate
                autoComplete="off"
                marginTop={10}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} alignItems={"center"}>
                        <Typography variant='h3' align='center'>Modifier les informations sur la voiture</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel> Marque </InputLabel>
                            <TextField value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel> Modéle </InputLabel>
                            <TextField value={model} onChange={(e) => setModel(e.target.value)} />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel> Capacité </InputLabel>
                            <TextField placeholder="np. 1.9" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel> Puissance en chevaux </InputLabel>
                            <TextField
                                type={"number"}
                                InputProps={{ inputProps: { min: 1, max: 1000 } }}
                                value={horsePower}
                                onChange={(e) => setHorsePower( e.target.value)}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel> Année de production </InputLabel>
                            <TextField type={"number"} onChange={handleChangeProductionYear} value={productionYear} />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel> Kilométrage </InputLabel>
                            <TextField
                                type={"number"}
                                InputProps={{ inputProps: { min: 0 } }}
                                onChange={(e) => setMileage(e.target.value)}
                                value={mileage}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel> Coût de location par jour </InputLabel>
                            <TextField
                                type={"number"}
                                InputProps={{ inputProps: { min: 1, max:100 } }}
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <InputLabel>Type de carburant</InputLabel>
                            <Select
                                value={fuelType}
                                onChange={(e) => setFuelType(e.target.value)}
                                required
                            >
                                { fuelList && fuelList.length > 0 && (
                                    fuelList.map((fuel, index) => {
                                        return (
                                            <MenuItem key={index} value={fuel.id}>{getFuelTypeName(fuel.name)}</MenuItem>
                                        );
                                    })
                                )}
                            </Select>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={editCar} fullWidth>Modifier</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default EditCar;