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
    completed: false
  };
  data.habits.push(newHabit);
  writeData(data);
  res.json(newHabit);
});

// Update a habit
router.put('/habits/:id', (req, res) => {
  const data = readData();
  const habit = data.habits.find(h => h.id === parseInt(req.params.id));
  if (habit) {
    habit.completed = req.body.completed;
    if (habit.completed) {
      data.pet.level += 1;
      data.pet.happiness = Math.min(data.pet.happiness + 10, 100);
    } else {
      data.pet.health = Math.max(data.pet.health - 10, 0);
    }
    writeData(data);
    res.json(habit);
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

module.exports = router;
