import moment from 'moment'
import React from "react";
import  './h2h.module.css';
import classes from './h2h.module.css';

const h2h =(props) =>{
    let head1 = props.head2Head.slice(0,6);
    let head = head1.sort((a,b)=>a.fixture.timestamp>b.fixture.timestamp? 1:-1).reverse().map((hh, i)=>{
       return  <div key = {hh.fixture.timestamp} className = {classes.Row}>
            <div className={classes.Others}>{moment(hh.fixture.timestamp * 1000).format("DD.MM.YYYY")}</div>
            <div className= {classes.Others1}>{hh.teams.home.name}</div> 
            <div className= {classes.Vs}>v</div>
            <div >{hh.teams.away.name}</div>
            <div className={classes.Score}>{hh.score.fulltime.home + " - " + hh.score.fulltime.away}</div>
        </div>
    });
    
    return (<div>
            <h5 className={classes.H2hHeading}>RECENT MEETINGS RESULT</h5>
            {head}    
    </div>);
}


export default h2h;