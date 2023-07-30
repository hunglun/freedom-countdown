import React, { useState, useEffect } from "react";
import moment from "moment";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./App.css";

const targetDate = moment("2024-03-31");
// const targetDate = moment("2020-10-20");
const startDate = moment("2020-10-20");
const App = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function calculateTimeLeft() {
    const now = moment();
    const diff = targetDate.diff(now);
    const duration = moment.duration(diff);

    if (duration.seconds() < 0) {
      return {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0
      };
    }
    return {
      months: duration.months(),
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
      total: duration.asDays()
    };
  }

  function calculatePercentage() {
    const totalDuration = moment.duration(targetDate.diff(startDate)).asDays();
    const remainingDuration = timeLeft.total;

    if (remainingDuration === 0) return 100;
    return ((totalDuration - remainingDuration) / totalDuration) * 100;
  }

  return (
    <div className="app">
      <h1> Freedom Countdown </h1>
      <div className="countdown">
        <div className="time-unit">
          <span className="time">{timeLeft.months}</span>
          <span className="unit">Months</span>
        </div>
        <div className="time-unit">
          <span className="time">{timeLeft.days}</span>
          <span className="unit">Days</span>
        </div>

        <div className="time-unit">
          <span className="time">{timeLeft.hours}</span>
          <span className="unit">Hours</span>
        </div>

        <div className="time-unit">
          <span className="time">{timeLeft.minutes}</span>
          <span className="unit">Minutes</span>
        </div>

        <div className="time-unit">
          <span className="time">{timeLeft.seconds}</span>
          <span className="unit">Seconds</span>
        </div>
      </div>
      <div className="progress-bar-container">
        <CircularProgressbar
          value={calculatePercentage()}
          text={`${calculatePercentage().toFixed(1)}%`}
          styles={buildStyles({
            rotation: 0.25,
            strokeLinecap: "round",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${calculatePercentage() / 100})`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7"
          })}
        />
      </div>
    </div>
  );
};

export default App;
