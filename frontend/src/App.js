// frontend/src/App.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import Game from './components/Game'; // Import the Game component

const App = () => {
  return (
    <Box
      sx={{
        width: '100vw',   // Full viewport width
        height: '100vh',  // Full viewport height
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          position: 'absolute',
          top: '10px',
          width: '100%',
          zIndex: 2,
          color: '#fff',
        }}
      >
        HabitPet
      </Typography>
      <Game /> {/* Include the Game component */}
    </Box>
  );
};

export default App;