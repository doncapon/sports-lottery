
import { React } from "react";
import classes from './Team.module.css';


const Team = (props ) =>{
    return (
        <div className = { classes.Team}>
        
                <div className = {classes.TeamInner} style = {{ display: 'inline-block'}} > 
                    <span style={{float: 'left' ,marginLeft: '0', marginRight: '3px'}}>{props.row}</span>
                        <div style={{display: 'flex'}}>{props.team1}  <p className= {classes.Vs} style = {{float: 'left'}}>
                            vs</p > </div> <p style = {{float: 'left', marginLeft: '10px'}}>{props.team2}</p> 
                </div>
        
        </div>
    );
}


export default Team;