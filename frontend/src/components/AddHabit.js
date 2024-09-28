// frontend/src/components/AddHabit.js

import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, TextField, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addHabit } from '../redux/actions';

const AddHabit = () => {
  // Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  // Habit Input States
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  // Menu Handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // Reset input fields upon closing
    setHabitName('');
    setFrequency('Daily');
    setDescription('');
  };

  // Handle Habit Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim() === '') {
      alert('Habit name is required.');
      return;
    }

    const newHabit = {
      name: habitName,
      frequency: frequency,
      description: description,
    };

    // Dispatch the addHabit action to connect with the backend
    dispatch(addHabit(newHabit));

    // Close the menu after submission
    handleMenuClose();
  };

  return (
    <Box>
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
        aria-label="add habit"
      >
        <MenuIcon />
      </IconButton>

      {/* Dropdown Menu with Habit Input Fields */}
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
        <Box sx={{ padding: 2, width: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Add New Habit
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Habit Name"
              variant="outlined"
              fullWidth
              required
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Frequency"
              variant="outlined"
              fullWidth
              select
              SelectProps={{
                native: true,
              }}
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              sx={{ marginBottom: 2 }}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Custom">Custom</option>
            </TextField>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Habit
            </Button>
          </form>
        </Box>
      </Menu>
    </Box>
  );
};

export default AddHabit;
