import React, { useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, Button, CardActions, CardMedia} from '@mui/material';
import MenuAppBar from '../components/navbar';

function CarPage({ user }) {
  const data = user.data;

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <MenuAppBar user={user} />
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" align="center">
              {data.cars[0].brand}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={data.cars[0].image}
                alt={data.cars[0].brand}
                sx={{ width: '100%', height: 'auto', flex: '1 0 auto' }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto', textAlign: 'left' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  <strong>Brand:</strong>
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                  {data.cars[0].brand}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                  <strong>Color:</strong>
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                  {data.cars[0].color}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" >
                  Editar
                </Button>
                <Button variant="contained" >
                  Apagar
                </Button>
                <Button variant="contained" >
                  Partilhar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CarPage;
