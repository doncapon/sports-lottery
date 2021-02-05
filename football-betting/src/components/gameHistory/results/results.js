import classes from "./results.module.css";
import React from "react";
import moment from 'moment';
import Jackpot from "../jackpot/jackpot";

const results = (props) => {
    const findSelection = (goalHome, goalAway) => {
        if (goalHome > goalAway) {
            return "H";
        } else if (goalHome < goalAway) {
            return "A";
        } else {
            return "D";
        }
    }
    let results = props.results[0].map((result, k) => {

        return <div className={classes.ResultsAndShare} key={k}>
            <div className={classes.ResultHead} >
                <div>
                    <span>{moment(result[0].gameDate).format("dddd")}</span>{" "}
                    <span>{moment(result[0].gameDate).format("DD.MM.YYYY")}</span>
                    <span>-</span>
                </div>
                <div>Match reults </div>
            </div>
            <div className={classes.Results}>

                <div className={classes.ResultBody} >
                    <div className={classes.BodyHeader}>
                        <div className={classes.Match}>Match</div>
                        <div className={classes.MoveMiddle}>Result</div>
                        <div className={classes.MoveRight}>Correct</div>
                    </div >
                    <div className={classes.BodyMain}>
                        {result.map((eachRes, i) => {
                            return <div key={i} className={classes.SelectionRow}>
                                <div className={classes.Teams}>
                                    <div className={classes.RowNumber}>{i + 1} </div>
                                    <div className={classes.TeamNames}>
                                        <div>{eachRes.homeTeam + "  -  "}</div>
                                        <div>{eachRes.awayTeam}</div>
                                    </div>
                                </div>
                                <div className={classes.Score}>{eachRes.score}</div>
                                <div >{findSelection(eachRes.homeGoals, eachRes.awayGoals)}</div>
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
    return (<div className={classes.ResultsWrapper}>{results}</div>);
}

export default results;