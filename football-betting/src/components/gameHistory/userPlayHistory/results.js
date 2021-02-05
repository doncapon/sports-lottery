import classes from "./userPlayHistory.module.css";
import React from "react";
import moment from 'moment';
import Jackpot from "../jackpot/jackpot";

const userPlayHistory = (props) => {
    const findSelection = (goalHome, goalAway, status) => {
        if(status === "Match Finished"){
            if (goalHome > goalAway) {
                return "H";
            } else if (goalHome < goalAway) {
                return "A";
            } else {
                return "D";
            }
        }else{
            return "-";
        }
   
    }
    let userPlayHistoryTrannsformed = props.daysuserPlayHistory.map((userPlayHistory, k) => {
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
                                <div className={classes.Score}>{eachRes.status === "Match Finished"?eachRes.score : "in progress"}</div>
                                <div >{findSelection(eachRes.homeGoals, eachRes.awayGoals, eachRes.status)}</div>
                            </div>
                        })}

                    </div>

                </div>
                <div className={classes.JackPotShare}>
                    <Jackpot basePrice={props.basePrice} gamesLength={props.gamesLength} thirteen={props.thirteen}
                        twelve={props.twelve} eleven={props.eleven} ten={props.ten}
                        thirteenPcs={props.thirteenPcs} twelvePcs={props.twelvePcs}
                        elevenPcs={props.elevenPcs} tenPcs={props.tenPcs}
                    />
                </div>
            </div>

        </div>
    })
    return (<div className={classes.userPlayHistoryWrapper}>{userPlayHistoryTrannsformed}</div>);
}

export default userPlayHistory;