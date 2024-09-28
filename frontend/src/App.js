// frontend/src/App.js
import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import Game from './components/Game'; // Import the Game component

const App = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" align="center" gutterBottom>
        HabitPet
      </Typography>
      <Game /> {/* Include the Game component */}
    </Container>
  );
};

export default App;