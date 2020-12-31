import { React } from "react";
import classes from "./Team.module.css";

const Team = (props) => {
  return (
    <div className={"row justify-content-center"}>
      <div className={"col-lg-12 " + classes.TeamRow}>
        <div className="row"  style= {{display: 'inline', paddingLeft: '10%'}}>
          <span>{props.row} {props.team1}  <span style={{color: 'grey'}}>vs</span>   {props.team2} </span> 
        
        </div>
      </div>
    </div>
  );
};

export default Team;
