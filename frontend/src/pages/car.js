import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
  CardMedia,
} from "@mui/material";
import MenuAppBar from "../components/navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

function CarPage() {
  const { id_carro } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5001/api/carros/${id_carro}`);
        setData(response.data.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [data]);

  const dados = localStorage.getItem("user");
  const userData = JSON.parse(dados);


  return (
    <>
      <MenuAppBar user={userData} />
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
          <Grid item xs={12}></Grid>
          <Grid item xs={12} md={6}>
            {data && (
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={data.image || "https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                  alt={data.marca}
                  sx={{ width: '100%', height: 'auto', flex: '1 0 auto' }}
                />
              </Card>
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            {data && (
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto", textAlign: "left" }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    <strong>Brand:</strong>
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    {data.marca}
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                    <strong>Cor:</strong>
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    {data.cor}
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                    <strong>Data:</strong>
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    {data.data}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained">Editar</Button>
                  <Button variant="contained">Apagar</Button>
                  <Button variant="contained">Partilhar</Button>
                </CardActions>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CarPage;
