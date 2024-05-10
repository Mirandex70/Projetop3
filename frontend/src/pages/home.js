import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';

function HomePage() {
  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 6,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://source.unsplash.com/random)`, // You can replace this URL with your preferred image
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Welcome to Our Website
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Explore the world of opportunities with us. Engage and connect to learn more.
            </Typography>
            <Button variant="contained" sx={{ mt: 3 }}>
              Learn more
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Description Section */}
      <Container maxWidth="md">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Our mission is to provide innovative solutions that streamline the complexities of modern life.
          We strive to enhance everyday experiences with our cutting-edge technology and dedicated service.
        </Typography>
      </Container>
    </Box>
  );
}

export default HomePage;
