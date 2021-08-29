import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Auxy from "../../../hoc/Auxy/Auxy";
import classes from "./CountDown.module.css";
import { Container, Row, Col } from 'react-bootstrap'

import moment from 'moment';
const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 100,
  strokeWidth: 3,
};
const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className={classes.time}>{time}</div>
      <div className={classes.dimensions}>{dimension}</div>
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

  const remainingTime = diff / 1000;
  const days = Math.ceil(diff / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <Auxy>
      <Container style={{ margin: '0 auto' }}>
        <h2 style={{ textAlign: "center", fontWeight: '700' }} className='mt-4'>Time Left To Play</h2>
        <Row style={{ display: 'flex', justifyContent: 'center', width: '90%', margin: '50px auto' }}>
          <Col lg={3} md={3} sm={12} style={{ display: 'flex', justifyContent: 'center' }} className='mb-2'>
            <CountdownCircleTimer
              style={{ position: 'relative' }}
              {...timerProps}
              className={classes.circle}
              colors={[["#fff"]]}
              duration={daysDuration}
              trailColor="#fff"
              initialRemainingTime={remainingTime}
            >
              {({ elapsedTime }) =>
                renderTime("days", getTimeDays(daysDuration - elapsedTime))
              }
            </CountdownCircleTimer>
          </Col>
          <Col lg={3} md={3} sm={12} style={{ display: 'flex', justifyContent: 'center' }} className='mb-2'>
            <CountdownCircleTimer

              {...timerProps}
              colors={[["#fff"]]}
              duration={daySeconds}
              trailColor="#000"
              initialRemainingTime={remainingTime % daySeconds}
              onComplete={(totalElapsedTime) => [
                diff - totalElapsedTime > hourSeconds,
              ]}
            >
              {({ elapsedTime }) =>
                renderTime("hours", getTimeHours(daySeconds - elapsedTime) < 0 ? 0 : getTimeHours(daySeconds - elapsedTime))
              }
            </CountdownCircleTimer>
          </Col>
          <Col lg={3} md={3} sm={12} style={{ display: 'flex', justifyContent: 'center' }} className='mb-2'>
            <CountdownCircleTimer
              {...timerProps}
              colors={[["#fff"]]}
              duration={hourSeconds}
              trailColor="#000"
              initialRemainingTime={remainingTime % hourSeconds}
              onComplete={(totalElapsedTime) => [
                diff - totalElapsedTime > minuteSeconds,
              ]}
            >
              {({ elapsedTime }) =>
                renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
              }
            </CountdownCircleTimer>
          </Col>
          <Col lg={3} md={3} sm={12} style={{ display: 'flex', justifyContent: 'center' }} className='mb-2'>
            <CountdownCircleTimer
              {...timerProps}
              colors={[["#fff"]]}
              duration={minuteSeconds}
              trailColor="#000"
              initialRemainingTime={remainingTime % minuteSeconds}
              onComplete={(totalElapsedTime) => [
                diff - totalElapsedTime > 0,
              ]}
            >
              {({ elapsedTime }) =>
                renderTime("seconds", getTimeSeconds(elapsedTime))
              }
            </CountdownCircleTimer>
          </Col>
        </Row>
      </Container >
    </Auxy >
  );
};
export default CountDown;
