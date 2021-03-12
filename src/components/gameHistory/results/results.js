import classes from "./results.module.css";
import React, { useLayoutEffect, useState } from "react";
import moment from 'moment';
import Jackpot from "../jackpot/jackpot";

const Results = (props) => {
    const [recalculatedReults, setRecaculted] = useState([]);
     
    useLayoutEffect(()=>{
        let gamesCalc = [...props.daysResults];
        props.daysResults.forEach((results, i) => {
            if(results.length === 1){
                let myRes = [results[0]];
                let myTarget =[... props.daysResults[i+1]];
                myRes.gameDay= props.daysResults[i+1][0].gameDay
                myTarget.splice(myTarget.length, myTarget.length+1, myRes[0]);
                gamesCalc.splice(i, i+1);

                gamesCalc.splice(i-1,i-1, myTarget);
                setRecaculted(gamesCalc);
            }
        });
    }, []) 
    const showGames = (index) => {
        let daysResults = [...props.daysResults];
        if (daysResults[index].length >= 12)
            return true;
        else
            return false;

    }
    const findSelection = (goalHome, goalAway, status) => {
        if (status === "Match Finished") {
            if (goalHome > goalAway) {
                return "H";
            } else if (goalHome < goalAway) {
                return "A";
            } else {
                return "D";
            }
        } else {
            return "Free pass!!!";
        }

    }
    let resultsTrannsformed = recalculatedReults.map((results, k) => {
        return <div className={classes.ResultsAndShare} key={k}>
            {showGames(k) ? <div>
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
                                    <div className={classes.Score}>{eachRes.status === "Match Finished" ? eachRes.score : "free pass!!!"}</div>
                                    <div >{findSelection(eachRes.homeGoals, eachRes.awayGoals, eachRes.status)}</div>
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
                </div>: props.daysResults[k].length> 1? <div>Sorry too many games have been postponed
                    Hence, games for this week have been cancelled
                </div> : null}

        </div>
    })
    return (<div className={classes.ResultsWrapper}>{resultsTrannsformed}</div>);
}

export default Results;