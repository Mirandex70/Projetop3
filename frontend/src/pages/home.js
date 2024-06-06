import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

function HomePage() {
  const [carroData, setCarroData] = useState([]);
  const dados = localStorage.getItem("user");
  const userData = JSON.parse(dados);
  const [open, setOpen] = useState(false);
  const [marca, setMarca] = useState("");
  const [cor, setCor] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  function getCarros() {
    axios
      .get("http://localhost:5001/api/carros/user/" + userData.user.id_user)
      .then((response) => {
        console.log("Dados na chamada da api dos carros do user: ", response.data);
        setCarroData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getImages() {
    axios
      .get("http://localhost:5001/api/imagens/getAllImages")
      .then((response) => {
        console.log("Dados na chamada da api das imagens: ", response.data);
        const imagens = response.data;
        setImages(imagens);
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
    getImages();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMarca("");
    setCor("");
    setDate("");
    setSelectedImage("");
  };

  const handleSave = async () => {
    const newCar = {
      marca,
      cor,
      date,
      image: selectedImage,
      id_user: userData.user.id_user
    };

    try {
      const response = await axios.post("http://localhost:5001/api/carros/create", newCar);
      console.log(response.data);
      setCarroData([...carroData, response.data.data]);
      handleClose();
    } catch (error) {
      console.error("There was an error creating the car!", error);
    }
  };

  const handleImageSelect = (url) => {
    setSelectedImage(url);
  };

  return (
    <>
      <MenuAppBar user={userData} />
      {!userData ? (
        <Container maxWidth="lg">
          <Box>
            <Paper
              style={{
                position: "relative",
                backgroundColor: "grey.800",
                color: "#fff",
                marginBottom: 6,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${image})`,
              }}
            >
              <Box
                style={{
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
                  style={{
                    position: "relative",
                    padding: { xs: 3, md: 6 },
                    paddingRight: { md: 0 },
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
                  <Link to="/login" style={{ color: "inherit" }}>
                    <Button variant="contained" style={{ marginTop: 3, marginRight: 1 }}>
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/registar" style={{ color: "inherit" }}>
                    <Button variant="contained" style={{ marginTop: 3, marginLeft: 1 }}>
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
                onde possa registar os seus veículos de forma rápida e eficaz.
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
            style={{ marginTop: 5 }}
          >
            Olá {userData.user.nome}!
          </Typography>
          <TextField label="Pesquisar" variant="outlined" fullWidth />
          <Box style={{ marginTop: 5 }}>
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
            <Box style={{ marginTop: 5 }}>
              <Grid container spacing={4}>
                {carroData.map((car, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Link to={"/car/" + car.id_carro}>
                      <Card style={{ maxWidth: 345 }}>
                        <CardMedia
                          style={{ height: 140 }}
                          image={car.image}
                          title={car.marca}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {car.marca}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
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
              <Typography variant="subtitle1" gutterBottom>
                Selecione uma imagem:
              </Typography>
              <Grid container spacing={2}>
                {images.map((img, index) => (
                  <Grid item xs={4} key={index}>
                    <Box
                      onClick={() => handleImageSelect(img.imagens_url)}
                      style={{
                        padding: "4px",
                        cursor: "pointer",
                        border: selectedImage === img.imagem_url ? `2px solid blue` : "none"
                      }}
                    >
                      <img
                        src={img.imagens_url}
                        alt={`Imagem ${index + 1}`}
                        style={{ width: "100%", display: "block" }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
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
                type="date"
                fullWidth
                variant="outlined"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
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