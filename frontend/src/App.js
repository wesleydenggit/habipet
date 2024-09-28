// frontend/src/App.js

import React from 'react';
import { Box } from '@mui/material';
import Background from './components/Background';
import Pet from './components/Pet';

const App = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Background />
      <Pet />
    </Box>
  );
};

export default App;
