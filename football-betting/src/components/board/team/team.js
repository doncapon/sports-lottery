import { React } from "react";

const Team = (props) => {
  return (
    <div
      className="row"
      style={{
        padding: '0',
        float: "left",
        fontSize: "2.8vh",
        margin: "0px"
        , display: 'block'
      }}
    >
       
        <div className="col-12" 
        style={{ margin :"0px 3px 0 0px", textAlign: "left" }}>
          <span>{props.row}.</span>
            {props.team1}
            <span style={{ color: "grey" }}>vs</span>
          
          <span style={{ textAlign: "right" }}>{props.team2}</span>{" "}
        </div>
      </div>
  );
};

export default Team;
