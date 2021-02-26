import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Settings.module.css';
import { getNextPlayDate } from '../../shared/utility';
class Settings extends Component {
    handlecCnfigureBoard = () => {
        let kickOffDate
        kickOffDate = getNextPlayDate(this.props.daysOffset,
            this.props.hourToNextDay);
        this.props.onConfigureBoard(this.props.isFACup,
            this.props.kickOffTime, kickOffDate);
    }
    handleSetResultss = () => {
        console.log("not cal")
        this.props.onSetCurrentResult(this.props.slips[0]["slip_1"], null);
        alert("results hae been set or updated")
    }
    render() {
        if (this.props.user.role !== "admin" || !this.props.isLoggedIn) {
            this.props.history.push("/");
        }
        return (<div className={classes.SettingsWrapper}>
            <Button onClick={this.handlecCnfigureBoard} >Configure Play Board</Button>
            <Button onClick={this.handleSetResultss} >Set Last Results</Button>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        hourToNextDay: state.config.hourToNextDay,
        isFACup: state.config.isFACup,
        isFACupNextWeek: state.config.isFACupNextWeek,
        daysOffset: state.config.daysOffset,
        daysOffsetNextWeek: state.config.daysOffsetNextWeek,
        kickOffTime: state.config.kickOffTime,

        slips: state.board.slips,

        user: state.login.user,
        isLoggedIn: state.login.isLoggedIn

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        onConfigureBoard: (isFaCup, kickOffTime, kickOffDate) =>
            dispatch(actions.configureBoard(isFaCup, kickOffTime, kickOffDate)),
        onSetCurrentResult: (slip, startDate) =>
            dispatch(actions.setCurrentResult(slip, startDate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);