import { React } from "react";

const Team = (props) => {
  return (
    
          <div  className="row "  style= {{display: 'flex', float: 'left', fontSize : '1.5vw', marginLeft: '10px'}}>
            <span style={{ marginRight: '2px', textAlign: 'left'}}>{props.row} <span 
             style={{textAlign: 'left' , marginRight: '2px'}} className= 'col-xs-10 '>{props.team1}. 
             <span  style={{color: 'grey' }}>vs</span></span> <span style={{textAlign: 'right'}}>   {props.team2}</span> </span>
          </div>
    
    
  );
};

export default Team;
