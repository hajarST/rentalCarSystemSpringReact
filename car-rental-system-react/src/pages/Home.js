
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Stack,
  Paper,
  Slide,
  Grow,
  Zoom,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; // Import the car icon
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../services/authHeader";
import ChangeImageDialog from "../components/ChangeImageDialog";
import CarRentalDialog from "../components/CarRentalDialog";
import { showSnackbar } from "../actions/snackbarActions";
import { DirectionsCar, AssignmentTurnedIn, Business,Star, Mail, QuestionAnswer } from "@mui/icons-material";

const API_URL = "http://localhost:8080/api";

const Home = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const token = AuthHeader();

  const [cars, setCars] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getCarsList();
  }, []);

  const getCarsList = async () => {
    axios
      .get(API_URL + "/cars/available")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showSnackbar(
            "Une erreur s'est produite lors du téléchargement de la liste des voitures disponibles",
            false
          )
        );
      });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const deleteCar = async (id) => {
    axios
      .delete(API_URL + "/car/" + id, {
        headers: token,
      })
      .then(async () => {
        dispatch(showSnackbar("La voiture a été supprimée avec succès", true));
        await getCarsList();
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showSnackbar("Erreur lors de la suppression de la voiture !!", false)
        );
      });
  };

  function getFuelTypeName(name) {
    switch (name) {
      case "FUEL_GASOLINE":
        {
          return "Essence";
        }
        break;
      case "FUEL_HYBRID":
        {
          return "Hybride";
        }
        break;
      case "FUEL_LPG":
        {
          return "GPL";
        }
        break;
      case "FUEL_DIESEL":
        {
          return "Diesel";
        }
        break;
      case "FUEL_ELECTRIC":
        {
          return "Eléctrique";
        }
        break;
      default:
        {
          return "Non identifié";
        }
        break;
    }
  }

  return (
    <>
      <Box sx={{ background: "#f8f8f8", padding: "40px 0" }}>
        <Typography variant="h4" align="center" gutterBottom>
          <DirectionsCar fontSize="large" />
          Nos voitures disponibles
        </Typography>
        {/* Add steps here */}
      </Box>

      
{/* 
      <Grid container spacing={3} justifyContent="center">
        {cars && cars.length > 0 ? (
          cars.map((car, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Slide direction="up" in timeout={(index + 1) * 500}>
                  <Card elevation={3}>
                    <CardMedia
                      component="img"
                      alt={car.brand.name + car.model.name}
                      height="200"
                      image={"data:image/jpeg;base64," + car.carImage.fileContent}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        textAlign="center"
                      >
                        {car.brand.name + " " + car.model.name + " (" + car.year + ")"}
                      </Typography>
                      <Stack spacing={2}>
                        <Item>Kilométrage : {car.mileage} km</Item>
                        <Item>
                          Capacité : {car.capacity + " personnes , " + car.horsePower + "KM"}
                        </Item>
                        <Item>Carburant: {getFuelTypeName(car.fuelType.name)}</Item>
                        <Item>Prix par jour : {car.price + "MAD"}</Item>
                      </Stack>
                    </CardContent>
                    <CardActions style={{ justifyContent: "center" }}>
                      {userDetails.token !== "" && (
                        <CarRentalDialog carID={car.id} price={car.price} />
                      )}

                      {userDetails.roles.includes("ROLE_ADMIN") && (
                        <>
                          &nbsp;
                          <ChangeImageDialog carID={car.id} cars={[setCars]} />

                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => {
                              navigate(`/car/edit/${car.id}`);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </Button>

                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              deleteCar(car.id);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </Button>
                        </>
                      )}
                    </CardActions>
                  </Card>
                </Slide>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12} marginTop={20}>
            <Grow in timeout={1000}>
              <Typography variant="h4" align="center">
                Aucune donnée à afficher
              </Typography>
            </Grow>
          </Grid>
        )}
      </Grid> */}

<Grid container spacing={3} justifyContent="center">
        {cars && cars.length > 0 ? (
          cars.map((car, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Grow in timeout={(index + 1) * 500}>
                  <Card elevation={3} sx={{ cursor: "pointer" }}>
                    <CardMedia
                      component="img"
                      alt={car.brand.name + car.model.name}
                      height="200"
                      image={"data:image/jpeg;base64," + car.carImage.fileContent}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        textAlign="center"
                      >
                        {car.brand.name + " " + car.model.name + " (" + car.year + ")"}
                      </Typography>
                      <Stack spacing={2}>
                        <Item>Kilométrage : {car.mileage} km</Item>
                        <Item>
                          Capacité : {car.capacity + " personnes , " + car.horsePower + "KM"}
                        </Item>
                        <Item>Carburant: {getFuelTypeName(car.fuelType.name)}</Item>
                        <Item>Prix par jour : {car.price + "MAD"}</Item>
                      </Stack>
                    </CardContent>
                    <CardActions style={{ justifyContent: "center" }}>
                      {userDetails.token !== "" && (
                        <CarRentalDialog carID={car.id} price={car.price} />
                      )}

                      {userDetails.roles.includes("ROLE_ADMIN") && (
                        <>
                          &nbsp;
                          <ChangeImageDialog carID={car.id} cars={[setCars]} />

                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => {
                              navigate(`/car/edit/${car.id}`);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </Button>

                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              deleteCar(car.id);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </Button>
                        </>
                      )}
                    </CardActions>
                  </Card>
                </Grow>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12} marginTop={20}>
            <Grow in timeout={1000}>
              <Typography variant="h4" align="center">
                Aucune donnée à afficher
              </Typography>
            </Grow>
          </Grid>
        )}
      </Grid>
       {/* ******* */}
            
    </>
  );
};

export default Home;
       {/* *************** */}
//     </>
//   );
// };

// export default Home;
