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
        bottom: 0,
        width: '100%',
        padding: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        zIndex: 2,
      }}
    >
      <Typography variant="body1" align="center">
        Level {pet.level}
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2" align="center">
        {pet.xp} / {xpNeededForNextLevel} XP
      </Typography>
    </Box>
  );
};

export default XPBar;