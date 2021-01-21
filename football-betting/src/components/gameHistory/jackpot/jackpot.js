import React from "react";
import classes from './jackpot.module.css';
import NumberFormat from 'react-number-format'
const jackpot = (props) => {
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
                <div> {props.thirteen >= props.basePrice ?
                    <NumberFormat
                        value={props.thirteen.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₦"}
                    /> : " - "}</div>
            </div>
            <div className={classes.Row} >
                <div className={classes.Correct}><div className={classes.GameNumber}>{props.gamesLength - 1}</div> <div className={classes.Greyed}>correct</div></div>
                <div className={classes.Pieces}><div className={classes.PiecesNumber}>{props.twelvePcs}</div>{"\xa0\xa0"} <div className={classes.Greyed}>winners</div></div>
                <div>{props.twelve >= props.basePrice ? <NumberFormat
                    value={props.twelve.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                /> : " - "}</div>
            </div>
            <div className={classes.Row}>
                <div className={classes.Correct} ><div className={classes.GameNumber}>{props.gamesLength - 2}</div> <div className={classes.Greyed}>correct</div></div>
                <div className={classes.Pieces}><div className={classes.PiecesNumber}>{props.elevenPcs}</div>{"\xa0\xa0"} <div className={classes.Greyed}>winners</div></div>
                <div>{props.eleven >= props.basePrice ? <NumberFormat
                    value={props.eleven.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                /> : " - "}</div>
            </div>
            <div className={classes.Row}>
                <div className={classes.Correct}><div className={classes.GameNumber}>{props.gamesLength - 3}</div> <div className={classes.Greyed}>correct</div></div>
                <div className={classes.Pieces}><div className={classes.PiecesNumber}>{props.tenPcs}</div>{"\xa0\xa0"} <div className={classes.Greyed}>winners </div></div>
                <div>  {props.ten >= props.basePrice ? <NumberFormat
                    value={props.ten.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                /> : " - "}
                </div>
            </div>
        </div>

    </div>
}

export default jackpot;