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
        bottom: "7vh",
        width: '100%',
        padding: 1,
        backgroundColor: 'rgba(255,255,255,0)',
        zIndex: 2,
        color: "white",
      }}
    >
      <Typography variant="h3" align="center" fontFamily={"Lucida Console"}>
        Level {pet.level}
      </Typography>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{
          bgcolor: "gray",
          height: "2.5vh",
          width: "70vw",
          border: "2px solid black",
          borderRadius: "20px",
          left: "15.5vw",
          '& .MuiLinearProgress-bar':{
            backgroundColor: "green",
          }
        }}
      />
      <Typography variant="h5" align="center" fontFamily={"Lucida Console"}>
        {pet.xp} / {xpNeededForNextLevel} XP
      </Typography>
    </Box>
  );
};

export default XPBar;