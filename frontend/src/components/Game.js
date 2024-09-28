import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import characterImg from '../assets/character.png';
import environmentImg from '../assets/background.png';

const Game = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const environmentRef = useRef(null);
  const gameContainerRef = useRef(null);
  const [direction, setDirection] = useState('right'); // Default direction is right

  const controls = useAnimation();
  const prevDirectionRef = useRef(direction);

  const speed = 2; // Movement speed in pixels per frame

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
      let newDirection = direction; // Keep track of the new direction

      if (keysPressed.current['ArrowUp'] || keysPressed.current['w']) {
        dy += speed;
      }
      if (keysPressed.current['ArrowDown'] || keysPressed.current['s']) {
        dy -= speed;
      }
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['a']) {
        dx += speed;
        newDirection = 'left'; // Set direction to left
      }
      if (keysPressed.current['ArrowRight'] || keysPressed.current['d']) {
        dx -= speed;
        newDirection = 'right'; // Set direction to right
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

      // Update direction if it has changed
      if (newDirection !== direction) {
        setDirection(newDirection);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [direction]);

  // Update Environment Position
  useEffect(() => {
    if (environmentRef.current) {
      environmentRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position]);

  // Update character animation when direction or isMoving changes
  useEffect(() => {
    const shouldAnimateScaleX = prevDirectionRef.current !== direction;

    controls.start({
      rotate: isMoving ? [0, 10, -10, 0] : 0,
      scale: isMoving ? 1.2 : 1,
      scaleX: direction === 'left' ? -1 : 1,
      transition: {
        rotate: {
          repeat: isMoving ? Infinity : 0,
          duration: 1,
          ease: 'easeInOut',
        },
        scale: {
          repeat: isMoving ? Infinity : 0,
          duration: 1,
          ease: 'easeInOut',
        },
        scaleX: {
          duration: shouldAnimateScaleX ? 0.1 : 0, // Animate only on direction change
        },
      },
    });

    prevDirectionRef.current = direction;
  }, [direction, isMoving, controls]);

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
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#a0d2eb',
        outline: 'none',
      }}
    >
      {/* Environment */}
      <motion.img
        src={environmentImg}
        alt="Environment"
        ref={environmentRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',   // Adjusted to cover more area
          height: '200%',  // Adjusted to cover more area
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      {/* Character */}
      <motion.img
        src={characterImg}
        alt="Character"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100px',
          height: '100px',
          zIndex: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
        animate={controls}
      />
    </Box>
  );
};

export default Game;
