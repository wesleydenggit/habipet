import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import eggImg from '../assets/egg.png';
import lilDuckImg from '../assets/lilduck.png';
import gooseImg from '../assets/goose.png';
import evoImg from '../assets/evo.png';

const Pet = () => {
  const controls = useAnimation();
  const petRef = useRef(null);
  
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch pet data from the backend
  const fetchPetData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pet');
      if (!response.ok) {
        throw new Error('Failed to fetch pet data');
      }
      const data = await response.json();
      setPet(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch pet data on component mount and set up polling every 10 seconds
  useEffect(() => {
    fetchPetData();
    const interval = setInterval(fetchPetData, 100); // Poll every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Example Animation: Continuous bobbing motion
  useEffect(() => {
    controls.start({
      y: [0, -10, 0], // Move up and down
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 2,
        ease: 'easeInOut',
      },
    });
  }, [controls]);

  // Determine the image based on the pet's level
  const getPetImage = (level) => {
    switch (level) {
      case 1:
        return eggImg;
      case 2:
        return lilDuckImg;
      case 3:
        return gooseImg;
      case 4:
        return evoImg;
      default:
        return eggImg; // Default to egg if level is undefined
    }
  };
  // Function to get horizontal shift based on pet level
  const getPetShift = (level) => {
    switch (level) {
      case 1:
        return 0;      // No shift for level 1
      case 2:
        return -10;    // Shift 10px to the left for level 2
      case 3:
        return -50;     // Shift 20px to the right for level 3
      case 4:
        return -45;    // Shift 15px to the left for level 4
      default:
        return 0;      // Default to no shift
    }
  };

  // Determine the size based on the pet's level
  const getPetSize = (level) => {
    if (level >= 4) return { width: '250px', height: '250px' };
    switch (level) {
      case 1:
        return { width: '80px', height: '80px' };
      case 2:
        return { width: '120px', height: '120px' };
      case 3:
        return { width: '180px', height: '180px' };
      default:
        return { width: '80px', height: '80px' };
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pet) {
    return <div>Loading...</div>;
  }

  const petImage = getPetImage(pet.level);
  const petSize = getPetSize(pet.level);
  const petShift = getPetShift(pet.level);

  return (
    <motion.img
      src={petImage}
      ref={petRef}
      style={{
        position: 'absolute',
        bottom: '100px', // Position the pet above the bottom
        left: '48%', // Center horizontally
        transform: 'translateX(-50%)',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 1, // Ensure it stays above the background
      }}
      animate={{
        y: [0, -10, 0],
        width: petSize.width,
        height: petSize.height,
        x: petShift,
      }}
      transition={{
        y: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2,
          ease: 'easeInOut',
        },
        width: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
        height: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
      }}
    />
  );
};

export default Pet;