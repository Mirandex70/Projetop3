import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MenuAppBar from "../components/navbar";
import image from "../assets/images/home/img1.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [carroData, setCarroData] = useState([]);
  const dados = localStorage.getItem("user");
  const userData = JSON.parse(dados);
  const [open, setOpen] = useState(false);
  const [marca, setMarca] = useState("");
  const [cor, setCor] = useState("");
  const [data, setData] = useState("");

  function getCarros() {
    axios
      .get("http://localhost:5001/api/carros/user/" + userData.user.id_user)
      .then((response) => {
        console.log(response.data);
        setCarroData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (userData) {
      getCarros();
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const newCar = {
      marca,
      cor,
      data,
      id_user: userData.user.id_user
    };

    try {
      const response = await axios.post("http://localhost:5001/api/carros/create", newCar);
      console.log(response.data);
      setCarroData([...carroData, response.data.data]);
      handleClose();
      setMarca("");
      setCor("");
      setData("");
    } catch (error) {
      console.error("There was an error creating the car!", error);
    }
  };

  return (
    <>
      <MenuAppBar user={userData} />
      {!userData ? (
        <Container maxWidth="lg">
          <Box>
            <Paper
              sx={{
                position: "relative",
                backgroundColor: "grey.800",
                color: "#fff",
                mb: 6,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${image})`,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: "rgba(0,0,0,.3)",
                }}
              />
              <Container maxWidth="lg">
                <Box
                  sx={{
                    position: "relative",
                    p: { xs: 3, md: 6 },
                    pr: { md: 0 },
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    Bem-vindo à AutoTracker
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    AutoTracker é uma aplicação de inventário de carros que
                    permite gerir e acompanhar veículos de forma eficiente.
                  </Typography>
                  <Link href="/login" color="inherit">
                    <Button variant="contained" sx={{ mt: 3, mr: 1 }}>
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/registar" color="inherit">
                    <Button variant="contained" sx={{ mt: 3, ml: 1 }}>
                      Registar
                    </Button>
                  </Link>
                </Box>
              </Container>
            </Paper>

            <Container maxWidth="md">
              <Typography
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Funcionalidades
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                O nosso objetivo é tornar o controlo de veículos mais eficiente,
                onde possa registar os seus veiculos de forma rápida e eficaz
              </Typography>
            </Container>
          </Box>
        </Container>
      ) : (
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
            sx={{ my: 5 }}
          >
            Olá {userData.user.nome}!
          </Typography>
          <TextField label="Pesquisar" variant="outlined" fullWidth />
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              Aqui estão os seus veículos
            </Typography>
            <Button variant="contained" onClick={handleClickOpen}>
              Adicionar Carro
            </Button>
            <Box sx={{ mt: 5 }}>
              <Grid container spacing={4}>
                {carroData.map((car, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Link to={"/car/" + car.id_carro}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          sx={{ height: 140 }}
                          image={car.image}
                          title={car.marca}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {car.marca}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {car.cor}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Adicionar Carro</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Adicione um carro:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="marca"
                label="Marca"
                type="text"
                fullWidth
                variant="outlined"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />
              <TextField
                margin="dense"
                id="cor"
                label="Cor"
                type="text"
                fullWidth
                variant="outlined"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
              />
              <TextField
                margin="dense"
                id="data"
                label="Data"
                type="number"
                fullWidth
                variant="outlined"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSave} color="secondary">
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </>
  );
}

export default HomePage;
