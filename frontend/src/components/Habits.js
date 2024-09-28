// frontend/src/components/Habits.js

import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';

const Habits = ({ onHabitUpdate }) => {
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');

  // Fetch habits from the backend
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/fetch-habits');
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  // Handle adding a new habit
  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (newHabitName.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:5000/api/habits', {
        name: newHabitName,
        frequency: 'Daily', // Default frequency
        completed: false,
      });
      setHabits([...habits, response.data]);
      setNewHabitName('');
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  // Handle toggling the completed status of a habit
  const handleToggleHabit = async (habit) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/habits/${habit.id}`, {
        completed: !habit.completed,
      });
      // Update the habits list
      setHabits(
        habits.map((h) =>
          h.id === habit.id
            ? response.data // Use the full updated habit from the backend
            : h
        )
      );
      if (onHabitUpdate) {
        onHabitUpdate(); // Ensure this function is called
      }
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

 // Handle deleting a habit
 const handleDeleteHabit = async (habitId) => {
    try {
      await axios.delete(`http://localhost:5000/api/habits/${habitId}`);
      // Remove the habit from the state
      setHabits(habits.filter((habit) => habit.id !== habitId));
    } catch (error) {
      console.error('Error deleting habit:', error);
      alert('Failed to delete habit');
    }
  };
  
  return (
    <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 1, boxShadow: 1}}>
      {/* Form to add a new habit */}
      <form onSubmit={handleAddHabit} style={{ display: 'flex', marginBottom: '16px' }}>
        <TextField
          label="Add a new habit"
          variant="outlined"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: '8px' }}>
          Add
        </Button>
      </form>

      {/* List of habits */}
      <List>
        {habits.map((habit) => (
          <ListItem key={habit.id} divider>
            {/* Delete Icon Button */}
            <IconButton
              edge="start"
              color="secondary"
              onClick={() => handleDeleteHabit(habit.id)}
            >
              <DeleteIcon />
            </IconButton>

            {/* Habit Name and Streak */}
            <ListItemText primary={habit.name} secondary={`Streak: ${habit.streak}`} />

            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                checked={habit.completed}
                onChange={() => handleToggleHabit(habit)}
                disabled={habit.completed} // Disable unchecking
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Habits;