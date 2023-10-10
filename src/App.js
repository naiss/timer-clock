import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let countdown;

    if (isRunning) {
      countdown = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            // Cambiar entre sesión y pausa
            if (timerLabel === "Session") {
              setTimerLabel("Break");
              return breakLength * 60;
            } else {
              setTimerLabel("Session");
              return sessionLength * 60;
            }
            
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(countdown);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [isRunning, timerLabel, sessionLength, breakLength]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  const handleIncrementSession = () => {
    if (!isRunning && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (timerLabel === "Session") {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  const handleDecrementSession = () => {
    if (!isRunning && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (timerLabel === "Session") {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };

  const handleIncrementBreak = () => {
    if (!isRunning && breakLength < 60) {
      setBreakLength(breakLength + 1);
      if (timerLabel === "Break") {
        setTimeLeft((breakLength + 1) * 60);
      }
    }
  };

  const handleDecrementBreak = () => {
    if (!isRunning && breakLength > 1) {
      setBreakLength(breakLength - 1);
      if (timerLabel === "Break") {
        setTimeLeft((breakLength - 1) * 60);
      }
    }
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="App">
          <h1>Timer Clock</h1>
          <div className="settings">
            <div id="session-label">Session</div>
            <div className="length-control">
              <button id="session-decrement" onClick={handleDecrementSession}>
                -
              </button>
              <div id="session-length">{sessionLength}</div>
              <button id="session-increment" onClick={handleIncrementSession}>
                +
              </button>
            </div>
            <div id="break-label">Break</div>
            <div className="length-control">
              <button id="break-decrement" onClick={handleDecrementBreak}>
                -
              </button>
              <div id="break-length">{breakLength}</div>
              <button id="break-increment" onClick={handleIncrementBreak}>
                +
              </button>
            </div>
          </div>
          <div className="timer">
            <div id="timer-label">{timerLabel}</div>
            <div id="time-left">{formatTime(timeLeft)}</div>
          </div>
          <div className="controls">
            <button
              id="start_stop"
              class="btn btn-primary btn-lg mx-5"
              onClick={handleStartStop}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
            <button
              id="reset"
              class="btn btn-primary btn-lg"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
