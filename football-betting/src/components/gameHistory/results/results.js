import classes from "./results.module.css";
import React from "react";
import moment from 'moment';

const results = (props) => {

    const findSelection = (goalHome, goalAway) => {

        if (goalHome > goalAway) {
            return "1";
        } else if (goalHome < goalAway) {
            return "2";
        } else {
            return "x";
        }
    }
    console.log(props.results, props.results.length);
    let results = props.results[0].map((result, k) => {
        return <div key={k}>
            <div className={classes.ResultHead} >
                <div>
                    <span>{moment(result[0].gameDate).format("dddd")}</span>
                    <span>{moment(result[0].gameDate).format("DD.MM.YYYY")}</span>
                    <span>-</span>
                </div>
                <div>Match reults </div>
            </div>

            <div className={classes.ResultBody} >
                <div className={classes.BodyHeader}>
                    <div className={classes.Match}>Match</div>
                    <div className={classes.MoveMiddle}>Result</div>
                    <div className={classes.MoveRight}>Correct</div>
                </div >
                <div className={classes.BodyMain}>
                    {console.log(result, result.length)}
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
        </div>
    })
    return (<div className={classes.ResultsWrapper}>{results}</div>);
}

export default results;