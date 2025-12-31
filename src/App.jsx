import React from 'react';
import Tasks from './components/Tasks';
import Habits from './components/Habits';
import FocusTime from './components/FocusTime';
import './App.css';

function App() {
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Daily Productivity Tracker</h1>
        <p>Track tasks, build habits, and stay focused!</p>
      </header>

      <Tasks />
      <Habits />
      <FocusTime />

      <footer>
        <button className="clear-btn" onClick={clearAllData}>
          Clear All Data
        </button>
      </footer>
    </div>
  );
}

export default App;