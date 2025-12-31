import React, { useState, useEffect } from 'react';

function FocusTime() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Load saved time
  useEffect(() => {
    const saved = localStorage.getItem('focusTime');
    if (saved) setSeconds(parseInt(saved));
  }, []);

  // Save time
  useEffect(() => {
    localStorage.setItem('focusTime', seconds);
  }, [seconds]);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section>
      <h2>Focus Timer</h2>
      <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '20px 0', color: '#3498db' }}>
        {formatTime()}
      </div>
      <div>
        <button onClick={start} disabled={isRunning}>Start</button>
        <button onClick={stop} disabled={!isRunning}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
      <p style={{ marginTop: '15px', color: '#7f8c8d' }}>
        Total focus time saved across sessions.
      </p>
    </section>
  );
}

export default FocusTime;