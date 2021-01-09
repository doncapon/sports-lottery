import { React } from "react";

const Team = (props) => {
  return (
    
          <div  className="row "  style= {{display: 'flex', float: 'left', fontSize : '2.8.3vh', marginLeft: '10px'}}>
            <div><span style={{ marginRight: '2px', textAlign: 'left'}}>{props.row} <span 
             style={{textAlign: 'left' , marginRight: '2px'}} className= 'col-xs-10 '>{props.team1}. 
             <span  style={{color: 'grey' }}>vs</span></span> <span style={{textAlign: 'right'}}>   {props.team2}</span> </span>
          </div></div>
    
    
  );
};

export default Team;
