import React from "react";
import { Box, Typography, Button, Container, Paper, Link, TextField, Grid } from "@mui/material";
import MenuAppBar from "../components/navbar";
import image from "../assets/images/home/img1.jpg";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function HomePage({user }) {
  const data = user.data;
  return (
    <>
      <MenuAppBar user={user} />
      {!user.isAuthenticated ? (
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
            Olá {data.name}
          </Typography>
          <TextField label="Pesquisar" variant="outlined" fullWidth />
          <Box sx={{ mt: 5 }} >
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Aqui estão os seus veículos
          </Typography>
          <Box sx={{ mt: 5 }} >
            <Grid container spacing={4}>
              {data.cars.map((car, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={car.image}
            title={car.brand}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {car.brand}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {car.color}
            </Typography>
          </CardContent>
        </Card>

                </Grid>
              ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}

export default HomePage;
