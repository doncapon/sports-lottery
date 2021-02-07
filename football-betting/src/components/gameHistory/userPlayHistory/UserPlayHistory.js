import classes from "./UserPlayHistory.module.css";
import React, { Component } from "react";
import moment from 'moment';
import Jackpot from "../jackpot/jackpot";
import * as actions from '../../../store/actions';
import {connect } from 'react-redux';

class UserPlayHistory extends Component {
    findSelection = (goalHome, goalAway, status) => {
        if (status === "Match Finished") {
            if (goalHome > goalAway) {
                return "H";
            } else if (goalHome < goalAway) {
                return "A";
            } else {
                return "D";
            }
        } else {
            return "-";
        }

    }
    render() {
        console.log(this.props.daysuserPlayHistory);
        let userPlayHistoryTrannsformed = this.props.daysuserPlayHistory.map((userPlayHistory, k) => {
            return <div className={classes.userPlayHistoryAndShare} key={k}>
                <div className={classes.ResultHead} >
                    <div className={classes.HeaderInner}>
                        <div>{moment(userPlayHistory[0].gameDay).format("dddd")}</div>{" "}
                        <div>{moment(userPlayHistory[0].gameDay).format("DD.MM.YYYY")}</div>
                        <div>{" "}-{" "}</div>
                    </div>
                    <div>Match userPlayHistory </div>
                </div>
                <div className={classes.userPlayHistory}>

                    <div className={classes.ResultBody} >
                        <div className={classes.BodyHeader}>
                            <div className={classes.Match}>Match</div>
                            <div className={classes.MoveMiddle}>Result</div>
                            <div className={classes.MoveRight}>Correct</div>
                        </div >
                        <div className={classes.BodyMain}>
                            {userPlayHistory.map((eachRes, i) => {
                                return <div key={i} className={classes.SelectionRow}>
                                    <div className={classes.Teams}>
                                        <div className={classes.RowNumber}>{i + 1} </div>
                                        <div className={classes.TeamNames}>
                                            <div>{eachRes.homeTeam + "  -  "}</div>
                                            <div>{eachRes.awayTeam}</div>
                                        </div>
                                    </div>
                                    <div className={classes.Score}>{eachRes.status === "Match Finished" ? eachRes.score : "in progress"}</div>
                                    <div >{this.findSelection(eachRes.homeGoals, eachRes.awayGoals, eachRes.status)}</div>
                                </div>
                            })}

                        </div>

                    </div>
                    <div className={classes.JackPotShare}>
                        <Jackpot basePrice={this.props.basePrice} gamesLength={this.props.gamesLength} thirteen={this.props.thirteen}
                            twelve={this.props.twelve} eleven={this.props.eleven} ten={this.props.ten}
                            thirteenPcs={this.props.thirteenPcs} twelvePcs={this.props.twelvePcs}
                            elevenPcs={this.props.elevenPcs} tenPcs={this.props.tenPcs}
                        />
                    </div>
                </div>

            </div>
        })

        return (<div className={classes.userPlayHistoryWrapper}>{userPlayHistoryTrannsformed}</div>);
    }
}


const mapstateToprops = (state) => {
    return {
        //board
        gamesLength: state.board.gamesLength,


        //match results
        thirteen: state.matchResults.thirteen,
        twelve: state.matchResults.twelve,
        eleven: state.matchResults.eleven,
        ten: state.matchResults.ten,

        //Config
        basePrice: state.config.basePrice,
        loading: state.config.loading,
        daysuserPlayHistory: state.board.receipts,
        resultsFrom: state.config.resultsFrom,

        jackpot: state.config.jackpot,
        thirteenPieces: state.config.thirteenPieces,
        twelvePieces: state.config.twelvePieces,
        elevenPieces: state.config.elevenPieces,
        tenPieces: state.config.tenPieces,

        thirteenPercent: state.config.thirteenPercent,
        twelvePercent: state.config.twelvePercent,
        elevenPercent: state.config.elevenPercent,
        tenPercent: state.config.tenPercent,
        insertResult: state.config.insertResult,

        //Login
        isLoggedIn: state.login.isLoggedIn

    }
};

const mapDispatchToprops = (dispatch) => {
    return {
        onFetchResults: (startDate)=> dispatch(actions.fetchResults(startDate)),
        onSetUpWinners: (jackpot, thirteenpct, twelvepct, elevenpct, tenpct,
            thirteenPieces, twelvePieces, elevenPieces, tenPieces) =>
            dispatch(actions.setUpWinners(jackpot, thirteenpct, twelvepct, elevenpct, tenpct,
                thirteenPieces, twelvePieces, elevenPieces, tenPieces)),
    }
}
export default connect(mapstateToprops, mapDispatchToprops)(UserPlayHistory);