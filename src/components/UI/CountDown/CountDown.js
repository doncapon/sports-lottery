import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Auxy from "../../../hoc/Auxy/Auxy";
import classes from "./CountDown.module.css";
import moment from 'moment';
const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};
const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className={classes.time}>{time}</div>
      <div>{dimension}</div>
    </div>
  );
};
const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;
const CountDown = (props) => {
  let endDate1 = moment(props.gamedate);

  let diff = endDate1 - Date.now();
  
  const remainingTime = diff/1000;
  const days = Math.ceil(diff / daySeconds);
  const daysDuration = days * daySeconds;
 
  return (
    <Auxy>
      <h1 style={{ textAlign: "center" }}>Countdown to E Day</h1>
      <div className={classes.count}>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#7E2E84"]]}
          duration={daysDuration}
          initialRemainingTime={remainingTime}
        >
          {({ elapsedTime }) =>
            renderTime("days", getTimeDays(daysDuration - elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#D14081"]]}
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={(totalElapsedTime) => [
            diff - totalElapsedTime > hourSeconds,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("hours", getTimeHours(daySeconds - elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#EF798A"]]}
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => [
            diff - totalElapsedTime > minuteSeconds,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#218380"]]}
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={(totalElapsedTime) => [
            diff- totalElapsedTime > 0,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("seconds", getTimeSeconds(elapsedTime))
          }
        </CountdownCircleTimer>
      </div>
    </Auxy>
  );
};
export default CountDown;
