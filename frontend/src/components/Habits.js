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
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

// Styled Components for Pixel Art Theme
const Container = styled(Box)(({ theme }) => ({
  padding: '24px',
  backgroundColor: '#c6aaa4', // Light blue background
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  fontFamily: "'Press Start 2P', cursive",
  maxWidth: '600px',
  margin: 'auto',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  textAlign: 'center',
  marginBottom: '24px',
  color: '#7d4f3d',
  fontFamily: "'Press Start 2P', cursive",
}));

const AddHabitForm = styled('form')({
  display: 'flex',
  marginBottom: '16px',
});

const AddButton = styled(Button)({
  marginLeft: '8px',
  fontFamily: "'Press Start 2P', cursive",
  bgcolor: '#7d4f3d' 
});

const HabitList = styled(List)({
  width: '100%',
});

const HabitItem = styled(ListItem)({
  border: '2px solid #333',
  borderRadius: '4px',
  marginBottom: '8px',
  backgroundColor: '#fff',
});

const HabitText = styled(ListItemText)({
  fontSize: '14px',
  color: '#333',
});

const StyledCheckbox = styled(Checkbox)({
  color: '#7d4f3d',
  '&.Mui-checked': {
    color: '#7d4f3d',
  },
});

const StyledDeleteIcon = styled(DeleteIcon)({
  color: '#7d4f3d',
  cursor: 'pointer',
});

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
    <Container>
      {/* Title */}
      <Title variant="h4">Habit Tracker</Title>

      {/* Form to add a new habit */}
      <AddHabitForm onSubmit={handleAddHabit}>
        <TextField
          label="Add a new habit"
          variant="outlined"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          fullWidth
          InputProps={{
            style: { fontFamily: "'Press Start 2P', cursive", fontSize: '12px' },
          }}
          InputLabelProps={{
            style: { fontFamily: "'Press Start 2P', cursive", fontSize: '12px' },
          }}
        />
        <AddButton type="submit" variant="contained" color="primary">
          Add
        </AddButton>
      </AddHabitForm>

      {/* List of habits */}
      <HabitList>
        {habits.map((habit) => (
          <HabitItem key={habit.id} divider>
            {/* Delete Icon Button */}
            <IconButton
              edge="start"
              onClick={() => handleDeleteHabit(habit.id)}
            >
              <StyledDeleteIcon />
            </IconButton>

            {/* Habit Name and Streak */}
            <HabitText
              primary={habit.name}
              secondary={`Streak: ${habit.streak}`}
              primaryTypographyProps={{
                style: { fontFamily: "'Press Start 2P', cursive", fontSize: '12px' },
              }}
              secondaryTypographyProps={{
                style: { fontFamily: "'Press Start 2P', cursive", fontSize: '10px' },
              }}
            />

            <ListItemSecondaryAction>
              <StyledCheckbox
                edge="end"
                checked={habit.completed}
                onChange={() => handleToggleHabit(habit)}
                disabled={habit.completed} // Disable unchecking
              />
            </ListItemSecondaryAction>
          </HabitItem>
        ))}
      </HabitList>
    </Container>
  );
};

export default Habits;
