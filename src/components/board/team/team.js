import classes from "./Team.module.css";
import { React } from "react";

const Team = (props) => {
  return (
    <div
      className={classes.Team}
  
    >
       
        <div className= { classes.TeamRow}>
          <div className={classes.RowNumber}>{props.row}.</div>
            {props.team1}
            <div style={{ color: "grey", padding: '0 5px' }}>vs</div>
          
          <div style={{ textAlign: "left" , padding: '0'}}>{props.team2}</div>{" "}
        </div>
      </div>
  );
};

export default Team;
