import React from 'react';

function ControlButtons({ startStop, reset, isRunning }) {
  return (
    <div className="control-buttons">
      <button id="start_stop" onClick={startStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button id="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default ControlButtons;
