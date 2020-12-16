
import { React } from "react";
import classes from './Team.module.css';


const Team = (props ) =>{
    return (
        <div className = { classes.Team}>
            <div className = {classes.Team1}>{props.team1}</div> 
            <div className = {classes.Vs}>VS</div>  <div className = {classes.Team2}>{props.team2}</div>
        </div>
    );
}


export default Team;