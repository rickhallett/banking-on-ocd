import React, { useState } from "react";
import "./App.css";

function App() {
  const [struggle, setStruggle] = useState(5);
  const [duration, setDuration] = useState(5);
  const [frequency, setFrequency] = useState(5);
  const [daysApplied, setDaysApplied] = useState(180); // Default to 6 months
  const [learningMultiplier, setLearningMultiplier] = useState(3); // Default to 3%

  const calculateResponse = () => {
    return struggle * duration * frequency;
  };

  const calculateCumulativeEffect = () => {
    const response = calculateResponse();
    const dailyMultiplier = 1 + learningMultiplier / 100;
    return response * ((Math.pow(dailyMultiplier, daysApplied) - 1) / (dailyMultiplier - 1));
  };

  const addNumberSeparator = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const convertDaysAppliedToDaysMonthsAndYears = (days: number) => {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;
    return `${years} years, ${months} months, and ${remainingDays} days`;
  };

  const response = calculateResponse();
  const cumulativeEffect = calculateCumulativeEffect();

  return (
    <div className="App">
      <h1>OCD Recovery Response Simulator</h1>
      <div className="slider-container">
        <Slider
          label="Struggle"
          value={struggle}
          setValue={setStruggle}
          min={1}
          max={10}
        />
        <Slider
          label="Duration"
          value={duration}
          setValue={setDuration}
          min={1}
          max={10}
        />
        <Slider
          label="Frequency"
          value={frequency}
          setValue={setFrequency}
          min={1}
          max={10}
        />
        <Slider
          label="Days Applied"
          value={daysApplied}
          setValue={setDaysApplied}
          min={1}
          max={365}
        />
        <Slider
          label="Learning Multiplier (%)"
          value={learningMultiplier}
          setValue={setLearningMultiplier}
          min={1}
          max={10}
        />
      </div>
      <div className="results">
        <h2>Results</h2>
        <p>Daily Response: {addNumberSeparator(response)}</p>
        <p>Cumulative Effect (over {convertDaysAppliedToDaysMonthsAndYears(daysApplied)}): {addNumberSeparator(Math.round(cumulativeEffect))}</p>
      </div>
    </div>
  );
}

function Slider({ label, value, setValue, min, max }: { label: string, value: number, setValue: (value: number) => void, min: number, max: number }) {
  return (
    <div className="slider">
      <label>{label}: {value}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
      />
    </div>
  );
}

export default App;