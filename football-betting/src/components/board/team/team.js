import classes from "./Team.module.css";
import { React } from "react";

const Team = (props) => {
  return (
    <div
      className={classes.Team}
  
    >
       
        <div  style={{ margin :"0px 0px 0 ", textAlign: "left" }}>
          <span className={classes.RowNumber}>{props.row}.</span>
            {props.team1}
            <span style={{ color: "grey", padding: '0 5px' }}>vs</span>
          
          <span style={{ textAlign: "left" , padding: '0'}}>{props.team2}</span>{" "}
        </div>
      </div>
  );
};

export default Team;
