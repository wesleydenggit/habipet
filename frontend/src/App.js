// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import Background from './components/Background';
import Pet from './components/Pet';
import Habits from './components/Habits';
import XPBar from './components/XPBar';

const App = () => {
  const [pet, setPet] = useState(null);

  const fetchPetData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pet');
      console.log('Pet data:', response.data);
      setPet(response.data);
    } catch (error) {
      console.error('Error fetching pet data:', error);
    }
  };

  useEffect(() => {
    fetchPetData();
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Background />
      {/* Position Habits at the top of the screen */}
      <Box sx={{ position: 'absolute', top: 0, right: 0, width: '25%', zIndex: 1 }}>
        <Habits onHabitUpdate={fetchPetData} />
      </Box>
      <Pet />
      <XPBar pet={pet} />
    </Box>
  );
};

export default App;