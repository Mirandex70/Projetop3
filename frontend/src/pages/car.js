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
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MenuAppBar from "../components/navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CarPage() {
  const { id_carro } = useParams();
  const [dados, setDados] = useState(null);
  const [open, setOpen] = useState(false);
  const [marca, setMarca] = useState("");
  const [cor, setCor] = useState("");
  const [data, setData] = useState("");
  const [idCarro, setIdCarro] = useState("");
  const [idImagem, setIdImagem] = useState("")
  const [imagem, setImagem] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllData() {
      await fetchCarData();
      await fetchImagemCarroData();
      await fetchImagemData();
    }
    fetchAllData();
  }, [id_carro]);

  const fetchCarData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/carros/${id_carro}`);
      const carData = response.data.data;
      setDados(carData);
      setIdCarro(carData.id_carro);
      setMarca(carData.marca);
      setCor(carData.cor);
      setData(carData.data);
      console.log(carData.data)
    } catch (err) {
      console.error("Error fetching car data:", err);
    }
  };

  const fetchImagemCarroData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/imagem-carro/getImage/${id_carro}`);
      setIdImagem(response.data.imagemCarro.id_imagem);
    } catch (err) {
      console.error("Error fetching imagem carro data:", err);
    }
  };

  const fetchImagemData = async () => {
    try {
      if (idImagem) {
        const response = await axios.get(`http://localhost:5001/api/imagens/${idImagem}`);
        setImagem(response.data.imagem_url);
      }
    } catch (err) {
      console.error("Error fetching imagem data:", err);
    }
  };


  const itemUser = localStorage.getItem("user");
  const userData = JSON.parse(itemUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5001/api/carros/delete/${id_carro}`)
      .then(response => {
        console.log(response.data);
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSave = async () => {
    const updatedCar = {
      marca,
      cor,
      data,
    };

    try {
      const response = await axios.put(`http://localhost:5001/api/carros/update/${id_carro}`, updatedCar);
      console.log(response.data);
      setDados(response.data.data);
      handleClose();
    } catch (error) {
      console.error("There was an error updating the car!", error);
    }
  };

  return (
    <>
      <MenuAppBar user={userData} />
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
          <Grid item xs={12}></Grid>
          <Grid item xs={12} md={6}>
            {dados && (
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={imagem} 
                  alt={dados.marca}
                  sx={{ width: '100%', height: 'auto', flex: '1 0 auto' }}
                />
              </Card>
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            {dados && (
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto", textAlign: "left" }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    <strong>Marca:</strong>
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    {dados.marca}
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                    <strong>Cor:</strong>
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    {dados.cor}
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                    <strong>Data:</strong>
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    {dados.data}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" onClick={handleClickOpen}>Editar</Button>
                  <Button variant="contained" color="error" onClick={handleDelete}>Apagar</Button>
                  <Button variant="contained" color="success">Partilhar</Button>
                </CardActions>
              </Card>
            )}
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edite Carro</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Edite o {dados && dados.marca} de {dados && dados.data}:
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
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSave} color="secondary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default CarPage;
