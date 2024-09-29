// frontend/src/components/HealthBar.js

import React from 'react';
import { Box, Typography } from '@mui/material';

const HealthBar = ({ pet }) => {
  if (!pet) {
    return null;
  }

  const { health } = pet;
  const progress = health; // Assuming max health is 100

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '40px',
        height: '200px',
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        boxShadow: 3,
        zIndex: 2,
      }}
    >
      <Typography variant="body2" align="center" gutterBottom>
        Health
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: `${progress}%`,
            backgroundColor: '#f44336', // Red color for health
            transition: 'height 0.5s ease-in-out',
          }}
        />
      </Box>
      <Typography variant="body2" align="center" sx={{ marginTop: '5px' }}>
        {health} / 100
      </Typography>
    </Box>
  );
};

export default HealthBar;