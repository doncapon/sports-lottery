import React from 'react';
import classes from './odds.module.css';

const odds = (props) => {
    return (<div className={classes.OddsWrapper}>

        <div className={classes.Titles} >
            <div className={classes.TitleChild}>Home(H)</div>
            <div className={classes.TitleChild}>Draw(D)</div>
            <div className={classes.TitleChild}>Away(A)</div>
        </div>
        <div className={classes.BodyValues}  >
            <div className={classes.BodyInner}>{props.home}</div>
            <div className={classes.BodyInner} >{props.draw}</div>
            <div className={classes.BodyInner}>{props.away}</div>
        </div>
        <div className={classes.Advice} style={{ fontWeight: 'bold' }}><div></div>Advice: </div><div className={classes.AdviceInner}>{props.advice}</div>
    </div>)
}

export default odds;