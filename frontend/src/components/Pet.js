// frontend/src/components/Pet.js

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import characterImg from '../assets/character.png'; // Ensure this path is correct

const Pet = () => {
  const controls = useAnimation();
  const petRef = useRef(null);

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

  return (
    <motion.img
      src={characterImg}
      alt="Pet"
      ref={petRef}
      style={{
        position: 'absolute',
        bottom: '100px', // Position the pet above the bottom
        left: '50%', // Center horizontally
        width: '100px',
        height: '100px',
        transform: 'translateX(-50%)',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 1, // Ensure it stays above the background
      }}
      animate={controls}
    />
  );
};

export default Pet;
