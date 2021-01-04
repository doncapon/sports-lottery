import { React } from "react";
import classes from "./Team.module.css";

const Team = (props) => {
  return (
    <div className={"row"}>
      <div className={"col-sm-12  col-xs-12 "  + classes.TeamRow }>
          <div  className="row "  style= {{display: 'flex'}}>
            <div style={{float: 'left'}} className= ' col-xs-2 offset-1 '>{props.row}</div>
            <div style={{textAlign: 'left'}} className= 'col-xs-11 offset-1' >{props.team1}
             <span  style={{color: 'grey', margin: '0 10px'}}>vs</span>  {props.team2} </div>
          </div>
      </div>
    </div>
  );
};

export default Team;
