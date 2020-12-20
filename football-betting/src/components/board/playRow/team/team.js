
import { React } from "react";
import classes from './Team.module.css';


const Team = (props ) =>{
    return (
        <div className = { classes.Team}>
        
                <div className = {classes.TeamInner} > 
                    {props.team1}  <span>vs</span> {props.team2} 
                </div>
        
        </div>
    );
}


export default Team;