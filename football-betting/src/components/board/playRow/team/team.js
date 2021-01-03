import { React } from "react";
import classes from "./Team.module.css";

const Team = (props) => {
  return (
    <div className={"row"}>
      <div className={"col-lg-10 " + classes.TeamRow}>
        <div className="row offset-1"  style= {{display: 'flex'}}>
            <div style={{float: 'left'}} className= 'col-sm-1'>{props.row}</div>
            <div style={{textAlign: 'left'}} className= 'col-md-10' >{props.team1} <span  style={{color: 'grey'}}>vs</span>  {props.team2} </div>
        
        </div>
      </div>
    </div>
  );
};

export default Team;
