// frontend/src/components/Game.js
import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const Game = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const environmentRef = useRef(null);
  const gameContainerRef = useRef(null);

  const speed = 5; // Movement speed in pixels per frame

  // Handle Key Presses
  const keysPressed = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
  });

  const handleKeyDown = (e) => {
    const key = e.key;
    if (keysPressed.current.hasOwnProperty(key)) {
      e.preventDefault(); // Prevent default scrolling
      keysPressed.current[key] = true;
    }
  };

  const handleKeyUp = (e) => {
    const key = e.key;
    if (keysPressed.current.hasOwnProperty(key)) {
      e.preventDefault(); // Prevent default scrolling
      keysPressed.current[key] = false;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Focus the game container
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game Loop
  useEffect(() => {
    const animate = () => {
      let dx = 0;
      let dy = 0;

      if (keysPressed.current['ArrowUp'] || keysPressed.current['w']) {
        dy += speed;
      }
      if (keysPressed.current['ArrowDown'] || keysPressed.current['s']) {
        dy -= speed;
      }
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['a']) {
        dx += speed;
      }
      if (keysPressed.current['ArrowRight'] || keysPressed.current['d']) {
        dx -= speed;
      }

      if (dx !== 0 || dy !== 0) {
        setPosition((prev) => {
          let newX = prev.x + dx;
          let newY = prev.y + dy;

          // Define movement boundaries
          const maxX = 800; // Adjust based on environment size
          const maxY = 600; // Adjust based on environment size

          // Constrain movement
          newX = Math.min(Math.max(newX, -maxX), 0);
          newY = Math.min(Math.max(newY, -maxY), 0);

          return { x: newX, y: newY };
        });
        setIsMoving(true);
      } else {
        setIsMoving(false);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // Update Environment Position
  useEffect(() => {
    if (environmentRef.current) {
      environmentRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position]);

  return (
    <Box
      ref={gameContainerRef}
      tabIndex={0}
      onBlur={() => {
        if (gameContainerRef.current) {
          gameContainerRef.current.focus();
        }
      }}
      sx={{
        position: 'relative',
        width: { xs: '100%', sm: '800px' },
        height: { xs: '400px', sm: '600px' },
        overflow: 'hidden',
        border: '2px solid #000',
        margin: '2rem auto',
        backgroundColor: '#a0d2eb',
        outline: 'none',
      }}
    >
      {/* Environment */}
      <motion.img
        src="../assets/background.jpg"
        alt="Environment"
        ref={environmentRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1600px', // Adjust based on environment image
          height: '1200px', // Adjust based on environment image
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      {/* Character */}
      <motion.img
        src="../assets/character.png"
        alt="Character"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '50px',
          height: '50px',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        animate={{
          rotate: isMoving ? [0, 10, -10, 0] : 0,
          scale: isMoving ? 1.2 : 1,
        }}
        transition={{
          repeat: isMoving ? Infinity : 0,
          duration: 1,
          ease: 'easeInOut',
        }}
      />
    </Box>
  );
};

export default Game;