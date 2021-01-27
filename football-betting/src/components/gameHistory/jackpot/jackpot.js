import React from "react";
import classes from './jackpot.module.css';
import {addCommaToAmounts} from '../../../shared/utility';

const jackpot = (props) => {
    const checkAmount = (amount) => {
        return amount >= props.basePrice ? "₦"+addCommaToAmounts(amount.toString(10))
        : " Nil "
    }
    return <div className={classes.Jackpot}>
        <div className={classes.Header}>
            <h6>JACKPOT SHARE</h6>
        </div>
        <div className={classes.Main}>
            <div className={classes.Row}>
                <div className={classes.Correct}><div className={classes.GameNumber}>{props.gamesLength}</div>
                    <div className={classes.Greyed}>correct</div></div>
                <div className={classes.Pieces}><div className={classes.PiecesNumber}>{props.thirteenPcs}</div>{"\xa0\xa0"}
                    <div className={classes.Greyed}>winners</div></div>
                <div className={classes.Pot}> {checkAmount(props.thirteen)} </div>
            </div>
            <div className={classes.Row} >
                <div className={classes.Correct}><div className={classes.GameNumber}>{props.gamesLength - 1}</div>
                    <div className={classes.Greyed}>correct</div></div>
                <div className={classes.Pieces}><div className={classes.PiecesNumber}>{props.twelvePcs}</div>{"\xa0\xa0"}
                    <div className={classes.Greyed}>winners</div></div>
                <div className={classes.Pot}> {checkAmount(props.twelve)} </div>
            </div>
            <div className={classes.Row}>
                <div className={classes.Correct} ><div className={classes.GameNumber}>{props.gamesLength - 2}</div>
                    <div className={classes.Greyed}>correct</div></div>
                <div className={classes.Pieces}><div className={classes.PiecesNumber}>{props.elevenPcs}</div>{"\xa0\xa0"}
                    <div className={classes.Greyed}>winners</div></div>
                <div className={classes.Pot} > {checkAmount(props.eleven)} </div>
            </div>
            <div className={classes.Row}>
                <div className={classes.Correct}><div className={classes.GameNumber}>{props.gamesLength - 3}</div>
                    <div className={classes.Greyed}>correct</div></div>
                <div className={classes.Pieces}><div className={classes.PiecesNumber}>{props.tenPcs}</div>{"\xa0\xa0"}
                    <div className={classes.Greyed}>winners </div></div>
                <div className={classes.Pot} > {checkAmount(props.ten)}
                </div>
            </div>
        </div>

    </div>
}

export default jackpot;