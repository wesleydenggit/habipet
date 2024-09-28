// frontend/src/components/Background.js

import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';
import environmentImg from '../assets/background.png'; // Ensure this path is correct

const Background = () => {
  // Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  // Menu Handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
      {/* Menu Button */}
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 2, // Ensure it stays above other elements
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
        }}
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>About</MenuItem>
        <MenuItem onClick={handleMenuClose}>Help</MenuItem>
      </Menu>

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
