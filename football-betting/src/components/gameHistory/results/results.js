import classes from "./results.module.css";
import React from "react";
import moment from 'moment';
import Jackpot from "../jackpot/jackpot";

const results = (props) => {
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
    let resultsTrannsformed = props.daysResults.map((results, k) => {
        return <div className={classes.ResultsAndShare} key={k}>
            <div className={classes.ResultHead} >
                <div className={classes.HeaderInner}>
                    <div>{moment(results[0].gameDay).format("dddd")}</div>{" "}
                    <div>{moment(results[0].gameDay).format("DD.MM.YYYY")}</div>
                    <div>{" "}-{" "}</div>
                </div>
                <div>Match results </div>
            </div>
            <div className={classes.Results}>

                <div className={classes.ResultBody} >
                    <div className={classes.BodyHeader}>
                        <div className={classes.Match}>Match</div>
                        <div className={classes.MoveMiddle}>Result</div>
                        <div className={classes.MoveRight}>Correct</div>
                    </div >
                    <div className={classes.BodyMain}>
                        {results.map((eachRes, i) => {
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
                    <Jackpot basePrice={props.basePrice} gamesLength={results.length} thirteen={props.thirteen}
                        twelve={props.twelve} eleven={props.eleven} ten={props.ten}
                        thirteenPcs={props.thirteenPcs} twelvePcs={props.twelvePcs}
                        elevenPcs={props.elevenPcs} tenPcs={props.tenPcs}
                    />
                </div>
            </div>

        </div>
    })
    return (<div className={classes.ResultsWrapper}>{resultsTrannsformed}</div>);
}

export default results;