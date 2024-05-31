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

function CarPage({ user }) {
  const [data, setData] = useState(null);

  const id_carro = 15;

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

  return (
    <>
      <MenuAppBar user={user} />
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
          <Grid item xs={12}></Grid>
          <Grid item xs={12} md={6}>
            {data && (
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={data.image} 
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
                    <strong>Color:</strong>
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    {data.cor}
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
