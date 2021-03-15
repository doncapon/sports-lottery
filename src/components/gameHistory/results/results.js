import classes from "./results.module.css";
import React, { useLayoutEffect, useState } from "react";
import moment from 'moment';
import Jackpot from "../jackpot/jackpot";

const Results = (props) => {
    const [recalculatedReults, setRecaculted] = useState([]);

    useLayoutEffect(() => {
        let gamesCalc = [...props.daysResults];
        props.daysResults.forEach((results, i) => {
            if (results.length === 1) {
                gamesCalc.splice(i, i );
            }
        });
        setRecaculted(gamesCalc);

    }, [props.daysResults])
    const findSelection = (goalHome, goalAway, status, endDate) => {
        if (status === "Match Finished") {
            if (goalHome > goalAway) {
                return "H";
            } else if (goalHome < goalAway) {
                return "A";
            } else {
                return "D";
            }
        } else {
            if (Date.now() > endDate)
                return "Free pass!!!";
            else
                return "-";
        }

    }
    let resultsTrannsformed = recalculatedReults.map((results, k) => {
        return <div className={classes.ResultsAndShare} key={k}>
            {  props.daysResults[k].length >= 12 ? <div>
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
                                    <div className={classes.Score}>{eachRes.status === "Match Finished" ? eachRes.score : Date.now() > moment(eachRes.gameDate)? "free pass!!!" : "-"}</div>
                                    <div >{findSelection(eachRes.homeGoals, eachRes.awayGoals, eachRes.status, eachRes.gameDate)}</div>
                                </div>
                            })}
                        </div>

                    </div>
                    <div className={classes.JackPotShare}>
                        <Jackpot basePrice={props.basePrice} gameDay=
                            {moment(results[0].gameDay).format("YYYY-MM-DD")}
                            gamesLength={results.length} 

                        />
                    </div>

                </div>
            </div>:  props.daysResults[k].length > 1?<div>Sorry too many games have been postponed
            Hence, games for this week have been cancelled
                </div>:null}

        </div>
    })
    return (<div className={classes.ResultsWrapper}>{resultsTrannsformed}</div>);
}

export default Results;