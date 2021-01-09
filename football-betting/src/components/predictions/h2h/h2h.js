import moment from 'moment'
import React from "react";
import  './h2h.module.css';

const h2h =(props) =>{
    let head1 = props.head2Head.slice(props.head2Head.length- 6, props.head2Head.length);
    let head = head1.reverse().map((hh, i)=>{
       return  <div key = {hh.event_timestamp} className = "row" style={{
           padding: '5px 0',
           border: '1px solid lightgrey'}}>
            <div className="col-3 offset-1">{moment(hh.event_timestamp * 1000).format("DD.MM.YYYY")}</div>
            <div className="col-2 ">{hh.homeTeam.team_name}</div> v {" "}
            <div className="col-2">{hh.awayTeam.team_name}</div>
            <div className="col-2" style= {{fontSize: '1.2em'}}>{hh.score.fulltime}</div>
        </div>
    });
    
    return (<div className="col col-12" >
            <h5 style= {{textAlign: "left" , marginLeft: '2vw'}}>RECENT MEETINGS RESULT</h5>
            {head}    
    </div>);
}


export default h2h;