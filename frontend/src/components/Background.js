// frontend/src/components/Background.js

import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import environmentImg from '../assets/background.png'; // Ensure this path is correct

const Background = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh', // Full viewport height
        overflow: 'hidden',
        backgroundColor: '#a0d2eb', // Fallback color
      }}
    >
      {/* Environment Background */}
      <motion.img
        src={environmentImg}
        alt="Environment"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%', // Adjust based on your design
          height: '100%', // Adjust based on your design
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </Box>
  );
};

export default Background;
