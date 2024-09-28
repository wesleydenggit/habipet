const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/data.json');

const readData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get the full data
router.get('/data', (req, res) => {
  const data = readData();
  res.json(data);
});

router.get('/pet', (req, res) => {
  const data = readData();
  res.json(data.pet);
});

// Get all habits
router.get('/fetch-habits', (req, res) => {
  const data = readData();
  res.json(data.habits); // Send the list of habits as a response
});

// Add a new habit
router.post('/habits', (req, res) => {
  const data = readData();
  const newHabit = {
    id: Date.now(),
    name: req.body.name,
    frequency: req.body.frequency,
    completed: false,
    streak: 0,
    lastCompleted: null
  };
  data.habits.push(newHabit);
  writeData(data);
  res.json(newHabit);
});

// Leveling thresholds: 100 XP per level
const getXpNeededForNextLevel = (level) => level * 100;

// Update a habit
router.put('/habits/:id', (req, res) => {
  const data = readData();
  const habit = data.habits.find((h) => h.id === parseInt(req.params.id));
  if (habit) {
    if (habit.completed && !req.body.completed) {
      // Prevent uncompleting a completed habit
      return res.status(400).json({ message: 'Cannot uncomplete a completed habit' });
    }

    if (!habit.completed && req.body.completed) {
      // Mark habit as completed
      habit.completed = true;
      const today = new Date().toISOString().split('T')[0];
      habit.lastCompleted = today;

      // Update streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (habit.lastCompleted === yesterdayStr) {
        // Continued streak
        habit.streak += 1;
      } else {
        // New streak
        habit.streak = 1;
      }

      // Calculate XP gain based on streak
      const baseXp = 100;
      const xpGain = baseXp * habit.streak; // Higher streaks give more XP
      data.pet.xp += xpGain;

      // Check for level up
      const xpNeeded = getXpNeededForNextLevel(data.pet.level);
      while (data.pet.xp >= xpNeeded) {
        data.pet.xp -= xpNeeded;
        data.pet.level += 1;
      }

      writeData(data);
      res.json({ ...habit, xpGained: xpGain });
    } else {
      res.status(400).json({ message: 'Invalid habit update' });
    }
  } else {
    res.status(404).json({ message: 'Habit not found' });
  }
});

// Delete a habit
router.delete('/habits/:id', (req, res) => {
  const data = readData();
  const habitIndex = data.habits.findIndex(h => h.id === parseInt(req.params.id));
  if (habitIndex !== -1) {
    data.habits.splice(habitIndex, 1);
    writeData(data);
    res.json({ message: 'Habit deleted' });
  } else {
    res.status(404).json({ message: 'Habit not found' });
  }
});

const resetHabitsIfNeeded = () => {
  const data = readData();
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  if (data.lastHabitReset !== today) {
    // It's a new day; reset habits
    data.habits.forEach((habit) => {
      // Check if the habit was completed yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (habit.lastCompleted === yesterdayStr) {
        // Streak continues
      } else if (habit.lastCompleted !== today) {
        // Streak is broken
        habit.streak = 0;
      }
      // Reset the completed status
      habit.completed = false;
    });
    data.lastHabitReset = today;
    writeData(data);
  }
};
// Apply reset logic before processing any request
router.use((req, res, next) => {
  resetHabitsIfNeeded();
  next();
});

module.exports = router;
