import React from "react";
import classes from './jackpot.module.css';
import NumberFormat from 'react-number-format'
const jackpot = (props) => {
    return <div className={classes.jackpot}>
        <div className={classes.Header}>
            <h6>WINNERS DISTRIBUTION</h6>
        </div>
        <div className={classes.Main}>
            <div className={classes.Row}>
                <div className={classes.Right}>{props.gamesLength} <span>correct</span></div>
                <div className={classes.Pieces}>{props.thirteenPcs} <span>pieces</span></div>
                <div> {props.thirteen>=props.basePrice? 
                   <NumberFormat
                    value={props.thirteen.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                />: " - "}</div>
            </div>
            <div className={classes.Row} >
                <div className={classes.Right}>{props.gamesLength-1} <span>correct</span></div>
                <div className={classes.Pieces}>{props.twelvePcs} <span>pieces</span></div>
                <div>{props.twelve>=props.basePrice?<NumberFormat
                    value={props.twelve.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                />: " - "}</div>
            </div>
            <div className={classes.Row}>
                <div className={classes.Right} >{props.gamesLength-2} <span>correct</span></div>
                <div  className={classes.Pieces}>{props.elevenPcs} <span>pieces</span></div>
                <div>{props.eleven>=props.basePrice?<NumberFormat
                    value= {props.eleven.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                />: " - "}</div>
            </div>
            <div className={classes.Row}>
                <div className={classes.Right}>{props.gamesLength-3} <span>correct</span></div>
                <div className={classes.Pieces}>{props.tenPcs} <span>pieces</span></div>
                <div>  {props.ten>=props.basePrice?   <NumberFormat
                    value={props.ten.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                />: " - " }
                </div>
            </div>
        </div>

    </div>
}

export default jackpot;