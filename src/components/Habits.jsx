import React, { useState, useEffect } from 'react';

function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  // Load habits from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('habits');
    if (saved) {
      const parsed = JSON.parse(saved);
      setHabits(parsed.map(h => ({
        ...h,
        lastCompleted: h.lastCompleted ? new Date(h.lastCompleted) : null
      })));
    }
  }, []);

  // Save habits
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, {
        name: newHabit.trim(),
        streak: 0,
        lastCompleted: null
      }]);
      setNewHabit('');
    }
  };

  const completeToday = (index) => {
    const today = new Date();
    const todayStr = today.toDateString();

    setHabits(habits.map((habit, i) => {
      if (i !== index) return habit;

      if (habit.lastCompleted && habit.lastCompleted.toDateString() === todayStr) {
        return habit; // Already completed today
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const wasYesterday = habit.lastCompleted && habit.lastCompleted.toDateString() === yesterday.toDateString();

      return {
        ...habit,
        streak: wasYesterday ? habit.streak + 1 : 1,
        lastCompleted: today
      };
    }));
  };

  return (
    <section>
      <h2>Habit Tracker</h2>
      <div>
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="e.g., Exercise, Read 10 pages"
          onKeyPress={(e) => e.key === 'Enter' && addHabit()}
        />
        <button onClick={addHabit}>Add Habit</button>
      </div>
      <ul>
        {habits.map((habit, index) => (
          <li key={index}>
            <div>
              <strong>{habit.name}</strong> — Current Streak: <strong>{habit.streak} day{habit.streak !== 1 ? 's' : ''}</strong>
            </div>
            <button onClick={() => completeToday(index)}>Complete Today</button>
          </li>
        ))}
      </ul>
      {habits.length === 0 && <p style={{ color: '#95a5a6' }}>No habits yet. Build a new one!</p>}
    </section>
  );
}

export default Habits;