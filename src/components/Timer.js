import React from 'react';

function Timer({ sessionLength, breakLength, timerLabel, timeLeft, formatTime }) {
  return (
    <div className="timer">
      <div id="timer-label">{timerLabel}</div>
      <div id="session-length">Session: {sessionLength}</div>
      <div id="break-length">Break: {breakLength}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <audio id="beep" src="beep.mp3"></audio>
    </div>
  );
}

export default Timer;
