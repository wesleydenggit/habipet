// frontend/src/components/XPBar.js

import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const XPBar = ({ pet }) => {
  if (!pet) {
    return null;
  }

  const xpNeededForNextLevel = pet.level * 100; // 100 XP per level
  const progress = (pet.xp / xpNeededForNextLevel) * 100;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '7vh',
        width: '100%',
        padding: 1,
        backgroundColor: 'rgba(255,255,255,0)',
        zIndex: 2,
        color: 'white',
      }}
    >
      {/* Level Display with Press Start 2P Font */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontFamily: "'Press Start 2P', cursive", // Updated Font
        }}
      >
        Level {pet.level}
      </Typography>

      {/* XP Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          bgcolor: 'gray',
          height: '2.5vh',
          width: '70vw',
          border: '2px solid black',
          borderRadius: '20px',
          left: '15.5vw',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'green',
          },
        }}
      />

      {/* XP Label with Press Start 2P Font */}
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontFamily: "'Press Start 2P', cursive", // Updated Font
        }}
      >
        {pet.xp} / {xpNeededForNextLevel} XP
      </Typography>
    </Box>
  );
};

export default XPBar;
