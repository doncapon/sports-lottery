import moment from 'moment'
import React from "react";
import  './h2h.module.css';
import classes from './h2h.module.css';

const h2h =(props) =>{
    let head1 = props.head2Head.slice(props.head2Head.length- 6, props.head2Head.length);
    let head = head1.reverse().map((hh, i)=>{
       return  <div key = {hh.event_timestamp} className = {classes.Row}>
            <div className={classes.Others}>{moment(hh.event_timestamp * 1000).format("DD.MM.YYYY")}</div>
            <div className= {classes.Others}>{hh.homeTeam.team_name}</div> 
            <div className= {classes.Vs}>v</div>
            <div >{hh.awayTeam.team_name}</div>
            <div className={classes.Score}>{hh.score.fulltime}</div>
        </div>
    });
    
    return (<div className="" >
            <h5 style= {{textAlign: "left" , marginLeft: '2vw'}}>RECENT MEETINGS RESULT</h5>
            {head}    
    </div>);
}


export default h2h;